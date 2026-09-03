'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayStoreIcon,
  AppStoreIcon,
  WebIcon,
  ExternalLinkIcon,
  ArrowLeftIcon,
  AndroidIcon,
  AppleIcon,
  FlutterIcon,
  CodeIcon,
  RocketIcon,
  WalletIcon,
  WrenchIcon,
  SmartphoneIcon,
  GithubIcon,
} from './Icons';
import { useTheme } from './ThemeProvider';
import { ALL_PROJECTS, TAG_THEME_MAP, type Project } from '../data/projects';

const categories = [
  { id: 'all', label: 'All', icon: RocketIcon },
  { id: 'ai', label: 'AI Apps', icon: CodeIcon },
  { id: 'utility', label: 'Utility', icon: WrenchIcon },
  { id: 'fintech', label: 'Fintech', icon: WalletIcon },
  { id: 'open-source', label: 'Open Source', icon: GithubIcon },
] as const;

const platformBadge = {
  android: { icon: AndroidIcon, label: 'Android' },
  ios: { icon: AppleIcon, label: 'iOS' },
  'cross-platform': { icon: FlutterIcon, label: 'Cross-Platform' },
  'native-multiplatform': { icon: SmartphoneIcon, label: 'Android & iOS' },
  web: { icon: WebIcon, label: 'Web' },
};

const linkConfig = {
  android: { icon: PlayStoreIcon, label: 'Play Store' },
  ios: { icon: AppStoreIcon, label: 'App Store' },
  web: { icon: WebIcon, label: 'Website' },
  github: { icon: GithubIcon, label: 'GitHub' },
};

function SearchIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FilterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </svg>
  );
}

export function ProjectsExplorer() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme, isTransitioning } = useTheme();

  useEffect(() => {
    if (!filtersOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFiltersOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFiltersOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [filtersOpen]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PROJECTS.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = [p.title, p.description, p.platform, p.category, ...p.tags]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCategory, query]);

  const activeFilterLabel =
    categories.find((c) => c.id === activeCategory)?.label ?? 'All';

  return (
    <div className="relative z-10 section-container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 lg:mb-12"
      >
        <div className="flex items-center justify-center sm:justify-end mb-8">
          <div className="flex items-center gap-2 w-full sm:w-auto sm:max-w-md">
            <label className="relative flex-1 min-w-0 sm:max-w-xs">
              <span className="sr-only">Search projects</span>
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="w-full rounded-xl py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--theme-primary)_45%,transparent)]"
                style={{
                  background: 'var(--theme-surface)',
                  border: '1px solid var(--theme-border)',
                }}
              />
            </label>

            <div className="relative shrink-0" ref={filterRef}>
              <button
                type="button"
                onClick={() => setFiltersOpen((o) => !o)}
                aria-expanded={filtersOpen}
                aria-haspopup="listbox"
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition"
                style={
                  activeCategory !== 'all'
                    ? {
                        background:
                          'color-mix(in srgb, var(--theme-primary) 18%, transparent)',
                        border:
                          '1px solid color-mix(in srgb, var(--theme-primary) 45%, transparent)',
                        color: 'var(--theme-primary)',
                      }
                    : {
                        background: 'var(--theme-surface)',
                        border: '1px solid var(--theme-border)',
                        color: 'rgb(203, 213, 225)',
                      }
                }
              >
                <FilterIcon className="h-3.5 w-3.5" />
                <span className="max-w-[7rem] truncate">{activeFilterLabel}</span>
              </button>

              <AnimatePresence>
                {filtersOpen && (
                  <motion.ul
                    role="listbox"
                    aria-label="Filter by category"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 z-30 mt-2 min-w-[11rem] overflow-hidden rounded-xl py-1 shadow-xl"
                    style={{
                      background: 'var(--theme-surface)',
                      border: '1px solid var(--theme-border)',
                    }}
                  >
                    {categories.map((cat) => {
                      const selected = activeCategory === cat.id;
                      return (
                        <li key={cat.id} role="option" aria-selected={selected}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveCategory(cat.id);
                              setFiltersOpen(false);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium transition hover:bg-white/5"
                            style={{
                              color: selected
                                ? 'var(--theme-primary)'
                                : 'rgb(203, 213, 225)',
                              background: selected
                                ? 'color-mix(in srgb, var(--theme-primary) 12%, transparent)'
                                : undefined,
                            }}
                          >
                            <cat.icon className="h-3.5 w-3.5 shrink-0" />
                            {cat.label}
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Crafting Digital <span className="theme-gradient-text">Masterpieces</span>
          </h1>
        </div>
      </motion.div>

      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {filteredProjects.map((project: Project, index: number) => {
              const badge = platformBadge[project.platform];
              return (
                <motion.div
                  key={project.id}
                  layout
                  role="link"
                  tabIndex={0}
                  onClick={() => router.push(`/projects/${project.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      router.push(`/projects/${project.id}`);
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                    layout: { duration: 0.3 },
                  }}
                  className="group theme-card rounded-xl overflow-hidden flex flex-col cursor-pointer"
                >
                  <div
                    className={`relative h-36 sm:h-40 bg-gradient-to-br ${project.gradient} overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

                    <div
                      className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md shadow-lg"
                      style={{
                        background: 'var(--theme-surface)',
                        border: '1px solid var(--theme-border)',
                      }}
                    >
                      <badge.icon
                        className="w-3 h-3"
                        style={{ color: 'var(--theme-primary)' }}
                      />
                      <span className="text-[9px] font-bold tracking-widest uppercase text-white">
                        {badge.label}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-700 ring-2 ring-white/10 group-hover:ring-white/20">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 639px) 72px, 88px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex-1">
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--theme-secondary)' }}
                      >
                        Case study
                      </p>
                      <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-[var(--theme-primary)] transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag) => {
                          const isClickable = TAG_THEME_MAP[tag];
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const targetTheme = TAG_THEME_MAP[tag];
                                if (targetTheme && !isTransitioning) {
                                  setTheme(targetTheme, true);
                                }
                              }}
                              disabled={!isClickable || isTransitioning}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                                isClickable
                                  ? 'cursor-pointer hover:scale-105'
                                  : 'cursor-default'
                              }`}
                              style={{
                                background: 'var(--theme-background)',
                                border: '1px solid var(--theme-border)',
                                color: isClickable
                                  ? 'var(--theme-primary)'
                                  : 'rgb(148, 163, 184)',
                              }}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="flex flex-wrap items-center gap-2 pt-3"
                      style={{ borderTop: '1px solid var(--theme-border)' }}
                    >
                      {project.links.map((link) => {
                        const config = linkConfig[link.type];
                        return (
                          <a
                            key={`${link.type}-${link.url}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn flex items-center gap-1.5 p-2 rounded-lg text-white transition-all duration-300"
                            style={{
                              background: 'var(--theme-background)',
                              border: '1px solid var(--theme-border)',
                            }}
                            title={config.label}
                          >
                            <config.icon className="w-5 h-5" />
                            <ExternalLinkIcon className="w-2.5 h-2.5 text-slate-600 group-hover/btn:text-[var(--theme-primary)] transition-colors" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500"
            style={{ background: 'var(--theme-surface)' }}
          >
            <CodeIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No projects found</h3>
          <p className="text-slate-500 text-sm">
            Try another search or clear the category filter.
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div
          className="rounded-2xl p-8 sm:p-12 relative overflow-hidden group"
          style={{
            background: 'var(--theme-surface)',
            border: '1px solid var(--theme-border)',
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: 'var(--theme-glow)' }}
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 relative z-10">
            Need an app that ships and sticks?
          </h2>
          <p className="text-slate-400 text-sm mb-6 max-w-lg mx-auto relative z-10">
            Tell me the outcome you want. I&apos;ll map it to a clear plan and timeline.
          </p>
          <Link
            href="/#contact"
            className="btn-shine relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-xl transition-all hover:scale-105 text-sm"
            style={{
              background:
                'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
              boxShadow: '0 8px 24px var(--theme-glow)',
            }}
          >
            <span>Get in touch</span>
            <ArrowLeftIcon className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
