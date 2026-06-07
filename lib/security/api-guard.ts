import { SITE_URL } from '@/lib/site';

const ALLOWED_ORIGINS = new Set([
  SITE_URL,
  'https://nafiskabbo.dev',
  'https://nafiskabbo.vercel.app',
  'http://localhost:3000',
]);

function normalizeOrigin(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isAllowedChatOrigin(headers: Headers): boolean {
  const origin = normalizeOrigin(headers.get('origin'));
  if (origin && ALLOWED_ORIGINS.has(origin)) return true;

  const referer = headers.get('referer');
  if (referer) {
    try {
      const refOrigin = new URL(referer).origin;
      if (ALLOWED_ORIGINS.has(refOrigin)) return true;
    } catch {
      /* ignore */
    }
  }

  return false;
}

export function hasValidChatApiKey(headers: Headers): boolean {
  const expected = process.env.CHAT_API_KEY;
  if (!expected) return false;
  const provided = headers.get('x-api-key') ?? headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return Boolean(provided && provided === expected);
}

export function canAccessChatApi(headers: Headers): boolean {
  if (hasValidChatApiKey(headers)) return true;
  return isAllowedChatOrigin(headers);
}
