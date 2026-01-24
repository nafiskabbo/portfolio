'use client';

import Link from 'next/link';
import { GithubIcon, LinkedInIcon, FreelancerIcon, WhatsAppIcon, AndroidIcon, AppleIcon, FlutterIcon } from './Icons';

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/nafiskabbo', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/nafiskabbo30/', label: 'LinkedIn' },
  { icon: FreelancerIcon, href: 'https://www.freelancer.com/u/nafiskabbo30', label: 'Freelancer' },
  { icon: WhatsAppIcon, href: 'https://wa.me/8801772988050', label: 'WhatsApp' },
];

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

const techStack = [
  { icon: AndroidIcon, label: 'Android', color: 'text-green-400' },
  { icon: AppleIcon, label: 'iOS', color: 'text-slate-300' },
  { icon: FlutterIcon, label: 'Flutter', color: 'text-cyan-400' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                <AndroidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                Nafis Kabbo
              </span>
            </Link>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
              Mobile Developer specializing in Flutter, Kotlin, and Swift. Building beautiful apps with clean architecture and seamless user experiences.
            </p>
            
            {/* Tech Stack Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {techStack.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-800/60 border border-slate-700/50 ${color} hover:border-green-500/30 transition-colors`}
                  title={label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-green-400 transition-colors text-sm sm:text-base"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Connect</h3>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-green-400 hover:border-green-500/30 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
            <a 
              href="mailto:nafiskabbo30@gmail.com"
              className="text-slate-400 hover:text-green-400 transition-colors text-xs sm:text-sm break-all"
            >
              nafiskabbo30@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} Nafis Islam Kabbo. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
            <span>Built with</span>
            <span className="text-green-400 font-medium">Next.js</span>
            <span>&</span>
            <span className="text-cyan-400 font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
