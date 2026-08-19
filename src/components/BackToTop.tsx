import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';
import './BackToTop.css';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      setVisible(window.scrollY > 600);
      setScrolling(true);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setScrolling(false), 250);
    };

    setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(idleTimer);
    };
  }, []);

  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          aria-label="Back to top"
          onClick={toTop}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: scrolling ? 0.45 : 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: scrolling ? 0.2 : 0.25, ease: 'easeOut' },
          }}
        >
          <HiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
