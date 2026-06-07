import { signTrackingPayload, verifyTrackingSignature } from '@/lib/security/ip-hash';

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const MAX_SOURCE_LEN = 32;
const MAX_DEST_LEN = 32;

export type TrackingParams = {
  leadToken: string;
  destination: string;
  source: string;
  expiresAt: number;
  signature: string;
};

export function isValidLeadToken(token: string): boolean {
  return UUID_V4.test(token);
}

export function parseTrackingParams(searchParams: URLSearchParams): TrackingParams | null {
  const leadToken = searchParams.get('t')?.trim() ?? '';
  const destination = (searchParams.get('d') ?? searchParams.get('to') ?? 'unknown')
    .trim()
    .toLowerCase()
    .slice(0, MAX_DEST_LEN);
  const source = (searchParams.get('src') ?? 'unknown').trim().toLowerCase().slice(0, MAX_SOURCE_LEN);
  const signature = searchParams.get('s')?.trim() ?? '';
  const expRaw = searchParams.get('exp');

  if (!isValidLeadToken(leadToken) || !signature) return null;

  const expiresAt = expRaw ? Number(expRaw) : 0;
  if (expRaw && (!Number.isFinite(expiresAt) || expiresAt <= 0)) return null;

  return { leadToken, destination, source, expiresAt, signature };
}

export function buildTrackingPayload(params: Omit<TrackingParams, 'signature'>): string {
  const exp = params.expiresAt > 0 ? String(params.expiresAt) : '';
  return `${params.leadToken}|${params.destination}|${params.source}|${exp}`;
}

export function verifyTrackingParams(params: TrackingParams): boolean {
  if (!isValidLeadToken(params.leadToken)) return false;
  if (params.expiresAt > 0 && Date.now() / 1000 > params.expiresAt) return false;
  const payload = buildTrackingPayload(params);
  return verifyTrackingSignature(payload, params.signature);
}

/** Build a signed tracking URL (for lead-gen tooling — server-side only). */
export function buildSignedTrackingUrl(
  basePath: string,
  leadToken: string,
  destination: string,
  source: string,
  expiresAt?: number
): string {
  const exp = expiresAt ?? Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60;
  const params = { leadToken, destination, source, expiresAt: exp };
  const payload = buildTrackingPayload(params);
  const signature = signTrackingPayload(payload);
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://nafiskabbo.dev';
  const url = new URL(basePath, site);
  url.searchParams.set('t', leadToken);
  url.searchParams.set('d', destination);
  url.searchParams.set('src', source);
  url.searchParams.set('exp', String(exp));
  url.searchParams.set('s', signature);
  return url.toString();
}
