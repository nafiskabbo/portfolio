import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProjectsExplorer } from '../components/ProjectsExplorer';

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20 pb-16 relative">
        <ProjectsExplorer />
      </main>
      <Footer />
    </div>
  );
}
