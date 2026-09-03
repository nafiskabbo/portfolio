import { ALL_PROJECTS } from '../data/projects';
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  YEARS_OF_EXPERIENCE_LABEL,
} from '@/lib/site';

export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_AUTHOR.name,
    url: SITE_URL,
    email: SITE_AUTHOR.email,
    jobTitle: SITE_AUTHOR.jobTitle,
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}/personal.webp`,
    sameAs: [...SITE_AUTHOR.sameAs],
    knowsAbout: [
      'Android Development',
      'iOS Development',
      'Flutter',
      'Kotlin',
      'Swift',
      'SwiftUI',
      'Next.js',
      'TypeScript',
      'Web Development',
      'Mobile App Development',
      'AI Integration',
      'Open Source',
      '8086 Assembly',
      'emu8086',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Rajshahi University of Engineering & Technology (RUET)',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
    },
  };

  // Lightweight ItemList only. Full SoftwareApplication lives on /projects/[id].
  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portfolio Projects',
    numberOfItems: ALL_PROJECTS.length,
    itemListElement: ALL_PROJECTS.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.title,
      url: `${SITE_URL}/projects/${project.id}`,
    })),
  };

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    provider: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
    },
    areaServed: 'Worldwide',
    knowsAbout: personSchema.knowsAbout,
    slogan: `${YEARS_OF_EXPERIENCE_LABEL} years helping clients ship store-ready Android, iOS & Flutter products`,
  };

  const schemas = [personSchema, websiteSchema, projectsSchema, professionalService];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
