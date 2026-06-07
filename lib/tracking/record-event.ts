import { getSupabaseAdmin } from '@/lib/supabase/admin';
import type { TrackingParams } from '@/lib/security/tracking-token';
import { hashIp, hashUserAgent } from '@/lib/security/ip-hash';
import { getCountryCode } from '@/lib/security/client-ip';

export type TrackingEventType = 'pixel' | 'click' | 'redirect';

export async function recordTrackingEvent(
  headers: Headers,
  ip: string,
  eventType: TrackingEventType,
  params: TrackingParams
): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const { error } = await supabase.from('tracking_events').insert({
    lead_token: params.leadToken,
    event_type: eventType,
    destination: params.destination,
    source: params.source,
    ip_hash: hashIp(ip),
    country_code: getCountryCode(headers),
    user_agent_hash: hashUserAgent(headers.get('user-agent')),
  });

  if (error) {
    console.error('[tracking] insert failed', error.message);
  }
}
