import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./components/ThemeProvider";
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
  description:
    "Nafis Kabbo — Mobile Developer specializing in Native Android (Kotlin), Native iOS (SwiftUI/Swift), and Flutter cross-platform development. 5+ years building production apps with clean architecture, AI integration, and modern UI/UX.",
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
  authors: [{ name: "Nafis Kabbo", url: "https://nafiskabbo.dev" }],
  creator: "Nafis Kabbo",
  metadataBase: new URL("https://nafiskabbo.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nafis Kabbo — Mobile Developer | Android, iOS & Flutter",
    description:
      "Building high-performance mobile apps with Native Android, Native iOS, and Flutter. 5+ years of production experience with AI integration and clean architecture.",
    siteName: "Nafis Kabbo Portfolio",
    url: "https://nafiskabbo.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafis Kabbo — Mobile Developer | Android, iOS & Flutter",
    description:
      "Building high-performance mobile apps with Native Android, Native iOS, and Flutter. 5+ years of production experience.",
    creator: "@nafiskabbo30",
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
    canonical: "https://nafiskabbo.dev",
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
      >
        <Suspense fallback={null}>
          <ThemeProvider>{children}</ThemeProvider>
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
