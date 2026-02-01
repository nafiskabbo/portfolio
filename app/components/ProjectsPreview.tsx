'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayStoreIcon, AppStoreIcon, WebIcon, ArrowRightIcon, AndroidIcon, AppleIcon, FlutterIcon } from './Icons';

interface ProjectLink {
  type: 'android' | 'ios' | 'web';
  url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
  tags: string[];
  links: ProjectLink[];
  platform: 'android' | 'ios' | 'cross-platform';
}

const featuredProjects: Project[] = [
  {
    id: 'santa-chat',
    title: 'Santa Personal Video & Call',
    description: 'An interactive app where users can video call and chat with Santa Claus. Features AI-powered conversations and personalized video messages.',
    image: '/logo_santa_app.png',
    gradient: 'from-red-500 to-rose-600',
    tags: ['Flutter', 'AI', 'Video Call'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.santa.chatbot' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/santa-personal-video-call/id6755621227' },
      { type: 'web', url: 'https://santachat.org/' },
    ],
    platform: 'cross-platform',
  },
  {
    id: 'heal-tone',
    title: 'Heal Tone AI Frequency Sounds',
    description: 'A wellness app featuring AI-generated healing frequencies and soundscapes for meditation and relaxation.',
    image: '/logo_healtone.jpg',
    gradient: 'from-purple-500 to-violet-600',
    tags: ['Flutter', 'AI', 'Health'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.anythingspeaker.healtone' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/heal-tone-ai-frequency-sounds/id6746277347' },
      { type: 'web', url: 'https://healtone.org/' },
    ],
    platform: 'cross-platform',
  },
  {
    id: 'viozor',
    title: 'Viozor 2: AI Video Generator',
    description: 'Cutting-edge AI video generation app that transforms text and images into stunning videos.',
    image: '/logo_viozor.jpg',
    gradient: 'from-cyan-500 to-blue-600',
    tags: ['Swift', 'AI', 'iOS'],
    links: [
      { type: 'ios', url: 'https://apps.apple.com/us/app/viozor-2-ai-video-generator/id6753830046' },
      { type: 'web', url: 'https://viozor.com/' },
    ],
    platform: 'ios',
  },
];

const linkIcons = {
  android: { icon: PlayStoreIcon, color: 'hover:text-green-400 hover:bg-green-500/10' },
  ios: { icon: AppStoreIcon, color: 'hover:text-blue-400 hover:bg-blue-500/10' },
  web: { icon: WebIcon, color: 'hover:text-cyan-400 hover:bg-cyan-500/10' },
};

const platformBadge = {
  android: { icon: AndroidIcon, label: 'Android', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  ios: { icon: AppleIcon, label: 'iOS', color: 'text-slate-300 bg-slate-500/10 border-slate-400/30' },
  'cross-platform': { icon: FlutterIcon, label: 'Cross-Platform', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
};

export function ProjectsPreview() {
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
      id="projects"
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-green-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-purple-500/8 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-bold tracking-wide uppercase mb-6">
            Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">
            Featured{' '}
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            A showcase of mobile applications I&apos;ve built with passion and precision, available on both App Store and Play Store.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {featuredProjects.map((project, index) => {
            const badge = platformBadge[project.platform];
            return (
              <div
                key={project.id}
                className={`group relative bg-slate-800/40 rounded-2xl sm:rounded-3xl border border-slate-700/50 overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Project Header */}
                <div className={`relative h-40 sm:h-48 lg:h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/10" />

                  {/* Platform Badge */}
                  <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold border ${badge.color} backdrop-blur-md shadow-sm`}>
                    <badge.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline tracking-wide uppercase">{badge.label}</span>
                  </div>

                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-500 ring-2 sm:ring-4 ring-white/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5 sm:p-6 lg:p-7">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-green-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-700/50 text-slate-300 text-[10px] sm:text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 sm:gap-3 pt-4 sm:pt-5 border-t border-slate-700/50">
                    {project.links.map((link) => {
                      const { icon: Icon, color } = linkIcons[link.type];
                      return (
                        <a
                          key={link.type}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 sm:p-3.5 rounded-lg sm:rounded-xl text-slate-400 ${color} transition-all duration-300 flex items-center justify-center`}
                        >
                          <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
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
          className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl bg-slate-800/60 border border-slate-700/50 text-white font-bold hover:border-green-500/30 hover:text-green-400 transition-all duration-300 group backdrop-blur-sm text-sm sm:text-base"
          >
            <span>View All Projects</span>
            <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
