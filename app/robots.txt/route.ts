import { SITE_URL } from '@/lib/site';

const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'Claude-Web',
  'Google-Extended',
  'Amazonbot',
  'anthropic-ai',
  'Bytespider',
  'CCBot',
  'Applebot-Extended',
] as const;

function buildRobotsTxt(): string {
  const lines: string[] = [
    '# https://nafiskabbo.dev - robots.txt (RFC 9309)',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Content-Signal: ai-train=no, search=yes, ai-input=yes',
    '',
  ];

  for (const bot of AI_BOTS) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
    lines.push('Disallow: /api/');
    lines.push('Content-Signal: ai-train=no, search=yes, ai-input=yes');
    lines.push('');
  }

  lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);

  return lines.join('\n');
}

export function GET() {
  return new Response(buildRobotsTxt(), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
