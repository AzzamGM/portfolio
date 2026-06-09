import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiCheck, HiOutlineClipboardCopy } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import { fadeUp, stagger, viewport } from '../anim';
import { profile } from '../data';
import './Contact.css';

type Channel = {
  icon: typeof HiOutlineMail;
  label: string;
  href?: string;
  copy?: string;
};

const channels: Channel[] = [
  { icon: HiOutlineMail, label: 'Email',    copy: profile.email    },
  { icon: FaLinkedinIn,  label: 'LinkedIn', href: profile.linkedin },
  { icon: FaGithub,      label: 'GitHub',   href: profile.github   },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

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

            if (c.copy) {
              return (
                <motion.button
                  key={c.label}
                  type="button"
                  className={`contact__item contact__item--copy ${
                    copied ? 'is-copied' : ''
                  }`}
                  onClick={() => copyEmail(c.copy!)}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  aria-label="Copy email address"
                >
                  <span className="contact__icon">
                    {copied ? <HiCheck /> : <Icon />}
                  </span>
                  <span className="contact__item-text">
                    <span className="contact__item-label">{c.label}</span>
                    <span className="contact__item-hint">
                      {copied ? 'Copied!' : 'Click to copy'}
                    </span>
                  </span>
                  {copied ? (
                    <HiCheck className="contact__item-arrow" />
                  ) : (
                    <HiOutlineClipboardCopy className="contact__item-arrow" />
                  )}
                </motion.button>
              );
            }

            const external = c.href!.startsWith('http');
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
                <span className="contact__item-label">{c.label}</span>
                <HiArrowUpRight className="contact__item-arrow" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
