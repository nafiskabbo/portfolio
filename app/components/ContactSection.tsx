'use client';

import { useEffect, useRef, useState } from 'react';
import {
  LinkedInIcon,
  FreelancerIcon,
  EmailIcon,
  WhatsAppIcon,
  DownloadIcon,
  ExternalLinkIcon,
  AndroidIcon,
  FlutterIcon,
} from './Icons';

const contactLinks = [
  {
    title: 'Email',
    value: 'nafiskabbo30@gmail.com',
    href: 'mailto:nafiskabbo30@gmail.com',
    icon: EmailIcon,
    gradient: 'from-red-500 to-rose-600',
    description: 'Best for project inquiries',
  },
  {
    title: 'WhatsApp',
    value: '+880 1772 988050',
    href: 'https://wa.me/8801772988050',
    icon: WhatsAppIcon,
    gradient: 'from-green-500 to-emerald-600',
    description: 'Quick response guaranteed',
  },
  {
    title: 'LinkedIn',
    value: 'nafiskabbo30',
    href: 'https://www.linkedin.com/in/nafiskabbo30/',
    icon: LinkedInIcon,
    gradient: 'from-blue-500 to-blue-700',
    description: 'Professional network',
  },
  {
    title: 'Freelancer',
    value: 'nafiskabbo30',
    href: 'https://www.freelancer.com/u/nafiskabbo30',
    icon: FreelancerIcon,
    gradient: 'from-cyan-500 to-teal-500',
    description: 'Hire me for projects',
  },
];

export function ContactSection() {
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
      id="contact"
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-green-500/8 rounded-full blur-3xl" />

      {/* Floating Elements - Hidden on smaller screens */}
      <div className="absolute left-[8%] top-1/4 hidden xl:block animate-float-slow opacity-50">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <AndroidIcon className="w-5 h-5 text-green-500/60" />
        </div>
      </div>
      <div className="absolute right-[10%] bottom-1/3 hidden xl:block animate-float opacity-50" style={{ animationDelay: '2s' }}>
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <FlutterIcon className="w-4 h-4 text-cyan-500/60" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              Amazing
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Have a project in mind? I&apos;m available for freelance work and always excited to collaborate on innovative ideas.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {contactLinks.map(({ title, value, href, icon: Icon, gradient, description }, index) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-green-500/30 transition-all duration-500 hover:scale-105 backdrop-blur-sm ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">{title}</h3>
              <p className="text-green-400 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 truncate">{value}</p>
              <p className="text-slate-500 text-[10px] sm:text-xs lg:text-sm hidden sm:block">{description}</p>

              {/* External Link Indicator */}
              <ExternalLinkIcon className="absolute top-4 right-4 sm:top-5 sm:right-5 lg:top-6 lg:right-6 w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-green-400 transition-colors" />
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`bg-gradient-to-r from-slate-800/60 to-slate-800/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 border border-slate-700/50 transition-all duration-700 backdrop-blur-sm ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
            <div className="text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                Ready to start your project?
              </h3>
              <p className="text-slate-400 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
                Whether you need a mobile app, web application, or full-stack solution, I&apos;m here to help bring your vision to life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full lg:w-auto">
              <a
                href="mailto:nafiskabbo30@gmail.com"
                className="btn-shine inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <EmailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Send Email</span>
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl bg-transparent border-2 border-slate-600 text-slate-300 font-bold hover:border-green-500 hover:text-green-400 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
