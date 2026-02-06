// ============================================================
// CV DATA — Edit this file to update your resume content
// ============================================================

export const PROFILE = {
  name: 'Nafis Kabbo',
  title: 'Mobile Developer',
  subtitle: 'Native Android | Native iOS | Flutter',
  email: 'nafiskabbo30@gmail.com',
  phone: '+880 1772 988050',
  linkedin: 'linkedin.com/in/nafiskabbo30',
  linkedinUrl: 'https://www.linkedin.com/in/nafiskabbo30/',
  github: 'github.com/nafiskabbo',
  githubUrl: 'https://github.com/nafiskabbo',
  portfolio: 'nafiskabbo.dev',
  portfolioUrl: 'https://nafiskabbo.dev',
  location: 'Bangladesh',
};

export const SUMMARY =
  'Results-driven Mobile Developer with 5+ years of experience shipping production apps across Android, iOS, and Flutter — delivering AI-powered, user-centric products that have reached 50K+ users worldwide.';

export const WORK_EXPERIENCE = [
  {
    role: 'Mobile Developer',
    company: 'Plottwist.org',
    period: '2025 — Present',
    description:
      'Building a mental wellness platform that leverages AI-driven frequency therapy and sound healing to improve user well-being and emotional resilience.',
  },
  {
    role: 'Freelance Mobile Developer',
    company: 'Self-Employed',
    period: '2020 — Present',
    description:
      'Delivered 10+ production apps across fintech, health-tech, and AI — serving clients from startups to enterprises on Freelancer & Upwork.',
  },
];

export interface CVProject {
  name: string;
  tech: string;
  androidUrl?: string;
  iosUrl?: string;
  webUrl?: string;
  highlights: string[];
}

export const PROJECTS: CVProject[] = [
  {
    name: 'Heal Tone AI Frequency Sounds',
    tech: 'Flutter, AI, Firebase',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.anythingspeaker.healtone',
    iosUrl: 'https://apps.apple.com/us/app/heal-tone-ai-frequency-sounds/id6746277347',
    webUrl: 'https://healtone.org',
    highlights: [
      'AI-generated therapeutic frequencies with 15K+ downloads in first 3 months',
      'Real-time audio engine processing 40+ frequency combinations simultaneously',
    ],
  },
  {
    name: 'eMaisha Pay',
    tech: 'Native Android, Kotlin, MVVM',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.cabraltech.emaishacorporateapp',
    highlights: [
      'Automated payment reconciliation reducing manual processing time by 70%',
      'Implemented biometric auth and end-to-end encryption for 5K+ daily transactions',
    ],
  },
  {
    name: 'Santa Personal Video & Call',
    tech: 'Kotlin, SwiftUI, AI Video',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.santa.chatbot',
    iosUrl: 'https://apps.apple.com/us/app/santa-personal-video-call/id6755621227',
    webUrl: 'https://santachat.org',
    highlights: [
      'Native Android (Kotlin) + Native iOS (SwiftUI) — 30K+ seasonal downloads',
      'AI-powered real-time video calling with <200ms latency and personalized responses',
    ],
  },
  {
    name: 'DeenHub: Quran, Prayer & Qibla',
    tech: 'Flutter, RAG, AI, Firebase',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.deenhub.app',
    iosUrl: 'https://apps.apple.com/us/app/deenhub-quran-prayer-qibla/id6749580911',
    highlights: [
      'Built RAG-based Hadith AI system — 85% improvement in accurate hadith retrieval',
      'Quran-Hadith cross-referencing engine with nearby mosque finder using geolocation',
    ],
  },
];

export const SKILLS = {
  mobile: ['Kotlin', 'SwiftUI', 'Flutter', 'Dart', 'Jetpack Compose'],
  architecture: ['MVVM', 'Clean Architecture', 'BLoC', 'Provider'],
  backend: ['Firebase', 'Supabase', 'REST APIs', 'Node.js'],
  tools: ['Git', 'CI/CD', 'Figma', 'Xcode', 'Android Studio'],
};

export const EDUCATION = {
  degree: 'B.Sc. in Computer Science & Engineering',
  institution: 'Rajshahi University of Engineering & Technology (RUET)',
  period: '2024 — 2028',
};
