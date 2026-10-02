import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data';
import { DUR, EASE_OUT } from '../motion/vocabulary';
import { Clock } from './Clock';
import { ClockIcon, Mail, MapPin } from './icons';
import './Nav.css';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mark the section crossing a band 40% down the viewport as current.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 900px)');
    const onChange = () => {
      if (mql.matches) setOpen(false);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <m.header
      className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.base, ease: EASE_OUT, delay: 0.55 }}
    >
      <div className="nav__bar wrap">
        <a className="nav__mark" href="#top">
          {profile.name}
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} aria-current={active === l.href ? 'true' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__aside">
          <a className="arrow-link nav__email" href={`mailto:${profile.email}`}>
            <Mail /> Email
          </a>
        </div>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="nav-panel"
            className="nav__panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.fast, ease: EASE_OUT }}
          >
            <nav aria-label="Primary, expanded">
              <ul className="nav__panel-links">
                {navLinks.map((l, i) => (
                  <m.li
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DUR.base, ease: EASE_OUT, delay: 0.04 + i * 0.05 }}
                  >
                    <a href={l.href} onClick={() => setOpen(false)}>
                      <span className="nav__panel-no">0{i + 1}</span>
                      {l.label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
            <div className="nav__panel-foot">
              <a className="arrow-link" href={`mailto:${profile.email}`}>
                <Mail /> Email me
              </a>
              <span className="label nav__panel-where">
                <MapPin /> Riyadh · <ClockIcon /> <Clock />
              </span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
