'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, LinkedInIcon, FreelancerIcon, DownloadIcon, EmailIcon, AndroidIcon, AppleIcon, FlutterIcon, UpworkIcon } from './Icons';
import { useTheme, Theme } from './ThemeProvider';
import { ThemeBackground } from './ThemeBackground';
import { Mascot2D } from './Mascot2D';

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/nafiskabbo', label: 'GitHub', color: 'hover:text-white hover:border-white/30' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/nafiskabbo30/', label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/30' },
  { icon: FreelancerIcon, href: 'https://www.freelancer.com/u/nafiskabbo30', label: 'Freelancer', color: 'hover:text-cyan-400 hover:border-cyan-400/30' },
  { icon: UpworkIcon, href: 'https://www.upwork.com/freelancers/~01b2fc2f4ff397f8ca', label: 'Upwork', color: 'hover:text-green-500 hover:border-green-500/30' },
];

const techBadges: { id: Theme; icon: typeof AndroidIcon; label: string; themeColor: string }[] = [
  { id: 'android', icon: AndroidIcon, label: 'Android', themeColor: 'from-green-500/20 to-green-600/10 border-green-500/40 text-green-400 hover:bg-green-500/30' },
  { id: 'ios', icon: AppleIcon, label: 'iOS', themeColor: 'from-blue-500/20 to-blue-600/10 border-blue-500/40 text-blue-400 hover:bg-blue-500/30' },
  { id: 'flutter', icon: FlutterIcon, label: 'Flutter', themeColor: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30' },
];

export function HeroSection() {
  const { theme, setTheme, isTransitioning } = useTheme();

  const handleTechClick = (techTheme: Theme, e: React.MouseEvent) => {
    if (!isTransitioning) {
      setTheme(techTheme, true, e.nativeEvent);
    }
  };

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    // Open in new tab
    window.open('/cv.pdf', '_blank');
    // Trigger download
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Theme Background */}
      <ThemeBackground intensity="high" />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* 2D Mascot - Large on right side, hidden on mobile */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <Mascot2D size="large" position="right" />
      </div>

      {/* Additional floating mascots for visual interest */}
      <div className="hidden xl:block absolute left-8 bottom-24 z-10 opacity-50">
        <Mascot2D size="small" position="left" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 section-container py-20 sm:py-24 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Profile Image */}
          <div className="relative flex-shrink-0 order-1 lg:order-2">
            {/* Outer Orbit Ring */}
            <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8">
              {/* Orbit Path */}
              <div
                className="absolute inset-0 rounded-full border border-dashed animate-orbit"
                style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 30%, transparent)' }}
              />

              {/* Orbiting Icons */}
              <div className="absolute inset-0 animate-orbit">
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
                  style={{
                    background: 'var(--theme-surface)',
                    borderColor: 'color-mix(in srgb, var(--theme-primary) 50%, transparent)',
                    borderWidth: '1px',
                    boxShadow: '0 4px 12px var(--theme-glow)'
                  }}
                >
                  <AndroidIcon className="w-4 h-4 text-green-400" />
                </div>
              </div>

              <div className="absolute inset-0 animate-orbit" style={{ animationDelay: '-8s' }}>
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
                  style={{
                    background: 'var(--theme-surface)',
                    borderColor: 'color-mix(in srgb, var(--theme-secondary) 50%, transparent)',
                    borderWidth: '1px'
                  }}
                >
                  <FlutterIcon className="w-4 h-4 text-cyan-400" />
                </div>
              </div>

              <div className="absolute inset-0 animate-orbit" style={{ animationDelay: '-16s' }}>
                <div
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
                  style={{
                    background: 'var(--theme-surface)',
                    borderColor: 'rgba(148, 163, 184, 0.4)',
                    borderWidth: '1px'
                  }}
                >
                  <AppleIcon className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            </div>

            {/* Profile Image Container */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
              {/* Gradient Border */}
              <div
                className="absolute inset-0 rounded-full p-[3px] shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))`,
                  boxShadow: '0 8px 32px var(--theme-glow)'
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden" style={{ background: 'var(--theme-surface)' }}>
                  <Image
                    src="/personal.jpg"
                    alt="Nafis Islam Kabbo"
                    fill
                    className="object-cover rounded-full"
                    priority
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 flex-1 max-w-xl lg:max-w-none">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-5 transition-colors"
              style={{
                background: 'color-mix(in srgb, var(--theme-primary) 15%, transparent)',
                border: '1px solid color-mix(in srgb, var(--theme-primary) 30%, transparent)'
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--theme-primary)' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--theme-primary)' }}></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide" style={{ color: 'var(--theme-primary)' }}>Available for Freelance</span>
            </div>

            {/* Name & Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 leading-tight">
              <span className="text-white">Hi, I&apos;m </span>
              <span className="theme-gradient-text">Nafis Islam Kabbo</span>
            </h1>

            {/* Role Tags - Clickable for theme change */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-5 sm:mb-6">
              {techBadges.map(({ id, icon: Icon, label, themeColor }) => (
                <button
                  key={id}
                  onClick={(e) => handleTechClick(id, e)}
                  disabled={isTransitioning}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r ${themeColor} border backdrop-blur-md transition-all duration-300 hover:scale-105 disabled:opacity-70 ${theme === id ? 'ring-2 ring-offset-2 ring-offset-[var(--theme-background)] ring-[var(--theme-primary)]' : ''
                    }`}
                  title={`Switch to ${label} theme`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-semibold text-xs sm:text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto lg:mx-0 mb-5 sm:mb-6 leading-relaxed">
              Mobile App Developer specializing in{' '}
              <button
                onClick={(e) => handleTechClick('flutter', e)}
                className="text-cyan-400 font-semibold hover:underline cursor-pointer"
              >
                Flutter
              </button>,{' '}
              <button
                onClick={(e) => handleTechClick('android', e)}
                className="text-green-400 font-semibold hover:underline cursor-pointer"
              >
                Kotlin
              </button>, &{' '}
              <button
                onClick={(e) => handleTechClick('ios', e)}
                className="text-blue-400 font-semibold hover:underline cursor-pointer"
              >
                Swift
              </button>.
              Building beautiful, performant apps with clean architecture.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-5 sm:mb-6">
              <Link
                href="/#contact"
                className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-white font-semibold shadow-xl transition-all duration-300 hover:scale-105 text-sm"
                style={{
                  background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))`,
                  boxShadow: '0 8px 24px var(--theme-glow)'
                }}
              >
                <EmailIcon className="w-4 h-4" />
                <span>Hire Me</span>
              </Link>
              <a
                href="/cv.pdf"
                onClick={handleDownloadCV}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-transparent border-2 font-semibold transition-all duration-300 hover:scale-105 text-sm"
                style={{
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-primary)'
                }}
              >
                <DownloadIcon className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl text-slate-400 ${color} transition-all duration-300 hover:scale-110 flex items-center justify-center`}
                  style={{
                    background: 'var(--theme-surface)',
                    border: '1px solid var(--theme-border)'
                  }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
