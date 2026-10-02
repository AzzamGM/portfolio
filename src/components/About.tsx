import { m } from 'framer-motion';
import { alsoUsed, education, languages, profile, stack, workingStyle } from '../data';
import { RevealWords } from '../motion/Reveal';
import { useReveal } from '../motion/useReveal';
import { rise, stagger } from '../motion/vocabulary';
import { Brandify } from './Brand';
import { GraduationCap, Languages, Layers, Sparkle } from './icons';
import './About.css';

export function About() {
  const reveal = useReveal(0.2);

  return (
    <section id="about" className="about section" aria-labelledby="about-title">
      <div className="wrap">
        <header className="section__head">
          <p className="label">
            <span className="label__no">03</span> — About
          </p>
          <h2 id="about-title" className="h2">
            <RevealWords text="In short" />
          </h2>
        </header>

        <div className="about__grid grid">
          <m.div className="about__bio" variants={stagger(0.1)} {...reveal}>
            <m.p className="lead" variants={rise}>
              <Brandify text={profile.bio} />
            </m.p>
            <m.p className="about__p" variants={rise}>
              {profile.bio2}
            </m.p>
            <m.p className="about__style" variants={rise}>
              <span className="label">
                <Sparkle /> Working style
              </span>
              <span>{workingStyle.join(' · ')}</span>
            </m.p>
          </m.div>

          <m.aside className="about__side" variants={stagger(0.08)} {...reveal}>
            <m.section aria-labelledby="stack-title" variants={rise}>
              <h3 id="stack-title" className="label about__side-title">
                <Layers /> Stack
              </h3>
              <dl className="about__stack">
                {stack.map((g) => (
                  <div key={g.name}>
                    <dt className="label">{g.name}</dt>
                    <dd>{g.items.join(', ')}</dd>
                  </div>
                ))}
                <div>
                  <dt className="label">In projects</dt>
                  <dd>{alsoUsed.join(', ')}</dd>
                </div>
              </dl>
            </m.section>

            <m.section aria-labelledby="edu-title" variants={rise}>
              <h3 id="edu-title" className="label about__side-title">
                <GraduationCap /> Education
              </h3>
              <p>
                {education.degree}
                <br />
                <span className="about__muted">
                  <Brandify text={education.school} />, {education.period} · GPA {education.gpa}
                </span>
              </p>
            </m.section>

            <m.section aria-labelledby="lang-title" variants={rise}>
              <h3 id="lang-title" className="label about__side-title">
                <Languages /> Languages
              </h3>
              <p>
                {languages.map((l, i) => (
                  <span key={l.name}>
                    {i > 0 && ' · '}
                    {l.name} <span className="about__muted">{l.level}{l.note ? ` (${l.note})` : ''}</span>
                  </span>
                ))}
              </p>
            </m.section>
          </m.aside>
        </div>
      </div>
    </section>
  );
}
