import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SITE_URL } from '@/lib/site';

interface SkillEntry {
  name: string;
  type: 'skill-md';
  description: string;
  url: string;
  digest: string;
}

const SKILL_DEFS = [
  {
    name: 'portfolio-chat',
    description:
      'Query the portfolio AI chat API for answers about Nafis Kabbo experience, skills, and projects.',
    file: 'portfolio-chat/SKILL.md',
  },
  {
    name: 'portfolio-contact',
    description:
      'Contact Nafis Kabbo via email, WhatsApp, LinkedIn, or freelance platforms.',
    file: 'portfolio-contact/SKILL.md',
  },
] as const;

async function sha256Digest(filePath: string): Promise<string> {
  const content = await readFile(filePath, 'utf8');
  const hash = createHash('sha256').update(content).digest('hex');
  return `sha256:${hash}`;
}

export async function GET() {
  const skillsDir = path.join(
    process.cwd(),
    'public',
    '.well-known',
    'agent-skills'
  );

  const skills: SkillEntry[] = await Promise.all(
    SKILL_DEFS.map(async (skill) => {
      const filePath = path.join(skillsDir, skill.file);
      const digest = await sha256Digest(filePath);
      return {
        name: skill.name,
        type: 'skill-md' as const,
        description: skill.description,
        url: `${SITE_URL}/.well-known/agent-skills/${skill.file}`,
        digest,
      };
    })
  );

  return Response.json(
    {
      $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
      skills,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    }
  );
}
