import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeBackground } from "./components/ThemeBackground";
import { ChatAssistantShell } from "./components/ChatAssistantShell";
import { JsonLd } from "./components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, YEARS_OF_EXPERIENCE_LABEL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const themeInitScript = `(function(){try{var k='portfolio-theme',v=['android','ios','flutter','web','automation'],q=new URLSearchParams(location.search).get('theme'),t=(q&&v.indexOf(q)!==-1)?q:localStorage.getItem(k);if(t&&v.indexOf(t)!==-1)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export const metadata: Metadata = {
  title: {
    default: "Nafis Kabbo | Product-focused Mobile Developer - Android, iOS & Flutter",
    template: "%s | Nafis Kabbo",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Nafis Kabbo",
    "Nafis Islam Kabbo",
    "Kabbo",
    "Nafis",
    "Mobile Developer",
    "Mobile App Developer",
    "Web Developer",
    "Android Developer",
    "Android Development",
    "iOS Developer",
    "Flutter Developer",
    "Kotlin Developer",
    "Swift Developer",
    "SwiftUI",
    "Next.js Developer",
    "TypeScript",
    "Cross-Platform Developer",
    "Native Android",
    "Native iOS",
    "App Development",
    "Freelance Developer",
    "AI Mobile Apps",
    "Open Source",
    "emu8086",
    "emu8086web",
    "8086 assembler",
    "Bangladesh Developer",
  ],
  authors: [{ name: "Nafis Kabbo", url: SITE_URL }],
  creator: "Nafis Kabbo",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.webp", type: "image/webp", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nafis Kabbo - Product-focused Mobile Developer | Android, iOS & Flutter",
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: "/personal.webp",
        width: 512,
        height: 512,
        alt: "Nafis Islam Kabbo - Mobile & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Nafis Kabbo - Product-focused Mobile Developer | Android, iOS & Flutter",
    description: `Helping startups and agencies ship store-ready apps. ${YEARS_OF_EXPERIENCE_LABEL} years · 50+ production releases · outcomes that grow revenue and retention.`,
    creator: "@nafiskabbo30",
    images: ["/personal.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "4b8J6NrWHLMITLuVCfJLqqXJRMLzERtxpjMp6SKuXpc",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "text/markdown": SITE_URL,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      data-theme="android"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <JsonLd />
        <Suspense fallback={null}>
          <ThemeProvider>
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
              <ThemeBackground intensity="high" />
            </div>
            {children}
            <ChatAssistantShell />
          </ThemeProvider>
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
