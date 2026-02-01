'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationIcon, CodeIcon, MobileIcon, AndroidIcon, FlutterIcon, CheckCircleIcon, BriefcaseIcon } from './Icons';

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
  'AI & ML Integration',
];

const availability = [
  { title: 'Freelance Projects', description: 'Custom mobile & web development' },
  { title: 'Startup Collaboration', description: 'MVP development & scaling' },
  { title: 'Remote Work', description: 'Flexible timezone & communication' },
  { title: 'Business Solutions', description: 'Enterprise-grade applications' },
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
      className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-72 h-72 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-56 h-56 lg:w-72 lg:h-72 bg-green-500/5 rounded-full blur-3xl" />

      {/* Floating Elements */}
      <div className="absolute left-[5%] top-[15%] hidden xl:block animate-float-slow opacity-40">
        <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <AndroidIcon className="w-6 h-6 text-green-500/60" />
        </div>
      </div>
      <div className="absolute right-[8%] bottom-[20%] hidden xl:block animate-float opacity-40" style={{ animationDelay: '2s' }}>
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <FlutterIcon className="w-5 h-5 text-cyan-500/60" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold mb-6">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Passionate About Building{' '}
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              Amazing Apps
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Ever since I wrote my first line of code in 2020, I knew programming was more than just a skill—it was my passion.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start mb-20">
          {/* Left Column - About Text */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="space-y-5">
              <p className="text-slate-300 leading-relaxed text-lg lg:text-xl">
                I&apos;m a <span className="text-green-400 font-bold">Mobile & Web Developer</span> with expertise in 
                Java, Kotlin, SwiftUI, Dart, and Flutter. I&apos;m passionate about programming and continuously 
                exploring innovative solutions.
              </p>
              <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
                With hands-on experience in Flutter, Kotlin, Java, and full-stack development, I create 
                innovative mobile and web applications that are both functional and impactful. My focus? 
                <span className="text-green-400 font-semibold"> Clean code</span>, 
                <span className="text-cyan-400 font-semibold"> optimized performance</span>, and 
                <span className="text-blue-400 font-semibold"> seamless user experiences</span>.
              </p>
            </div>

            {/* What I Build */}
            <div className="bg-slate-800/50 rounded-2xl p-6 lg:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">What I Build</h3>
              <div className="grid grid-cols-2 gap-4">
                {whatIBuild.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 flex-shrink-0" />
                    <span className="text-slate-300 text-sm lg:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-5 lg:p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-green-500/30 transition-colors backdrop-blur-sm"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                    {value}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm mt-2">{label}</div>
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
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-1 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full" />
              My Journey
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-5 lg:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-cyan-500 to-blue-500 rounded-full" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {timeline.map(({ year, title, subtitle, description, icon: Icon, color }) => (
                  <div key={title} className="relative pl-14 lg:pl-16">
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r ${color} flex items-center justify-center shadow-lg ring-4 ring-slate-900`}>
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="bg-slate-800/50 rounded-2xl p-5 lg:p-6 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 backdrop-blur-sm">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold mb-3">{year}</span>
                      <h4 className="text-white font-bold text-base lg:text-lg mb-1">{title}</h4>
                      <p className="text-slate-400 text-sm mb-2">{subtitle}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Availability Section */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Work
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white">Open to Opportunities</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {availability.map(({ title, description }, index) => (
              <div
                key={title}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-700/50 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <BriefcaseIcon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">{title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <CheckCircleIcon className="w-5 h-5 text-green-500/60 group-hover:text-green-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
