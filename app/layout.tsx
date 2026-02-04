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
  title: "Nafis Islam Kabbo | Mobile Developer",
  description:
    "Professional Mobile Developer specializing in Flutter, Kotlin, Swift, and cross-platform app development. Building beautiful, performant mobile applications with clean architecture.",
  keywords: [
    "Mobile Developer",
    "Flutter Developer",
    "Android Developer",
    "iOS Developer",
    "Kotlin",
    "Swift",
    "Cross-Platform",
    "App Development",
    "Nafis Islam Kabbo",
  ],
  authors: [{ name: "Nafis Islam Kabbo" }],
  creator: "Nafis Islam Kabbo",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nafis Islam Kabbo | Mobile Developer",
    description:
      "Professional Mobile Developer specializing in Flutter, Kotlin, Swift, and cross-platform app development.",
    siteName: "Nafis Islam Kabbo Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafis Islam Kabbo | Mobile Developer",
    description:
      "Professional Mobile Developer specializing in Flutter, Kotlin, Swift, and cross-platform app development.",
  },
  robots: {
    index: true,
    follow: true,
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
