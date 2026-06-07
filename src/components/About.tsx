import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import { fadeUp, stagger, viewport } from '../anim';
import { profile, highlights, languages } from '../data';
import './About.css';

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
          Driven by <span className="accent">curiosity</span> &amp; clean code
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
