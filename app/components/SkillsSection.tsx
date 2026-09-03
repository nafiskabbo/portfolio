import { ThemeBackgroundCompact } from './ThemeBackground';
import { Mascot2D } from './Mascot2D';
import { SkillsGrid } from './SkillsGrid';

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-16 lg:py-20 overflow-hidden">
      <ThemeBackgroundCompact />
      <div className="hidden lg:block absolute right-8 top-1/4 z-10 opacity-45">
        <Mascot2D size="small" position="right" />
      </div>
      <div className="relative z-10 section-container">
        <div className="text-center mb-10 lg:mb-12">
          <span className="theme-badge inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            How I deliver
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Tools behind the <span className="theme-gradient-text">results</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            The stack that gets your product to store and keeps it stable as users grow.
            <span className="text-slate-500 text-xs block mt-1">
              Click a skill to preview that theme.
            </span>
          </p>
        </div>

        <SkillsGrid />
      </div>
    </section>
  );
}
