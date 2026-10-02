import { profile } from '../data';
import { ArrowUp, GitHub, LinkedIn, Mail } from './icons';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <p className="small">
          © {year} {profile.name}
        </p>
        <p className="small foot__note">
          Built with React, Vite and Motion. Proudly contributing to Vision 2030.
        </p>
        <ul className="foot__links">
          <li>
            <a className="arrow-link" href={`mailto:${profile.email}`}>
              <Mail /> Email
            </a>
          </li>
          <li>
            <a className="arrow-link" href={profile.github} target="_blank" rel="noreferrer">
              <GitHub /> GitHub
            </a>
          </li>
          <li>
            <a className="arrow-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              <LinkedIn className="ic--linkedin" /> LinkedIn
            </a>
          </li>
        </ul>
        <a className="arrow-link foot__top" href="#top">
          Top <ArrowUp />
        </a>
      </div>
    </footer>
  );
}
