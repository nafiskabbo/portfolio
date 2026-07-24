import { getYearsOfExperienceLabel } from '@/lib/experience';

/** Canonical site URL - override with NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://nafiskabbo.dev';

export const SITE_NAME = 'Nafis Kabbo Portfolio';

/** Resolved once per module load (SSR / build); stays current as years advance. */
export const YEARS_OF_EXPERIENCE_LABEL = getYearsOfExperienceLabel();

export const SITE_DESCRIPTION = `Nafis Kabbo - product-focused mobile developer. ${YEARS_OF_EXPERIENCE_LABEL} years shipping Android, iOS & Flutter apps for startups and agencies. 50+ production releases, up to 3× client revenue growth, and AI features users finish using.`;

export const SITE_AUTHOR = {
  name: 'Nafis Islam Kabbo',
  email: 'nafiskabbo30@gmail.com',
  url: SITE_URL,
  jobTitle: 'Product-focused Mobile Developer',
  sameAs: [
    'https://github.com/nafiskabbo',
    'https://www.linkedin.com/in/nafiskabbo30/',
    'https://www.freelancer.com/u/nafiskabbo30',
    'https://www.upwork.com/freelancers/~01b2fc2f4ff397f8ca',
    'https://www.youtube.com/@nafiskabbo30',
    'https://www.instagram.com/nafiskabbo30/',
  ],
} as const;
