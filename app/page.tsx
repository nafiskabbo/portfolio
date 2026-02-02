import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsPreview } from './components/ProjectsPreview';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="text-white" style={{ background: 'var(--theme-background)' }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsPreview />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
