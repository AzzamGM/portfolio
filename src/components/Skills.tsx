import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { viewport } from '../anim';
import { skills } from '../data';
import './Skills.css';

const APPEAR_STEP = 0.12;
const GLOW_STEP = 0.18;
const GLOW_START = 1.7;

const skillReveal: Variants = {
  hidden: { opacity: 0, y: 40, '--glow': 0 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    '--glow': 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: i * APPEAR_STEP,
      '--glow': {
        duration: 0.45,
        ease: 'easeOut',
        delay: GLOW_START + i * GLOW_STEP,
      },
    },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <motion.div
        className="skills__head"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <span className="section-eyebrow">Skills &amp; Proficiencies</span>
        <h2 className="section-title">
          The <span className="accent">tools</span> I build with
        </h2>
        <p className="section-lead">
          A focused frontend stack centered on React &amp; TypeScript, backed by
          solid Node/Express fundamentals.
        </p>
      </motion.div>

      <motion.div
        className="skills__grid"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {skills.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.name}
              className="skill"
              custom={i}
              variants={skillReveal}
              style={{ '--skill-color': s.color } as React.CSSProperties}
            >
              <span className="skill__icon">
                <Icon />
              </span>
              <span className="skill__name">{s.name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
