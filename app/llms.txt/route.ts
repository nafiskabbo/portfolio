import { ALL_PROJECTS } from '@/app/data/projects';
import { getProjectDetail } from '@/app/data/project-details';
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_URL,
  YEARS_OF_EXPERIENCE_LABEL,
} from '@/lib/site';

function buildLlmsTxt(): string {
  const projects = ALL_PROJECTS.map((p) => {
    const detail = getProjectDetail(p.id);
    const links = p.links.map((l) => `${l.type}: ${l.url}`).join(' · ');
    const highlights = detail?.highlights?.length
      ? `\n  Highlights: ${detail.highlights.join('; ')}`
      : '';
    const tech = detail?.techStack?.length
      ? `\n  Tech: ${detail.techStack.join(', ')}`
      : '';

    return `- **${p.title}** (\`${p.id}\`)
  ${p.description}
  Platform: ${p.platform} · Category: ${p.category} · Tags: ${p.tags.join(', ')}
  Portfolio: ${SITE_URL}/projects/${p.id}
  Links: ${links}${tech}${highlights}`;
  }).join('\n\n');

  return `# ${SITE_AUTHOR.name}

> ${SITE_DESCRIPTION}

## Profile

- Role: ${SITE_AUTHOR.jobTitle}
- Experience: ${YEARS_OF_EXPERIENCE_LABEL} years (since July 2020)
- Focus: Native Android (Kotlin), Native iOS (Swift/SwiftUI), Flutter, Next.js/web, AI features, open source
- Notable open source: emu8086web - browser 8086 assembler & step debugger (MIT)

## Contact

- Email: ${SITE_AUTHOR.email}
- LinkedIn: https://www.linkedin.com/in/nafiskabbo30/
- GitHub: https://github.com/nafiskabbo

## Pages

- Home: ${SITE_URL}/
- Projects: ${SITE_URL}/projects
- Chat: ${SITE_URL}/chat
- API docs: ${SITE_URL}/docs/api/chat
- Markdown mirror: ${SITE_URL}/api/markdown?path=/

## Projects

${projects}

## Agent discovery

- robots.txt: ${SITE_URL}/robots.txt
- sitemap: ${SITE_URL}/sitemap.xml
- API catalog: ${SITE_URL}/.well-known/api-catalog
- Agent skills: ${SITE_URL}/.well-known/agent-skills/index.json
- OpenAPI (chat): ${SITE_URL}/.well-known/openapi/chat.json
- llms.txt: ${SITE_URL}/llms.txt

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
