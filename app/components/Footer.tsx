'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  GithubIcon,
  LinkedInIcon,
  FreelancerIcon,
  WhatsAppIcon,
  AndroidIcon,
  AppleIcon,
  FlutterIcon,
  YouTubeIcon,
  InstagramIcon,
  UpworkIcon,
  NextJsIcon,
} from './Icons';
import { useTheme, Theme } from './ThemeProvider';

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/nafiskabbo', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/nafiskabbo30/', label: 'LinkedIn' },
  { icon: WhatsAppIcon, href: 'https://wa.me/8801772988050', label: 'WhatsApp' },
  { icon: FreelancerIcon, href: 'https://www.freelancer.com/u/nafiskabbo30', label: 'Freelancer' },
  { icon: UpworkIcon, href: 'https://www.upwork.com/freelancers/~01b2fc2f4ff397f8ca', label: 'Upwork' },
  { icon: YouTubeIcon, href: 'https://www.youtube.com/@nafiskabbo30', label: 'YouTube' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/nafiskabbo30/', label: 'Instagram' },
];

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

const techStack: { icon: typeof AndroidIcon; label: string; theme: Theme }[] = [
  { icon: AndroidIcon, label: 'Android', theme: 'android' },
  { icon: AppleIcon, label: 'iOS', theme: 'ios' },
  { icon: FlutterIcon, label: 'Flutter', theme: 'flutter' },
  { icon: NextJsIcon, label: 'Next.js', theme: 'web' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme, setTheme, isTransitioning } = useTheme();

  const handleTechClick = (targetTheme: Theme) => {
    if (!isTransitioning) {
      setTheme(targetTheme, true);
    }
  };

  return (
    <footer style={{ background: 'var(--theme-background)', borderTop: '1px solid var(--theme-border)' }}>
      <div className="section-container py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg overflow-hidden shadow-lg" style={{ boxShadow: '0 4px 12px var(--theme-glow)' }}>
                <Image src="/logo.png" alt="Nafis Logo" width={36} height={36} className="object-cover" />
              </div>
              <span className="text-xl font-bold theme-gradient-text">Nafis Kabbo</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-md">
              Mobile Developer specializing in Flutter, Kotlin, and Swift. Building beautiful apps with clean architecture.
            </p>

            {/* Tech Stack Icons - Clickable */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs mr-1">Theme:</span>
              {techStack.map(({ icon: Icon, label, theme: targetTheme }) => {
                const isActive = theme === targetTheme;
                return (
                  <button
                    key={label}
                    onClick={() => handleTechClick(targetTheme)}
                    disabled={isTransitioning}
                    className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-70 ${
                      isActive ? 'ring-2 ring-offset-2' : ''
                    }`}
                    style={{ 
                      background: 'var(--theme-surface)',
                      border: '1px solid var(--theme-border)',
                      ringColor: isActive ? 'var(--theme-primary)' : undefined,
                      ringOffsetColor: 'var(--theme-background)'
                    }}
                    title={`Switch to ${label} theme`}
                  >
                    <Icon 
                      className="w-4 h-4 transition-colors" 
                      style={{ color: isActive ? 'var(--theme-primary)' : 'rgb(148, 163, 184)' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-[var(--theme-primary)] transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">Connect</h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg text-slate-400 hover:text-[var(--theme-primary)] transition-all flex items-center justify-center"
                  style={{ background: 'var(--theme-surface)', border: '1px solid var(--theme-border)' }}
                  aria-label={label}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href="mailto:nafiskabbo30@gmail.com"
              className="text-slate-400 hover:text-[var(--theme-primary)] transition-colors text-xs break-all"
            >
              nafiskabbo30@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid var(--theme-border)' }}>
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © {currentYear} Nafis Islam Kabbo. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            <span>Built with</span>
            <button 
              onClick={() => handleTechClick('web')}
              className="font-medium hover:underline cursor-pointer"
              style={{ color: 'var(--theme-primary)' }}
            >
              Next.js
            </button>
            <span>&</span>
            <span className="text-cyan-400 font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
