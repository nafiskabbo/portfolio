'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationIcon, CodeIcon, MobileIcon, CheckCircleIcon, BriefcaseIcon } from './Icons';
import { ThemeBackground } from './ThemeBackground';
import { Mascot2D } from './Mascot2D';

const stats = [
  { value: '5+', label: 'Years Exp' },
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients' },
  { value: '8', label: 'Countries' },
];

const timeline = [
  {
    year: '2024 - Present',
    title: 'BSc in CSE',
    subtitle: 'Rajshahi University of Engineering & Technology (RUET)',
    description: 'Pursuing higher education while continuing freelance work.',
    icon: GraduationIcon,
  },
  {
    year: '2020 - Present',
    title: 'Mobile & Web Developer',
    subtitle: 'Freelancer',
    description: 'Built 50+ mobile and web applications with focus on innovation.',
    icon: MobileIcon,
  },
  {
    year: '2020',
    title: 'Started Coding',
    subtitle: 'Self-taught',
    description: 'Discovered passion for programming and app development.',
    icon: CodeIcon,
  },
];

const whatIBuild = [
  'Android Apps (Kotlin, Java)',
  'iOS Apps (Swift)',
  'Cross-Platform (Flutter)',
  'Web Applications',
  'Backend APIs',
  'AI Integration',
];

const availability = [
  { title: 'Freelance', description: 'Mobile & web dev', icon: '💼' },
  { title: 'Startups', description: 'MVP development', icon: '🚀' },
  { title: 'Remote', description: 'Flexible timezone', icon: '🌍' },
  { title: 'Enterprise', description: 'Business apps', icon: '🏢' },
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 lg:py-20 overflow-hidden"
    >
      {/* Animated Theme Background */}
      <ThemeBackground intensity="medium" />

      {/* 2D Mascot - Left side */}
      <div className="hidden lg:block absolute left-8 top-1/4 z-10">
        <Mascot2D size="medium" position="left" />
      </div>
      
      {/* Additional mascot on right */}
      <div className="hidden xl:block absolute right-8 bottom-32 z-10 opacity-40">
        <Mascot2D size="small" position="right" />
      </div>

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <span className="theme-badge inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            About Me
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Passionate About Building{' '}
            <span className="theme-gradient-text">Amazing Apps</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ever since I wrote my first line of code in 2020, programming became my passion.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start mb-12">
          {/* Left Column - About Text */}
          <div
            className={`space-y-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed text-sm lg:text-base">
                I&apos;m a <span style={{ color: 'var(--theme-primary)' }} className="font-bold">Mobile & Web Developer</span> with expertise in
                Java, Kotlin, SwiftUI, Dart, and Flutter. Passionate about innovative solutions.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                I create mobile and web applications that are both functional and impactful with focus on
                <span style={{ color: 'var(--theme-primary)' }} className="font-semibold"> clean code</span>,
                <span style={{ color: 'var(--theme-secondary)' }} className="font-semibold"> optimized performance</span>, and
                <span className="text-blue-400 font-semibold"> seamless UX</span>.
              </p>
            </div>

            {/* What I Build */}
            <div className="theme-card rounded-xl p-4 lg:p-5">
              <h3 className="text-base lg:text-lg font-bold text-white mb-4">What I Build</h3>
              <div className="grid grid-cols-2 gap-2">
                {whatIBuild.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--theme-primary)' }} />
                    <span className="text-slate-300 text-xs lg:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="theme-card text-center p-3 lg:p-4 rounded-xl"
                >
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold theme-gradient-text">{value}</div>
                  <div className="text-slate-400 text-[10px] sm:text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-base lg:text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))' }} />
              My Journey
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div 
                className="absolute left-4 lg:left-5 top-0 bottom-0 w-0.5 rounded-full"
                style={{ background: 'linear-gradient(180deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))' }}
              />

              {/* Timeline Items */}
              <div className="space-y-4">
                {timeline.map(({ year, title, subtitle, description, icon: Icon }) => (
                  <div key={title} className="relative pl-10 lg:pl-12">
                    {/* Timeline Dot */}
                    <div 
                      className="absolute left-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg ring-4 ring-[var(--theme-background)]"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))'
                      }}
                    >
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="theme-card rounded-xl p-3 lg:p-4">
                      <span className="theme-badge inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2">{year}</span>
                      <h4 className="text-white font-bold text-sm mb-0.5">{title}</h4>
                      <p className="text-slate-400 text-xs mb-1">{subtitle}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Availability Section - Redesigned */}
        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Gradient border wrapper */}
          <div 
            className="relative p-[2px] rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
            }}
          >
            {/* Animated glow effect */}
            <div 
              className="absolute inset-0 blur-xl opacity-50 animate-pulse-glow"
              style={{
                background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
              }}
            />
            
            {/* Inner content */}
            <div 
              className="relative rounded-2xl p-6 lg:p-8"
              style={{ background: 'var(--theme-surface)' }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Animated hiring badge */}
                  <div 
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                      boxShadow: '0 4px 20px var(--theme-glow)'
                    }}
                  >
                    {/* Shine animation */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    <span className="relative text-white font-bold text-sm tracking-wide">HIRING ME</span>
                  </div>
                  
                  <div className="hidden sm:block">
                    <h3 className="text-xl lg:text-2xl font-bold text-white">Available for Opportunities</h3>
                    <p className="text-slate-400 text-sm">Let&apos;s build something amazing together</p>
                  </div>
                </div>
                
                {/* CTA Button */}
                <a 
                  href="#contact"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: 'var(--theme-background)',
                    border: '1px solid var(--theme-border)',
                    color: 'var(--theme-primary)'
                  }}
                >
                  <span>Get in Touch</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Availability Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {availability.map(({ title, description, icon }, index) => (
                  <div
                    key={title}
                    className="group relative p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-default"
                    style={{ 
                      background: 'var(--theme-background)',
                      border: '1px solid var(--theme-border)'
                    }}
                  >
                    {/* Hover glow */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        background: 'radial-gradient(circle at center, var(--theme-glow), transparent 70%)'
                      }}
                    />
                    
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{icon}</span>
                        <CheckCircleIcon className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
                      <p className="text-slate-400 text-xs">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom tagline */}
              <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px solid var(--theme-border)' }}>
                <p className="text-slate-500 text-xs">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--theme-primary)' }} />
                    Response time: Usually within 24 hours
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
