'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayStoreIcon, AppStoreIcon, WebIcon, ArrowRightIcon, AndroidIcon, AppleIcon, FlutterIcon, SmartphoneIcon } from './Icons';
import { useTheme } from './ThemeProvider';
import { ThemeBackgroundCompact } from './ThemeBackground';
import { Mascot2D } from './Mascot2D';
import { FEATURED_PROJECTS, TAG_THEME_MAP, type Project } from '../data/projects';

const linkIcons = {
  android: { icon: PlayStoreIcon, color: 'hover:text-green-400' },
  ios: { icon: AppStoreIcon, color: 'hover:text-blue-400' },
  web: { icon: WebIcon, color: 'hover:text-cyan-400' },
};

const platformBadge = {
  android: { icon: AndroidIcon, label: 'Android' },
  ios: { icon: AppleIcon, label: 'iOS' },
  'cross-platform': { icon: FlutterIcon, label: 'Cross-Platform' },
  'native-multiplatform': { icon: SmartphoneIcon, label: 'Android & iOS' },
};

export function ProjectsPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { setTheme, isTransitioning } = useTheme();

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

  const handleTagClick = (tag: string) => {
    const targetTheme = TAG_THEME_MAP[tag];
    if (targetTheme && !isTransitioning) {
      setTheme(targetTheme, true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-16 lg:py-20 overflow-hidden"
    >
      {/* Theme Background */}
      <ThemeBackgroundCompact />
      
      {/* 2D Mascot decorations */}
      <div className="hidden lg:block absolute right-8 top-1/4 z-10 opacity-40">
        <Mascot2D size="small" position="right" />
      </div>
      <div className="hidden xl:block absolute left-6 bottom-24 z-10 opacity-30">
        <Mascot2D size="small" position="left" />
      </div>

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <span className="theme-badge inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Featured{' '}
            <span className="theme-gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Mobile applications built with passion, available on App Store and Play Store.
          </p>
        </div>

        {/* Projects Grid - 4 cols on desktop, 2 cols on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-10">
          {FEATURED_PROJECTS.map((project: Project, index: number) => {
            const badge = platformBadge[project.platform];
            return (
              <div
                key={project.id}
                className={`group theme-card rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Project Header */}
                <div className={`relative h-32 sm:h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/10" />

                  {/* Platform Badge */}
                  <div 
                    className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-sm"
                    style={{ background: 'var(--theme-surface)', border: '1px solid var(--theme-border)' }}
                  >
                    <badge.icon className="w-3 h-3" style={{ color: 'var(--theme-primary)' }} />
                    <span className="hidden sm:inline text-white tracking-wide uppercase">{badge.label}</span>
                  </div>

                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-500 ring-2 ring-white/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-[var(--theme-primary)] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags - Clickable */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => {
                      const isClickable = TAG_THEME_MAP[tag];
                      return (
                        <button
                          key={tag}
                          onClick={() => isClickable && handleTagClick(tag)}
                          disabled={!isClickable || isTransitioning}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${
                            isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                          }`}
                          style={{ 
                            background: 'var(--theme-background)', 
                            color: isClickable ? 'var(--theme-primary)' : 'rgb(148, 163, 184)'
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid var(--theme-border)' }}>
                    {project.links.map((link) => {
                      const { icon: Icon, color } = linkIcons[link.type];
                      return (
                        <a
                          key={link.type}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
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

        {/* View All CTA */}
        <div
          className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 group text-sm"
            style={{ 
              background: 'var(--theme-surface)', 
              border: '1px solid var(--theme-border)'
            }}
          >
            <span>View All Projects</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--theme-primary)' }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
