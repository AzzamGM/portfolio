import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import { HiStar } from 'react-icons/hi';
import { fadeUp, stagger, viewport } from '../anim';
import { projects, techColors } from '../data';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <motion.div
        className="projects__head"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <span className="section-eyebrow">Projects</span>
        <h2 className="section-title">
          Things I’ve <span className="accent">worked on</span>
        </h2>
        <p className="section-lead">
          A selection of professional and personal work. Plenty more on the way.
        </p>
      </motion.div>

      <motion.div
        className="projects__grid"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {projects.map((p) => (
          <motion.article
            key={p.title}
            className={`project ${p.featured ? 'project--featured' : ''}`}
            variants={fadeUp}
            whileHover={{ y: -8 }}
          >
            <div className="project__glow" />

            <div className="project__top">
              <span className={`project__tag${p.tagClass ? ` ${p.tagClass}` : ''}`}>
                {p.tag}
              </span>
              {p.featured && (
                <span className="project__star">
                  <HiStar /> Featured
                </span>
              )}
            </div>

            {p.logo ? (
              <div className="project__logo-wrap">
                <img src={p.logo} alt={p.title} className="project__logo" />
              </div>
            ) : (
              <h3 className="project__title">{p.title}</h3>
            )}
            <p className="project__desc">{p.description}</p>

            <ul className="project__tech">
              {p.tech.map((t) => {
                const color = techColors[t];
                return (
                  <li
                    key={t}
                    style={
                      color
                        ? ({ '--tech-color': color } as React.CSSProperties)
                        : undefined
                    }
                  >
                    {t}
                  </li>
                );
              })}
            </ul>

            {p.link && (
              <a
                className="project__link"
                href={p.link}
                target="_blank"
                rel="noreferrer"
              >
                {p.linkText} <HiArrowUpRight />
              </a>
            )}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
