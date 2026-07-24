import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ProjectDetailView } from '../../components/ProjectDetailView';
import { ThemeBackground } from '../../components/ThemeBackground';
import { ALL_PROJECTS } from '../../data/projects';
import { getProjectDetail } from '../../data/project-details';
import { SITE_AUTHOR, SITE_URL } from '@/lib/site';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = ALL_PROJECTS.find((p) => p.id === id);
  if (!project) return { title: 'Project' };

  const detail = getProjectDetail(id);
  const keywords = [
    project.title,
    ...project.tags,
    project.platform,
    project.category,
    'Nafis Kabbo',
    ...(detail?.techStack ?? []),
  ];

  return {
    title: project.title,
    description: project.description,
    keywords,
    openGraph: {
      title: `${project.title} | Nafis Kabbo`,
      description: project.description,
      url: `${SITE_URL}/projects/${id}`,
      type: 'article',
      images: [
        {
          url: project.image,
          alt: `${project.title} - by Nafis Kabbo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
    alternates: {
      canonical: `${SITE_URL}/projects/${id}`,
      types: {
        'text/markdown': `${SITE_URL}/api/markdown?path=/projects/${id}`,
      },
    },
  };
}

function buildProjectJsonLd(
  project: (typeof ALL_PROJECTS)[number],
  detail: ReturnType<typeof getProjectDetail>
) {
  const isOpenSource = project.category === 'open-source';
  const github = project.links.find((l) => l.type === 'github')?.url;
  const web = project.links.find((l) => l.type === 'web')?.url;

  return {
    '@context': 'https://schema.org',
    '@type': isOpenSource ? 'SoftwareSourceCode' : 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.id}`,
    image: `${SITE_URL}${project.image}`,
    keywords: project.tags.join(', '),
    applicationCategory: project.category,
    operatingSystem:
      project.platform === 'web'
        ? 'Web Browser'
        : project.platform === 'android'
          ? 'Android'
          : project.platform === 'ios'
            ? 'iOS'
            : 'Android, iOS',
    ...(detail?.techStack?.length ? { programmingLanguage: detail.techStack } : {}),
    ...(detail?.highlights?.length ? { featureList: detail.highlights.join('. ') } : {}),
    ...(web ? { downloadUrl: web } : {}),
    ...(github ? { codeRepository: github } : {}),
    ...(isOpenSource
      ? {
          license: 'https://opensource.org/licenses/MIT',
          runtimePlatform: 'Web Browser',
        }
      : {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }),
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      url: SITE_URL,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = ALL_PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  const detail = getProjectDetail(id) ?? null;
  const jsonLd = buildProjectJsonLd(project, detail ?? undefined);

  return (
    <div className="flex min-h-screen flex-col text-white" style={{ background: 'var(--theme-background)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="relative flex-1 pt-0">
        <ThemeBackground intensity="low" className="fixed inset-0 -z-10" />
        <ProjectDetailView project={project} detail={detail} />
      </main>
      <Footer />
    </div>
  );
}
