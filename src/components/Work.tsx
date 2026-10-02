import {
  AnimatePresence,
  cubicBezier,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { navLinks, projects, type Project } from '../data';
import { RevealWords } from '../motion/Reveal';
import { useMediaQuery } from '../motion/useMediaQuery';
import { useReveal } from '../motion/useReveal';
import { DUR, EASE_INOUT, EASE_OUT, rise, stagger } from '../motion/vocabulary';
import { Brandify } from './Brand';
import { ICONS } from './iconMap';
import { ArrowDown, ArrowUpRight, Layers, Link, User } from './icons';
import './Work.css';

const featured = projects.filter((p) => p.featured);
const board = projects.filter((p) => !p.featured);
const pad = (n: number) => String(n).padStart(2, '0');
const easeInOut = cubicBezier(...EASE_INOUT);
const BASE = import.meta.env.BASE_URL;

/* Scroll distance between two plates, in viewport heights, and where within
   that distance the next plate wipes in. */
const SLICE_VH = 80;
const WIPE_START = 0.3;
const WIPE_END = 0.9;

export function Work() {
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 900px) and (min-height: 640px)');
  const pinned = wide && !reduce;

  return (
    <section id="work" className="work section" aria-labelledby="work-title">
      <header className="wrap section__head">
        <p className="label">
          <span className="label__no">01</span> — Work
        </p>
        <h2 id="work-title" className="h2">
          <RevealWords text="Selected work" />
        </h2>
        <p className="deck">
          A telecom customer portal, a live esports stats archive and two real-time multiplayer
          games. Four more entries on the board below.
        </p>
      </header>

      {pinned ? <Roster items={featured} /> : <Stack items={featured} />}
      <Board items={board} />
    </section>
  );
}

/* ---- The roster: pinned plates that wipe over each other ----------------- */

function Roster({ items }: { items: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const n = items.length;
  const slice = 1 / (n - 1);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    let i = 0;
    for (let j = 1; j < n; j++) {
      const mid = (j - 1) * slice + ((WIPE_START + WIPE_END) / 2) * slice;
      if (v >= mid) i = j;
    }
    setActive(i);
  });

  /* Scroll so that plate i is fully on top. Tabs animate; keyboard focus jumps. */
  const bringToFront = useCallback(
    (i: number, smooth = false) => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = el.offsetHeight - window.innerHeight;
      const p = i === 0 ? 0 : (i - 1) * slice + WIPE_END * slice;
      window.scrollTo({ top: top + p * travel, behavior: smooth ? 'smooth' : 'auto' });
    },
    [slice]
  );

  return (
    <div ref={ref} className="roster" style={{ height: `${100 + (n - 1) * SLICE_VH}vh` }}>
      <div className="roster__stage">
        <div className="roster__bar wrap">
          <Counter active={active} total={n} />

          <ol className="roster__tabs" aria-label="Featured projects">
            {items.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={`roster__tab${i === active ? ' is-active' : ''}`}
                  aria-current={i === active ? 'true' : undefined}
                  onClick={() => bringToFront(i, true)}
                >
                  <span className="roster__tab-no">{pad(i + 1)}</span>
                  {p.title}
                </button>
              </li>
            ))}
          </ol>

          <p className="label roster__hint" aria-hidden="true">
            {active < n - 1 ? (
              <>
                Scroll <ArrowDown className="cue__arrow" /> {items[active + 1].title}
              </>
            ) : (
              <>
                Scroll on <ArrowDown className="cue__arrow" /> {navLinks[1].label}
              </>
            )}
          </p>

          <m.span className="roster__progress" style={{ scaleX: scrollYProgress }} />
        </div>

        {items.map((p, i) => (
          <Plate
            key={p.id}
            item={p}
            i={i}
            n={n}
            progress={scrollYProgress}
            active={active === i}
            onFocusIn={() => bringToFront(i)}
          />
        ))}
      </div>
    </div>
  );
}

function Plate({
  item,
  i,
  n,
  progress,
  active,
  onFocusIn,
}: {
  item: Project;
  i: number;
  n: number;
  progress: MotionValue<number>;
  active: boolean;
  onFocusIn: () => void;
}) {
  const slice = 1 / (n - 1);
  const start = (i - 1) * slice + WIPE_START * slice;
  const end = (i - 1) * slice + WIPE_END * slice;

  const t = useTransform(progress, (v) =>
    i === 0 ? 1 : easeInOut(Math.min(1, Math.max(0, (v - start) / (end - start))))
  );
  const clipPath = useTransform(t, (v) => `inset(${(1 - v) * 100}% 0 0 0)`);
  const y = useTransform(t, (v) => (1 - v) * 56);

  return (
    <m.article
      className="plate"
      style={{ clipPath }}
      aria-labelledby={`plate-${item.id}`}
      onFocus={() => {
        if (!active) onFocusIn();
      }}
    >
      <m.div className="plate__in wrap" style={{ y }}>
        <PlateBody item={item} />
      </m.div>
    </m.article>
  );
}

function Counter({ active, total }: { active: number; total: number }) {
  return (
    <p className="roster__counter">
      <span className="sr-only">
        Project {active + 1} of {total}
      </span>
      <span className="roster__win" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={active}
            className="roster__digit"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: DUR.base, ease: EASE_OUT }}
          >
            {pad(active + 1)}
          </m.span>
        </AnimatePresence>
      </span>
      <span className="roster__total" aria-hidden="true">
        / {pad(total)}
      </span>
    </p>
  );
}

/* ---- Static fallback: phones, short viewports, reduced motion ------------- */

function Stack({ items }: { items: Project[] }) {
  const reveal = useReveal(0.15);
  return (
    <div className="stack">
      {items.map((p) => (
        <m.article
          key={p.id}
          className="plate plate--static"
          variants={rise}
          aria-labelledby={`plate-${p.id}`}
          {...reveal}
        >
          <div className="plate__in wrap">
            <PlateBody item={p} />
          </div>
        </m.article>
      ))}
    </div>
  );
}

/* ---- One project: title, one-liner, figures, points, and a spec sheet ------ */

function PlateBody({ item }: { item: Project }) {
  const Icon = ICONS[item.icon];
  return (
    <div className={`plate__grid${item.image ? ' plate__grid--image' : ''}`}>
      <p className="plate__kicker label">
        <span>
          <Icon />
          <span className="label__no">{pad(item.index)}</span> — <Brandify text={item.kicker} />
        </span>
        {item.logo && (
          <img className="plate__logo" src={BASE + item.logo} alt="STC logo" width="44" height="22" />
        )}
      </p>

      <h3 id={`plate-${item.id}`} className="plate__title h1">
        {item.title}
      </h3>

      <p className="plate__summary">
        <Brandify text={item.summary} />
      </p>

      {item.image ? (
        <figure className="plate__media">
          <img
            src={BASE + item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="lazy"
            decoding="async"
          />
        </figure>
      ) : (
        item.figures && (
          <ul className="figures" aria-label="Key figures">
            {item.figures.map((f) => (
              <li key={f.label}>
                <span className="figures__v">{f.value}</span>
                <span className="figures__l label">{f.label}</span>
              </li>
            ))}
          </ul>
        )
      )}

      {item.details.length > 0 && (
        <ul className="plate__details">
          {item.details.map((d) => (
            <li key={d}>
              <Brandify text={d} />
            </li>
          ))}
        </ul>
      )}

      <dl className="spec">
        <div>
          <dt className="label">Status</dt>
          <dd>
            <span className="dot" aria-hidden="true" />
            {item.status}
          </dd>
        </div>
        <div>
          <dt className="label">
            <User /> Role
          </dt>
          <dd>{item.role}</dd>
        </div>
        <div>
          <dt className="label">
            <Layers /> Stack
          </dt>
          <dd>{item.stack.join(', ')}</dd>
        </div>
        {item.link && (
          <div>
            <dt className="label">
              <Link /> Link
            </dt>
            <dd>
              <a className="arrow-link spec__link" href={item.link} target="_blank" rel="noreferrer">
                {item.linkLabel ?? 'Visit'} <ArrowUpRight />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

/* ---- The board: the remaining entries, as an index ------------------------ */

function Board({ items }: { items: Project[] }) {
  const reveal = useReveal(0.1);
  return (
    <div className="wrap board">
      <m.p className="label board__head" variants={rise} {...reveal}>
        Also on the board
      </m.p>
      <m.ol className="board__list" variants={stagger(0.08)} {...reveal}>
        {items.map((p) => {
          const Icon = ICONS[p.icon];
          return (
          <m.li key={p.id} className="row" variants={rise}>
            <span className="row__no label">
              <span className="label__no">{pad(p.index)}</span>
            </span>
            <div className="row__main">
              <h3 className="row__title h3">
                <a className="row__link" href={p.link} target="_blank" rel="noreferrer">
                  {p.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </h3>
              <p className="row__desc">{p.summary}</p>
              {p.details.length > 0 && <p className="row__details small">{p.details.join(' · ')}</p>}
            </div>
            <p className="row__kicker label">
              <Icon /> {p.kicker}
            </p>
            <p className="row__stack small">{p.stack.length ? p.stack.join(' · ') : p.linkLabel}</p>
            <span className="row__arrow" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </m.li>
          );
        })}
      </m.ol>
    </div>
  );
}
