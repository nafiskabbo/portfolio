import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { hashIp } from '@/lib/security/ip-hash';

export type RateLimitResult = {
  allowed: boolean;
  blocked: boolean;
  remaining: number;
};

type RateLimitConfig = {
  endpoint: string;
  windowMs: number;
  maxRequests: number;
  blockThreshold?: number;
};

const memoryBuckets = new Map<string, number[]>();

function memoryAllow(key: string, windowMs: number, maxRequests: number): boolean {
  const now = Date.now();
  const prev = memoryBuckets.get(key) ?? [];
  const recent = prev.filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) return false;
  recent.push(now);
  memoryBuckets.set(key, recent);
  return true;
}

async function isIpBlocked(ipHash: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const { data, error } = await supabase
    .from('blocked_ips')
    .select('ip_hash')
    .eq('ip_hash', ipHash)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .maybeSingle();

  if (error) {
    console.error('[rate-limit] blocked_ips check failed', error.message);
    return false;
  }
  return Boolean(data);
}

async function blockIp(ipHash: string, reason: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  await supabase.from('blocked_ips').upsert(
    { ip_hash: ipHash, reason, expires_at: expiresAt },
    { onConflict: 'ip_hash' }
  );
}

async function supabaseAllow(
  bucketKey: string,
  config: RateLimitConfig
): Promise<{ allowed: boolean; count: number }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { allowed: memoryAllow(bucketKey, config.windowMs, config.maxRequests), count: 0 };
  }

  const windowStart = new Date(
    Math.floor(Date.now() / config.windowMs) * config.windowMs
  ).toISOString();

  const { data: existing, error: readError } = await supabase
    .from('api_rate_limits')
    .select('request_count')
    .eq('bucket_key', bucketKey)
    .eq('endpoint', config.endpoint)
    .eq('window_start', windowStart)
    .maybeSingle();

  if (readError) {
    console.error('[rate-limit] read failed', readError.message);
    return { allowed: memoryAllow(bucketKey, config.windowMs, config.maxRequests), count: 0 };
  }

  const current = existing?.request_count ?? 0;
  if (current >= config.maxRequests) {
    return { allowed: false, count: current };
  }

  const { error: writeError } = await supabase.from('api_rate_limits').upsert(
    {
      bucket_key: bucketKey,
      endpoint: config.endpoint,
      window_start: windowStart,
      request_count: current + 1,
    },
    { onConflict: 'bucket_key,endpoint,window_start' }
  );

  if (writeError) {
    console.error('[rate-limit] write failed', writeError.message);
    return { allowed: memoryAllow(bucketKey, config.windowMs, config.maxRequests), count: current };
  }

  return { allowed: true, count: current + 1 };
}

export async function checkRateLimit(
  ip: string,
  config: RateLimitConfig,
  extraBucket?: string
): Promise<RateLimitResult> {
  const ipHash = hashIp(ip);
  if (await isIpBlocked(ipHash)) {
    return { allowed: false, blocked: true, remaining: 0 };
  }

  const ipBucket = `${ipHash}`;
  const ipResult = await supabaseAllow(`${config.endpoint}:${ipBucket}`, config);
  if (!ipResult.allowed) {
    if (config.blockThreshold && ipResult.count >= config.blockThreshold) {
      await blockIp(ipHash, `auto:${config.endpoint}`);
    }
    return { allowed: false, blocked: false, remaining: 0 };
  }

  if (extraBucket) {
    const tokenConfig = { ...config, maxRequests: Math.min(config.maxRequests, 20) };
    const tokenResult = await supabaseAllow(
      `${config.endpoint}:token:${extraBucket}`,
      tokenConfig
    );
    if (!tokenResult.allowed) {
      return { allowed: false, blocked: false, remaining: 0 };
    }
  }

  return {
    allowed: true,
    blocked: false,
    remaining: Math.max(0, config.maxRequests - ipResult.count),
  };
}

export const TRACKING_RATE_LIMIT = {
  endpoint: 'tracking',
  windowMs: 60 * 60_000,
  maxRequests: 80,
  blockThreshold: 250,
} as const;

export const CHAT_RATE_LIMIT = {
  endpoint: 'chat',
  windowMs: 10 * 60_000,
  maxRequests: 24,
  blockThreshold: 120,
} as const;
