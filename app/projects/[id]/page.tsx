import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ProjectDetailView } from '../../components/ProjectDetailView';
import { ThemeBackground } from '../../components/ThemeBackground';
import { ALL_PROJECTS } from '../../data/projects';
import { getProjectDetail } from '../../data/project-details';

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
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = ALL_PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  const detail = getProjectDetail(id) ?? null;

  return (
    <div className="flex min-h-screen flex-col text-white" style={{ background: 'var(--theme-background)' }}>
      <Navbar />
      <main className="relative flex-1 pt-0">
        <ThemeBackground intensity="low" className="fixed inset-0 -z-10" />
        <ProjectDetailView project={project} detail={detail} />
      </main>
      <Footer />
    </div>
  );
}
