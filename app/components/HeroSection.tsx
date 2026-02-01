import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, LinkedInIcon, FreelancerIcon, DownloadIcon, EmailIcon, AndroidIcon, AppleIcon, FlutterIcon, UpworkIcon } from './Icons';

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/nafiskabbo', label: 'GitHub', color: 'hover:text-white hover:border-white/30 hover:bg-white/5' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/nafiskabbo30/', label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5' },
  { icon: FreelancerIcon, href: 'https://www.freelancer.com/u/nafiskabbo30', label: 'Freelancer', color: 'hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5' },
  { icon: UpworkIcon, href: 'https://www.upwork.com/freelancers/~01b2fc2f4ff397f8ca', label: 'Upwork', color: 'hover:text-green-500 hover:border-green-500/30 hover:bg-green-500/5' },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Animated Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-green-500/10 rounded-full blur-[100px] animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-cyan-500/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-blue-500/8 rounded-full blur-[80px] animate-blob" style={{ animationDelay: '10s' }} />

      {/* Main Content */}
      <div className="relative z-10 section-container py-24 sm:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
          {/* Profile Image */}
          <div className="relative flex-shrink-0 order-1 lg:order-2">
            {/* Outer Orbit Ring */}
            <div className="absolute -inset-6 sm:-inset-8 lg:-inset-10">
              {/* Orbit Path */}
              <div className="absolute inset-0 rounded-full border border-dashed border-green-500/20 animate-orbit" />

              {/* Orbiting Icons */}
              <div className="absolute inset-0 animate-orbit">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 border border-green-500/40 flex items-center justify-center shadow-lg shadow-green-500/20 backdrop-blur-sm">
                  <AndroidIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
              </div>

              <div className="absolute inset-0 animate-orbit" style={{ animationDelay: '-8s' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/20 backdrop-blur-sm">
                  <FlutterIcon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
              </div>

              <div className="absolute inset-0 animate-orbit" style={{ animationDelay: '-16s' }}>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 border border-slate-400/40 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <AppleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                </div>
              </div>
            </div>

            {/* Profile Image Container */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 p-[3px] shadow-2xl shadow-green-500/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <Image
                    src="/personal.jpg"
                    alt="Nafis Islam Kabbo"
                    fill
                    className="object-cover rounded-full"
                    priority
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, (max-width: 1280px) 288px, 320px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 flex-1 max-w-2xl lg:max-w-none">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-green-500/10 border border-green-500/30 mb-6 sm:mb-8 transition-colors hover:bg-green-500/20">
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-xs sm:text-sm font-bold tracking-wide uppercase">Available for Freelance Projects</span>
            </div>

            {/* Name & Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="text-white">Hi, I&apos;m </span>
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Nafis Islam Kabbo
              </span>
            </h1>

            {/* Role Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div className="flex items-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500/15 to-green-600/10 border border-green-500/30 shadow-lg shadow-green-500/10 backdrop-blur-md">
                <AndroidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                <span className="text-green-400 font-bold text-sm sm:text-base">Android</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-400/15 to-slate-500/10 border border-slate-400/30 shadow-lg shadow-slate-500/10 backdrop-blur-md">
                <AppleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
                <span className="text-slate-300 font-bold text-sm sm:text-base">iOS</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
                <FlutterIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-sm sm:text-base">Flutter</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
              Mobile App Developer specializing in{' '}
              <span className="text-cyan-400 font-semibold">Flutter</span>,{' '}
              <span className="text-green-400 font-semibold">Kotlin</span>, &{' '}
              <span className="text-slate-300 font-semibold">Swift</span>.
              Building beautiful, performant apps with clean architecture and seamless user experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 mb-8 sm:mb-10">
              <Link
                href="/#contact"
                className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
              >
                <EmailIcon className="w-5 h-5" />
                <span>Hire Me</span>
              </Link>
              <a
                href="/cv.pdf"
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-transparent border-2 border-slate-600 text-slate-300 font-bold hover:border-green-500 hover:text-green-400 transition-all duration-300 hover:scale-105"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-800/60 border border-slate-700/50 text-slate-400 ${color} transition-all duration-300 hover:scale-110 flex items-center justify-center`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
