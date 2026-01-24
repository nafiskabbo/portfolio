'use client';

import { useEffect, useRef, useState } from 'react';
import {
  GithubIcon,
  LinkedInIcon,
  FreelancerIcon,
  EmailIcon,
  WhatsAppIcon,
  DownloadIcon,
  ExternalLinkIcon,
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

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/nafiskabbo', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/nafiskabbo30/', label: 'LinkedIn' },
  { icon: FreelancerIcon, href: 'https://www.freelancer.com/u/nafiskabbo30', label: 'Freelancer' },
  { icon: WhatsAppIcon, href: 'https://wa.me/8801772988050', label: 'WhatsApp' },
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
      className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              Amazing
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? I&apos;m available for freelance work and always excited to collaborate on innovative ideas.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactLinks.map(({ title, value, href, icon: Icon, gradient, description }, index) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold mb-1">{title}</h3>
              <p className="text-cyan-400 text-sm font-medium mb-2 truncate">{value}</p>
              <p className="text-slate-500 text-xs">{description}</p>

              {/* External Link Indicator */}
              <ExternalLinkIcon className="absolute top-4 right-4 w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-2xl p-8 md:p-12 border border-slate-700/50 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to start your project?
              </h3>
              <p className="text-slate-400 max-w-xl">
                Whether you need a mobile app, web application, or full-stack solution, I&apos;m here to help bring your vision to life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:nafiskabbo30@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                <EmailIcon className="w-5 h-5" />
                <span>Send Email</span>
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-transparent border-2 border-slate-600 text-slate-300 font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
