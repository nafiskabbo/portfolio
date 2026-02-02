'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MenuIcon, CloseIcon, AndroidIcon, AppleIcon, FlutterIcon, NextJsIcon } from './Icons';
import { useTheme, themeConfig, Theme } from './ThemeProvider';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

const themeOptions: { id: Theme; icon: typeof AndroidIcon; label: string }[] = [
  { id: 'android', icon: AndroidIcon, label: 'Android' },
  { id: 'ios', icon: AppleIcon, label: 'iOS' },
  { id: 'flutter', icon: FlutterIcon, label: 'Flutter' },
  { id: 'web', icon: NextJsIcon, label: 'Next.js' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, isTransitioning } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.theme-menu-container')) {
        setIsThemeMenuOpen(false);
      }
    };

    if (isThemeMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isThemeMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const currentTheme = themeOptions.find((t) => t.id === theme);
  const CurrentIcon = currentTheme?.icon || AndroidIcon;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--theme-surface)]/95 backdrop-blur-md shadow-lg border-b border-[var(--theme-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-all duration-300">
              <Image src="/logo.png" alt="Nafis Logo" width={40} height={40} className="object-cover" />
            </div>
            <span className="text-lg font-bold theme-gradient-text">Nafis</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-[var(--theme-primary)] bg-[var(--theme-primary)]/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Switcher & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher Button */}
            <div className="relative theme-menu-container">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  isThemeMenuOpen
                    ? 'bg-[var(--theme-primary)]/20 border-[var(--theme-primary)]/50 text-[var(--theme-primary)]'
                    : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-slate-300 hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30'
                }`}
                aria-label="Change theme"
              >
                <CurrentIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{currentTheme?.label}</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${isThemeMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Theme Dropdown */}
              <div
                className={`absolute right-0 top-full mt-2 w-44 py-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-xl shadow-black/20 transition-all duration-200 ${
                  isThemeMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                }`}
              >
                <div className="px-3 py-1.5 mb-1">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Select Theme</span>
                </div>
                {themeOptions.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setTheme(id, true);
                      setIsThemeMenuOpen(false);
                    }}
                    disabled={isTransitioning}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200 ${
                      theme === id
                        ? 'bg-[var(--theme-primary)]/15 text-[var(--theme-primary)]'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                    {theme === id && (
                      <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[var(--theme-surface)]/98 backdrop-blur-md border-t border-[var(--theme-border)] px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? 'text-[var(--theme-primary)] bg-[var(--theme-primary)]/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
