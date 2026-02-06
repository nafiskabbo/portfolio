'use client';

import { useEffect, useRef, useState } from 'react';
import {
  LinkedInIcon,
  FreelancerIcon,
  EmailIcon,
  WhatsAppIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SendIcon,
  YouTubeIcon,
  InstagramIcon,
  UpworkIcon,
  CheckCircleIcon,
} from './Icons';
import { ThemeBackgroundCompact } from './ThemeBackground';
import { Mascot2D } from './Mascot2D';
import { sendContactEmail } from '../actions/send-email';

const contactLinks = [
  {
    title: 'Email',
    value: 'nafiskabbo30@gmail.com',
    href: 'mailto:nafiskabbo30@gmail.com',
    icon: EmailIcon,
  },
  {
    title: 'WhatsApp',
    value: '+880 1772 988050',
    href: 'https://wa.me/8801772988050',
    icon: WhatsAppIcon,
  },
  {
    title: 'LinkedIn',
    value: 'nafiskabbo30',
    href: 'https://www.linkedin.com/in/nafiskabbo30/',
    icon: LinkedInIcon,
  },
  {
    title: 'Freelancer',
    value: 'nafiskabbo30',
    href: 'https://www.freelancer.com/u/nafiskabbo30',
    icon: FreelancerIcon,
  },
];

const socialLinks = [
  { icon: UpworkIcon, href: 'https://www.upwork.com/freelancers/~01b2fc2f4ff397f8ca', label: 'Upwork' },
  { icon: YouTubeIcon, href: 'https://www.youtube.com/@nafiskabbo30', label: 'YouTube' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/nafiskabbo30/', label: 'Instagram' },
];

const projectCategories = [
  { value: '', label: 'Select project type' },
  { value: 'Mobile App - Flutter', label: 'Mobile App - Flutter' },
  { value: 'Mobile App - Android', label: 'Mobile App - Android' },
  { value: 'Mobile App - iOS', label: 'Mobile App - iOS' },
  { value: 'Web Application', label: 'Web Application' },
  { value: 'AI / ML Integration', label: 'AI / ML Integration' },
  { value: 'Other', label: 'Other' },
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
  const [errorMessage, setErrorMessage] = useState('');
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
    setSubmitStatus('idle');

    try {
      const result = await sendContactEmail({
        email: formData.email,
        category: formData.category,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ email: '', subject: '', category: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    // Open in new tab
    window.open('/cv.pdf', '_blank');
    // Trigger download
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 lg:py-20 overflow-hidden"
    >
      {/* Theme Background */}
      <ThemeBackgroundCompact />

      {/* 2D Mascot decorations */}
      <div className="hidden lg:block absolute right-12 top-1/4 z-0 opacity-30">
        <Mascot2D size="medium" position="right" />
      </div>

      <div className="hidden xl:block absolute left-8 bottom-24 z-0 opacity-25">
        <Mascot2D size="small" position="left" />
      </div>

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="theme-badge inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Let&apos;s Build Something{' '}
            <span className="theme-gradient-text">Amazing</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Have a project in mind? I&apos;m available for freelance work and always excited to collaborate.
          </p>
        </div>

        {/* Main Content Grid - More Compact */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Contact Form - Takes 3 cols */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <div className="theme-card rounded-xl p-5 lg:p-6">
              <h3 className="text-base lg:text-lg font-bold text-white mb-4">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
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
                      className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                      style={{
                        background: 'var(--theme-background)',
                        border: '1px solid var(--theme-border)'
                      }}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Type
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 rounded-lg text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      style={{
                        background: 'var(--theme-background)',
                        border: '1px solid var(--theme-border)',
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.25em 1.25em',
                        paddingRight: '2rem'
                      }}
                    >
                      {projectCategories.map(({ value, label }) => (
                        <option key={value} value={value} style={{ background: 'var(--theme-surface)' }}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-slate-300 mb-1.5">
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
                    className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                    style={{
                      background: 'var(--theme-background)',
                      border: '1px solid var(--theme-border)'
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
                    style={{
                      background: 'var(--theme-background)',
                      border: '1px solid var(--theme-border)'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
                  style={{
                    background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                    boxShadow: '0 4px 20px var(--theme-glow)'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Message Sent!</span>
                    </>
                  ) : submitStatus === 'error' ? (
                    <span className="text-red-300">{errorMessage}</span>
                  ) : (
                    <>
                      <SendIcon className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info - Takes 2 cols */}
          <div
            className={`lg:col-span-2 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Contact Cards - Compact Grid */}
            <div className="grid grid-cols-2 gap-3">
              {contactLinks.map(({ title, value, href, icon: Icon }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group theme-card p-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"
                    style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-xs mb-0.5">{title}</h3>
                  <p className="text-xs truncate" style={{ color: 'var(--theme-primary)' }}>{value}</p>
                </a>
              ))}
            </div>

            {/* Social & Quick Actions Combined */}
            <div className="theme-card rounded-xl p-4">
              <h3 className="text-sm font-bold text-white mb-3">Connect & Follow</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    style={{ background: 'var(--theme-background)', border: '1px solid var(--theme-border)' }}
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
                    <span className="text-white text-xs font-medium">{label}</span>
                  </a>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <a
                  href="mailto:nafiskabbo30@gmail.com"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-white font-semibold text-xs transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                    boxShadow: '0 2px 12px var(--theme-glow)'
                  }}
                >
                  <EmailIcon className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
                <a
                  href="/cv.pdf"
                  onClick={handleDownloadCV}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-xs"
                  style={{ border: '1px solid var(--theme-border)', color: 'var(--theme-primary)' }}
                >
                  <DownloadIcon className="w-3.5 h-3.5" />
                  <span>CV</span>
                </a>
              </div>
            </div>

            {/* Availability Badge */}
            <div
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl"
              style={{ background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--theme-primary) 30%, transparent)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--theme-primary)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--theme-primary)' }}>
                Available for new projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
