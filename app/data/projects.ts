import { Theme } from '../components/ThemeProvider';

export interface ProjectLink {
  type: 'android' | 'ios' | 'web' | 'github';
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
  tags: string[];
  links: ProjectLink[];
  platform: 'android' | 'ios' | 'cross-platform' | 'native-multiplatform' | 'web';
  category: 'ai' | 'mobile' | 'fintech' | 'utility' | 'open-source';
  featured?: boolean;
}

/** Map tags to themes for clickable theme switching */
export const TAG_THEME_MAP: Record<string, Theme> = {
  Flutter: 'flutter',
  Swift: 'ios',
  SwiftUI: 'ios',
  iOS: 'ios',
  Android: 'android',
  Kotlin: 'android',
  'Next.js': 'web',
  TypeScript: 'web',
  AI: 'automation',
  'AI Automation': 'automation',
  n8n: 'automation',
  LangChain: 'automation',
  OpenAI: 'automation',
  Workflows: 'automation',
};

/**
 * Display order (1-based):
 * 1 heal-tone … 6 edipic, 7 emu8086web, 8 elsie, 9 stride-soles.
 * emu8086web is not featured.
 */
export const ALL_PROJECTS: Project[] = [
  {
    id: 'heal-tone',
    title: 'Heal Tone AI Frequency Sounds',
    description:
      'A wellness app featuring AI-generated healing frequencies and soundscapes for meditation, relaxation, and therapeutic sound therapy.',
    image: '/logo_healtone.webp',
    gradient: 'from-purple-500 to-violet-600',
    tags: ['Flutter', 'AI', 'Health'],
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
    id: 'emaisha-pay',
    title: 'eMaisha Pay',
    description:
      'A corporate payment and financial management app enabling seamless business transactions, automated reconciliation, and real-time reporting.',
    image: '/logo_emaisha_pay.webp',
    gradient: 'from-blue-500 to-indigo-600',
    tags: ['Android', 'Fintech', 'Payments'],
    links: [
      {
        type: 'android',
        url: 'https://play.google.com/store/apps/details?id=com.cabraltech.emaishacorporateapp&hl=en',
      },
    ],
    platform: 'android',
    category: 'fintech',
    featured: true,
  },
  {
    id: 'santa-chat',
    title: 'Santa Personal Video & Call',
    description:
      'An interactive app where users can video call and chat with Santa Claus. Features AI-powered conversations and personalized video messages.',
    image: '/logo_santa_app.webp',
    gradient: 'from-red-500 to-rose-600',
    tags: ['Kotlin', 'SwiftUI', 'AI', 'Video Call'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.santa.chatbot' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/santa-personal-video-call/id6755621227' },
      { type: 'web', url: 'https://santachat.org/' },
    ],
    platform: 'native-multiplatform',
    category: 'ai',
    featured: true,
  },
  {
    id: 'deenhub',
    title: 'DeenHub: Quran, Prayer & Qibla',
    description:
      'A comprehensive Islamic app with Quran reading, prayer times, Qibla direction, AI-powered Hadith search, and nearby mosque finder.',
    image: '/logo_deenhub.webp',
    gradient: 'from-emerald-500 to-teal-600',
    tags: ['Flutter', 'Islamic', 'AI'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.deenhub.app&hl=en' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/deenhub-quran-prayer-qibla/id6749580911' },
    ],
    platform: 'cross-platform',
    category: 'utility',
    featured: true,
  },
  {
    id: 'viozor',
    title: 'Viozor 2: AI Video Generator',
    description:
      'Cutting-edge AI video generation app that transforms text and images into stunning videos with advanced editing capabilities.',
    image: '/logo_viozor.webp',
    gradient: 'from-cyan-500 to-blue-600',
    tags: ['Swift', 'AI', 'iOS'],
    links: [
      { type: 'ios', url: 'https://apps.apple.com/us/app/viozor-2-ai-video-generator/id6753830046' },
      { type: 'web', url: 'https://viozor.com/' },
    ],
    platform: 'ios',
    category: 'ai',
  },
  {
    id: 'edipic',
    title: 'Edipic AI Image Editor',
    description:
      'Professional AI-powered image editing app with advanced filters, background removal, and intelligent enhancement tools.',
    image: '/logo_edipic.webp',
    gradient: 'from-amber-500 to-orange-600',
    tags: ['Swift', 'AI', 'Image Processing'],
    links: [
      { type: 'ios', url: 'https://apps.apple.com/us/app/edipic-ai-image-editor/id6753642840' },
      { type: 'web', url: 'https://edipic.com/' },
    ],
    platform: 'ios',
    category: 'ai',
  },
  {
    id: 'stride-soles',
    title: 'Stride Soles',
    description:
      'Fitness and lifestyle companion app for tracking activity and staying motivated, with a polished cross-platform experience on Android, iOS, and web.',
    image: '/logo_stride_soles.webp',
    gradient: 'from-orange-500 to-rose-600',
    tags: ['Flutter', 'Android', 'iOS', 'Health'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.stridesoles.app' },
      { type: 'ios', url: 'https://apps.apple.com/us/app/stride-soles/id6451224411' },
      { type: 'web', url: 'https://www.stridesoles.com/' },
    ],
    platform: 'cross-platform',
    category: 'utility',
  },
  {
    id: 'emu8086web',
    title: 'emu8086web',
    description:
      'Browser-based 8086 assembler and step debugger: write, assemble, and debug MASM-style assembly entirely in the browser. Open source modernization of classic emu8086.',
    image: '/logo_emu_8086.svg',
    gradient: 'from-slate-600 to-cyan-700',
    tags: ['Next.js', 'TypeScript', '8086', 'Open Source', 'Assembler', 'Emulator'],
    links: [
      { type: 'web', url: 'https://emu-8086-web.vercel.app/' },
      { type: 'github', url: 'https://github.com/nafiskabbo/emu_8086_web' },
    ],
    platform: 'web',
    category: 'open-source',
  },
  {
    id: 'elsie',
    title: 'Elsie',
    description:
      'Personalized SMS to a saved contact list, shipped on Google Play.',
    image: '/logo_elsie.webp',
    gradient: 'from-pink-500 to-rose-600',
    tags: ['Android', 'Kotlin', 'Mobile App'],
    links: [{ type: 'android', url: 'https://play.google.com/store/apps/details?id=com.elsie.app' }],
    platform: 'android',
    category: 'utility',
  },
];

/** Featured projects for the home page preview (first 4 featured, display order) */
export const FEATURED_PROJECTS = ALL_PROJECTS.filter((p) => p.featured).slice(0, 4);
