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
  SendIcon,
  YouTubeIcon,
  InstagramIcon,
  UpworkIcon,
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
  {
    icon: YouTubeIcon,
    href: 'https://www.youtube.com/@nafiskabbo30',
    label: 'YouTube',
    gradient: 'from-red-500 to-red-600',
  },
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/nafiskabbo30/',
    label: 'Instagram',
    gradient: 'from-pink-500 to-purple-600',
  },
  {
    icon: UpworkIcon,
    href: 'https://www.upwork.com/freelancers/~01b2fc2f4ff397f8ca',
    label: 'Upwork',
    gradient: 'from-green-500 to-green-600',
  },
];

const projectCategories = [
  { value: '', label: 'Select project type' },
  { value: 'mobile-flutter', label: 'Mobile App - Flutter' },
  { value: 'mobile-android', label: 'Mobile App - Android (Kotlin/Java)' },
  { value: 'mobile-ios', label: 'Mobile App - iOS (Swift)' },
  { value: 'saas', label: 'SaaS Application' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'backend-api', label: 'Backend / API Development' },
  { value: 'ai-ml', label: 'AI / ML Integration' },
  { value: 'consultation', label: 'Technical Consultation' },
  { value: 'other', label: 'Other' },
];

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    category: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const categoryLabel = projectCategories.find(c => c.value === formData.category)?.label || formData.category;
    const emailSubject = encodeURIComponent(`[${categoryLabel}] ${formData.subject}`);
    const emailBody = encodeURIComponent(
      `From: ${formData.email}\n\nProject Type: ${categoryLabel}\n\nMessage:\n${formData.message}`
    );
    
    // Open email client
    window.location.href = `mailto:nafiskabbo30@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset form after delay
    setTimeout(() => {
      setFormData({ email: '', subject: '', category: '', message: '' });
      setSubmitStatus('idle');
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-green-500/10 rounded-full blur-3xl" />

      {/* Floating Elements */}
      <div className="absolute left-[5%] top-1/4 hidden xl:block animate-float-slow opacity-40">
        <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <AndroidIcon className="w-6 h-6 text-green-500/60" />
        </div>
      </div>
      <div className="absolute right-[8%] bottom-1/3 hidden xl:block animate-float opacity-40" style={{ animationDelay: '2s' }}>
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <FlutterIcon className="w-5 h-5 text-cyan-500/60" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold mb-6">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              Amazing
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I&apos;m available for freelance work and always excited to collaborate on innovative ideas.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="bg-slate-800/50 rounded-2xl p-6 lg:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Project inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                    Project Type
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                  >
                    {projectCategories.map(({ value, label }) => (
                      <option key={value} value={value} className="bg-slate-800">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <span>Opening Email Client...</span>
                    </>
                  ) : (
                    <>
                      <SendIcon className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Cards & Social */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactLinks.map(({ title, value, href, icon: Icon, gradient, description }, index) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
                  <p className="text-green-400 text-xs font-semibold mb-2 truncate">{value}</p>
                  <p className="text-slate-500 text-xs hidden sm:block">{description}</p>

                  {/* External Link Indicator */}
                  <ExternalLinkIcon className="absolute top-4 right-4 w-4 h-4 text-slate-600 group-hover:text-green-400 transition-colors" />
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4">Follow Me</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, href, label, gradient }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${gradient} bg-opacity-10 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:scale-105`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-slate-800/60 to-slate-800/30 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:nafiskabbo30@gmail.com"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 text-sm"
                >
                  <EmailIcon className="w-4 h-4" />
                  <span>Send Email</span>
                </a>
                <a
                  href="/cv.pdf"
                  download
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent border-2 border-slate-600 text-slate-300 font-bold hover:border-green-500 hover:text-green-400 transition-all duration-300 hover:scale-105 text-sm"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className={`bg-gradient-to-r from-slate-800/60 to-slate-800/40 rounded-2xl p-8 lg:p-12 border border-slate-700/50 transition-all duration-700 backdrop-blur-sm text-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to start your project?
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed mb-6">
            Whether you need a mobile app, web application, or full-stack solution, I&apos;m here to help bring your vision to life.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for new projects
          </div>
        </div>
      </div>
    </section>
  );
}
