import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu, HiX, HiOutlineCode } from 'react-icons/hi';
import { navLinks } from '../data';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const goToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    setOpen(false);
    // Release the lock now: the effect that clears it runs too late for this scroll.
    document.body.style.overflow = '';

    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 'auto'
      : 'smooth';

    requestAnimationFrame(() => {
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior });
      window.history.replaceState(null, '', href);
    });
  };

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="nav__inner">
        <a
          href="#home"
          className="nav__brand"
          onClick={(e) => goToSection(e, '#home')}
        >
          <span className="nav__logo">
            <HiOutlineCode />
          </span>
          <span className="nav__brand-text">
            Azzam's <span className="nav__brand-dot">Portfolio.</span>
          </span>
        </a>

        <ul className="nav__links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a
          className="nav__cta btn btn-primary"
          href="#contact"
        >
          Let’s Talk
        </a>

        <button
          className="nav__burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'menu'}
              className="nav__burger-icon"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {open ? <HiX /> : <HiMenu />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.22, ease: 'easeOut' },
            }}
          >
            <div className="nav__mobile-inner">
              <ul>
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.06 + 0.04 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a href={l.href} onClick={(e) => goToSection(e, l.href)}>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                className="nav__mobile-cta"
                href="#contact"
                onClick={(e) => goToSection(e, '#contact')}
              >
                Let’s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
