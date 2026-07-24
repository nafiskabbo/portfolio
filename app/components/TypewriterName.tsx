'use client';

import { useEffect, useState } from 'react';

const FULL_NAME = 'Nafis Islam Kabbo';

type Phase = 'typing' | 'holding' | 'deleting' | 'pausing';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Claude-style typewriter: types the name, holds, deletes in reverse, repeats.
 * Honors prefers-reduced-motion (shows full name, no loop).
 */
export function TypewriterName({
  className = '',
  typingMs = 72,
  deletingMs = 42,
  holdMs = 2200,
  pauseMs = 500,
}: {
  className?: string;
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
  pauseMs?: number;
}) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text.length < FULL_NAME.length) {
        timer = setTimeout(() => {
          setText(FULL_NAME.slice(0, text.length + 1));
        }, typingMs);
      } else {
        timer = setTimeout(() => setPhase('holding'), holdMs);
      }
    } else if (phase === 'holding') {
      timer = setTimeout(() => setPhase('deleting'), 0);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingMs);
      } else {
        timer = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('typing'), 0);
    }

    return () => clearTimeout(timer);
  }, [text, phase, reducedMotion, typingMs, deletingMs, holdMs, pauseMs]);

  const displayText = reducedMotion ? FULL_NAME : text;

  return (
    <span className={`relative inline-grid ${className}`} aria-label={FULL_NAME}>
      {/* Reserve width so the headline doesn't jump while typing/deleting */}
      <span className="invisible col-start-1 row-start-1 whitespace-pre theme-gradient-text" aria-hidden>
        {FULL_NAME}
      </span>
      <span className="col-start-1 row-start-1 inline-flex items-baseline whitespace-pre">
        <span className="theme-gradient-text" aria-hidden>
          {displayText}
        </span>
        {!reducedMotion && (
          <span
            className="typewriter-caret ml-0.5 inline-block h-[0.85em] w-[0.08em] shrink-0 translate-y-[0.08em] rounded-sm align-baseline"
            style={{ background: 'var(--theme-primary)' }}
            aria-hidden
          />
        )}
      </span>
    </span>
  );
}
