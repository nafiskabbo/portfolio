'use client';

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Maximize2,
  Minimize2,
  ExternalLink,
  Expand,
  House,
} from 'lucide-react';
import { sendContactEmail } from '../actions/send-email';
import { projectCategoryOptions } from '../data/project-categories';
import { ChatMarkdown } from './portfolio-chat/ChatMarkdown';

export interface PortfolioChatbotProps {
  /** `fab` = floating launcher (default). `page` = full-page chat at `/chat`. */
  variant?: 'fab' | 'page';
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  modelUsed?: string;
}

const welcomeMessage: ChatMessage = {
  role: 'assistant',
  content:
    "Hi — I'm here to help you plan your project with Nafis (apps, websites, or both). What do you want to build first?",
};

const suggestedPrompts = [
  'Flutter vs native — how do I choose in plain words?',
  'What happens after I send a message or the contact form?',
  'I need a website and an app — can one person handle both?',
  'How long might a simple MVP take?',
  'What info do you need from me to reply with a clear next step?',
  'Can you add AI (chat, search, automation) to my product?',
] as const;

const briefStarters = [
  'Quote for: … (describe product in one line)',
  'Deadline: I need … ready by …',
  'Budget: rough range is … (optional)',
  'Platforms: Android / iOS / web / not sure — please advise',
  'I have designs at: … (link or “not yet”)',
] as const;

function shuffle<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const inputSurfaceClass =
  'w-full rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--theme-primary)_50%,transparent)]';

const inputSurfaceStyle: CSSProperties = {
  background: 'var(--theme-background)',
  border: '1px solid var(--theme-border)',
};

const chipRowClass =
  'flex shrink-0 gap-2 overflow-x-auto overscroll-x-contain py-2.5 pl-3 pr-2 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20';

const chipButtonClass =
  'shrink-0 snap-start rounded-full border px-3 py-1.5 text-left text-[11px] leading-snug text-slate-200 transition hover:bg-white/5 active:scale-[0.98]';

export function PortfolioChatbot({ variant = 'fab' }: PortfolioChatbotProps) {
  const isFab = variant === 'fab';
  const [open, setOpen] = useState(isFab ? false : true);
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [briefOpen, setBriefOpen] = useState(false);
  const [form, setForm] = useState({
    email: '',
    category: '',
    subject: '',
    message: '',
  });
  const [formBusy, setFormBusy] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [formErr, setFormErr] = useState('');
  const [shuffledPrompts, setShuffledPrompts] = useState<string[]>(() => [...suggestedPrompts]);
  const [shuffledBriefStarters, setShuffledBriefStarters] = useState<string[]>(() => [...briefStarters]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShuffledPrompts(shuffle(suggestedPrompts));
    setShuffledBriefStarters(shuffle(briefStarters));
  }, []);

  useEffect(() => {
    if (isFab && open) {
      setShuffledPrompts(shuffle(suggestedPrompts));
      setShuffledBriefStarters(shuffle(briefStarters));
    }
  }, [isFab, open]);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, loading, scrollToBottom, briefOpen, expanded, fullscreen]);

  useEffect(() => {
    if (!open && isFab) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (fullscreen) {
        setFullscreen(false);
        return;
      }
      if (isFab) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, fullscreen, isFab]);

  const sendChat = async () => {
    const trimmed = draft.trim();
    if (!trimmed || loading) return;
    setDraft('');
    setError(null);
    const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        const err =
          data && typeof data === 'object' && 'error' in data && typeof (data as { error: unknown }).error === 'string'
            ? (data as { error: string }).error
            : 'Something went wrong. Try again in a moment.';
        throw new Error(err);
      }
      const reply =
        data && typeof data === 'object' && typeof (data as { reply?: unknown }).reply === 'string'
          ? (data as { reply: string }).reply
          : '';
      const modelUsed =
        data && typeof data === 'object' && typeof (data as { modelUsed?: unknown }).modelUsed === 'string'
          ? (data as { modelUsed: string }).modelUsed
          : undefined;
      if (!reply) throw new Error('Empty reply from assistant.');
      setMessages((prev) => [...prev, { role: 'assistant', content: reply, modelUsed }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormBusy(true);
    setFormStatus('idle');
    setFormErr('');
    try {
      const result = await sendContactEmail({
        email: form.email,
        category: form.category,
        subject: form.subject,
        message: form.message,
      });
      if (result.success) {
        setFormStatus('ok');
        setForm({ email: '', category: '', subject: '', message: '' });
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Sent. Nafis will read your email and reply personally — same as the main contact form on the site.',
          },
        ]);
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('err');
        setFormErr(result.error || 'Could not send.');
      }
    } catch {
      setFormStatus('err');
      setFormErr('Could not send. Try again.');
    } finally {
      setFormBusy(false);
    }
  };

  const applySuggestion = (text: string) => {
    setDraft(text);
    setError(null);
  };

  const appendBriefStarter = (line: string) => {
    setForm((p) => ({
      ...p,
      message: p.message.trim() ? `${p.message.trim()}\n${line}` : line,
    }));
    setFormErr('');
    setFormStatus('idle');
  };

  const toggleBrowserFullscreen = () => {
    setFullscreen((v) => !v);
  };

  const panelId = 'portfolio-chat-panel';
  const titleId = 'portfolio-chat-title';

  const panelShell = clsx(
    'flex flex-col overflow-hidden rounded-2xl border shadow-2xl theme-card min-h-0',
    fullscreen &&
      'fixed inset-0 z-[200] m-0 h-[100dvh] max-h-[100dvh] w-full max-w-none rounded-none border-0 sm:inset-3 sm:h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-1.5rem)] sm:rounded-2xl sm:border',
    !fullscreen &&
      isFab &&
      expanded &&
      'h-[min(88dvh,calc(100dvh-5.5rem))] w-[min(100vw-1rem,560px)] max-h-[min(88dvh,calc(100dvh-5.5rem))]',
    !fullscreen &&
      isFab &&
      !expanded &&
      'h-[min(72dvh,calc(100dvh-5.5rem))] w-[min(100vw-2rem,420px)] max-h-[min(72dvh,calc(100dvh-5.5rem))]',
    !fullscreen && !isFab && 'h-[min(100dvh,100dvh)] max-h-[100dvh] w-full max-w-3xl flex-1 rounded-none border-0 sm:mx-auto sm:my-3 sm:h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-1.5rem)] sm:rounded-2xl sm:border'
  );

  const panelBody = (
    <div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={clsx(panelShell, 'pointer-events-auto')}
      style={{
        borderColor: fullscreen ? 'var(--theme-border)' : undefined,
        boxShadow: fullscreen ? undefined : '0 25px 50px -12px rgba(0,0,0,0.45)',
        paddingTop: fullscreen ? 'max(env(safe-area-inset-top),0.75rem)' : undefined,
        paddingBottom: fullscreen ? 'max(env(safe-area-inset-bottom),0.75rem)' : undefined,
      }}
    >
      <header
        className="flex shrink-0 flex-wrap items-start justify-between gap-2 border-b px-3 py-2.5 sm:px-4 sm:py-3"
        style={{ borderColor: 'var(--theme-border)', background: 'var(--theme-surface)' }}
      >
        <div className="min-w-0 flex-1 pr-1">
          <h2 id={titleId} className="text-sm font-semibold text-white sm:text-base">
            Chat with Nafis&apos;s studio
          </h2>
          <p className="text-[11px] text-slate-400 sm:text-xs">
            Apps, websites, and AI — ask in simple words; we keep answers short and clear.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-0.5 sm:gap-1">
          {!isFab && (
            <Link
              href="/"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Back to portfolio"
            >
              <House className="h-5 w-5" />
            </Link>
          )}
          {isFab && (
            <a
              href="/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Open chat in new tab"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
          {isFab && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              aria-label={expanded ? 'Smaller chat window' : 'Larger chat window'}
            >
              {expanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          )}
          <button
            type="button"
            onClick={toggleBrowserFullscreen}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            aria-label={fullscreen ? 'Exit full screen' : 'Full screen'}
          >
            {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
          </button>
          {isFab && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <div
          ref={listRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden px-3 py-3 sm:px-4"
          style={{ background: 'color-mix(in srgb, var(--theme-background) 92%, black)' }}
        >
          {messages.map((m, i) => (
            <div
              key={`${i}-${m.role}-${m.content.slice(0, 12)}`}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={clsx(
                  'max-w-[min(92%,28rem)] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[90%]',
                  m.role === 'user' ? 'rounded-br-md text-white' : 'rounded-bl-md border text-slate-100'
                )}
                style={
                  m.role === 'user'
                    ? {
                        background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                      }
                    : {
                        background: 'var(--theme-surface)',
                        borderColor: 'var(--theme-border)',
                      }
                }
              >
                {m.role === 'assistant' ? (
                  <ChatMarkdown content={m.content} />
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
                {m.role === 'assistant' && m.modelUsed && i === messages.length - 1 && !loading && (
                  <p className="mt-2 border-t border-white/10 pt-2 text-[10px] tracking-wide text-slate-500">
                    via {m.modelUsed.includes(':') ? m.modelUsed.split(':').slice(1).join(':') : m.modelUsed}
                  </p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div
                className="flex items-center gap-2 rounded-2xl rounded-bl-md border px-3 py-2 text-sm text-slate-300"
                style={{ borderColor: 'var(--theme-border)', background: 'var(--theme-surface)' }}
              >
                <Loader2 className="h-4 w-4 animate-spin" style={{ color: 'var(--theme-primary)' }} />
                Thinking…
              </div>
            </div>
          )}
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}
        </div>

        <div
          className="shrink-0 border-t"
          style={{ borderColor: 'var(--theme-border)', background: 'var(--theme-surface)' }}
        >
          <p className="px-3 pt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Quick ideas</p>
          <div className={chipRowClass} style={{ scrollbarColor: 'rgba(255,255,255,0.25) transparent' }}>
            {shuffledPrompts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => applySuggestion(q)}
                className={chipButtonClass}
                style={{ borderColor: 'var(--theme-border)' }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="shrink-0 border-t" style={{ borderColor: 'var(--theme-border)' }}>
          <button
            type="button"
            onClick={() => setBriefOpen((v) => !v)}
            className="flex w-full items-center justify-between px-3 py-2.5 text-left text-xs font-semibold text-slate-300 transition hover:bg-white/5 sm:px-4"
            aria-expanded={briefOpen}
          >
            <span>Send a project brief</span>
            {briefOpen ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
          </button>
          {briefOpen && (
            <div
              className="max-h-[min(42vh,320px)] min-h-0 overflow-y-auto overflow-x-hidden border-t px-3 pb-3 pt-1 sm:px-4"
              style={
                {
                  borderColor: 'var(--theme-border)',
                  WebkitOverflowScrolling: 'touch',
                } as CSSProperties
              }
            >
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Tap to add a line to your message
              </p>
              <div className={chipRowClass} style={{ scrollbarColor: 'rgba(255,255,255,0.25) transparent' }}>
                {shuffledBriefStarters.map((line) => (
                  <button
                    key={line}
                    type="button"
                    onClick={() => appendBriefStarter(line)}
                    className={chipButtonClass}
                    style={{ borderColor: 'var(--theme-border)' }}
                  >
                    {line}
                  </button>
                ))}
              </div>
              <form onSubmit={handleFormSubmit} className="mt-3 space-y-2.5">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <label htmlFor="chat-email" className="mb-1 block text-[10px] font-medium text-slate-400">
                      Email
                    </label>
                    <input
                      id="chat-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleFormChange}
                      className={inputSurfaceClass}
                      style={inputSurfaceStyle}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="chat-category" className="mb-1 block text-[10px] font-medium text-slate-400">
                      Project type
                    </label>
                    <select
                      id="chat-category"
                      name="category"
                      required
                      value={form.category}
                      onChange={handleFormChange}
                      className={`${inputSurfaceClass} cursor-pointer appearance-none`}
                      style={{
                        ...inputSurfaceStyle,
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.25em 1.25em',
                        paddingRight: '2rem',
                      }}
                    >
                      {projectCategoryOptions.map(({ value, label }) => (
                        <option key={value || 'empty'} value={value} style={{ background: 'var(--theme-surface)' }}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="chat-subject" className="mb-1 block text-[10px] font-medium text-slate-400">
                    Subject
                  </label>
                  <input
                    id="chat-subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleFormChange}
                    className={inputSurfaceClass}
                    style={inputSurfaceStyle}
                    placeholder="e.g. Fitness app MVP"
                  />
                </div>
                <div>
                  <label htmlFor="chat-message" className="mb-1 block text-[10px] font-medium text-slate-400">
                    Message
                  </label>
                  <textarea
                    id="chat-message"
                    name="message"
                    required
                    rows={3}
                    value={form.message}
                    onChange={handleFormChange}
                    className={`${inputSurfaceClass} resize-none`}
                    style={inputSurfaceStyle}
                    placeholder="What you need, timeline, links…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formBusy}
                  className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                    boxShadow: '0 4px 16px var(--theme-glow)',
                  }}
                >
                  {formBusy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : formStatus === 'ok' ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Sent
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send to Nafis
                    </>
                  )}
                </button>
                {formStatus === 'err' && <p className="text-center text-xs text-red-300">{formErr}</p>}
                {isFab && (
                  <a
                    href="#contact"
                    className="block text-center text-[11px] text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    Open the full contact section on the page
                  </a>
                )}
              </form>
            </div>
          )}
        </div>

        <div
          className="flex shrink-0 gap-2 border-t p-2.5 sm:p-3"
          style={{ borderColor: 'var(--theme-border)', background: 'var(--theme-surface)' }}
        >
          <textarea
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void sendChat();
              }
            }}
            placeholder="Message… (Shift+Enter for new line)"
            className={`${inputSurfaceClass} min-h-[44px] flex-1 resize-none sm:min-h-[48px]`}
            style={inputSurfaceStyle}
            aria-label="Chat message"
          />
          <button
            type="button"
            onClick={() => void sendChat()}
            disabled={loading || !draft.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition disabled:opacity-40 sm:h-12 sm:w-12"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
              boxShadow: '0 4px 14px var(--theme-glow)',
            }}
            aria-label="Send message"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );

  if (!isFab) {
    return (
      <div className="flex min-h-0 flex-1 flex-col px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-[max(env(safe-area-inset-top),0.5rem)] sm:px-4">
        {panelBody}
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[100] flex flex-col items-end gap-2 p-3 sm:gap-3 sm:p-5">
      {open && panelBody}
      {isFab && !(open && fullscreen) && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-background)]"
          style={{
            background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
            boxShadow: '0 8px 28px var(--theme-glow)',
          }}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      )}
    </div>
  );
}
