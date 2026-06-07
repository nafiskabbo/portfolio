import { createHash, createHmac, timingSafeEqual } from 'crypto';

function getSalt(): string {
  return process.env.IP_HASH_SALT || process.env.TRACKING_SIGNING_SECRET || 'dev-only-salt';
}

export function hashIp(ip: string): string {
  return createHash('sha256').update(`${getSalt()}:${ip}`).digest('hex');
}

export function hashUserAgent(userAgent: string | null): string | null {
  if (!userAgent) return null;
  return createHash('sha256').update(`${getSalt()}:ua:${userAgent}`).digest('hex').slice(0, 32);
}

export function signTrackingPayload(payload: string): string {
  const secret = process.env.TRACKING_SIGNING_SECRET;
  if (!secret) throw new Error('TRACKING_SIGNING_SECRET is not configured');
  return createHmac('sha256', secret).update(payload).digest('base64url').slice(0, 22);
}

export function verifyTrackingSignature(payload: string, signature: string): boolean {
  const secret = process.env.TRACKING_SIGNING_SECRET;
  if (!secret || !signature) return false;
  const expected = signTrackingPayload(payload);
  if (expected.length !== signature.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}
