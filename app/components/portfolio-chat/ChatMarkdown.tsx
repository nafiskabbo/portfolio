'use client';

import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import type { Components } from 'react-markdown';

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic text-slate-200">{children}</em>,
  ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-4">{children}</ul>,
  ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-4">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium underline decoration-[var(--theme-primary)] underline-offset-2 hover:text-white"
      style={{ color: 'var(--theme-primary)' }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = /language-/.test(className || '');
    if (isBlock) {
      return (
        <code className={`${className ?? ''} font-mono text-xs text-slate-200`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded px-1 py-0.5 font-mono text-[0.85em] text-slate-100"
        style={{ background: 'color-mix(in srgb, var(--theme-primary) 18%, transparent)' }}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre
      className="my-2 max-w-full overflow-x-auto rounded-lg border p-2 font-mono text-xs leading-relaxed text-slate-200"
      style={{ borderColor: 'var(--theme-border)', background: 'var(--theme-background)' }}
    >
      {children}
    </pre>
  ),
  h1: ({ children }) => <p className="mb-2 text-base font-semibold text-white">{children}</p>,
  h2: ({ children }) => <p className="mb-2 text-sm font-semibold text-white">{children}</p>,
  h3: ({ children }) => <p className="mb-1.5 text-sm font-semibold text-slate-100">{children}</p>,
  blockquote: ({ children }) => (
    <blockquote
      className="my-2 border-l-2 pl-3 text-slate-300 italic"
      style={{ borderColor: 'var(--theme-primary)' }}
    >
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-3 border-white/10" />,
};

export function ChatMarkdown({ content }: { content: string }) {
  return (
    <div className="text-sm text-slate-100">
      <ReactMarkdown remarkPlugins={[remarkBreaks]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
