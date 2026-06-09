import { motion, AnimatePresence } from 'framer-motion';
import { HiBriefcase, HiAcademicCap, HiChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import { fadeUp, viewport } from '../anim';
import { experience, education } from '../data';
import type { RichText } from '../data';
import './Experience.css';

/* Render a plain string or an array of colored segments. */
function Rich({ value }: { value: RichText }) {
  if (typeof value === 'string') return <>{value}</>;
  return (
    <>
      {value.map((seg, i) => {
        const style: React.CSSProperties = {};
        if (seg.c) style.color = seg.c;
        if (seg.badge) {
          style.background = 'white';
          style.paddingLeft = '5px';
          style.paddingRight = '5px';
          style.borderRadius = '5px';
        }
        return (
          <span key={i} style={Object.keys(style).length ? style : undefined}>
            {seg.t}
          </span>
        );
      })}
    </>
  );
}

/* flatten a RichText to a string for stable React keys */
function keyOf(value: RichText) {
  return typeof value === 'string' ? value : value.map((s) => s.t).join('');
}

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="section experience">
      <motion.div
        className="experience__head"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <span className="section-eyebrow">Experience &amp; Education</span>
        <h2 className="section-title">
          My <span className="accent">journey</span> so far
        </h2>
      </motion.div>

      <div className="timeline">
        <span className="timeline__rail" />

        {experience.map((exp, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              className="tl-item"
              key={keyOf(exp.role) + keyOf(exp.org)}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              transition={{ delay: i * 0.05 }}
            >
              <span className={`tl-dot ${exp.current ? 'tl-dot--live' : ''}`}>
                <HiBriefcase />
              </span>
              <div className="tl-card">
                <button
                  type="button"
                  className="tl-card__toggle"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen ? 'true' : 'false'}
                >
                  <div className="tl-card__top">
                    <h3>
                      <Rich value={exp.role} />
                    </h3>
                    {exp.current && <span className="tl-now">Current</span>}
                  </div>
                  <span className="tl-org">
                    <Rich value={exp.org} />
                  </span>
                  <span className="tl-period">{exp.period}</span>
                  <HiChevronDown className={`tl-chevron ${isOpen ? 'tl-chevron--open' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      className="tl-points"
                      key="points"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      {exp.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}

        {/* Education entry */}
        <motion.div
          className="tl-item"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className="tl-dot tl-dot--edu">
            <HiAcademicCap />
          </span>
          <div className="tl-card">
            <div className="tl-card__top">
              <h3>{education.degree}</h3>
              <span className="tl-gpa">GPA {education.gpa}</span>
            </div>
            <span className="tl-org">
              <Rich value={education.school} />
            </span>
            <span className="tl-period">{education.period}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
