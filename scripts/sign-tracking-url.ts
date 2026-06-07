/**
 * Generate sample signed tracking URLs for local testing.
 * Usage: TRACKING_SIGNING_SECRET=xxx npx tsx scripts/sign-tracking-url.ts
 */
import { randomUUID } from 'crypto';
import { signTrackingPayload } from '../lib/security/ip-hash';
import { buildTrackingPayload } from '../lib/security/tracking-token';

const leadToken = randomUUID();
const destination = 'github';
const source = 'email';
const exp = Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60;
const payload = buildTrackingPayload({ leadToken, destination, source, expiresAt: exp });
const signature = signTrackingPayload(payload);

const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';
const q = new URLSearchParams({
  t: leadToken,
  d: destination,
  src: source,
  exp: String(exp),
  s: signature,
});

console.log('Lead token (save in CSV):', leadToken);
console.log('Redirect:', `${site}/api/t/r?${q}`);
console.log('Pixel:', `${site}/api/t/pixel?${q}`);
console.log('Click:', `${site}/api/t/click?${q}`);
