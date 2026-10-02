import { m, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { DUR, EASE_OUT } from './vocabulary';

/* The animated text starts fully clipped by its mask, so an observer on the
   text itself would never see it. Both components observe the mask instead. */

type MaskProps = {
  children: ReactNode;
  /** Animate on mount (page-load sequence) instead of when scrolled into view. */
  immediate?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * A single masked line: the child slides up from behind an overflow-hidden box.
 * Use for display lines where the line breaks are controlled by markup.
 */
export function Mask({
  children,
  immediate = false,
  delay = 0,
  duration = DUR.slow,
  className = '',
}: MaskProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  if (reduce) return <span className={`mask ${className}`}>{children}</span>;

  const show = immediate || inView;
  return (
    <span ref={ref} className={`mask ${className}`}>
      <m.span
        initial={{ y: '110%' }}
        animate={{ y: show ? 0 : '110%' }}
        transition={{ duration, ease: EASE_OUT, delay }}
      >
        {children}
      </m.span>
    </span>
  );
}

type WordsProps = {
  text: string;
  immediate?: boolean;
  delay?: number;
  step?: number;
};

/**
 * Word-by-word masked reveal for key headings only.
 * Screen readers get the whole string; the animated words are hidden from them.
 */
export function RevealWords({ text, immediate = false, delay = 0, step = 0.045 }: WordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  if (reduce) return <>{text}</>;

  const show = immediate || inView;
  const words = text.split(' ');
  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>
            <span className="rw">
              <m.span
                className="rw__in"
                initial={{ y: '110%' }}
                animate={{ y: show ? 0 : '110%' }}
                transition={{ duration: DUR.slow, ease: EASE_OUT, delay: delay + i * step }}
              >
                {w}
              </m.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </>
  );
}
