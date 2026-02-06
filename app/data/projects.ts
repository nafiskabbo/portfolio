import { Theme } from '../components/ThemeProvider';

export interface ProjectLink {
  type: 'android' | 'ios' | 'web';
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
  platform: 'android' | 'ios' | 'cross-platform' | 'native-multiplatform';
  category: 'ai' | 'mobile' | 'fintech' | 'utility';
  featured?: boolean;
}

/** Map tags to themes for clickable theme switching */
export const TAG_THEME_MAP: Record<string, Theme> = {
  'Flutter': 'flutter',
  'Swift': 'ios',
  'SwiftUI': 'ios',
  'iOS': 'ios',
  'Android': 'android',
  'Kotlin': 'android',
  'Next.js': 'web',
};

/**
 * All projects in display order:
 * healtone, eMaisha, santa, deenhub, viozor, edipic, elsie
 */
export const ALL_PROJECTS: Project[] = [
  {
    id: 'heal-tone',
    title: 'Heal Tone AI Frequency Sounds',
    description: 'A wellness app featuring AI-generated healing frequencies and soundscapes for meditation, relaxation, and therapeutic sound therapy.',
    image: '/logo_healtone.jpg',
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
    description: 'A corporate payment and financial management app enabling seamless business transactions, automated reconciliation, and real-time reporting.',
    image: '/logo_emaisha_pay.png',
    gradient: 'from-blue-500 to-indigo-600',
    tags: ['Android', 'Fintech', 'Payments'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.cabraltech.emaishacorporateapp&hl=en' },
    ],
    platform: 'android',
    category: 'fintech',
    featured: true,
  },
  {
    id: 'santa-chat',
    title: 'Santa Personal Video & Call',
    description: 'An interactive app where users can video call and chat with Santa Claus. Features AI-powered conversations and personalized video messages.',
    image: '/logo_santa_app.png',
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
    description: 'A comprehensive Islamic app with Quran reading, prayer times, Qibla direction, AI-powered Hadith search, and nearby mosque finder.',
    image: '/logo_deenhub.jpeg',
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
    description: 'Cutting-edge AI video generation app that transforms text and images into stunning videos with advanced editing capabilities.',
    image: '/logo_viozor.jpg',
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
    description: 'Professional AI-powered image editing app with advanced filters, background removal, and intelligent enhancement tools.',
    image: '/logo_edipic.jpg',
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
    id: 'elsie',
    title: 'Elsie',
    description: 'A feature-rich mobile application with modern Material Design and intuitive user experience.',
    image: '/logo_elsie.jpg',
    gradient: 'from-pink-500 to-rose-600',
    tags: ['Android', 'Kotlin', 'Mobile App'],
    links: [
      { type: 'android', url: 'https://play.google.com/store/apps/details?id=com.elsie.app' },
    ],
    platform: 'android',
    category: 'utility',
  },
];

/** First 4 projects for the home page preview */
export const FEATURED_PROJECTS = ALL_PROJECTS.slice(0, 4);
