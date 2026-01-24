'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AndroidIcon, HomeIcon, ArrowRightIcon } from './components/Icons';

const codeLines = [
  'const developer = {',
  '  name: "Nafis Islam Kabbo",',
  '  skills: ["Flutter", "Kotlin", "Swift"],',
  '  passion: "Building amazing apps",',
  '  status: "Available for hire"',
  '};',
  '',
  '// Oops! Page not found',
  'throw new Error("404");',
];

const funFacts = [
  "Built 50+ mobile apps across 5 countries",
  "Writes clean code that even future-me appreciates",
  "Believes coffee is the secret to great code",
  "Started coding in 2020 and never looked back",
  "Flutter enthusiast & cross-platform advocate",
];

export default function NotFound() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [currentFact, setCurrentFact] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  // Typing effect for code
  useEffect(() => {
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => [...prev, codeLines[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  // Rotating fun facts
  useEffect(() => {
    const factTimer = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % funFacts.length);
    }, 4000);
    return () => clearInterval(factTimer);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px] animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[80px] animate-pulse-glow" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="text-center">
          {/* 404 Display with Glitch Effect */}
          <div className={`relative mb-8 ${glitchActive ? 'animate-pulse' : ''}`}>
            <h1 
              className="text-[120px] sm:text-[180px] lg:text-[220px] font-bold leading-none tracking-tighter select-none"
              style={{
                background: 'linear-gradient(135deg, #3DDC84 0%, #06b6d4 50%, #ef4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: glitchActive ? '3px 0 #ef4444, -3px 0 #3DDC84' : 'none',
              }}
            >
              404
            </h1>
            
            {/* Decorative brackets */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <span className="text-[80px] sm:text-[120px] lg:text-[160px] text-slate-500 font-mono -ml-32 sm:-ml-48 lg:-ml-64">{`{`}</span>
              <span className="text-[80px] sm:text-[120px] lg:text-[160px] text-slate-500 font-mono ml-32 sm:ml-48 lg:ml-64">{`}`}</span>
            </div>
          </div>

          {/* Code Terminal */}
          <div className="max-w-xl mx-auto mb-10 bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden backdrop-blur-sm shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-slate-500 text-sm ml-2 font-mono">nafis@portfolio:~</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-5 sm:p-6 font-mono text-left text-sm sm:text-base">
              {displayedCode.map((line, index) => (
                <div 
                  key={index} 
                  className={`${
                    line.includes('//') 
                      ? 'text-slate-500' 
                      : line.includes('Error') 
                        ? 'text-red-400' 
                        : line.includes(':') 
                          ? 'text-cyan-400' 
                          : 'text-green-400'
                  }`}
                >
                  {line || '\u00A0'}
                </div>
              ))}
              <span className="inline-block w-2.5 h-5 bg-green-400 animate-pulse ml-1" />
            </div>
          </div>

          {/* Message */}
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto mb-6 leading-relaxed">
              Looks like this page went on vacation! But don&apos;t worry, I&apos;m still here ready to build amazing things.
            </p>
            
            {/* Fun Fact */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <AndroidIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p 
                key={currentFact}
                className="text-slate-300 text-sm sm:text-base animate-fade-in"
              >
                {funFacts[currentFact]}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-transparent border-2 border-slate-600 text-slate-300 font-bold hover:border-green-500 hover:text-green-400 transition-all duration-300 hover:scale-105 group"
            >
              <span>Hire Me Instead</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-slate-600 text-sm">
          Error 404 • <span className="text-green-400/60">Nafis Islam Kabbo</span>
        </p>
      </div>
    </main>
  );
}
