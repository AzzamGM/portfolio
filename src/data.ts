import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiCss,
  SiHtml5,
  SiExpress,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiRedux,
  SiTailwindcss,
  SiSocketdotio,
  SiGitlab,
  SiPrisma,
  SiPostgresql
} from "react-icons/si";

export const profile = {
  name: "Azzam Al-Maimani",
  role: "Software Engineer - Web Developer",
  tagline:
    "Developer @ STC",
  blurb:
    "Software Engineer and 2024 graduate, now building customer-facing products on the Portal Team at STC. I craft clean, performant web experiences and care about contributing to Saudi Arabia's Vision 2030 through impactful, real-world software.",
  email: "azzamgm1412h@gmail.com",
  location: "Riyadh, Saudi Arabia",
  github: "https://github.com/AzzamGM ",
  linkedin: "https://www.linkedin.com/in/azzam-al-maimani-2b0350212/",
};

export const highlights: string[] = [
  "Problem Solving",
  "Fast Learner",
  "Communication Skills",
  "Team Player",
  "Dynamic & Innovative",
  "Fluent in English",
];

export type Skill = {
  name: string;
  icon: IconType;
  color: string;
  level: number;
};

export const skills: Skill[] = [
  // Frontend
  { name: "HTML", icon: SiHtml5, color: "#E34F26", level: 92 },
  { name: "React", icon: SiReact, color: "#61DAFB", level: 90 },
  { name: "Redux", icon: SiRedux, color: "#764ABC", level: 72 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8", level: 85 },
  { name: "CSS", icon: SiCss, color: "#2965F1", level: 88 },

  // Backend
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", level: 78 },
  { name: "Express.js", icon: SiExpress, color: "#cbd5e1", level: 75 },
  { name: "Socket.io", icon: SiSocketdotio, color: "#ffffff", level: 85 },
  { name: "Prisma", icon: SiPrisma, color: "#2dd4bf", level: 70 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 70 },

  // Languages
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 90 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85 },

  // Version Control & Collaboration
  { name: "Git", icon: SiGit, color: "#F05032", level: 85 },
  { name: "GitHub", icon: SiGithub, color: "#e2e8f0", level: 88 },
  { name: "GitLab", icon: SiGitlab, color: "#e24329", level: 85 },
];

export const techColors: Record<string, string> = {
  ...Object.fromEntries(skills.map((s) => [s.name, s.color])),
  Remix: "#ffffff",
  Vite: "#bd34fe",
  Tailwind: "#38bdf8",
  TanStack: "#ef4444",
  "Socket.io": "#ffffff",
  Prisma: "#2dd4bf",
  PostgreSQL: "#336791",
  Python: "#3776AB",
  "GitHub Actions": "#2088FF",
};

export type Project = {
  title: string;
  logo?: string;
  tag: string;
  description: string;
  tech: string[];
  link?: string;
  linkText?: string;
  featured?: boolean;
  /** Full-width lead card at the top of the projects grid. */
  hero?: boolean;
  tagClass?: string;
};

export const projects: Project[] = [
  {
    title: "MySTC",
    logo: "/portfolio/STC.svg",
    tag: "STC · Channels Platform",
    description:
      "Played a major role as a developer in MySTC's Portal Team developing, maintaining and improving MySTC Portal.",
    tech: [
      "Remix",
      "React",
      "TypeScript",
      "Redux",
      "TanStack",
      "Tailwind",
      "CSS",
      "Vite",
      "Node.js",
    ],
    link: "https://mystc.stc.com.sa/",
    linkText: "View MySTC Portal",
    featured: true,
    hero: true,
    tagClass: "project__tag--purple",
  },
  {
    title: "MENA Stats",
    tag: "Esports Analytics Platform",
    description:
      "A public statistics archive for Middle East and North Africa League of Legends esports — 1,000+ matches, 80+ teams and 250+ players from Riot's Arabian League, updated automatically in real time.",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack",
      "Node.js",
      "Express.js",
      "Java",
      "Spring Boot",
      "jOOQ",
      "Prisma",
      "PostgreSQL",
      "Python",
      "GitHub Actions",
    ],
    link: "https://menastats.com",
    linkText: "View Live Site",
    featured: true,
    tagClass: "project__tag--gold",
  },
  {
    title: "3 Steps Ahead",
    tag: "Multiplayer Game",
    description: "A real-time multiplayer browser game with lobby matchmaking, reconnect-safe state recovery, round-based combat, and live player updates.",
    tech: ["React", "Express.js", "Socket.io", "CSS", "Tailwind"],
    link: "https://3stepahead.com/",
    linkText: "View Website",
    featured: true,
    tagClass: "project__tag--blue",
  },
  {
    title: "MediBook",
    tag: "Full-Stack Web App",
    description:
      "A fully functional full-stack application, A clinic appointment platform with role-based access for patients, front-desk staff, and doctors. Features live slot availability, guest booking with OTP, prescriptions, and full English/Arabic RTL support.",
    tech: ["React", "TypeScript", "Express.js", "Prisma", "PostgreSQL", "Tailwind"],
    link: "https://azzamgm.github.io/appointment-booking/",
    linkText: "View Live Demo",
    tagClass: "project__tag--teal",
  },
  {
    title: "Esports Website",
    tag: "Store & more", 
    description:
      "An Esports homepage featuring live match updates, team standings, schedule details, and an integrated merchandise store.",
    tech: ["React", "TypeScript", "CSS", "Vite"],
    link: "https://azzamgm.github.io/esports-page/",
    linkText: "View Live Demo",
    tagClass: "project__tag--red",
  },
  {
    title: "Personal Finacial Helper",
    tag: "Finance",
    description:
        "A modern personal finance platform designed to simplify expense tracking, budget planning, and financial analysis with real-time insights.",
    tech: ["React", "TypeScript", "CSS", "Vite"],
    link: "https://azzamgm.github.io/financial-helper/",
    linkText: "View Live Demo",
    featured: false,
    tagClass: "project__tag--yellow",
  },
  {
    title: "My Github Projects",
    tag: "Open Source",
    description:
      "Most of my projects are in private repositories, but feel free to look around!",
    tech: ["React", "TypeScript", "CSS"],
    link: "https://github.com/AzzamGM",
    linkText: "View My Github",
  },
];

export type Segment = { t: string; c?: string; badge?: boolean };
export type RichText = string | Segment[];

export type Experience = {
  role: RichText;
  org: RichText;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: [
      { t: "Developer - " },
      { t: "STC", c: "#420077", badge: true },
      { t: " MySTC Portal Team" },
    ],
    org: [
      { t: "Innovation ", c: "#ffffff" },
      { t: "Team", c: "rgb(58, 156, 242)" },
    ],
    period: "Dec 2024 - Present",
    current: true,
    points: [
      "Developed and delivered 40+ change requests (CRs), shipping customer-facing features to production.",
      "Collaborated with cross-functional teams in an Agile/Scrum environment to deliver features on tight deadlines.",
      "Played a key role in the development of MySTC 4 and the upcoming MySTC 5 customer portals.",
      "Managed the onboarding, training and introduction of new employees and co-op trainees.",
    ],
  },
  {
    role: "Summer Training Program",
    org: "SAMI Advanced Technologies",
    period: "Jun 2024 - Aug 2024 · 2 months",
    points: [
      "Assisted in investigating and fixing real bugs and issues within existing production projects.",
      "Gained hands-on experience of how software engineering work is carried out in a professional environment.",
    ],
  },
  {
    role: "Training Program",
    org: "Arabian Cement Company",
    period: "May 2021 - Jul 2021 · 2 months",
    points: [
      "Gained early industry exposure through a structured two-month training program.",
    ],
  },
];

export const education: {
  degree: string;
  school: RichText;
  period: string;
  gpa: string;
} = {
  degree: "Bachelor of Software Engineering",
  school: "University of Business and Technology (UBT)",
  period: "2019 - 2024",
  gpa: "4.27 / 5.0",
};

export type Language = {
  name: string;
  level: string;
  note?: string;
  value: number;
};

export const languages: Language[] = [
  { name: "Arabic", level: "Native", value: 100 },
  { name: "English", level: "Fluent", note: "IELTS 6.0 (2018)", value: 98 },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];
