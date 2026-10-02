import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '../data';
import { RevealWords } from '../motion/Reveal';
import { useReveal } from '../motion/useReveal';
import { rise, stagger } from '../motion/vocabulary';
import { Brandify } from './Brand';
import { Clock } from './Clock';
import { ArrowUpRight, Check, ClockIcon, Copy, GitHub, LinkedIn, Mail, MapPin } from './icons';
import './Contact.css';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const reveal = useReveal(0.2);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      /* Clipboard unavailable: the address is still a visible mailto link. */
    }
  };

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <div className="wrap">
        <header className="section__head contact__head">
          <p className="label">
            <span className="label__no">04</span> — Contact
          </p>
          <h2 id="contact-title" className="h2 contact__title">
            <RevealWords text="Have a role in mind, or just want to connect?" step={0.03} />
          </h2>
          <p className="deck">
            I’m currently open to new opportunities and collaborations. My inbox is always open.
          </p>
        </header>

        <m.div className="contact__body" variants={stagger(0.1)} {...reveal}>
          <m.div className="contact__email" variants={rise}>
            <a className="contact__addr" href={`mailto:${profile.email}`}>
              <Mail className="contact__addr-ic" />
              {profile.email}
            </a>
            <button type="button" className="btn btn--ghost contact__copy" onClick={copy}>
              {copied ? (
                <>
                  <Check /> Copied
                </>
              ) : (
                <>
                  <Copy /> Copy address
                </>
              )}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </m.div>

          <m.ul className="contact__links" variants={rise}>
            <li>
              <a className="arrow-link" href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn className="ic--linkedin" /> <Brandify text="LinkedIn" /> <ArrowUpRight />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a className="arrow-link" href={profile.github} target="_blank" rel="noreferrer">
                <GitHub /> GitHub <ArrowUpRight />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li className="label contact__where">
              <MapPin /> {profile.location} · <ClockIcon /> <Clock />
            </li>
          </m.ul>
        </m.div>
      </div>
    </section>
  );
}
