/** Rich copy & media for `/projects/[id]` */

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  /** Verified review on Freelancer (when applicable) */
  reviewUrl?: string;
  /** Call-to-action for `reviewUrl` (defaults to “View verified review”) */
  reviewLinkLabel?: string;
  /** e.g. Freelancer feedback screenshot in `/public` */
  feedbackImage?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectDetailContent {
  problem: string;
  solution: string;
  techStack: string[];
  highlights?: string[];
  metrics: ProjectMetric[];
  testimonials: ProjectTestimonial[];
  screenshots: ProjectScreenshot[];
}

export const PROJECT_DETAILS: Record<string, ProjectDetailContent> = {
  'heal-tone': {
    problem: 'Listeners wanted studio-grade healing tones and preset journeys without a cluttered or unreliable audio UX.',
    solution:
      'Flutter app with precise frequency control, curated presets, store-grade onboarding, and tuned playback UX across iOS, Android, and web.',
    techStack: ['Flutter', 'Dart', 'Audio engines', 'Platform channels', 'AI-assisted content'],
    highlights: ['Cross-platform parity', 'Wellness-focused IA'],
    metrics: [
      { label: 'Stores', value: 'iOS · Android · Web' },
      { label: 'Category', value: 'Wellness audio' },
      { label: 'Delivery', value: 'Production' },
    ],
    testimonials: [
      {
        quote:
          'Communicates clearly and ships stable builds—we iterated quickly without breaking playback quality.',
        author: 'Product collaborator',
        role: 'Wellness / audio app',
      },
    ],
    screenshots: [
      { src: '/screenshot_healtone_1.webp', alt: 'Heal Tone experience', caption: 'Product (local hero)' },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/67/3d/61/673d612a-92b7-2ba8-4cce-4156d0b559db/Simulator_Screenshot_-_iPhone_16_Pro_Max_-_2025-07-03_at_21.09.06.png/460x998bb.webp',
        alt: 'Heal Tone iOS — healing presets',
        caption: 'Healing sessions',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/95/58/3b/95583b3d-b728-7784-07ed-c81147b3ac44/Simulator_Screenshot_-_iPhone_16_Pro_Max_-_2025-07-03_at_21.09.18.png/460x998bb.webp',
        alt: 'Heal Tone frequency controls',
        caption: 'Frequency generator',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/7e/f0/eb/7ef0eb24-a6b0-bb6f-d62e-915c45034c49/Simulator_Screenshot_-_iPhone_16_Pro_Max_-_2025-07-03_at_21.12.01.png/460x998bb.webp',
        alt: 'Heal Tone playback UI',
        caption: 'Playback & focus',
      },
    ],
  },
  'emaisha-pay': {
    problem: 'Teams tracking produce and corporate payments needed traceability from supplier to payment status in one place.',
    solution:
      'Android app with structured detail screens, farmer/supplier breakdowns, and clear payment status for audit-friendly operations.',
    techStack: ['Kotlin', 'Android SDK', 'Material Design', 'REST APIs', 'Offline-aware flows'],
    metrics: [
      { label: 'Vertical', value: 'Ag + B2B pay' },
      { label: 'Platform', value: 'Android' },
      { label: 'Trust', value: 'Traceability UX' },
    ],
    testimonials: [
      {
        quote:
          'Delivers on scope with pragmatic UX choices—we got the visibility our ops team was missing.',
        author: 'Stakeholder',
        role: 'Corporate rollout',
      },
    ],
    screenshots: [
      {
        src: 'https://play-lh.googleusercontent.com/XDTPU8BYAXNqzzVATcOE4YE8je3U6W17WhVEL25dqhR3LETXiV0sELv75mM1nV_mH6dx=w5120-h2880',
        alt: 'eMaisha Pay supply headline',
        caption: 'Supply chain story',
      },
      {
        src: 'https://play-lh.googleusercontent.com/ubRuCqeCc_6AOy_PFvRcAKMsYEMyLh1AdJsZxQqOuPIkY0skVzV5dN85zhGuE3q53BIE=w5120-h2880',
        alt: 'eMaisha Pay overview',
        caption: 'Operations overview',
      },
      {
        src: 'https://play-lh.googleusercontent.com/xVA8k85UqCSjj3tDoX5_XV6b0pJKNLbdoCAcMuqsGO_t3n3-dUIegFuR_cEtcXovezE=w5120-h2880',
        alt: 'eMaisha Pay produce tracking',
        caption: 'Produce tracking',
      },
      {
        src: 'https://play-lh.googleusercontent.com/RSQqcdRvjhIYCLXktc3TpAqL7qwrMuSBLi8SVFBKQF-TAwPEQ7OWcpHo3jIlJu5adQSR=w5120-h2880',
        alt: 'eMaisha Pay farmers view',
        caption: 'Farmer breakdown',
      },
      {
        src: 'https://play-lh.googleusercontent.com/NTqKLAYn5SRRatvUNqF5j5DHA4y2sK8NFO2E19AqIQaJqVVsrMQmjYRO5leSPhQLj7u8=w5120-h2880',
        alt: 'eMaisha Pay payment insights',
        caption: 'Payments & status',
      },
    ],
  },
  'santa-chat': {
    problem: 'Families wanted a magical seasonal experience—calls and chats—that felt real without fragile hacks.',
    solution:
      'Native Android & iOS with AI-assisted conversations, polished calling UX, and kid-safe flows parents can trust.',
    techStack: ['Kotlin', 'SwiftUI', 'Realtime AV', 'AI dialog', 'Store release pipelines'],
    metrics: [
      { label: 'Platforms', value: 'Android · iOS · Web' },
      { label: 'Mode', value: 'Video & chat' },
      { label: 'Season', value: 'Peak-ready' },
    ],
    testimonials: [
      {
        quote:
          'Fast iterations on a tight seasonal window—kids loved it and parents found it easy to supervise.',
        author: 'Campaign partner',
        role: 'Holiday release',
      },
    ],
    screenshots: [
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/7b/8e/ee/7b8eeece-99fb-956b-65d3-38ddd88aed66/Untitled_design.png/460x996bb.webp',
        alt: 'Santa Chat festive UI',
        caption: 'Festive experience',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/dc/54/60/dc54602d-b71e-b0ce-dfce-a6ffabf0642e/Untitled_design__U00284_U0029.png/460x996bb.webp',
        alt: 'Santa Chat character moments',
        caption: 'Character moments',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/b0/43/24/b0432453-10e8-f592-1ff2-e3c5e9aa26fa/Untitled_design__U00282_U0029.png/460x996bb.webp',
        alt: 'Santa Chat storytelling',
        caption: 'Story & wishes',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/dc/e3/a3/dce3a3a6-d886-31b0-e0c4-3daba37bae84/Untitled_design__U00283_U0029.png/460x996bb.webp',
        alt: 'Santa Chat engagement',
        caption: 'Engagement',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/47/ea/29/47ea2960-f70e-cecd-79f5-fc7befdacbe6/Simulator_Screenshot_-_iPhone_14_Plus_-_2025-12-19_at_05.38.37.png/460x996bb.webp',
        alt: 'Santa Chat iOS',
        caption: 'Mobile polish',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/d3/d4/23/d3d42368-4958-9a24-16d5-edd2e83e99a0/Simulator_Screenshot_-_iPhone_14_Plus_-_2025-12-19_at_05.38.33.png/460x996bb.webp',
        alt: 'Santa Chat flows',
        caption: 'Core flows',
      },
    ],
  },
  deenhub: {
    problem: 'Users needed prayer tools, Quran study, mosques, and AI-assisted Islamic Q&A in one calm, ad-light experience.',
    solution:
      'Flutter build combining scheduling, maps, Quran UX, memorization stats, and assistant flows tuned for trust and clarity.',
    techStack: ['Flutter', 'Dart', 'Maps & geo', 'Islamic datasets', 'AI chat / RAG patterns'],
    metrics: [
      { label: 'Platforms', value: 'iOS + Android' },
      { label: 'Trust', value: 'Community data' },
      { label: 'AI', value: 'Guided answers' },
    ],
    testimonials: [
      {
        quote:
          'DeenHub.app was developed with heart and purpose by Kabbo—a passionate developer who believes faith-driven technology can change lives.',
        author: 'DeenHub',
        role: 'Featured on About Us',
        reviewUrl: 'https://deenhub.app/about-us/',
        reviewLinkLabel: 'Read on DeenHub',
        feedbackImage: '/client_feedback_deenhub.webp',
      },
    ],
    screenshots: [
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/b7/5d/23/b75d23e4-791d-e64e-6832-63ee4ce7f56d/6.5_1.jpg/460x996bb.webp',
        alt: 'DeenHub home',
        caption: 'Home & goals',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/55/69/a4/5569a473-f6a7-c2b9-86fa-68707afa3699/6.5_2.jpg/460x996bb.webp',
        alt: 'DeenHub mosques',
        caption: 'Mosques & times',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/ac/0f/41/ac0f41ee-422d-c8fa-f8eb-fe62b252e92b/6.5_3.jpg/460x996bb.webp',
        alt: 'DeenHub Quran memorize',
        caption: 'Quran memorization',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/74/86/fa/7486faa0-98aa-dbb1-51a1-89528e65ac1b/6.5_4.jpg/460x996bb.webp',
        alt: 'DeenHub Quran reader',
        caption: 'Reader + AI explain',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/7b/66/34/7b66349e-3454-7dd2-2eda-2bd302b3d62e/6.5_5.jpg/460x996bb.webp',
        alt: 'DeenHub Qibla',
        caption: 'Qibla AR',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/aa/5c/bd/aa5cbd39-ab44-3c93-4412-001c99974530/6.5_6.jpg/460x996bb.webp',
        alt: 'DeenGuide assistant',
        caption: 'DeenGuide assistant',
      },
    ],
  },
  viozor: {
    problem: 'Creators wanted cinematic AI video without watermarks, steep learning curves, or desktop-only tools.',
    solution:
      'Native iOS pipeline around prompting, preview, and export—optimized for thumb-first creation and share-ready output.',
    techStack: ['Swift', 'SwiftUI', 'AVFoundation', 'On-device perf', 'Video AI APIs'],
    metrics: [
      { label: 'Output', value: 'No watermark' },
      { label: 'Styles', value: 'Anime · ads · viral' },
      { label: 'Platform', value: 'iOS-first' },
    ],
    testimonials: [
      {
        quote:
          'Ship velocity matched our campaign calendar—prompt UX felt premium and exports looked ready for social.',
        author: 'Creative lead',
        role: 'AI video launch',
      },
    ],
    screenshots: [
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/1b/b8/14/1bb81413-0261-8083-c78e-d6059c3725e3/App_Store_1_1242x2688.jpg/460x996bb.webp',
        alt: 'Viozor hero',
        caption: 'Hero · no watermark',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/02/83/fd/0283fd6e-cf17-6dd1-6664-22c0519d3090/2.jpg/460x996bb.webp',
        alt: 'Viozor realistic video',
        caption: 'Realistic scenes',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/46/67/03/4667031f-e14c-969c-5530-432867506121/3.jpg/460x996bb.webp',
        alt: 'Viozor influencer style',
        caption: 'AI influencer ads',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/3e/25/15/3e2515da-ab18-e265-28e7-3cfa8cdf23df/anime_1242_x_2688.jpg/460x996bb.webp',
        alt: 'Viozor anime',
        caption: 'Anime generation',
      },
    ],
  },
  edipic: {
    problem: 'Photo creators wanted pro-grade edits and generations without juggling five tools or opaque settings.',
    solution:
      'Swift-based editor with credits-aware generation settings, prompt-first workflows, and gallery flows tuned for iteration.',
    techStack: ['Swift', 'Core Image', 'Generative APIs', 'Credits & monetization UX'],
    metrics: [
      { label: 'Quality', value: 'Up to 4K' },
      { label: 'Workflow', value: 'Prompt + refine' },
      { label: 'Surface', value: 'iOS + Web' },
    ],
    testimonials: [
      {
        quote:
          'Iteration loops were tight—generation settings and credits UX reduced support churn during beta.',
        author: 'Founder-side PM',
        role: 'Creative tool',
      },
    ],
    screenshots: [
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/26/11/db/2611dbaf-2fbf-155e-419a-2291861662e7/Simulator_Screenshot_-_iPhone_17_Pro_Max_-_2026-01-30_at_07.22.09.png/460x998bb.webp',
        alt: 'Edipic canvas',
        caption: 'Editing canvas',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/fe/89/76/fe897617-41a7-8b5e-d268-5003ae007e6e/Simulator_Screenshot_-_iPhone_17_Pro_Max_-_2026-01-30_at_07.21.18.png/460x998bb.webp',
        alt: 'Edipic generation progress',
        caption: 'Generation progress',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/89/21/54/892154af-afbd-f306-c0dd-0854661ad004/Simulator_Screenshot_-_iPhone_17_Pro_Max_-_2026-01-30_at_07.23.31.png/460x998bb.webp',
        alt: 'Edipic settings',
        caption: 'Model & resolution',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/62/7b/1c/627b1c44-bb22-7853-49d1-4499dc85262c/Simulator_Screenshot_-_iPhone_17_Pro_Max_-_2026-01-30_at_07.23.38.png/460x998bb.webp',
        alt: 'Edipic celebrate scene',
        caption: 'Composite edits',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/14/df/e5/14dfe5ea-68b3-f12c-b9f4-79a0b84cc158/Simulator_Screenshot_-_iPhone_17_Pro_Max_-_2026-01-30_at_07.20.11.png/460x998bb.webp',
        alt: 'Edipic gallery',
        caption: 'Gallery',
      },
    ],
  },
  'stride-soles': {
    problem: 'Users wanted motivation and clarity across devices—mobile-first with a credible web presence.',
    solution:
      'Cross-platform Flutter delivery with consistent UX on Android & iOS plus a marketing site for discovery and trust.',
    techStack: ['Flutter', 'Dart', 'Android & iOS releases', 'Web landing', 'Analytics-ready architecture'],
    metrics: [
      { label: 'Platforms', value: 'Android · iOS · Web' },
      { label: 'Category', value: 'Fitness / lifestyle' },
      { label: 'Reach', value: 'Global stores' },
    ],
    testimonials: [
      {
        quote:
          'Clean execution across three surfaces—store reviews reflected the polish we aimed for at launch.',
        author: 'Launch partner',
        role: 'Consumer app',
      },
    ],
    screenshots: [
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/13/2d/4c/132d4cf0-aab3-6ce9-44f7-c4724fb31385/Simulator_Screenshot_-_iPhone_17_Pro_Max_-_2026-02-03_at_22.09.24.png/460x998bb.webp',
        alt: 'Stride Soles experience',
        caption: 'Onboarding / home',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/1e/7e/42/1e7e4278-8fdb-acd5-cdf4-3c51f8d3ef5a/Simulator_Screenshot_-_iPhone_17_Pro_Max_-_2026-02-03_at_22.10.54.png/460x998bb.webp',
        alt: 'Stride Soles activity',
        caption: 'Activity focus',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/44/49/11/4449119b-e702-1f2b-c5cd-e913f9532930/Simulator_Screenshot_-_iPhone_17_Pro_Max_-_2026-02-03_at_22.10.58.png/460x998bb.webp',
        alt: 'Stride Soles insights',
        caption: 'Insights',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/75/cf/bb/75cfbb6c-ccb3-adb4-0603-633a3b4f50b5/Simulator_Screenshot_-_iPhone_17_Pro_Max_-_2026-02-03_at_22.11.03.png/460x998bb.webp',
        alt: 'Stride Soles journey',
        caption: 'Journey',
      },
      {
        src: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/ec/28/ac/ec28acd3-3a70-5dd1-e5e5-309047a9955c/OrderCompletedScreen.png/460x998bb.webp',
        alt: 'Stride Soles milestone',
        caption: 'Milestone',
      },
    ],
  },
  elsie: {
    problem: 'The product needed a dependable Android shell with modern Material patterns and room to grow features.',
    solution:
      'Kotlin app with clear navigation, scalable modules, and UI polish that reads premium on the Play Store.',
    techStack: ['Kotlin', 'Jetpack', 'Material Design 3', 'REST integrations'],
    metrics: [
      { label: 'Platform', value: 'Android' },
      { label: 'UX', value: 'Material' },
      { label: 'Delivery', value: 'Milestone-based' },
    ],
    testimonials: [
      {
        quote:
          'Nafis is amazing! Brother does he know his stuff. I have worked over 100 developer in my career and only 1 has approached Nafis\' expertise in understanding what I want and delivering a product that exceeds my expectations. I struggle giving a good review because he\'ll be to busy to help me again, but for his career I highly recommend him. Responsive! Thorough! Intuitive! and delivers on time. This has been. "IS" a great candidate for any project you have.',
        author: 'Chris A.',
        role: 'Verified project review',
        reviewUrl:
          'https://www.freelancer.com/u/nafiskabbo30?review_context_id=38542732&review_type=project&sb=t',
        feedbackImage: '/client_feedback_elsie.webp',
      },
    ],
    screenshots: [
      { src: '/logo_elsie.jpg', alt: 'Elsie branding', caption: 'Product identity' },
      { src: '/logo_elsie.jpg', alt: 'Elsie UI', caption: 'Material UI' },
    ],
  },
};

export function getProjectDetail(id: string): ProjectDetailContent | undefined {
  return PROJECT_DETAILS[id];
}
