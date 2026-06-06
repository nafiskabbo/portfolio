import { SITE_URL } from '@/lib/site';

const CATALOG = {
  linkset: [
    {
      anchor: `${SITE_URL}/api/chat`,
      'service-desc': [
        {
          href: `${SITE_URL}/.well-known/openapi/chat.json`,
          type: 'application/openapi+json',
        },
      ],
      'service-doc': [
        {
          href: `${SITE_URL}/docs/api/chat`,
          type: 'text/html',
        },
        {
          href: `${SITE_URL}/docs/api/chat`,
          type: 'text/markdown',
        },
      ],
      status: [
        {
          href: `${SITE_URL}/api/health`,
          type: 'application/health+json',
        },
      ],
    },
  ],
} as const;

export function GET() {
  return Response.json(CATALOG, {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
