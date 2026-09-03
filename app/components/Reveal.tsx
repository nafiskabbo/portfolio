'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra classes once the element is in view. */
  visibleClassName?: string;
  /** Classes while waiting to enter the viewport. */
  hiddenClassName?: string;
  /** Fire once (default) or every time it enters. */
  once?: boolean;
  threshold?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
};

/**
 * Single IntersectionObserver island for section reveals.
 * Prefer this over per-section observer copies.
 */
export function Reveal({
  children,
  className = '',
  visibleClassName = 'opacity-100 translate-y-0 translate-x-0',
  hiddenClassName = 'opacity-0 translate-y-8',
  once = true,
  threshold = 0.1,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref as never}
      className={`transition-all duration-700 ${className} ${visible ? visibleClassName : hiddenClassName}`}
    >
      {children}
    </Tag>
  );
}

/** Hook for cases that need the boolean (e.g. skill bars, journey timeline). */
export function useReveal(threshold = 0.1, once = true) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return { ref, visible };
}
