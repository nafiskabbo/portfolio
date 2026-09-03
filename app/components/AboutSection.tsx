import { GraduationIcon, CodeIcon, MobileIcon } from './Icons';
import { Reveal } from './Reveal';
import { ThemeBackgroundCompact } from './ThemeBackground';
import { Mascot2D } from './Mascot2D';
import { getYearsOfExperienceLabel } from '@/lib/experience';

const yearsLabel = getYearsOfExperienceLabel();

const stats = [
  { value: yearsLabel, label: 'Years shipping' },
  { value: '50+', label: 'Apps live' },
  { value: '50+', label: 'Clients' },
  { value: '8', label: 'Countries' },
];

const timeline = [
  {
    year: '2025 to Present',
    title: 'Mobile Developer & Team Lead',
    subtitle: 'Plottwist.org',
    description:
      'Leading 4+ products at once: concept to App Store & Play Store release, mentoring the team along the way.',
    icon: MobileIcon,
  },
  {
    year: '2024 to Present',
    title: 'BSc in CSE',
    subtitle: 'RUET',
    description: 'Studying Computer Science while continuing to ship client products.',
    icon: GraduationIcon,
  },
  {
    year: '2020 to Present',
    title: 'Freelance Mobile Developer',
    subtitle: 'Self-employed',
    description:
      '50+ production apps for fintech, health, entertainment, and AI. Helping clients grow revenue and ship faster.',
    icon: CodeIcon,
  },
];

type OutcomeItem =
  | { kind: 'text'; text: string }
  | { kind: 'parts'; before: string; highlight: string; after: string };

const clientOutcomes: OutcomeItem[] = [
  { kind: 'text', text: 'Apps live on App Store & Play Store' },
  { kind: 'parts', before: 'Up to ', highlight: '3×', after: ' client revenue growth' },
  { kind: 'text', text: '~70% less payment ops time' },
  { kind: 'text', text: 'AI features users actually finish' },
  { kind: 'text', text: 'Faster idea to production cycles' },
  { kind: 'text', text: 'Clear estimates & steady updates' },
  { kind: 'text', text: 'Releases that scale with growth' },
];

/** Work-ticket line items: what I'm booking, not marketing pillars */
const bookingLines = [
  { lane: 'Freelance', detail: 'Your next store release' },
  { lane: 'Startup', detail: 'MVP through launch' },
  { lane: 'Remote', detail: 'Async, timezone-flexible' },
  { lane: 'Agency', detail: 'Surge capacity on call' },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-16 lg:py-20 overflow-hidden">
      <ThemeBackgroundCompact />
      <div className="hidden lg:block absolute left-8 top-1/4 z-10 opacity-70">
        <Mascot2D size="medium" position="left" />
      </div>
      <div className="relative z-10 section-container">
        <div className="text-center mb-10 lg:mb-12">
          <span className="theme-badge inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            About Me
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Outcomes Clients{' '}
            <span className="theme-gradient-text">Actually Feel</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start mb-12">
          <Reveal
            className="space-y-5"
            hiddenClassName="opacity-0 -translate-x-12"
            visibleClassName="opacity-100 translate-x-0"
          >
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Since July 2020 I&apos;ve helped startups and agencies go from idea to store,
              with products people keep using.
            </p>

            <div className="theme-card rounded-xl p-4 lg:p-5">
              <h3 className="text-base lg:text-lg font-bold text-white mb-4">
                What clients get
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {clientOutcomes.map((item) => (
                  <div
                    key={
                      item.kind === 'text'
                        ? item.text
                        : `${item.before}${item.highlight}${item.after}`
                    }
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: 'var(--theme-primary)' }}
                    />
                    <span className="text-slate-300 text-xs lg:text-sm">
                      {item.kind === 'text' ? (
                        item.text
                      ) : (
                        <>
                          {item.before}
                          <span className="font-semibold text-blue-400">
                            {item.highlight}
                          </span>
                          {item.after}
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {stats.map(({ value, label }) => (
                <div key={label} className="theme-card text-center p-3 lg:p-4 rounded-xl">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold theme-gradient-text">
                    {value}
                  </div>
                  <div className="text-slate-400 text-[10px] sm:text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            style={{ transitionDelay: '200ms' }}
            hiddenClassName="opacity-0 translate-x-12"
            visibleClassName="opacity-100 translate-x-0"
          >
            <h3 className="text-base lg:text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span
                className="w-8 h-0.5 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                }}
              />
              My Journey
            </h3>
            <Reveal
              className="relative journey-timeline"
              visibleClassName="is-active"
              hiddenClassName=""
            >
              <div
                className="journey-line absolute left-4 lg:left-5 top-2 bottom-2 w-0.5 overflow-hidden rounded-full"
                aria-hidden
              >
                <div className="journey-line-track absolute inset-0 rounded-full" />
                <div className="journey-line-glow absolute left-1/2 w-3 -translate-x-1/2 rounded-full" />
                <div className="journey-line-beam absolute inset-x-0 top-0 h-full origin-top rounded-full" />
              </div>

              <div className="space-y-4">
                {timeline.map(({ year, title, subtitle, description, icon: Icon }, index) => (
                  <div
                    key={title}
                    className="journey-item relative pl-10 lg:pl-12"
                    style={{ ['--journey-i' as string]: index }}
                  >
                    <div
                      className="journey-node absolute left-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg ring-4 ring-[var(--theme-background)]"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                      }}
                    >
                      <span className="journey-node-ring" aria-hidden />
                      <Icon className="relative z-[1] w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>

                    <div className="theme-card rounded-xl p-3 lg:p-4">
                      <span className="theme-badge inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2">
                        {year}
                      </span>
                      <h4 className="text-white font-bold text-sm mb-0.5">{title}</h4>
                      <p className="text-slate-400 text-xs mb-1">{subtitle}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Reveal>
        </div>

        <Reveal
          style={{ transitionDelay: '400ms' }}
          hiddenClassName="opacity-0 translate-y-8"
          visibleClassName="opacity-100 translate-y-0"
        >
          <aside
            aria-label="Availability"
            className="relative overflow-hidden rounded-sm"
            style={{
              background: 'var(--theme-surface)',
              border: '1px solid var(--theme-border)',
            }}
          >
            <div
              className="absolute inset-y-0 left-0 w-1.5"
              style={{ background: 'var(--theme-primary)' }}
              aria-hidden
            />

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-0 pl-5 sm:pl-6 lg:pl-8">
              <div className="py-7 sm:py-8 lg:py-10 pr-5 sm:pr-6 lg:pr-10">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="relative flex h-2 w-2"
                      aria-hidden
                    >
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none"
                        style={{ background: 'var(--theme-primary)' }}
                      />
                      <span
                        className="relative inline-flex h-2 w-2 rounded-full"
                        style={{ background: 'var(--theme-primary)' }}
                      />
                    </span>
                    Status
                  </span>
                  <span className="text-slate-600" aria-hidden>
                    /
                  </span>
                  <span>Reply usually within 24h</span>
                </div>

                <p
                  className="font-mono text-[clamp(3.5rem,12vw,6.5rem)] leading-[0.85] font-bold tracking-tight"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  OPEN
                </p>

                <p className="mt-5 max-w-md text-slate-300 text-sm sm:text-base leading-relaxed">
                  Taking freelance builds, startup MVPs, and agency surge work.
                  Send the product, platforms, and deadline.
                </p>

                <a
                  href="#contact"
                  className="group mt-7 inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-semibold text-sm text-white transition-transform duration-300 hover:translate-x-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                    outlineColor: 'var(--theme-primary)',
                  }}
                >
                  Send a brief
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              <div
                className="relative py-6 sm:py-8 lg:py-10 px-5 sm:px-6 lg:px-8 lg:pl-10"
                style={{
                  background: 'color-mix(in srgb, var(--theme-background) 55%, transparent)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-y-4 left-0 hidden w-px lg:block"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to bottom, var(--theme-border) 0 6px, transparent 6px 12px)',
                  }}
                  aria-hidden
                />
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-slate-500 mb-4">
                  Booking lines
                </p>

                <ul className="divide-y" style={{ borderColor: 'var(--theme-border)' }}>
                  {bookingLines.map(({ lane, detail }) => (
                    <li
                      key={lane}
                      className="flex items-baseline justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                      style={{ borderColor: 'var(--theme-border)' }}
                    >
                      <span className="text-white font-semibold text-sm font-mono tracking-wide">
                        {lane}
                      </span>
                      <span className="text-slate-400 text-xs sm:text-sm text-right">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
