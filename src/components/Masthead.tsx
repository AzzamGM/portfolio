import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { education, profile } from '../data';
import { Magnetic } from '../motion/Magnetic';
import { Mask } from '../motion/Reveal';
import { useReveal } from '../motion/useReveal';
import { DUR, EASE_INOUT, EASE_OUT, rise } from '../motion/vocabulary';
import { Brandify } from './Brand';
import { Clock } from './Clock';
import { ArrowDown, ClockIcon, GitHub, GraduationCap, LinkedIn, Mail, MapPin } from './icons';
import './Masthead.css';

/**
 * Page-load sequence (all under 600ms to readable):
 *   0.05  label row rises
 *   0.10  first name line rises out of its mask
 *   0.18  last name line rises
 *   0.35  the rule draws
 *   0.45  intro and CTA rise in turn
 *
 * The first screen (`mast__screen`) is exactly one viewport tall on desktop
 * and keeps its bottom band empty for the scroll cue. The quick-facts strip
 * is the first thing below the fold.
 */
export function Masthead() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const reveal = useReveal(0.3);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -72]);
  const nameFade = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.3]);

  const riseIn = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: DUR.base, ease: EASE_OUT, delay },
        };

  return (
    <section ref={ref} id="top" className="mast" aria-labelledby="mast-name">
      <div className="wrap">
        <div className="mast__screen">
          <div className="mast__top">
            <m.p className="label" {...riseIn(0.05)}>
              {profile.role}
              <span className="mast__sep" aria-hidden="true">
                /
              </span>
              <Brandify text={profile.title} />
            </m.p>
            <m.p className="label" {...riseIn(0.1)}>
              <span className="dot" aria-hidden="true" />
              {profile.status}
            </m.p>
          </div>

          <m.div className="mast__name-wrap" style={{ y: nameY, opacity: nameFade }}>
            <h1 id="mast-name" className="display mast__name">
              <span className="sr-only">{profile.name}</span>
              <span aria-hidden="true">
                <Mask immediate delay={0.1} className="mast__line">
                  <span>{profile.firstName}</span>
                </Mask>
                <Mask immediate delay={0.18} className="mast__line">
                  <span>{profile.lastName}</span>
                </Mask>
              </span>
            </h1>
            <m.p className="mast__side" {...riseIn(0.5)}>
              <span className="label">
                <MapPin /> {profile.location}
              </span>
              <span className="label">
                <ClockIcon /> <Clock />
              </span>
            </m.p>
          </m.div>

          <m.hr
            className="rule"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DUR.slow, ease: EASE_INOUT, delay: 0.35 }}
          />

          <div className="mast__deck grid">
            <m.p className="lead mast__lead" {...riseIn(0.45)}>
              <Brandify text={profile.intro} />
            </m.p>
            <m.div className="mast__cta" {...riseIn(0.52)}>
              <Magnetic>
                <a className="btn" href={`mailto:${profile.email}`}>
                  <Mail /> Email me
                </a>
              </Magnetic>
              <a className="btn btn--text" href="#work">
                See the work <ArrowDown />
              </a>
            </m.div>
          </div>
        </div>

        <m.dl className="mast__facts" variants={rise} {...reveal}>
          <div>
            <dt className="label">Based</dt>
            <dd>
              <MapPin /> {profile.location}
            </dd>
          </div>
          <div>
            <dt className="label">Email</dt>
            <dd>
              <Mail /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </dd>
          </div>
          <div>
            <dt className="label">Class of</dt>
            <dd>
              <GraduationCap /> <Brandify text={`2024 · ${education.degree}, UBT`} />
            </dd>
          </div>
          <div>
            <dt className="label">Elsewhere</dt>
            <dd>
              <a className="mast__social" href={profile.github} target="_blank" rel="noreferrer">
                <GitHub /> GitHub
              </a>
              {' · '}
              <a className="mast__social" href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn className="ic--linkedin" /> <Brandify text="LinkedIn" />
              </a>
            </dd>
          </div>
        </m.dl>
      </div>
    </section>
  );
}
