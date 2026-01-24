import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PlayStoreIcon, AppStoreIcon, WebIcon, ExternalLinkIcon, ArrowLeftIcon } from '../components/Icons';

export const metadata: Metadata = {
  title: 'Projects | Nafis Islam Kabbo',
  description: 'Explore my portfolio of mobile applications built with Flutter, Kotlin, and Swift. Available on both App Store and Play Store.',
};

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
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 'santa-chat',
    title: 'Santa Personal Video & Call',
    description: 'An interactive app where users can video call and chat with Santa Claus. Features AI-powered conversations and personalized video messages for a magical holiday experience.',
    image: '/logo_santa_app.png',
    gradient: 'from-red-500 to-rose-600',
    tags: ['Flutter', 'AI', 'Video Call', 'Cross-Platform'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.santa.chatbot' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/santa-personal-video-call/id6755621227' },
      { type: 'web', url: 'https://santachat.org/' },
    ],
    featured: true,
  },
  {
    id: 'heal-tone',
    title: 'Heal Tone AI Frequency Sounds',
    description: 'A wellness app featuring AI-generated healing frequencies and soundscapes. Helps users with meditation, relaxation, and sound therapy for better mental health.',
    image: '/logo_healtone.jpg',
    gradient: 'from-purple-500 to-violet-600',
    tags: ['Flutter', 'AI', 'Audio', 'Health'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.anythingspeaker.healtone' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/heal-tone-ai-frequency-sounds/id6746277347' },
      { type: 'web', url: 'https://healtone.org/' },
    ],
    featured: true,
  },
  {
    id: 'viozor',
    title: 'Viozor 2: AI Video Generator',
    description: 'Cutting-edge AI video generation app that transforms text and images into stunning videos. Features advanced AI models for creative content creation.',
    image: '/logo_viozor.jpg',
    gradient: 'from-cyan-500 to-blue-600',
    tags: ['Swift', 'AI', 'Video Generation', 'iOS'],
    links: [
      { type: 'ios', url: 'https://apps.apple.com/us/app/viozor-2-ai-video-generator/id6753830046' },
      { type: 'web', url: 'https://viozor.com/' },
    ],
    featured: true,
  },
  {
    id: 'edipic',
    title: 'Edipic AI Image Editor',
    description: 'Professional AI-powered image editing app with advanced filters, background removal, and AI enhancement features for stunning photos.',
    image: '/logo_edipic.jpg',
    gradient: 'from-amber-500 to-orange-600',
    tags: ['Swift', 'AI', 'Image Processing', 'iOS'],
    links: [
      { type: 'ios', url: 'https://apps.apple.com/us/app/edipic-ai-image-editor/id6753642840' },
      { type: 'web', url: 'https://edipic.com/' },
    ],
    featured: true,
  },
  {
    id: 'deenhub',
    title: 'DeenHub: Quran, Prayer & Qibla',
    description: 'A comprehensive Islamic app featuring Quran reading, prayer times, Qibla direction, and more. Designed to help Muslims with their daily religious practices.',
    image: '/logo_deenhub.jpeg',
    gradient: 'from-emerald-500 to-teal-600',
    tags: ['Flutter', 'Islamic', 'Quran', 'Cross-Platform'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.deenhub.app&hl=en' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/deenhub-quran-prayer-qibla/id6749580911' },
    ],
  },
  {
    id: 'emaisha-pay',
    title: 'eMaisha Pay',
    description: 'A corporate payment and financial management app designed for seamless business transactions. Features secure payments and financial tracking.',
    image: '/logo_emaisha_pay.png',
    gradient: 'from-blue-500 to-indigo-600',
    tags: ['Android', 'Fintech', 'Payments', 'Corporate'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.cabraltech.emaishacorporateapp&hl=en' },
    ],
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
  },
];

const linkConfig = {
  android: { icon: PlayStoreIcon, label: 'Play Store', color: 'text-green-400 hover:text-green-300', bg: 'bg-green-500/10 hover:bg-green-500/20' },
  ios: { icon: AppStoreIcon, label: 'App Store', color: 'text-blue-400 hover:text-blue-300', bg: 'bg-blue-500/10 hover:bg-blue-500/20' },
  web: { icon: WebIcon, label: 'Website', color: 'text-cyan-400 hover:text-cyan-300', bg: 'bg-cyan-500/10 hover:bg-cyan-500/20' },
};

export default function ProjectsPage() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <>
      <Navbar />
      <main className="bg-slate-950 min-h-screen pt-20 sm:pt-24">
        {/* Header Section */}
        <section className="relative py-12 sm:py-16 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-cyan-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-500/8 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 sm:mb-8 text-sm sm:text-base"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="text-center">
              <span className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                Portfolio
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                My{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Projects
                </span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                A collection of mobile applications I&apos;ve built with passion and precision. 
                Each project showcases my commitment to quality and user experience.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
              <span className="w-6 h-1 sm:w-8 sm:h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              Featured Projects
            </h2>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-slate-800/40 rounded-2xl sm:rounded-3xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-500 backdrop-blur-sm"
                >
                  {/* Project Image */}
                  <div className={`relative h-44 sm:h-52 lg:h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-500 ring-2 sm:ring-4 ring-white/20">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-slate-700/50 text-slate-300 text-[10px] sm:text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-slate-700/50">
                      {project.links.map((link) => {
                        const config = linkConfig[link.type];
                        return (
                          <a
                            key={link.type}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg ${config.bg} ${config.color} transition-all text-xs sm:text-sm font-medium`}
                          >
                            <config.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline">{config.label}</span>
                            <ExternalLinkIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Projects */}
        <section className="py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
              <span className="w-6 h-1 sm:w-8 sm:h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
              More Projects
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-slate-800/40 rounded-xl sm:rounded-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
                >
                  {/* Project Header */}
                  <div className={`relative h-32 sm:h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-lg ring-2 ring-white/20">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 text-[10px] sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2">
                      {project.links.map((link) => {
                        const config = linkConfig[link.type];
                        return (
                          <a
                            key={link.type}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-lg ${config.bg} ${config.color} transition-all`}
                            title={config.label}
                          >
                            <config.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="bg-gradient-to-r from-slate-800/60 to-slate-800/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-slate-700/50 backdrop-blur-sm">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                I&apos;m always open to discussing new projects and opportunities. Let&apos;s create something amazing together!
              </p>
              <Link
                href="/#contact"
                className="btn-shine inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
