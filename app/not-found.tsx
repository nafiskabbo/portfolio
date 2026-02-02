'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HomeIcon, ArrowRightIcon } from './components/Icons';
import { ThemeBackground } from './components/ThemeBackground';
import { Mascot2D } from './components/Mascot2D';
import { useTheme } from './components/ThemeProvider';

const codeLines = [
  'const page = await fetch(url);',
  '',
  'if (!page.found) {',
  '  throw new Error("404");',
  '}',
];

const funFacts = [
  "Built 50+ apps across 8 countries",
  "Clean code enthusiast",
  "Flutter & native expert",
  "Available for hire",
];

export default function NotFound() {
  const { theme } = useTheme();
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [currentFact, setCurrentFact] = useState(0);

  // Typing effect for code
  useEffect(() => {
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => [...prev, codeLines[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  // Rotating fun facts
  useEffect(() => {
    const factTimer = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % funFacts.length);
    }, 3000);
    return () => clearInterval(factTimer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Theme Background */}
      <ThemeBackground intensity="medium" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* 2D Mascot decorations */}
      <div className="hidden lg:block absolute right-12 top-1/4 z-10 opacity-40">
        <Mascot2D size="medium" position="right" />
      </div>
      <div className="hidden xl:block absolute left-12 bottom-1/4 z-10 opacity-30">
        <Mascot2D size="small" position="left" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-12">
        <div className="text-center">
          {/* 404 Display */}
          <div className="relative mb-6">
            <h1 
              className="text-[100px] sm:text-[140px] lg:text-[180px] font-bold leading-none tracking-tighter select-none theme-gradient-text"
            >
              404
            </h1>
            
            {/* Decorative brackets */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
              <span className="text-[60px] sm:text-[100px] lg:text-[120px] font-mono -ml-24 sm:-ml-36 lg:-ml-48" style={{ color: 'var(--theme-primary)' }}>{`{`}</span>
              <span className="text-[60px] sm:text-[100px] lg:text-[120px] font-mono ml-24 sm:ml-36 lg:ml-48" style={{ color: 'var(--theme-primary)' }}>{`}`}</span>
            </div>
          </div>

          {/* Code Terminal - Compact */}
          <div 
            className="max-w-md mx-auto mb-8 rounded-xl overflow-hidden shadow-2xl"
            style={{ background: 'var(--theme-surface)', border: '1px solid var(--theme-border)' }}
          >
            {/* Terminal Header */}
            <div 
              className="flex items-center gap-2 px-4 py-2.5"
              style={{ borderBottom: '1px solid var(--theme-border)' }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-slate-500 text-xs ml-2 font-mono">terminal</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-4 font-mono text-left text-xs sm:text-sm">
              {displayedCode.map((line, index) => (
                <div 
                  key={index} 
                  className={`${
                    line.includes('Error') 
                      ? 'text-red-400' 
                      : line.includes('if') || line.includes('throw')
                        ? 'text-slate-300'
                        : 'text-slate-500'
                  }`}
                  style={line.includes('fetch') || line.includes('await') ? { color: 'var(--theme-primary)' } : {}}
                >
                  {line || '\u00A0'}
                </div>
              ))}
              <span 
                className="inline-block w-2 h-4 animate-pulse ml-0.5"
                style={{ background: 'var(--theme-primary)' }}
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">
              Page Not Found
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-sm mx-auto mb-4">
              This page went on vacation! But I&apos;m still here ready to build amazing things.
            </p>
            
            {/* Fun Fact - Compact */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm"
              style={{ 
                background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--theme-primary) 25%, transparent)'
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--theme-primary)' }}
              />
              <p 
                key={currentFact}
                className="animate-fade-in"
                style={{ color: 'var(--theme-primary)' }}
              >
                {funFacts[currentFact]}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-xl transition-all duration-300 hover:scale-105 text-sm"
              style={{ 
                background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                boxShadow: '0 8px 24px var(--theme-glow)'
              }}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group text-sm"
              style={{ 
                background: 'transparent',
                border: '1px solid var(--theme-border)',
                color: 'var(--theme-primary)'
              }}
            >
              <span>Hire Me Instead</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-slate-600 text-xs">
          Error 404 • <span style={{ color: 'var(--theme-primary)' }}>Nafis Islam Kabbo</span>
        </p>
      </div>
    </main>
  );
}
