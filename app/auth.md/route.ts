import { SITE_URL } from '@/lib/site';

/** Public portfolio - no agent registration or OAuth required. */
function buildAuthMd(): string {
  return `# Authentication - ${SITE_URL}

This site is a public portfolio. Browsing requires no authentication.

## APIs

| API | Auth | Docs |
|-----|------|------|
| Portfolio Chat | Origin (browser) or \`X-API-Key\` | ${SITE_URL}/docs/api/chat |
| Lead tracking | Signed URLs (HMAC) | ${SITE_URL}/docs/api/tracking |

## Rate limits

Chat: 24 requests per 10 minutes per IP. Tracking: 80/hour per IP. Abusive IPs are auto-blocked.

## Protected resources

Chat and tracking APIs reject unsigned or cross-origin abuse. API keys and signing secrets are server-only env vars.
`;
}

export function GET() {
  return new Response(buildAuthMd(), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
