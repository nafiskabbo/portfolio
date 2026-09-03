import Link from 'next/link';
import { ArrowRightIcon } from './Icons';
import { ThemeBackgroundCompact } from './ThemeBackground';
import { Reveal } from './Reveal';
import { FeaturedProjectsGrid } from './FeaturedProjectsGrid';

export function ProjectsPreview() {
  return (
    <section id="projects" className="relative py-16 lg:py-20 overflow-hidden">
      <ThemeBackgroundCompact />
      <div className="relative z-10 section-container">
        <div className="text-center mb-10 lg:mb-12">
          <span className="theme-badge inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Featured <span className="theme-gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Real products in production: wellness, payments, AI entertainment, faith tools,
            and more.
          </p>
        </div>

        <FeaturedProjectsGrid />

        <Reveal
          className="text-center"
          style={{ transitionDelay: '400ms' }}
          hiddenClassName="opacity-0"
          visibleClassName="opacity-100"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 group text-sm"
            style={{
              background: 'var(--theme-surface)',
              border: '1px solid var(--theme-border)',
            }}
          >
            <span>View All Projects</span>
            <ArrowRightIcon
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              style={{ color: 'var(--theme-primary)' }}
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
