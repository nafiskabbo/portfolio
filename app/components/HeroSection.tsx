import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, LinkedInIcon, FreelancerIcon, DownloadIcon, EmailIcon, AndroidIcon, AppleIcon, FlutterIcon } from './Icons';

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/nafiskabbo', label: 'GitHub', color: 'hover:text-white' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/nafiskabbo30/', label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: FreelancerIcon, href: 'https://www.freelancer.com/u/nafiskabbo30', label: 'Freelancer', color: 'hover:text-cyan-400' },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div className="relative flex-shrink-0 order-1 lg:order-2">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
              <Image
                src="/personal.jpg"
                alt="Nafis Islam Kabbo"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-full border-2 border-dashed border-cyan-500/20 animate-spin-slow" />
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 text-sm font-medium">Available for Freelance Projects</span>
            </div>

            {/* Name & Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Hi, I&apos;m </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Nafis Islam Kabbo
              </span>
            </h1>

            {/* Role Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                <AndroidIcon className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Android</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-500/20 to-gray-500/20 border border-slate-500/30">
                <AppleIcon className="w-5 h-5 text-slate-300" />
                <span className="text-slate-300 font-semibold">iOS</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <FlutterIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">Flutter</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Mobile App Developer specializing in{' '}
              <span className="text-cyan-400 font-medium">Flutter</span>,{' '}
              <span className="text-green-400 font-medium">Kotlin</span>, &{' '}
              <span className="text-slate-300 font-medium">Swift</span>.
              Building beautiful, performant apps with clean architecture and seamless user experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
              <Link
                href="/#contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                <EmailIcon className="w-5 h-5" />
                <span>Hire Me</span>
              </Link>
              <a
                href="/cv.pdf"
                download
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-transparent border-2 border-slate-600 text-slate-300 font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 ${color} transition-all duration-300 hover:scale-110 hover:border-slate-600`}
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
