import { ALL_PROJECTS } from '@/app/data/projects';
import { getProjectDetail } from '@/app/data/project-details';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function getMarkdownForPath(pathname: string): { body: string; tokens: number } | null {
  const normalized = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/';

  let body: string | null = null;

  switch (normalized) {
    case '/':
      body = buildHomeMarkdown();
      break;
    case '/projects':
      body = buildProjectsMarkdown();
      break;
    case '/chat':
      body = buildChatMarkdown();
      break;
    case '/docs/api/chat':
      body = buildApiDocsMarkdown();
      break;
    default: {
      const projectMatch = normalized.match(/^\/projects\/([^/]+)$/);
      if (projectMatch) {
        body = buildProjectDetailMarkdown(projectMatch[1]);
      }
    }
  }

  if (!body) return null;
  return { body, tokens: estimateTokens(body) };
}

function buildHomeMarkdown(): string {
  const featured = ALL_PROJECTS.filter((p) => p.featured).slice(0, 4);

  return `# ${SITE_AUTHOR.name} — Mobile Developer

> ${SITE_DESCRIPTION}

**Site:** ${SITE_URL}
**Email:** ${SITE_AUTHOR.email}
**Open for:** Freelance, startups, remote, enterprise

## About

Mobile & Web Developer with 5+ years of experience building production apps with Kotlin, Swift, Flutter, and AI integration.

- **Years of experience:** 5+
- **Projects delivered:** 50+
- **Clients:** 50+
- **Countries served:** 8

## Skills

- Native Android (Kotlin, Java)
- Native iOS (Swift, SwiftUI)
- Cross-platform (Flutter, Dart)
- Web (Next.js, TypeScript, Node.js)
- AI integration, chatbots, n8n workflows

## Featured Projects

${featured.map((p) => `- [${p.title}](${SITE_URL}/projects/${p.id}) — ${p.description}`).join('\n')}

## Contact

- Email: [${SITE_AUTHOR.email}](mailto:${SITE_AUTHOR.email})
- LinkedIn: [nafiskabbo30](https://www.linkedin.com/in/nafiskabbo30/)
- GitHub: [nafiskabbo](https://github.com/nafiskabbo)
- Chat assistant: [${SITE_URL}/chat](${SITE_URL}/chat)

## Machine-readable resources

- API catalog: ${SITE_URL}/.well-known/api-catalog
- Agent skills: ${SITE_URL}/.well-known/agent-skills/index.json
- LLMs summary: ${SITE_URL}/llms.txt
`;
}

function buildProjectsMarkdown(): string {
  const byCategory = ALL_PROJECTS.map(
    (p) =>
      `### ${p.title}\n\n${p.description}\n\n- **Platform:** ${p.platform}\n- **Tags:** ${p.tags.join(', ')}\n- **URL:** ${SITE_URL}/projects/${p.id}`
  ).join('\n\n');

  return `# Projects — ${SITE_NAME}

${byCategory}
`;
}

function buildChatMarkdown(): string {
  return `# Portfolio Chat Assistant

Ask questions about Nafis Kabbo's experience, skills, and projects.

- **API:** POST ${SITE_URL}/api/chat
- **Docs:** ${SITE_URL}/docs/api/chat
- **OpenAPI:** ${SITE_URL}/.well-known/openapi/chat.json
`;
}

function buildApiDocsMarkdown(): string {
  return `# Portfolio Chat API

**Endpoint:** \`POST ${SITE_URL}/api/chat\`
**Authentication:** None (public, rate-limited)
**Content-Type:** \`application/json\`

## Request body

\`\`\`json
{
  "messages": [
    { "role": "user", "content": "What mobile platforms do you specialize in?" }
  ]
}
\`\`\`

## Response

\`\`\`json
{
  "reply": "…",
  "modelUsed": "…"
}
\`\`\`

## Rate limits

24 messages per 10 minutes per IP.

## OpenAPI spec

${SITE_URL}/.well-known/openapi/chat.json
`;
}

function buildProjectDetailMarkdown(id: string): string | null {
  const project = ALL_PROJECTS.find((p) => p.id === id);
  if (!project) return null;

  const detail = getProjectDetail(id);
  const links = project.links
    .map((l) => `- ${l.type}: ${l.url}`)
    .join('\n');

  let body = `# ${project.title}

${project.description}

- **Platform:** ${project.platform}
- **Category:** ${project.category}
- **Tags:** ${project.tags.join(', ')}

## Links

${links}
`;

  if (detail) {
    body += `
## Problem

${detail.problem}

## Solution

${detail.solution}

## Tech stack

${detail.techStack.map((t) => `- ${t}`).join('\n')}
`;
  }

  return body;
}
