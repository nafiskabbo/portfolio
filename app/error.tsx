'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { HomeIcon, RocketIcon } from './components/Icons';
import { ThemeBackgroundCompact } from './components/ThemeBackground';
import { Mascot2D } from './components/Mascot2D';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Theme Background */}
      <ThemeBackgroundCompact />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* 2D Mascot decoration */}
      <div className="hidden lg:block absolute right-12 bottom-1/4 z-10 opacity-30">
        <Mascot2D size="small" position="right" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-12">
        <div className="text-center">
          {/* Error Icon */}
          <div className="relative mb-6">
            <div 
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full flex items-center justify-center"
              style={{ 
                background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--theme-primary) 25%, transparent)'
              }}
            >
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center animate-pulse"
                style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
              >
                <span className="text-white text-2xl sm:text-3xl font-bold">!</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Oops! Something went{' '}
            <span className="theme-gradient-text">wrong</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-sm mx-auto mb-6">
            Don&apos;t worry, even the best apps crash sometimes. Let&apos;s try again!
          </p>

          {/* Fun fact box */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8 text-xs sm:text-sm"
            style={{ 
              background: 'var(--theme-surface)',
              border: '1px solid var(--theme-border)'
            }}
          >
            <RocketIcon className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
            <p className="text-slate-300">
              I debug faster than most people write bugs!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-xl transition-all duration-300 hover:scale-105 text-sm"
              style={{ 
                background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                boxShadow: '0 8px 24px var(--theme-glow)'
              }}
            >
              <RocketIcon className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm"
              style={{ 
                background: 'transparent',
                border: '1px solid var(--theme-border)',
                color: 'var(--theme-primary)'
              }}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-slate-600 text-xs">
          Error occurred • <span style={{ color: 'var(--theme-primary)' }}>Nafis Islam Kabbo</span>
        </p>
      </div>
    </main>
  );
}
