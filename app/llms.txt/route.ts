import { ALL_PROJECTS } from '@/app/data/projects';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

function buildLlmsTxt(): string {
  const projects = ALL_PROJECTS.map(
    (p) => `- ${p.title}: ${SITE_URL}/projects/${p.id}`
  ).join('\n');

  return `# ${SITE_AUTHOR.name}

> ${SITE_DESCRIPTION}

## Contact

- Email: ${SITE_AUTHOR.email}
- LinkedIn: https://www.linkedin.com/in/nafiskabbo30/
- GitHub: https://github.com/nafiskabbo

## Pages

- Home: ${SITE_URL}/
- Projects: ${SITE_URL}/projects
- Chat: ${SITE_URL}/chat
- API docs: ${SITE_URL}/docs/api/chat

## Projects

${projects}

## Agent discovery

- robots.txt: ${SITE_URL}/robots.txt
- sitemap: ${SITE_URL}/sitemap.xml
- API catalog: ${SITE_URL}/.well-known/api-catalog
- Agent skills: ${SITE_URL}/.well-known/agent-skills/index.json
- OpenAPI (chat): ${SITE_URL}/.well-known/openapi/chat.json

## Content policy

- AI training: not permitted (ai-train=no)
- Search indexing: permitted (search=yes)
- AI input/context: permitted (ai-input=yes)
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
