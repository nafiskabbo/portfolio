import {
  LinkedInIcon,
  FreelancerIcon,
  EmailIcon,
  WhatsAppIcon,
  DownloadIcon,
  YouTubeIcon,
  InstagramIcon,
  UpworkIcon,
} from './Icons';
import { ThemeBackgroundCompact } from './ThemeBackground';
import { Reveal } from './Reveal';
import { ContactForm } from './ContactForm';

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
  {
    icon: UpworkIcon,
    href: 'https://www.upwork.com/freelancers/~01b2fc2f4ff397f8ca',
    label: 'Upwork',
  },
  {
    icon: YouTubeIcon,
    href: 'https://www.youtube.com/@nafiskabbo30',
    label: 'YouTube',
  },
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/nafiskabbo30/',
    label: 'Instagram',
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-16 lg:py-20 overflow-hidden">
      <ThemeBackgroundCompact />
      <div className="relative z-10 section-container">
        <div className="text-center mb-10">
          <span className="theme-badge inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Tell me what you need <span className="theme-gradient-text">shipped</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Share your goal, platforms, and timeline. I&apos;ll reply with next steps, usually
            within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <ContactForm />

          <Reveal
            className="lg:col-span-2 space-y-4"
            style={{ transitionDelay: '200ms' }}
            hiddenClassName="opacity-0 translate-x-12"
            visibleClassName="opacity-100 translate-x-0"
          >
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
                    style={{
                      background:
                        'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                    }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-xs mb-0.5">{title}</h3>
                  <p className="text-xs truncate" style={{ color: 'var(--theme-primary)' }}>
                    {value}
                  </p>
                </a>
              ))}
            </div>

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
                    style={{
                      background: 'var(--theme-background)',
                      border: '1px solid var(--theme-border)',
                    }}
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
                    <span className="text-white text-xs font-medium">{label}</span>
                  </a>
                ))}
              </div>

              <div className="flex gap-2">
                <a
                  href="mailto:nafiskabbo30@gmail.com"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-white font-semibold text-xs transition-all duration-300 hover:scale-105"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                    boxShadow: '0 2px 12px var(--theme-glow)',
                  }}
                >
                  <EmailIcon className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
                <a
                  href="/cv.pdf"
                  download="cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-xs"
                  style={{
                    border: '1px solid var(--theme-border)',
                    color: 'var(--theme-primary)',
                  }}
                >
                  <DownloadIcon className="w-3.5 h-3.5" />
                  <span>CV</span>
                </a>
              </div>
            </div>

            <div
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl"
              style={{
                background:
                  'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                border:
                  '1px solid color-mix(in srgb, var(--theme-primary) 30%, transparent)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--theme-primary)' }}
              />
              <span className="text-xs font-semibold" style={{ color: 'var(--theme-primary)' }}>
                Available for new projects
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
