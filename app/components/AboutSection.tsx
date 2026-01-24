'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationIcon, CodeIcon, MobileIcon, AndroidIcon, FlutterIcon } from './Icons';

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5', label: 'Countries Served' },
];

const timeline = [
  {
    year: '2024 - Present',
    title: 'BSc in Computer Science & Engineering',
    subtitle: 'Rajshahi University of Engineering & Technology (RUET)',
    description: 'Pursuing higher education while continuing freelance development work.',
    icon: GraduationIcon,
    color: 'from-purple-500 to-pink-500',
  },
  {
    year: '2020 - Present',
    title: 'Professional Mobile Developer',
    subtitle: 'Freelancer.com & Direct Clients',
    description: 'Started app development during COVID, focusing on innovation and user experience. Built 50+ mobile applications.',
    icon: MobileIcon,
    color: 'from-green-500 to-cyan-500',
  },
  {
    year: '2020',
    title: 'Started Programming Journey',
    subtitle: 'Self-taught Developer',
    description: 'Wrote my first line of code and discovered my passion for programming and building impactful applications.',
    icon: CodeIcon,
    color: 'from-cyan-500 to-blue-500',
  },
];

const whatIBuild = [
  'Android Apps (Kotlin, Java)',
  'iOS Apps (Swift)',
  'Cross-Platform (Flutter)',
  'Web Applications',
  'Backend APIs',
  'ML Features',
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
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-cyan-500/8 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-green-500/5 rounded-full blur-3xl" />

      {/* Floating Elements - Hidden on mobile for cleaner look */}
      <div className="absolute left-[8%] top-[20%] hidden xl:block animate-float-slow opacity-50">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <AndroidIcon className="w-5 h-5 text-green-500/60" />
        </div>
      </div>
      <div className="absolute right-[10%] bottom-[25%] hidden xl:block animate-float opacity-50" style={{ animationDelay: '2s' }}>
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <FlutterIcon className="w-4 h-4 text-cyan-500/60" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            About Me
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">
            Passionate About Building{' '}
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              Amazing Apps
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Ever since I wrote my first line of code in 2020, I knew programming was more than just a skill—it was my passion.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column - About Text */}
          <div
            className={`space-y-6 sm:space-y-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg md:text-xl">
                I&apos;m a <span className="text-green-400 font-bold">Mobile & Web Developer</span> with expertise in 
                Java, Kotlin, SwiftUI, Dart, and Flutter. I&apos;m passionate about programming and continuously 
                exploring innovative solutions.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base md:text-lg">
                With hands-on experience in Flutter, Kotlin, Java, and full-stack development, I create 
                innovative mobile and web applications that are both functional and impactful. My focus? 
                <span className="text-green-400 font-semibold"> Clean code</span>, 
                <span className="text-cyan-400 font-semibold"> optimized performance</span>, and 
                <span className="text-blue-400 font-semibold"> seamless user experiences</span>.
              </p>
            </div>

            {/* What I Build */}
            <div className="bg-slate-800/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">What I Build</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {whatIBuild.map((item) => (
                  <div key={item} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 flex-shrink-0" />
                    <span className="text-slate-300 text-xs sm:text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-green-500/30 transition-colors backdrop-blur-sm"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                    {value}
                  </div>
                  <div className="text-slate-400 text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 flex items-center gap-3">
              <span className="w-8 h-1 sm:w-10 sm:h-1.5 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full" />
              My Journey
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[18px] sm:left-8 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-green-500 via-cyan-500 to-blue-500 rounded-full" />

              {/* Timeline Items */}
              <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                {timeline.map(({ year, title, subtitle, description, icon: Icon, color }) => (
                  <div
                    key={title}
                    className="relative pl-12 sm:pl-20"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 sm:left-4 w-9 h-9 rounded-full bg-gradient-to-r ${color} flex items-center justify-center shadow-lg ring-4 ring-slate-900`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    {/* Content */}
                    <div className="bg-slate-800/40 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 backdrop-blur-sm">
                      <span className="inline-block px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-green-500/10 text-green-400 text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3">{year}</span>
                      <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">{title}</h4>
                      <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">{subtitle}</p>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
