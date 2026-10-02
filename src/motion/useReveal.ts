import { useReducedMotion } from 'framer-motion';

/**
 * Props that trigger a `hidden` → `show` variant run when scrolled into view.
 * Returns nothing for reduced-motion users, so content renders in its final state.
 */
export function useReveal(amount = 0.25) {
  const reduce = useReducedMotion();
  if (reduce) return {};
  return {
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { once: true, amount },
  };
}
