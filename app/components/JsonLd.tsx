import { ALL_PROJECTS } from '../data/projects';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

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
      'Mobile App Development',
      'AI Integration',
    ],
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portfolio Projects',
    itemListElement: ALL_PROJECTS.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/projects/${project.id}`,
      name: project.title,
      description: project.description,
    })),
  };

  const schemas = [personSchema, websiteSchema, projectsSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
