import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '../anim';
import { skills } from '../data';
import './Skills.css';

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <motion.div
        className="skills__head"
        variants={fadeUp}
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
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {skills.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.name}
              className="skill"
              variants={fadeUp}
              whileHover={{ y: -6 }}
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
