import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./components/ThemeProvider";
import { ChatAssistantShell } from "./components/ChatAssistantShell";
import { JsonLd } from "./components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
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

export const metadata: Metadata = {
  title: {
    default: "Nafis Kabbo | Mobile Developer — Android, iOS & Flutter",
    template: "%s | Nafis Kabbo",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Nafis Kabbo",
    "Kabbo",
    "Nafis",
    "Nafis Islam Kabbo",
    "Mobile Developer",
    "Android Developer",
    "Android Development",
    "iOS Developer",
    "Flutter Developer",
    "Kotlin Developer",
    "Swift Developer",
    "SwiftUI",
    "Cross-Platform Developer",
    "Native Android",
    "Native iOS",
    "App Development",
    "Mobile App Developer",
    "Freelance Developer",
    "AI Mobile Apps",
    "Bangladesh Developer",
  ],
  authors: [{ name: "Nafis Kabbo", url: SITE_URL }],
  creator: "Nafis Kabbo",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nafis Kabbo — Mobile Developer | Android, iOS & Flutter",
    description:
      "Building high-performance mobile apps with Native Android, Native iOS, and Flutter. 5+ years of production experience with AI integration and clean architecture.",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: "/personal.webp",
        width: 512,
        height: 512,
        alt: "Nafis Islam Kabbo — Mobile Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafis Kabbo — Mobile Developer | Android, iOS & Flutter",
    description:
      "Building high-performance mobile apps with Native Android, Native iOS, and Flutter. 5+ years of production experience.",
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
    <html lang="en" className="scroll-smooth" data-theme="android" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <JsonLd />
        <Suspense fallback={null}>
          <ThemeProvider>
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
