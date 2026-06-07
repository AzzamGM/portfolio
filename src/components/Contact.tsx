import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import { fadeUp, stagger, viewport } from '../anim';
import { profile } from '../data';
import './Contact.css';

const channels = [
  {
    icon: HiOutlineMail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    value: 'Azzam Al-Maimani',
    href: profile.linkedin,
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'My GitHub',
    href: profile.github,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <motion.div
        className="contact__card"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <div className="contact__glow" />

        <motion.span className="section-eyebrow" variants={fadeUp}>
          Contact
        </motion.span>
        <motion.h2 className="contact__title" variants={fadeUp}>
          Let’s build something <span className="accent">great</span> together
        </motion.h2>
        <motion.p className="contact__lead" variants={fadeUp}>
          I’m currently open to new opportunities and collaborations. Whether you
          have a role in mind or just want to connect — my inbox is always open.
        </motion.p>

        <motion.a
          className="btn btn-primary contact__main"
          href={`mailto:${profile.email}`}
          variants={fadeUp}
        >
          <HiOutlineMail /> Say Hello
        </motion.a>

        <motion.div className="contact__grid" variants={stagger}>
          {channels.map((c) => {
            const Icon = c.icon;
            const external = c.href.startsWith('http');
            return (
              <motion.a
                key={c.label}
                className="contact__item"
                href={c.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                variants={fadeUp}
                whileHover={{ y: -5 }}
              >
                <span className="contact__icon">
                  <Icon />
                </span>
                <span className="contact__item-meta">
                  <span className="contact__item-label">{c.label}</span>
                  <span className="contact__item-value">{c.value}</span>
                </span>
                <HiArrowUpRight className="contact__item-arrow" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
