'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PlayStoreIcon, AppStoreIcon, WebIcon, ExternalLinkIcon, ArrowLeftIcon, AndroidIcon, AppleIcon, FlutterIcon, CodeIcon, RocketIcon } from '../components/Icons';

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

const projects: Project[] = [
  {
    id: 'santa-chat',
    title: 'Santa Personal Video & Call',
    description: 'An interactive app where users can video call and chat with Santa Claus. Features AI-powered conversations and personalized video messages for a magical holiday experience.',
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
    description: 'A wellness app featuring AI-generated healing frequencies and soundscapes. Helps users with meditation, relaxation, and sound therapy for better mental health.',
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
    description: 'Cutting-edge AI video generation app that transforms text and images into stunning videos. Features advanced AI models for creative content creation.',
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
    description: 'Professional AI-powered image editing app with advanced filters, background removal, and AI enhancement features for stunning photos.',
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
    description: 'A comprehensive Islamic app featuring Quran reading, prayer times, Qibla direction, and more. Designed to help Muslims with their daily religious practices.',
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
    description: 'A corporate payment and financial management app designed for seamless business transactions. Features secure payments and financial tracking.',
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
    description: 'A feature-rich mobile application designed to provide an exceptional user experience with modern design and intuitive functionality.',
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
  { id: 'all', label: 'All Projects', icon: RocketIcon },
  { id: 'ai', label: 'AI Apps', icon: CodeIcon },
  { id: 'mobile', label: 'Utility', icon: AndroidIcon },
  { id: 'fintech', label: 'Fintech', icon: FlutterIcon },
];

const platformBadge = {
  android: { icon: AndroidIcon, label: 'Android', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  ios: { icon: AppleIcon, label: 'iOS', color: 'text-slate-300 bg-slate-500/10 border-slate-400/30' },
  'cross-platform': { icon: FlutterIcon, label: 'Cross-Platform', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
};

const linkConfig = {
  android: { icon: PlayStoreIcon, label: 'Play Store' },
  ios: { icon: AppStoreIcon, label: 'App Store' },
  web: { icon: WebIcon, label: 'Website' },
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Navbar />
      <main className="bg-slate-950 min-h-screen pt-24 sm:pt-32 pb-20 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-600/10 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '5s' }} />
          <div className="absolute top-[30%] right-[10%] w-[30%] h-[40%] bg-emerald-600/5 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '10s' }} />
        </div>

        <div className="relative z-10 section-container">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-green-400 hover:border-green-500/30 transition-all mb-8 group"
              >
                <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Crafting Digital{' '}
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Masterpieces
                </span>
              </h1>
              <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                Explore a collection of high-performance mobile and web applications reflecting my passion for clean code and exceptional UI/UX.
              </p>
            </motion.div>
          </div>

          {/* Filtering System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${activeCategory === cat.id
                    ? 'bg-green-500/20 border-green-500/50 text-green-400 shadow-lg shadow-green-500/10'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-green-500/30 hover:text-green-400'
                  }`}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const badge = platformBadge[project.platform];
                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative bg-slate-900/60 rounded-[2rem] border border-slate-800 hover:border-green-500/30 transition-all duration-500 overflow-hidden backdrop-blur-xl flex flex-col"
                  >
                    {/* Visual Header */}
                    <div className={`relative h-56 sm:h-64 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

                      {/* Platform Badge Overlay */}
                      <div className={`absolute top-5 right-5 z-20 flex items-center gap-2 px-4 py-2 rounded-full border ${badge.color} backdrop-blur-md shadow-xl`}>
                        <badge.icon className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">{badge.label}</span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-700 ring-4 ring-white/10 group-hover:ring-white/20">
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
                    <div className="p-8 sm:p-10 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tag Pillows */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/50 text-slate-300 text-[10px] sm:text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Call to Actions */}
                      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-800">
                        {project.links.map((link) => {
                          const config = linkConfig[link.type];
                          return (
                            <a
                              key={link.type}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-green-500/30 text-white transition-all duration-300"
                              title={config.label}
                            >
                              <config.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                              <span className="hidden xl:inline text-xs font-bold text-slate-400 group-hover/btn:text-white transition-colors">{config.label}</span>
                              <ExternalLinkIcon className="w-3 h-3 text-slate-600 group-hover/btn:text-green-400 transition-colors" />
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
              className="py-20 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-6 text-slate-500">
                <CodeIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-slate-500">Try selecting a different category.</p>
            </motion.div>
          )}

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 text-center"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[3rem] p-12 sm:p-20 border border-slate-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
                Ready to Start Your Journey?
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
                Let&apos;s build something exceptional together. I am available for new projects and collaborations.
              </p>
              <Link
                href="/#contact"
                className="btn-shine relative z-10 inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-2xl shadow-green-500/20 hover:shadow-green-500/40 transition-all hover:scale-105"
              >
                <span>Hire Me Now</span>
                <ArrowLeftIcon className="w-5 h-5 rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
