import type { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Apps and open-source tools by Nafis Kabbo: Flutter, Kotlin Android, Swift iOS, Next.js web, AI products, and emu8086web (browser 8086 assembler).',
  keywords: [
    'Nafis Kabbo projects',
    'Nafis Islam Kabbo',
    'Flutter apps',
    'Android apps',
    'iOS apps',
    'emu8086web',
    '8086 assembler',
    'open source',
    'AI apps',
  ],
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
