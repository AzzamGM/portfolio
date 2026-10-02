import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const line: P = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  className: 'ic',
};

const solid: P = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
  className: 'ic',
};

/** Arrows are the only glyphs that move on hover: they mark a link. */
const arrow: P = { ...line, strokeWidth: 2, className: 'ic ic--arrow' };

const cx = (base: P, props: P): P => ({
  ...base,
  ...props,
  className: props.className ? `${base.className} ${props.className}` : base.className,
});

/* ---- Arrows ------------------------------------------------------------- */

export function ArrowUpRight(props: P) {
  return (
    <svg {...cx(arrow, props)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
export function ArrowDown(props: P) {
  return (
    <svg {...cx(arrow, props)}>
      <path d="M12 4v16M5 13l7 7 7-7" />
    </svg>
  );
}
export function ArrowUp(props: P) {
  return (
    <svg {...cx(arrow, props)}>
      <path d="M12 20V4M5 11l7-7 7 7" />
    </svg>
  );
}

/* ---- Actions ------------------------------------------------------------ */

export function Copy(props: P) {
  return (
    <svg {...cx(line, props)}>
      <rect x="9" y="9" width="11" height="11" rx="1" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </svg>
  );
}
export function Check(props: P) {
  return (
    <svg {...cx({ ...line, strokeWidth: 2 }, props)}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

/* ---- Contact and place -------------------------------------------------- */

export function Mail(props: P) {
  return (
    <svg {...cx(line, props)}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3 7.5 9 6 9-6" />
    </svg>
  );
}
export function MapPin(props: P) {
  return (
    <svg {...cx(line, props)}>
      <path d="M12 21.5s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0c0 4.9-6.5 10.5-6.5 10.5z" />
      <circle cx="12" cy="11" r="2.3" />
    </svg>
  );
}
export function ClockIcon(props: P) {
  return (
    <svg {...cx(line, props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}
export function Link(props: P) {
  return (
    <svg {...cx(line, props)}>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2" />
    </svg>
  );
}

/* ---- Brand marks (simple-icons paths) ----------------------------------- */

export function GitHub(props: P) {
  return (
    <svg {...cx(solid, props)}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
export function LinkedIn(props: P) {
  return (
    <svg {...cx(solid, props)}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ---- Career and study --------------------------------------------------- */

export function Briefcase(props: P) {
  return (
    <svg {...cx(line, props)}>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12.5h18" />
    </svg>
  );
}
export function GraduationCap(props: P) {
  return (
    <svg {...cx(line, props)}>
      <path d="m2 9.5 10-4.5 10 4.5-10 4.5z" />
      <path d="M6.5 11.5v4.5c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.5M22 9.5v5.5" />
    </svg>
  );
}
export function Award(props: P) {
  return (
    <svg {...cx(line, props)}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.6 13.6-1.6 7.4 5-2.6 5 2.6-1.6-7.4" />
    </svg>
  );
}
export function Languages(props: P) {
  return (
    <svg {...cx(line, props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17" />
    </svg>
  );
}
export function Sparkle(props: P) {
  return (
    <svg {...cx(line, props)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.2 2.2M15.5 15.5l2.2 2.2M6.3 17.7l2.2-2.2M15.5 8.5l2.2-2.2" />
    </svg>
  );
}

/* ---- Project facts ------------------------------------------------------ */

export function User(props: P) {
  return (
    <svg {...cx(line, props)}>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}
export function Layers(props: P) {
  return (
    <svg {...cx(line, props)}>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </svg>
  );
}

/* ---- Project categories ------------------------------------------------- */

export function Globe(props: P) {
  return (
    <svg {...cx(line, props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5a13 13 0 0 1 0 17M12 3.5a13 13 0 0 0 0 17" />
    </svg>
  );
}
export function BarChart(props: P) {
  return (
    <svg {...cx(line, props)}>
      <path d="M4 20h16M7.5 16.5v-5M12 16.5v-9M16.5 16.5V5" />
    </svg>
  );
}
export function Gamepad(props: P) {
  return (
    <svg {...cx(line, props)}>
      <path d="M6.5 8h11a4.5 4.5 0 0 1 4.5 4.5v1.2a3.8 3.8 0 0 1-6.8 2.3l-.9-1.2h-4.6l-.9 1.2a3.8 3.8 0 0 1-6.8-2.3v-1.2A4.5 4.5 0 0 1 6.5 8z" />
      <path d="M8 11.5v3M6.5 13h3M16 12h.01M18 14h.01" />
    </svg>
  );
}
export function Calendar(props: P) {
  return (
    <svg {...cx(line, props)}>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}
export function Trophy(props: P) {
  return (
    <svg {...cx(line, props)}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4z" />
      <path d="M8 6H5a3 3 0 0 0 3 3.5M16 6h3a3 3 0 0 1-3 3.5M12 13v4M9 21h6M10.5 17h3" />
    </svg>
  );
}
export function Wallet(props: P) {
  return (
    <svg {...cx(line, props)}>
      <rect x="3" y="6" width="18" height="13" rx="1.5" />
      <path d="M3 10.5h18M15.5 14.5h2" />
    </svg>
  );
}
