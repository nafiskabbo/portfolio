import { SITE_URL } from '@/lib/site';

const DESTINATIONS: Record<string, string> = {
  github: 'https://github.com/nafiskabbo',
  portfolio: SITE_URL,
  linkedin: 'https://www.linkedin.com/in/nafiskabbo30/',
  freelancer: 'https://www.freelancer.com/u/nafiskabbo30',
  upwork: 'https://www.upwork.com/freelancers/~01b2fc2f4ff397f8ca',
  whatsapp: 'https://wa.me/8801772988050',
  cv: `${SITE_URL}/cv.pdf`,
  chat: `${SITE_URL}/chat`,
};

export function resolveDestination(key: string): string | null {
  const normalized = key.trim().toLowerCase();
  return DESTINATIONS[normalized] ?? null;
}

export function listDestinationKeys(): string[] {
  return Object.keys(DESTINATIONS);
}
