import { m } from 'framer-motion';
import { certifications, education, experience } from '../data';
import { Mask, RevealWords } from '../motion/Reveal';
import { useReveal } from '../motion/useReveal';
import { draw, rise, stagger } from '../motion/vocabulary';
import { Brandify } from './Brand';
import { Award, Briefcase, GraduationCap } from './icons';
import './Experience.css';

export function Experience() {
  const reveal = useReveal(0.2);

  return (
    <section id="experience" className="xp ink section" aria-labelledby="xp-title">
      <div className="wrap">
        <header className="section__head">
          <p className="label">
            <span className="label__no">02</span> — Experience
          </p>
          <h2 id="xp-title" className="h2">
            <RevealWords text="Where I’ve worked" />
          </h2>
          <p className="deck">
            One production role, two training programs, a software engineering degree and three
            certifications.
          </p>
        </header>

        <div className="xp__figure grid">
          <p className="xp__big display">
            <Mask>
              <span>40+</span>
            </Mask>
          </p>
          <m.p className="xp__figure-text lead" variants={rise} {...reveal}>
            change requests developed and delivered to production on the{' '}
            <Brandify text="MySTC" /> portal since December 2024.
          </m.p>
        </div>

        <ol className="ledger">
          {experience.map((e) => (
            <m.li key={e.role + e.org} className="ledger__row" variants={stagger(0.1)} {...reveal}>
              <m.span className="rule rule--light ledger__rule" variants={draw} aria-hidden="true" />
              <m.p className="ledger__period label" variants={rise}>
                <Briefcase /> {e.period}
                {e.current && <span className="ledger__now">Current</span>}
              </m.p>
              <m.div className="ledger__what" variants={rise}>
                <h3 className="h3">
                  <Brandify text={e.role} />
                </h3>
                <p className="ledger__org">
                  <Brandify text={e.org} />
                </p>
              </m.div>
              <m.ul className="ledger__points" variants={rise}>
                {e.points.map((pt) => (
                  <li key={pt}>
                    <Brandify text={pt} />
                  </li>
                ))}
              </m.ul>
            </m.li>
          ))}

          <m.li className="ledger__row" variants={stagger(0.1)} {...reveal}>
            <m.span className="rule rule--light ledger__rule" variants={draw} aria-hidden="true" />
            <m.p className="ledger__period label" variants={rise}>
              <GraduationCap /> {education.period}
            </m.p>
            <m.div className="ledger__what" variants={rise}>
              <h3 className="h3">{education.degree}</h3>
              <p className="ledger__org">
                <Brandify text={education.school} />
              </p>
            </m.div>
            <m.ul className="ledger__points" variants={rise}>
              <li>GPA {education.gpa}</li>
            </m.ul>
          </m.li>
        </ol>

        <p className="label xp__sub">
          <Award /> Certifications
        </p>
        <ol className="ledger ledger--certs">
          {certifications.map((c) => (
            <m.li key={c.title} className="ledger__row" variants={stagger(0.1)} {...reveal}>
              <m.span className="rule rule--light ledger__rule" variants={draw} aria-hidden="true" />
              <m.p className="ledger__period label" variants={rise}>
                <Award /> <time dateTime={c.dateTime}>{c.date}</time>
              </m.p>
              <m.div className="ledger__what" variants={rise}>
                <h3 className="h3">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noreferrer">
                      <Brandify text={c.title} />
                    </a>
                  ) : (
                    <Brandify text={c.title} />
                  )}
                </h3>
                {c.issuer && <p className="ledger__org">{c.issuer}</p>}
              </m.div>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
