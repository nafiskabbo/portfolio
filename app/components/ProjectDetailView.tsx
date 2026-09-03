'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ExternalLinkIcon,
  PlayStoreIcon,
  AppStoreIcon,
  WebIcon,
  GithubIcon,
  SparklesIcon,
  QuoteIcon,
} from './Icons';
import type { Project } from '../data/projects';
import type { ProjectDetailContent } from '../data/project-details';

const linkIcons = {
  android: { icon: PlayStoreIcon, label: 'Play Store' },
  ios: { icon: AppStoreIcon, label: 'App Store' },
  web: { icon: WebIcon, label: 'Website' },
  github: { icon: GithubIcon, label: 'GitHub' },
};

interface ProjectDetailViewProps {
  project: Project;
  detail: ProjectDetailContent | null;
}

function buildFallback(project: Project): ProjectDetailContent {
  return {
    problem: 'The product needed a focused mobile experience customers could trust day to day.',
    solution: project.description,
    techStack: project.tags,
    metrics: [
      { label: 'Reach', value: project.platform.replace('-', ' ') },
      { label: 'Stack', value: project.tags.slice(0, 2).join(' · ') },
    ],
    testimonials: [],
    screenshots: [{ src: project.image, alt: project.title, caption: 'Product' }],
  };
}

export function ProjectDetailView({ project, detail }: ProjectDetailViewProps) {
  const d = detail ?? buildFallback(project);

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Hero */}
      <section className={`relative overflow-hidden pt-24 pb-12 sm:pb-16`}>
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 10%, var(--theme-glow), transparent 55%),
              radial-gradient(ellipse 60% 50% at 90% 80%, color-mix(in srgb, var(--theme-secondary) 18%, transparent), transparent 50%),
              var(--theme-background)
            `,
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div className="relative z-10 section-container">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden ring-2 ring-white/15 shadow-2xl">
                <Image src={project.image} alt={project.title} fill className="object-cover" sizes="112px" priority />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">{project.title}</h1>
                <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">{project.description}</p>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 self-stretch">
                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      background: 'color-mix(in srgb, var(--theme-primary) 18%, transparent)',
                      color: 'var(--theme-primary)',
                      border: '1px solid color-mix(in srgb, var(--theme-primary) 35%, transparent)',
                    }}
                  >
                    Case study
                  </span>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 px-2 py-0.5 rounded-md"
                      style={{ border: '1px solid var(--theme-border)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 lg:justify-end">
                  {project.links.map((link) => {
                    const cfg = linkIcons[link.type];
                    const Icon = cfg.icon;
                    return (
                      <a
                        key={`${link.type}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                          boxShadow: '0 8px 24px var(--theme-glow)',
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {cfg.label}
                        <ExternalLinkIcon className="w-3 h-3 opacity-80" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento */}
      <section className="relative pb-16 sm:pb-20">
        <div className="section-container space-y-6">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 sm:p-7 relative overflow-hidden group"
              style={{
                background: 'var(--theme-surface)',
                border: '1px solid var(--theme-border)',
              }}
            >
              <div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-30 blur-2xl group-hover:opacity-50 transition-opacity"
                style={{ background: 'var(--theme-primary)' }}
              />
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Problem</h2>
              <p className="text-white text-sm sm:text-base leading-relaxed relative z-10">{d.problem}</p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="rounded-2xl p-6 sm:p-7 relative overflow-hidden group"
              style={{
                background: 'var(--theme-surface)',
                border: '1px solid var(--theme-border)',
              }}
            >
              <div
                className="absolute -left-8 -bottom-10 w-36 h-36 rounded-full opacity-25 blur-2xl group-hover:opacity-45 transition-opacity"
                style={{ background: 'var(--theme-secondary)' }}
              />
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <SparklesIcon className="w-4 h-4 text-[var(--theme-primary)]" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Solution</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed relative z-10">{d.solution}</p>
              {d.highlights && d.highlights.length > 0 ? (
                <ul className="mt-5 space-y-2 text-sm text-slate-400 relative z-10 border-t border-[var(--theme-border)] pt-5">
                  {d.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-[var(--theme-primary)] mt-0.5">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.article>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {d.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl p-4 text-center"
                style={{
                  background: 'color-mix(in srgb, var(--theme-background) 65%, transparent)',
                  border: '1px solid var(--theme-border)',
                }}
              >
                <div className="text-lg sm:text-xl font-bold theme-gradient-text">{m.value}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1 uppercase tracking-wide">{m.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Screenshots */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Screens & product</h2>
            <div className="relative -mx-4 sm:-mx-6 px-4 sm:px-6">
              <div
                className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scroll-pl-4 scroll-pr-4 [scrollbar-width:thin]"
                style={{
                  scrollbarColor: 'color-mix(in srgb, var(--theme-primary) 45%, transparent) transparent',
                }}
              >
                {d.screenshots.map((shot, i) => {
                  const isLandscape = shot.aspect === 'landscape';
                  return (
                    <motion.figure
                      key={`${shot.src}-${i}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(i * 0.04, 0.24) }}
                      className={`group relative w-auto shrink-0 snap-start overflow-hidden rounded-xl bg-black/30 shadow-xl ring-1 ring-white/10 ${
                        isLandscape ? 'h-[min(52vh,420px)]' : 'h-[min(52vh,420px)]'
                      }`}
                      style={{
                        aspectRatio: isLandscape ? '4 / 3' : '9 / 16',
                      }}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        className={
                          isLandscape
                            ? 'object-contain transition-transform duration-500 group-hover:scale-[1.01]'
                            : 'object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]'
                        }
                        sizes={
                          isLandscape
                            ? '(max-width: 640px) 80vw, 720px'
                            : '(max-width: 640px) 40vw, 236px'
                        }
                        priority={i === 0}
                      />
                    </motion.figure>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          {d.testimonials.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Client voices</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {d.testimonials.map((t, i) => (
                  <motion.blockquote
                    key={`${project.id}-voice-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative rounded-2xl p-6 sm:p-7"
                    style={{
                      background: 'linear-gradient(145deg, color-mix(in srgb, var(--theme-surface) 92%, transparent), var(--theme-background))',
                      border: '1px solid var(--theme-border)',
                    }}
                  >
                    <QuoteIcon className="w-8 h-8 text-[var(--theme-primary)]/40 mb-3" />
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                    {t.feedbackImage ? (
                      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl border border-[var(--theme-border)] bg-black/20">
                        <Image
                          src={t.feedbackImage}
                          alt={`${project.title} - client feedback`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ) : null}
                    <footer className="flex flex-col gap-2">
                      <div>
                        <cite className="text-white font-semibold text-sm not-italic">{t.author}</cite>
                        <span className="block text-xs text-slate-500">{t.role}</span>
                      </div>
                      {t.reviewUrl ? (
                        <a
                          href={t.reviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--theme-primary)] hover:underline w-fit"
                        >
                          {t.reviewLinkLabel ?? 'View verified review'}
                          <ExternalLinkIcon className="w-3 h-3 opacity-80" />
                        </a>
                      ) : null}
                    </footer>
                  </motion.blockquote>
                ))}
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 text-center relative overflow-hidden"
            style={{
              background: 'var(--theme-surface)',
              border: '1px solid var(--theme-border)',
            }}
          >
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 120%, var(--theme-glow), transparent 55%)' }}
            />
            <p className="text-white font-semibold text-lg mb-2 relative z-10">Like what you see?</p>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto relative z-10">
              Tell me about your app or automation: scope, stack, and timeline.
            </p>
            <Link
              href="/#contact"
              className="btn-shine relative z-10 inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold shadow-xl transition-all hover:scale-105 text-sm"
              style={{
                background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                boxShadow: '0 8px 24px var(--theme-glow)',
              }}
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
