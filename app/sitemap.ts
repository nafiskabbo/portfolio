import type { MetadataRoute } from 'next';
import { ALL_PROJECTS } from '@/app/data/projects';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/chat`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/docs/api/chat`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/docs/api/tracking`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = ALL_PROJECTS.map((project, index) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    // Featured / earlier projects rank slightly higher for crawlers
    priority: project.featured ? 0.85 : Math.max(0.65, 0.8 - index * 0.02),
  }));

  return [...staticRoutes, ...projectRoutes];
}
