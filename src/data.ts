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
} from "react-icons/si";

export const profile = {
  name: "Azzam Al-Maimani",
  role: "Software Engineer - Web Developer",
  tagline:
    "Web developer at STC, building the next generation of MySTC customer portals.",
  blurb:
    "Software Engineer and 2024 graduate, now building customer-facing products on the Portal Team at STC. I craft clean, performant web experiences and care about contributing to Saudi Arabia's Vision 2030 through impactful, real-world software.",
  email: "azzamgm1412h@gmail.com",
  location: "Saudi Arabia",
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
  { name: "React", icon: SiReact, color: "#61DAFB", level: 90 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 90 },
  { name: "CSS", icon: SiCss, color: "#2965F1", level: 88 },
  { name: "HTML", icon: SiHtml5, color: "#E34F26", level: 92 },
  { name: "Express.js", icon: SiExpress, color: "#cbd5e1", level: 75 },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", level: 78 },
  { name: "Redux", icon: SiRedux, color: "#764ABC", level: 72 },
  { name: "Git", icon: SiGit, color: "#F05032", level: 85 },
  { name: "GitHub", icon: SiGithub, color: "#e2e8f0", level: 88 },
];

export const techColors: Record<string, string> = {
  ...Object.fromEntries(skills.map((s) => [s.name, s.color])),
  Remix:    "#ffffff",
  Vite:     "#bd34fe",
  Tailwind: "#38bdf8",
  TanStack: "#ef4444",
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
};

export const projects: Project[] = [
  {
    title: "MySTC",
    logo: "/portfolio/STC.svg",
    tag: "STC · Channels Platform",
    description:
      "Played a major role on the Web Portal Team developing/maintaining/improving MySTC4",
    tech: ["Remix", "React", "TypeScript", "Redux", "TanStack", "Tailwind", "CSS", "Vite", "Node.js"],
    link: "https://mystc.stc.com.sa/",
    linkText: "View Project",
    featured: true,
  },
  {
    title: "SAMI Summer Training Program",
    tag: "SAMI Advanced Technologies",
    description:
      "Assisted in investigating and fixing real bugs and issues within existing production projects, gaining hands-on software experience of how engineering work is carried out in a professional environment.",
    tech: ["JavaScript", "React", "Node.js"],
  },
  {
    title: "Personal Portfolio",
    tag: "Open Source",
    description:
      "This very site — a fully responsive, animated portfolio built with Vite, React & Framer Motion to showcase my work and skills.",
    tech: ["React", "TypeScript", "CSS"],
    link: "https://github.com/AzzamGM",
    linkText: "View GitHub Projects",
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
      { t: "Developer — " },
      { t: "STC", c: "#420077", badge: true },
      { t: " (Channels Platform) Portal Team" },
    ],
    org: [
      { t: "Innovation ", c: "#ffffff" },
      { t: "Team", c: "rgb(58, 156, 242)" },
    ],
    period: "Dec 2024 — Present",
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
    period: "Jun 2024 — Aug 2024 · 2 months",
    points: [
      "Assisted in investigating and fixing real bugs and issues within existing production projects.",
      "Gained hands-on experience of how software engineering work is carried out in a professional environment.",
    ],
  },
  {
    role: "Training Program",
    org: "Arabian Cement Company",
    period: "May 2021 — Jul 2021 · 2 months",
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
  period: "2019 — 2024",
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
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
