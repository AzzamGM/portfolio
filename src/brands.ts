/**
 * Brand colours for organisations named on the site, taken from their own logo
 * files. Each brand has a variant for paper and one for ink; both clear WCAG AA
 * (4.5:1) against their background, so the real logo colour is used wherever
 * it already passes and darkened or lifted where it does not.
 */
export type Brand = { paper: string; ink: string };

export const brands: Record<string, Brand> = {
  STC: { paper: '#4f008c', ink: '#c9a4f2' },
  MySTC: { paper: '#4f008c', ink: '#c9a4f2' },
  SAMI: { paper: '#376f1b', ink: '#72be44' },
  'Arabian Cement Company': { paper: '#062f6e', ink: '#8fb1f0' },
  'University of Business and Technology': { paper: '#1f2850', ink: '#9db3e6' },
  UBT: { paper: '#1f2850', ink: '#9db3e6' },
  AWS: { paper: '#a84b00', ink: '#ff9900' },
  LinkedIn: { paper: '#0a66c2', ink: '#6cb4ff' },
};

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const pattern = new RegExp(
  `\\b(${Object.keys(brands)
    .sort((a, b) => b.length - a.length)
    .map(escape)
    .join('|')})\\b`,
  'g'
);

export type BrandPart = { text: string; brand?: Brand };

/** Split a string into plain runs and brand-name runs. */
export function splitBrands(text: string): BrandPart[] {
  const parts: BrandPart[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const i = match.index ?? 0;
    if (i > last) parts.push({ text: text.slice(last, i) });
    parts.push({ text: match[0], brand: brands[match[0]] });
    last = i + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
