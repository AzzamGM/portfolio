/**
 * Single source of truth for everything on the site.
 * No icons, no colours, no percentages — just facts.
 */

export const profile = {
  name: 'Azzam Al-Maimani',
  firstName: 'Azzam',
  lastName: 'Al-Maimani',
  role: 'Software Engineer',
  title: 'MySTC Portal Team, STC',
  location: 'Riyadh, Saudi Arabia',
  timeZone: 'Asia/Riyadh',
  email: 'azzamgm1412h@gmail.com',
  github: 'https://github.com/AzzamGM',
  linkedin: 'https://www.linkedin.com/in/azzam-al-maimani-2b0350212/',
  status: 'Open to new opportunities',
  /** Masthead deck — written from the facts below, in first person. */
  intro:
    'Software engineer on the MySTC Portal team at STC, shipping customer-facing features to production. The rest of the time I build things that have to keep score: a live esports stats archive and two real-time multiplayer games.',
  /** About paragraph. Original text, with one phrase simplified (see README TODOs). */
  bio: 'Software Engineer and 2024 graduate, now building customer-facing products on the Portal Team at STC. I build clean, fast web products and care about contributing to Saudi Arabia’s Vision 2030 through impactful, real-world software.',
  bio2: 'Over the past year I’ve shipped 40+ change requests into production, working in collaborative, fast-paced teams and growing as an engineer with every feature customers rely on.',
};

export const workingStyle = [
  'Problem solving',
  'Fast learner',
  'Communication',
  'Team player',
  'Dynamic & innovative',
  'Fluent in English',
];

export type StackGroup = { name: string; items: string[] };

export const stack: StackGroup[] = [
  { name: 'Frontend', items: ['React', 'Redux', 'Tailwind CSS', 'CSS', 'HTML'] },
  { name: 'Backend', items: ['Node.js', 'Express.js', 'Socket.io', 'Prisma', 'PostgreSQL'] },
  { name: 'Languages', items: ['TypeScript', 'JavaScript'] },
  { name: 'Version control', items: ['Git', 'GitHub', 'GitLab'] },
];

/** Tools that appear in the projects below but are not core stack. */
export const alsoUsed = [
  'Remix',
  'TanStack',
  'Vite',
  'WebSockets',
  'Python',
  'GitHub Actions',
  'Vitest',
  'oxlint',
  'Render',
];

import type { IconName } from './components/iconMap';

export type Figure = { value: string; label: string };

export type Project = {
  id: string;
  index: number;
  title: string;
  kicker: string;
  /** Category glyph, see ICONS in components/icons.tsx. */
  icon: IconName;
  /** One line: what it is. */
  summary: string;
  /** Two to four short points: what it does, how, outcome. */
  details: string[];
  role: string;
  status: string;
  stack: string[];
  figures?: Figure[];
  link?: string;
  linkLabel?: string;
  /** File name under /public. Rendered as a small mark next to the kicker. */
  logo?: string;
  /**
   * Screenshot under /public/work. When present the plate switches to an
   * image layout. Nothing is invented when it is missing.
   */
  image?: { src: string; alt: string; width: number; height: number };
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 'mystc',
    icon: 'globe',
    index: 1,
    title: 'MySTC',
    kicker: 'STC · Channels platform',
    summary: 'STC’s customer portal. I develop, maintain and improve it on the Portal Team.',
    details: [
      'Shipped 40+ change requests to production',
      'Key role in MySTC 4 and the upcoming MySTC 5 customer portals',
      'Agile/Scrum delivery with cross-functional teams on tight deadlines',
    ],
    role: 'Developer, Portal Team',
    status: 'In production',
    stack: ['Remix', 'React', 'TypeScript', 'Redux', 'TanStack', 'Tailwind', 'CSS', 'Vite', 'Node.js'],
    figures: [
      { value: '40+', label: 'change requests shipped' },
      { value: '4 → 5', label: 'MySTC versions' },
    ],
    link: 'https://mystc.stc.com.sa/',
    linkLabel: 'mystc.stc.com.sa',
    logo: 'STC.svg',
    featured: true,
  },
  {
    id: 'mena-stats',
    icon: 'chart',
    index: 2,
    title: 'MENA Stats',
    kicker: 'Esports analytics platform',
    summary:
      'A public statistics archive for Middle East and North Africa League of Legends esports.',
    details: [
      '1,000+ matches, 80+ teams and 250+ players from Riot’s Arabian League',
      'Updated automatically in real time',
    ],
    role: 'Personal project',
    status: 'Live · updates automatically',
    stack: ['React', 'TypeScript', 'Vite', 'TanStack', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL', 'Python', 'GitHub Actions'],
    figures: [
      { value: '1,000+', label: 'matches' },
      { value: '80+', label: 'teams' },
      { value: '250+', label: 'players' },
    ],
    link: 'https://menastats.com',
    linkLabel: 'menastats.com',
    featured: true,
  },
  {
    id: 'leaguenames',
    icon: 'gamepad',
    index: 3,
    title: 'Leaguenames',
    kicker: 'Real-time multiplayer game',
    summary: 'Codenames, played with League of Legends champions.',
    details: [
      'Two teams race across a 5×5 board drawn from all 173 champions at the live patch',
      'The hidden colour key is held in server memory, so it never reaches a player’s browser',
    ],
    role: 'Personal project',
    status: 'Live',
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'WebSockets', 'PostgreSQL', 'Vitest', 'oxlint', 'GitHub Actions', 'Render'],
    figures: [
      { value: '173', label: 'champions, live patch' },
      { value: '5×5', label: 'board' },
      { value: '2', label: 'teams, one hidden key' },
    ],
    link: 'https://leaguenames.net',
    linkLabel: 'leaguenames.net',
    featured: true,
  },
  {
    id: 'three-steps-ahead',
    icon: 'gamepad',
    index: 4,
    title: '3 Steps Ahead',
    kicker: 'Multiplayer game',
    summary: 'A real-time multiplayer browser game.',
    details: [
      'Lobby matchmaking',
      'Reconnect-safe state recovery',
      'Round-based combat with live player updates',
    ],
    role: 'Personal project',
    status: 'Live',
    stack: ['React', 'Express.js', 'Socket.io', 'CSS', 'Tailwind'],
    link: 'https://3stepahead.com/',
    linkLabel: '3stepahead.com',
    featured: true,
  },
  {
    id: 'medibook',
    icon: 'calendar',
    index: 5,
    title: 'MediBook',
    kicker: 'Full-stack web app',
    summary:
      'A clinic appointment platform with role-based access for patients, front-desk staff and doctors.',
    details: [
      'Live slot availability',
      'Guest booking with OTP',
      'Prescriptions',
      'Full English/Arabic RTL support',
    ],
    role: 'Personal project',
    status: 'Live demo',
    stack: ['React', 'TypeScript', 'Express.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
    link: 'https://azzamgm.github.io/appointment-booking/',
    linkLabel: 'Live demo',
    featured: false,
  },
  {
    id: 'esports-website',
    icon: 'trophy',
    index: 6,
    title: 'Esports Website',
    kicker: 'Store & more',
    summary: 'An esports homepage with an integrated merchandise store.',
    details: ['Live match updates', 'Team standings and schedule details'],
    role: 'Personal project',
    status: 'Live demo',
    stack: ['React', 'TypeScript', 'CSS', 'Vite'],
    link: 'https://azzamgm.github.io/esports-page/',
    linkLabel: 'Live demo',
    featured: false,
  },
  {
    id: 'financial-helper',
    icon: 'wallet',
    index: 7,
    title: 'Personal Financial Helper',
    kicker: 'Finance',
    summary:
      'A personal finance platform for expense tracking, budget planning and financial analysis.',
    details: ['Real-time insights'],
    role: 'Personal project',
    status: 'Live demo',
    stack: ['React', 'TypeScript', 'CSS', 'Vite'],
    link: 'https://azzamgm.github.io/financial-helper/',
    linkLabel: 'Live demo',
    featured: false,
  },
  {
    id: 'github',
    icon: 'github',
    index: 8,
    title: 'More on GitHub',
    kicker: 'Open source',
    summary: 'Most of my projects are in private repositories, but feel free to look around.',
    details: [],
    role: '',
    status: '',
    stack: [],
    link: 'https://github.com/AzzamGM',
    linkLabel: 'github.com/AzzamGM',
    featured: false,
  },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: 'Developer, MySTC Portal Team',
    org: 'STC · Innovation Team',
    period: 'Dec 2024 — Present',
    current: true,
    points: [
      'Developed and delivered 40+ change requests (CRs), shipping customer-facing features to production.',
      'Collaborated with cross-functional teams in an Agile/Scrum environment to deliver features on tight deadlines.',
      'Played a key role in the development of MySTC 4 and the upcoming MySTC 5 customer portals.',
      'Managed the onboarding, training and introduction of new employees and co-op trainees.',
    ],
  },
  {
    role: 'Summer Training Program',
    org: 'SAMI Advanced Technologies',
    period: 'Jun — Aug 2024',
    points: [
      'Assisted in investigating and fixing real bugs and issues within existing production projects.',
      'Gained hands-on experience of how software engineering work is carried out in a professional environment.',
    ],
  },
  {
    role: 'Training Program',
    org: 'Arabian Cement Company',
    period: 'May — Jul 2021',
    points: ['Gained early industry exposure through a structured two-month training program.'],
  },
];

export const education = {
  degree: 'Bachelor of Software Engineering',
  school: 'University of Business and Technology (UBT)',
  period: '2019 — 2024',
  gpa: '4.27 / 5.0',
};

export type Certification = {
  title: string;
  date: string;
  dateTime: string;
  /** TODO: issuer and credential URL once confirmed. */
  issuer?: string;
  url?: string;
};

export const certifications: Certification[] = [
  { title: 'AWS Core Services and Cloud Foundations', date: 'Aug 2026', dateTime: '2026-08' },
  { title: 'AWS Serverless Development and Automation', date: 'Aug 2026', dateTime: '2026-08' },
  {
    title: 'Application Scalability, Monitoring, and Developer Tools',
    date: 'Aug 2026',
    dateTime: '2026-08',
  },
];

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Fluent', note: 'IELTS 6.0, 2018' },
];

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const site = {
  url: 'https://azzamgm.github.io/portfolio/',
  title: 'Azzam Al-Maimani — Software Engineer, Riyadh',
  description:
    'Software engineer on the MySTC Portal team at STC, Riyadh. Selected work: MySTC, MENA Stats, Leaguenames and 3 Steps Ahead.',
};
