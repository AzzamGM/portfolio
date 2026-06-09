import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import { useEffect, useState, useRef } from 'react';
import { fadeUp, stagger, viewport } from '../anim';
import { profile, highlights, languages } from '../data';
import './About.css';

const PHRASES = ['curiosity.', 'clean code.', 'Saudi Vision 2030.', 'passion.', 'excellence.', 'creativity.', 'innovation.'];
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_MS = 1800;

function TypewriterWord() {
  const [displayed, setDisplayed] = useState(PHRASES[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const phraseIndex = useRef(0);

  useEffect(() => {
    const current = PHRASES[phraseIndex.current];

    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayed === '') {
      phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
      setIsDeleting(false);
      return;
    }

    const next = isDeleting
      ? current.slice(0, displayed.length - 1)
      : current.slice(0, displayed.length + 1);

    const t = setTimeout(() => setDisplayed(next), isDeleting ? DELETE_SPEED : TYPE_SPEED);
    return () => clearTimeout(t);
  }, [displayed, isDeleting]);

  return (
    <>
      <span className="accent typewriter-word">{displayed}</span>
      <span className="typewriter-cursor">|</span>
    </>
  );
}

export default function About() {
  return (
    <section id="about" className="section about">
      <motion.div
        className="about__head"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <span className="section-eyebrow">About Me</span>
        <h2 className="section-title">
          Driven by <TypewriterWord />
        </h2>
      </motion.div>

      <div className="about__grid">
        <motion.div
          className="about__text"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp}>{profile.blurb}</motion.p>
          <motion.p variants={fadeUp} className="about__text-muted">
            Over the past year I've shipped 40+ change requests into production,
            thriving in collaborative, fast-paced teams and continuing to grow
            as an engineer with every feature customers rely on.
          </motion.p>

          <motion.ul className="about__highlights" variants={stagger}>
            {highlights.map((h) => (
              <motion.li key={h} variants={fadeUp}>
                <HiCheckCircle /> {h}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.aside
          className="about__cards"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.div className="about__stat" variants={fadeUp}>
            <span className="about__stat-num">4.27</span>
            <span className="about__stat-label">GPA / 5.0</span>
          </motion.div>
          <motion.div className="about__stat" variants={fadeUp}>
            <span className="about__stat-num">2024</span>
            <span className="about__stat-label">SE Graduate</span>
          </motion.div>

          <motion.div className="about__langs" variants={fadeUp}>
            <h3>Languages</h3>
            {languages.map((lang) => (
              <div className="about__lang" key={lang.name}>
                <div className="about__lang-top">
                  <span className="about__lang-name">{lang.name}</span>
                  <span className="about__lang-level">
                    {lang.level}
                    {lang.note ? ` · ${lang.note}` : ''}
                  </span>
                </div>
                <div className="about__lang-bar">
                  <motion.span
                    className="about__lang-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.value}%` }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.aside>
      </div>
    </section>
  );
}
