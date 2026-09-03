'use client';

import type { RefObject } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  PlayStoreIcon,
  AppStoreIcon,
  WebIcon,
  AndroidIcon,
  AppleIcon,
  FlutterIcon,
  SmartphoneIcon,
  GithubIcon,
} from './Icons';
import { useTheme } from './ThemeProvider';
import { useReveal } from './Reveal';
import { FEATURED_PROJECTS, TAG_THEME_MAP, type Project } from '../data/projects';

const linkIcons = {
  android: { icon: PlayStoreIcon, color: 'hover:text-green-400' },
  ios: { icon: AppStoreIcon, color: 'hover:text-blue-400' },
  web: { icon: WebIcon, color: 'hover:text-cyan-400' },
  github: { icon: GithubIcon, color: 'hover:text-white' },
};

const platformBadge = {
  android: { icon: AndroidIcon, label: 'Android' },
  ios: { icon: AppleIcon, label: 'iOS' },
  'cross-platform': { icon: FlutterIcon, label: 'Cross-Platform' },
  'native-multiplatform': { icon: SmartphoneIcon, label: 'Android & iOS' },
  web: { icon: WebIcon, label: 'Web' },
};

export function FeaturedProjectsGrid() {
  const { ref: sectionRef, visible: isVisible } = useReveal();
  const router = useRouter();
  const { setTheme, isTransitioning } = useTheme();

  return (
    <div
      ref={sectionRef as RefObject<HTMLDivElement>}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-10"
    >
      {FEATURED_PROJECTS.map((project: Project, index: number) => {
        const badge = platformBadge[project.platform];
        return (
          <div
            key={project.id}
            role="link"
            tabIndex={0}
            onClick={() => router.push(`/projects/${project.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                router.push(`/projects/${project.id}`);
              }
            }}
            className={`group theme-card rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              className={`relative h-32 sm:h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
            >
              <div className="absolute inset-0 bg-black/10" />

              <div
                className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-sm"
                style={{
                  background: 'var(--theme-surface)',
                  border: '1px solid var(--theme-border)',
                }}
              >
                <badge.icon className="w-3 h-3" style={{ color: 'var(--theme-primary)' }} />
                <span className="hidden sm:inline text-white tracking-wide uppercase">
                  {badge.label}
                </span>
              </div>

              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-500 ring-2 ring-white/20">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 639px) 64px, 80px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="p-4">
              <p
                className="text-[11px] sm:text-xs font-bold uppercase tracking-wide mb-3"
                style={{ color: 'var(--theme-secondary)' }}
              >
                Case study
              </p>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-[var(--theme-primary)] transition-colors line-clamp-1">
                {project.title}
              </h3>
              <p className="text-slate-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
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
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${
                        isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                      }`}
                      style={{
                        background: 'var(--theme-background)',
                        color: isClickable ? 'var(--theme-primary)' : 'rgb(148, 163, 184)',
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              <div
                className="flex items-center gap-2 pt-3"
                style={{ borderTop: '1px solid var(--theme-border)' }}
              >
                {project.links.map((link) => {
                  const { icon: Icon, color } = linkIcons[link.type];
                  return (
                    <a
                      key={`${link.type}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`p-2 rounded-lg text-slate-400 ${color} transition-all duration-300 flex items-center justify-center`}
                      style={{ background: 'var(--theme-background)' }}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
