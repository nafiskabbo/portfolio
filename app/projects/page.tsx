'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PlayStoreIcon, AppStoreIcon, WebIcon, ExternalLinkIcon, ArrowLeftIcon, AndroidIcon, AppleIcon, FlutterIcon, CodeIcon, RocketIcon } from '../components/Icons';
import { useTheme, Theme } from '../components/ThemeProvider';
import { ThemeBackground } from '../components/ThemeBackground';
import { Mascot2D } from '../components/Mascot2D';

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
  category: 'mobile' | 'web' | 'ai' | 'fintech';
  featured?: boolean;
}

// Map tags to themes
const tagThemeMap: Record<string, Theme> = {
  'Flutter': 'flutter',
  'Swift': 'ios',
  'iOS': 'ios',
  'Android': 'android',
  'Kotlin': 'android',
};

const projects: Project[] = [
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
    category: 'ai',
    featured: true,
  },
  {
    id: 'heal-tone',
    title: 'Heal Tone AI Frequency Sounds',
    description: 'A wellness app featuring AI-generated healing frequencies and soundscapes for meditation and relaxation.',
    image: '/logo_healtone.jpg',
    gradient: 'from-purple-500 to-violet-600',
    tags: ['Flutter', 'AI', 'Audio'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.anythingspeaker.healtone' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/heal-tone-ai-frequency-sounds/id6746277347' },
      { type: 'web', url: 'https://healtone.org/' },
    ],
    platform: 'cross-platform',
    category: 'ai',
    featured: true,
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
    category: 'ai',
    featured: true,
  },
  {
    id: 'edipic',
    title: 'Edipic AI Image Editor',
    description: 'Professional AI-powered image editing app with advanced filters and background removal.',
    image: '/logo_edipic.jpg',
    gradient: 'from-amber-500 to-orange-600',
    tags: ['Swift', 'AI', 'Image Processing'],
    links: [
      { type: 'ios', url: 'https://apps.apple.com/us/app/edipic-ai-image-editor/id6753642840' },
      { type: 'web', url: 'https://edipic.com/' },
    ],
    platform: 'ios',
    category: 'ai',
    featured: true,
  },
  {
    id: 'deenhub',
    title: 'DeenHub: Quran, Prayer & Qibla',
    description: 'A comprehensive Islamic app featuring Quran reading, prayer times, and Qibla direction.',
    image: '/logo_deenhub.jpeg',
    gradient: 'from-emerald-500 to-teal-600',
    tags: ['Flutter', 'Islamic', 'Quran'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.deenhub.app&hl=en' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/deenhub-quran-prayer-qibla/id6749580911' },
    ],
    platform: 'cross-platform',
    category: 'mobile',
  },
  {
    id: 'emaisha-pay',
    title: 'eMaisha Pay',
    description: 'A corporate payment and financial management app for seamless business transactions.',
    image: '/logo_emaisha_pay.png',
    gradient: 'from-blue-500 to-indigo-600',
    tags: ['Android', 'Fintech', 'Payments'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.cabraltech.emaishacorporateapp&hl=en' },
    ],
    platform: 'android',
    category: 'fintech',
  },
  {
    id: 'elsie',
    title: 'Elsie',
    description: 'A feature-rich mobile application with modern design and intuitive functionality.',
    image: '/logo_elsie.jpg',
    gradient: 'from-pink-500 to-rose-600',
    tags: ['Android', 'Mobile App', 'Kotlin'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.elsie.app' },
    ],
    platform: 'android',
    category: 'mobile',
  },
];

const categories = [
  { id: 'all', label: 'All', icon: RocketIcon },
  { id: 'ai', label: 'AI Apps', icon: CodeIcon },
  { id: 'mobile', label: 'Utility', icon: AndroidIcon },
  { id: 'fintech', label: 'Fintech', icon: FlutterIcon },
];

const platformBadge = {
  android: { icon: AndroidIcon, label: 'Android' },
  ios: { icon: AppleIcon, label: 'iOS' },
  'cross-platform': { icon: FlutterIcon, label: 'Cross-Platform' },
};

const linkConfig = {
  android: { icon: PlayStoreIcon, label: 'Play Store' },
  ios: { icon: AppStoreIcon, label: 'App Store' },
  web: { icon: WebIcon, label: 'Website' },
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { setTheme, isTransitioning } = useTheme();

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleTagClick = (tag: string) => {
    const targetTheme = tagThemeMap[tag];
    if (targetTheme && !isTransitioning) {
      setTheme(targetTheme, true);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 overflow-hidden relative">
        {/* Theme Background */}
        <ThemeBackground intensity="medium" className="fixed" />
        
        {/* 2D Mascot decorations */}
        <div className="hidden lg:block fixed right-8 top-32 z-10 opacity-30">
          <Mascot2D size="medium" position="right" />
        </div>
        <div className="hidden xl:block fixed left-6 bottom-32 z-10 opacity-25">
          <Mascot2D size="small" position="left" />
        </div>

        <div className="relative z-10 section-container">
          {/* Header Section - Compact */}
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-400 hover:text-[var(--theme-primary)] transition-all mb-6 group text-sm"
                style={{ background: 'var(--theme-surface)', border: '1px solid var(--theme-border)' }}
              >
                <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Home</span>
              </Link>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Crafting Digital{' '}
                <span className="theme-gradient-text">Masterpieces</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                High-performance mobile and web applications reflecting my passion for clean code and exceptional UI/UX.
              </p>
            </motion.div>
          </div>

          {/* Filtering System - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={activeCategory === cat.id ? {
                  background: 'color-mix(in srgb, var(--theme-primary) 20%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--theme-primary) 50%, transparent)',
                  color: 'var(--theme-primary)',
                  boxShadow: '0 4px 12px var(--theme-glow)'
                } : {
                  background: 'var(--theme-surface)',
                  border: '1px solid var(--theme-border)'
                }}
              >
                <cat.icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid - Compact */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const badge = platformBadge[project.platform];
                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group theme-card rounded-xl overflow-hidden flex flex-col"
                  >
                    {/* Visual Header */}
                    <div className={`relative h-36 sm:h-40 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

                      {/* Platform Badge Overlay */}
                      <div 
                        className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md shadow-lg"
                        style={{ background: 'var(--theme-surface)', border: '1px solid var(--theme-border)' }}
                      >
                        <badge.icon className="w-3 h-3" style={{ color: 'var(--theme-primary)' }} />
                        <span className="text-[9px] font-bold tracking-widest uppercase text-white">{badge.label}</span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-700 ring-2 ring-white/10 group-hover:ring-white/20">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-[var(--theme-primary)] transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tag Pillows - Clickable */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.map((tag) => {
                            const isClickable = tagThemeMap[tag];
                            return (
                              <button
                                key={tag}
                                onClick={() => isClickable && handleTagClick(tag)}
                                disabled={!isClickable || isTransitioning}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                                  isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                                }`}
                                style={{ 
                                  background: 'var(--theme-background)', 
                                  border: '1px solid var(--theme-border)',
                                  color: isClickable ? 'var(--theme-primary)' : 'rgb(148, 163, 184)'
                                }}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Call to Actions */}
                      <div className="flex flex-wrap items-center gap-2 pt-3" style={{ borderTop: '1px solid var(--theme-border)' }}>
                        {project.links.map((link) => {
                          const config = linkConfig[link.type];
                          return (
                            <a
                              key={link.type}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex items-center gap-1.5 p-2 rounded-lg text-white transition-all duration-300"
                              style={{ background: 'var(--theme-background)', border: '1px solid var(--theme-border)' }}
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
            </AnimatePresence>
          </div>

          {/* Empty State */}
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
              <p className="text-slate-500 text-sm">Try selecting a different category.</p>
            </motion.div>
          )}

          {/* Footer CTA - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div 
              className="rounded-2xl p-8 sm:p-12 relative overflow-hidden group"
              style={{ background: 'var(--theme-surface)', border: '1px solid var(--theme-border)' }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'var(--theme-glow)' }}
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 relative z-10">
                Ready to Start Your Journey?
              </h2>
              <p className="text-slate-400 text-sm mb-6 max-w-lg mx-auto relative z-10">
                Let&apos;s build something exceptional together. Available for new projects.
              </p>
              <Link
                href="/#contact"
                className="btn-shine relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-xl transition-all hover:scale-105 text-sm"
                style={{ 
                  background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                  boxShadow: '0 8px 24px var(--theme-glow)'
                }}
              >
                <span>Hire Me Now</span>
                <ArrowLeftIcon className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
