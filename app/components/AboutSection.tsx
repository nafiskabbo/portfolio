'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationIcon, CodeIcon, MobileIcon } from './Icons';

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
    color: 'from-cyan-500 to-blue-500',
  },
  {
    year: '2020',
    title: 'Started Programming Journey',
    subtitle: 'Self-taught Developer',
    description: 'Wrote my first line of code and discovered my passion for programming and building impactful applications.',
    icon: CodeIcon,
    color: 'from-green-500 to-emerald-500',
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
      className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Passionate About Building{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Amazing Apps
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Ever since I wrote my first line of code in 2020, I knew programming was more than just a skill—it was my passion.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - About Text */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed text-lg">
                I&apos;m a <span className="text-cyan-400 font-semibold">Mobile & Web Developer</span> with expertise in 
                Java, Kotlin, SwiftUI, Dart, and Flutter. I&apos;m passionate about programming and continuously 
                exploring innovative solutions.
              </p>
              <p className="text-slate-300 leading-relaxed">
                With hands-on experience in Flutter, Kotlin, Java, and full-stack development, I create 
                innovative mobile and web applications that are both functional and impactful. My focus? 
                <span className="text-cyan-400"> Clean code</span>, 
                <span className="text-blue-400"> optimized performance</span>, and 
                <span className="text-purple-400"> seamless user experiences</span>.
              </p>
            </div>

            {/* What I Build */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4">What I Build</h3>
              <div className="grid grid-cols-2 gap-3">
                {whatIBuild.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {value}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm mt-1">{label}</div>
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
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              My Journey
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {timeline.map(({ year, title, subtitle, description, icon: Icon, color }, index) => (
                  <div
                    key={title}
                    className="relative pl-16"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-3 w-6 h-6 rounded-full bg-gradient-to-r ${color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>

                    {/* Content */}
                    <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                      <span className="text-cyan-400 text-sm font-medium">{year}</span>
                      <h4 className="text-white font-bold mt-1">{title}</h4>
                      <p className="text-slate-400 text-sm">{subtitle}</p>
                      <p className="text-slate-500 text-sm mt-2">{description}</p>
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
