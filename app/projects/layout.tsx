import type { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Mobile and AI apps by Nafis Kabbo — Flutter, Kotlin Android, Swift iOS, and cross-platform production apps.',
  openGraph: {
    title: 'Projects | Nafis Kabbo',
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/projects`,
  },
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
