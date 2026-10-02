/**
 * Motion vocabulary. Two easings, three durations, used everywhere.
 * Mirrors the CSS custom properties in styles/tokens.css.
 */
import type { Variants } from 'framer-motion';

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_INOUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DUR = { fast: 0.2, base: 0.5, slow: 0.9 } as const;

/** Default in-view trigger: once, when a quarter of the element is visible. */
export const inView = { once: true, amount: 0.25 } as const;

/** Small rise + fade. For paragraphs, rows, secondary elements. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
};

/** A rule drawing itself from the left. */
export const draw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.slow, ease: EASE_INOUT } },
};

/** Parent that staggers its children. Importance sets the step. */
export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});
