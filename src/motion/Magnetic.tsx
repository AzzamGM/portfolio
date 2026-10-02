import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef, type PointerEvent, type ReactNode } from 'react';

type Props = { children: ReactNode; strength?: number; className?: string };

/**
 * Magnetic hover for the one or two primary actions on the page.
 * Mouse only: touch and reduced-motion users get a plain element.
 */
export function Magnetic({ children, strength = 0.3, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}
