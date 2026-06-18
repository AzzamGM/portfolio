import { FaGithub, FaLinkedinIn, FaWrench } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { profile } from '../data';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <FaWrench />
          </span>
          <div>
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
          </div>
        </div>

        <div className="footer__socials">
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <HiOutlineMail />
          </a>
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
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span>
            © {year} {profile.name}. Built with React, Vite &amp; Framer Motion.
          </span>
          <span className="footer__vision">Proudly contributing to Vision 2030 🇸🇦</span>
        </div>
      </div>
    </footer>
  );
}
