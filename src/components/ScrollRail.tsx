import { AnimatePresence, m, useScroll } from 'framer-motion';
import { useEffect, useState, type CSSProperties } from 'react';
import { navLinks } from '../data';
import { useMediaQuery } from '../motion/useMediaQuery';
import { DUR, EASE_OUT } from '../motion/vocabulary';
import { ArrowDown, ArrowUp } from './icons';
import './ScrollRail.css';

type Milestone = { href: string; label: string; no: string; top: number; frac: number };

const pad = (n: number) => String(n).padStart(2, '0');

/** How far you can scroll before the mouse cue leaves its reserved band. */
const TOP_ZONE = 24;

/** Document offset and progress fraction of every section in the nav. */
function measure(): Milestone[] {
  const navH = document.querySelector<HTMLElement>('.nav')?.offsetHeight ?? 64;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  return navLinks.flatMap((l, i) => {
    const el = document.querySelector<HTMLElement>(l.href);
    if (!el) return [];
    const top = el.getBoundingClientRect().top + window.scrollY;
    const frac = Math.min(1, Math.max(0, (top - navH) / maxScroll));
    return [{ href: l.href, label: l.label, no: pad(i + 1), top, frac }];
  });
}

/**
 * Scroll furniture. None of it ever sits on top of page content:
 *  - the progress rail and the "next section" cue live in the right gutter
 *    on desktop, and in the nav bar on phones;
 *  - the mouse cue shows only at the very top of the page, inside the empty
 *    band the masthead reserves for it.
 * The next-section cue steps aside while the project roster is pinned, since
 * the roster bar names the next plate itself.
 */
export function ScrollRail() {
  const [stones, setStones] = useState<Milestone[]>([]);
  const [current, setCurrent] = useState(-1);
  const [atTop, setAtTop] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [railOnInk, setRailOnInk] = useState(false);
  const [cueOnInk, setCueOnInk] = useState(false);
  const [everScrolled, setEverScrolled] = useState(false);
  const desktop = useMediaQuery('(min-width: 900px)');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const update = () => setStones(measure());
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    document.fonts?.ready.then(update);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const { scrollY, innerHeight, innerWidth } = window;

      const y = scrollY + innerHeight * 0.4;
      let i = -1;
      stones.forEach((s, k) => {
        if (s.top <= y) i = k;
      });
      setCurrent(i);
      setAtTop(scrollY < TOP_ZONE);
      setAtEnd(scrollY + innerHeight >= document.documentElement.scrollHeight - 4);
      if (scrollY > 0) setEverScrolled(true);

      const roster = document.querySelector('.roster')?.getBoundingClientRect();
      setPinned(!!roster && roster.top <= 1 && roster.bottom >= innerHeight - 1);

      // Whatever section sits behind the rail and the cue decides their colours.
      const behind = (yy: number) =>
        !!document.elementFromPoint(innerWidth - 40, yy)?.closest('.ink');
      setRailOnInk(behind(innerHeight * 0.5));
      setCueOnInk(behind(innerHeight * 0.82));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stones]);

  const next = atEnd ? null : stones[current + 1] ?? null;
  const showMouse = desktop && atTop;
  const showCue = !pinned && !showMouse && (next !== null || atEnd);

  return (
    <>
      <nav className={`rail${railOnInk ? ' on-ink' : ''}`} aria-label="Page progress">
        <m.span
          className="rail__fill"
          aria-hidden="true"
          style={desktop ? { scaleY: scrollYProgress } : { scaleX: scrollYProgress }}
        />
        <ol className="rail__ticks">
          {stones.map((s, i) => (
            <li
              key={s.href}
              className={`rail__tick${i <= current ? ' is-passed' : ''}`}
              style={{ '--at': `${s.frac * 100}%` } as CSSProperties}
            >
              <a href={s.href} aria-current={i === current ? 'true' : undefined}>
                <span className="rail__no">{s.no}</span>
                <span className="rail__label"> {s.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Mouse cue: first screen only, in the masthead's reserved band. */}
      <AnimatePresence>
        {showMouse && (
          <m.a
            key="mouse"
            className="mouse"
            href="#work"
            aria-label="Scroll down to the work"
            initial={{ opacity: 0, x: '-50%' }}
            animate={{ opacity: 1, x: '-50%' }}
            exit={{ opacity: 0, x: '-50%' }}
            transition={{
              duration: DUR.fast,
              ease: EASE_OUT,
              // Waits for the masthead's load sequence on first show only.
              delay: everScrolled ? 0 : 1.1,
            }}
          >
            <span className="mouse__icon" aria-hidden="true">
              <span className="mouse__wheel" />
            </span>
            <ArrowDown className="mouse__arrow" />
            <span className="mouse__label label">Scroll</span>
          </m.a>
        )}
      </AnimatePresence>

      {/* Next-section cue: gutter on desktop, nav bar on phones. */}
      <AnimatePresence mode="wait">
        {showCue && (
          <m.a
            key={atEnd ? 'top' : next!.href}
            className={`cue${cueOnInk ? ' on-ink' : ''}`}
            href={atEnd ? '#top' : next!.href}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.fast, ease: EASE_OUT }}
          >
            {atEnd ? (
              <>
                <ArrowUp className="cue__arrow cue__arrow--up" />
                <span className="cue__label">Top</span>
              </>
            ) : (
              <>
                <ArrowDown className="cue__arrow" />
                <span className="cue__no">{next!.no}</span>
                <span className="cue__label">{next!.label}</span>
              </>
            )}
          </m.a>
        )}
      </AnimatePresence>
    </>
  );
}
