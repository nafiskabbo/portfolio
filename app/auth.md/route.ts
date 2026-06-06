import { SITE_URL } from '@/lib/site';

/** Public portfolio — no agent registration or OAuth required. */
function buildAuthMd(): string {
  return `# Authentication — ${SITE_URL}

This site is a public portfolio. No agent registration or OAuth tokens are required to browse content or use the public chat API.

## Public APIs

| API | Auth | Docs |
|-----|------|------|
| Portfolio Chat | None (rate-limited) | ${SITE_URL}/docs/api/chat |

## Rate limits

The chat API allows 24 requests per 10 minutes per IP address.

## Protected resources

None. All published pages and the chat API are publicly accessible.
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
