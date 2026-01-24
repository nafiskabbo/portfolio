'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AndroidIcon, HomeIcon, RocketIcon } from './components/Icons';

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
    <main className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-red-500/10 rounded-full blur-[100px] animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-orange-500/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '5s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="text-center">
          {/* Error Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center animate-pulse">
                <span className="text-white text-3xl sm:text-4xl font-bold">!</span>
              </div>
            </div>
            
            {/* Orbiting element */}
            <div className="absolute inset-0 animate-orbit">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border border-red-500/40 flex items-center justify-center shadow-lg">
                <AndroidIcon className="w-4 h-4 text-red-400" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Oops! Something went{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
              wrong
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto mb-8 leading-relaxed">
            Don&apos;t worry, even the best apps crash sometimes. The good news? I build them to recover gracefully!
          </p>

          {/* Fun fact box */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 mb-10">
            <RocketIcon className="w-5 h-5 text-orange-400 flex-shrink-0" />
            <p className="text-slate-300 text-sm sm:text-base">
              Fun fact: I debug faster than most people write bugs!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow-xl shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
            >
              <RocketIcon className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-transparent border-2 border-slate-600 text-slate-300 font-bold hover:border-red-500 hover:text-red-400 transition-all duration-300 hover:scale-105"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-slate-600 text-sm">
          Error occurred • <span className="text-red-400/60">Nafis Islam Kabbo</span>
        </p>
      </div>
    </main>
  );
}
