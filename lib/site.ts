/** Canonical site URL — override with NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://nafiskabbo.dev';

export const SITE_NAME = 'Nafis Kabbo Portfolio';

export const SITE_DESCRIPTION =
  'Nafis Kabbo — Mobile Developer specializing in Native Android (Kotlin), Native iOS (SwiftUI/Swift), and Flutter cross-platform development. 5+ years building production apps with clean architecture, AI integration, and modern UI/UX.';

export const SITE_AUTHOR = {
  name: 'Nafis Islam Kabbo',
  email: 'nafiskabbo30@gmail.com',
  url: SITE_URL,
  jobTitle: 'Mobile Developer',
  sameAs: [
    'https://github.com/nafiskabbo',
    'https://www.linkedin.com/in/nafiskabbo30/',
    'https://www.freelancer.com/u/nafiskabbo30',
    'https://www.upwork.com/freelancers/~01b2fc2f4ff397f8ca',
    'https://www.youtube.com/@nafiskabbo30',
    'https://www.instagram.com/nafiskabbo30/',
  ],
} as const;
