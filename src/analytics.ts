/**
 * Visit counting via hits.sh — no account, no cookies, no personal data.
 *
 * View the numbers (total + unique) at:
 *   https://hits.sh/azzamgm.github.io/portfolio/
 *
 * Requesting the badge image is what records the hit, so the image is fetched
 * but never inserted into the page.
 */
const HITS_URL = "https://hits.sh/azzamgm.github.io/portfolio.svg";

export function recordVisit() {
  if (!import.meta.env.PROD) return;

  try {
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.src = HITS_URL;
  } catch {}
}
