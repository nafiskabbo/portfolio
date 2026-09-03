'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationIcon, CodeIcon, MobileIcon, CheckCircleIcon } from './Icons';
import { ThemeBackground } from './ThemeBackground';
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

const availability = [
  { title: 'Freelance', description: 'Ship your next release' },
  { title: 'Startups', description: 'MVP to store launch' },
  { title: 'Remote', description: 'Async-friendly delivery' },
  { title: 'Agencies', description: 'Reliable surge capacity' },
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 lg:py-20 overflow-hidden"
    >
      <ThemeBackground intensity="medium" />

      <div className="hidden lg:block absolute left-8 top-1/4 z-10">
        <Mascot2D size="medium" position="left" />
      </div>

      <div className="hidden xl:block absolute right-8 bottom-32 z-10 opacity-40">
        <Mascot2D size="small" position="right" />
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
          <div
            className={`space-y-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Since July 2020 I&apos;ve helped startups and agencies go from idea to store, with products people keep using.
            </p>

            <div className="theme-card rounded-xl p-4 lg:p-5">
              <h3 className="text-base lg:text-lg font-bold text-white mb-4">What clients get</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {clientOutcomes.map((item) => (
                  <div
                    key={item.kind === 'text' ? item.text : `${item.before}${item.highlight}${item.after}`}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--theme-primary)' }} />
                    <span className="text-slate-300 text-xs lg:text-sm">
                      {item.kind === 'text' ? (
                        item.text
                      ) : (
                        <>
                          {item.before}
                          <span className="font-semibold text-blue-400">{item.highlight}</span>
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
                <div
                  key={label}
                  className="theme-card text-center p-3 lg:p-4 rounded-xl"
                >
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold theme-gradient-text">{value}</div>
                  <div className="text-slate-400 text-[10px] sm:text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-base lg:text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))' }} />
              My Journey
            </h3>
            <div className={`relative journey-timeline${isVisible ? ' is-active' : ''}`}>
              <div className="journey-line absolute left-4 lg:left-5 top-2 bottom-2 w-0.5 overflow-hidden rounded-full" aria-hidden>
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
                        background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                      }}
                    >
                      <span className="journey-node-ring" aria-hidden />
                      <Icon className="relative z-[1] w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>

                    <div className="theme-card rounded-xl p-3 lg:p-4">
                      <span className="theme-badge inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2">{year}</span>
                      <h4 className="text-white font-bold text-sm mb-0.5">{title}</h4>
                      <p className="text-slate-400 text-xs mb-1">{subtitle}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div
            className="rounded-2xl p-px shadow-lg"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
            }}
          >
            <div className="rounded-2xl p-6 lg:p-8" style={{ background: 'var(--theme-surface)' }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                      boxShadow: '0 4px 20px var(--theme-glow)',
                    }}
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    <span className="relative text-white font-bold text-sm tracking-wide">HIRING ME</span>
                  </div>

                  <div className="hidden sm:block">
                    <h3 className="text-xl lg:text-2xl font-bold text-white">Available for Opportunities</h3>
                    <p className="text-slate-400 text-sm">Let&apos;s build something amazing together</p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'var(--theme-background)',
                    border: '1px solid var(--theme-border)',
                    color: 'var(--theme-primary)',
                  }}
                >
                  <span>Get in Touch</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {availability.map(({ title, description }) => (
                  <div
                    key={title}
                    className="group relative p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-default"
                    style={{
                      background: 'var(--theme-background)',
                      border: '1px solid var(--theme-border)',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle at center, var(--theme-glow), transparent 70%)',
                      }}
                    />

                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircleIcon className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
                        <h4 className="text-white font-bold text-sm">{title}</h4>
                      </div>
                      <p className="text-slate-400 text-xs">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px solid var(--theme-border)' }}>
                <p className="text-slate-500 text-xs">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--theme-primary)' }} />
                    Response time: Usually within 24 hours
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
