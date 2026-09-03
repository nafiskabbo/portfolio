'use client';

import { useState } from 'react';
import { SendIcon, CheckCircleIcon } from './Icons';
import { sendContactEmail } from '../actions/send-email';
import { projectCategoryOptions } from '../data/project-categories';
import { Reveal } from './Reveal';

export function ContactForm() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    category: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <Reveal
      className="lg:col-span-3"
      hiddenClassName="opacity-0 -translate-x-12"
      visibleClassName="opacity-100 translate-x-0"
    >
      <div className="theme-card rounded-xl p-5 lg:p-6">
        <h3 className="text-base lg:text-lg font-bold text-white mb-4">Send a Message</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
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
                  border: '1px solid var(--theme-border)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
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
                  paddingRight: '2rem',
                }}
              >
                {projectCategoryOptions.map(({ value, label }) => (
                  <option key={value} value={value} style={{ background: 'var(--theme-surface)' }}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
                border: '1px solid var(--theme-border)',
              }}
            />
          </div>

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
                border: '1px solid var(--theme-border)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
            style={{
              background:
                'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
              boxShadow: '0 4px 20px var(--theme-glow)',
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
    </Reveal>
  );
}
