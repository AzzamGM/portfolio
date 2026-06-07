import { motion } from 'framer-motion';
import {
  HiArrowDown,
  HiOutlineMail,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
} from 'react-icons/si';
import { profile } from '../data';
import './Hero.css';

const float = [
  { Icon: SiReact, color: '#61DAFB', className: 'orbit orbit--1' },
  { Icon: SiTypescript, color: '#3178C6', className: 'orbit orbit--2' },
  { Icon: SiJavascript, color: '#F7DF1E', className: 'orbit orbit--3' },
  { Icon: SiNodedotjs, color: '#5FA04E', className: 'orbit orbit--4' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section id="home" className="hero">
      <motion.div
        className="hero__content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span className="hero__badge" variants={item}>
          <span className="hero__badge-dot" />
          Open to new opportunities
        </motion.span>

        <motion.p className="hero__hello" variants={item}>
          Hi, I’m
        </motion.p>

        <motion.h1 className="hero__name" variants={item}>
          {(() => {
            const [first, ...rest] = profile.name.split(' ');
            return (
              <>
                {first}
                <br />
                {rest.join(' ')}
              </>
            );
          })()}
        </motion.h1>

        <motion.h2 className="hero__role" variants={item}>
          <span className="hero__role-accent">{profile.role}</span>
        </motion.h2>

        <motion.p className="hero__tagline" variants={item}>
          {profile.tagline}
        </motion.p>

        <motion.div className="hero__meta" variants={item}>
          <span>
            <HiOutlineLocationMarker /> {profile.location}
          </span>
          <span>
            <HiOutlineMail /> {profile.email}
          </span>
        </motion.div>

        <motion.div className="hero__actions" variants={item}>
          <a href="#projects" className="btn btn-primary">
            View My Work <HiArrowDown />
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get In Touch
          </a>
        </motion.div>

        <motion.div className="hero__socials" variants={item}>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__visual"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <div className="hero__ring hero__ring--outer" />
        <div className="hero__ring hero__ring--inner" />
        <div className="hero__ring hero__ring--core" />
        <div className="hero__avatar">
          <FaCode />
        </div>

        {float.map(({ Icon, color, className }, i) => (
          <motion.div
            key={i}
            className={className}
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ color }}
          >
            <Icon />
          </motion.div>
        ))}
      </motion.div>

      <motion.a
        href="#about"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll down"
      >
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </span>
        Scroll
      </motion.a>
    </section>
  );
}
