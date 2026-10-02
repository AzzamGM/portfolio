# Azzam Al-Maimani — portfolio

Live at <https://azzamgm.github.io/portfolio/>.

Single-page portfolio built with React 19, TypeScript, Vite and Motion (framer-motion).
Deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`.

## Run

```bash
npm install
npm run dev        # http://localhost:5173/portfolio/
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ at http://localhost:4173/portfolio/
npm run lint
```

## Deploy

Push to `main`. The GitHub Actions workflow installs, builds and publishes `dist/` to GitHub Pages.
The site is served under `/portfolio/`, which is set once in `vite.config.ts` (`base`) and read
everywhere else through `import.meta.env.BASE_URL`.

## Where things live

| Path | What |
| --- | --- |
| `src/data.ts` | All content: profile, projects, experience, education, stack, nav, SEO strings. Edit this first. |
| `src/styles/tokens.css` | Design tokens: palette, type scale, spacing, layout, easing and durations. |
| `src/styles/base.css` | Reset, typography classes (`display`, `h2`, `label`, `lead`, `deck`), grid, buttons. |
| `src/styles/fonts.css` | `@font-face` for the self-hosted fonts in `public/fonts`. |
| `src/motion/` | Motion vocabulary (two easings, three durations), masked reveals, magnetic hover, media-query hook. |
| `src/components/` | One component per section, each with its own stylesheet. |
| `public/` | Favicons, `og.png`, `STC.svg`, fonts. |

## Design brief

- **Concept — "match sheet".** The work keeps score (a telecom portal, a live esports stats
  archive, multiplayer game state), so the site is typeset like a well-made stat sheet: numbered
  entries, hairline rules, tabular numerals, one signal red reserved for anything live.
- **Type.** Barlow Condensed 600/700 for display and labels; Newsreader (variable) for text.
- **Palette.** Paper `#F3F0E8`, ink `#161513`, graphite `#5F5B53`, rule `#D4CFC2`, signal `#C9351B`.
  The Experience section inverts to ink for rhythm.
- **Grid.** 12 columns, 1360px max, fluid gutters. Text sits on columns 1–7, side notes on 8–12.
- **Motion.** `cubic-bezier(.16,1,.3,1)` out and `cubic-bezier(.65,0,.35,1)` in-out; 200 / 500 / 900 ms.
  Page-load sequence on the masthead, word reveals on section headings only, a pinned project
  "roster" whose plates wipe over each other while a scoreboard digit flips. Everything respects
  `prefers-reduced-motion` (static stack, no pin, no masks).

## TODOs that need Azzam's input

- **Project screenshots.** None exist in the repo, so projects render as typographic plates
  (real figures from the descriptions). See "Adding a project screenshot" below.
- **Bio wording.** One phrase in the About paragraph was changed from "I craft clean, performant
  web experiences" to "I build clean, fast web products". Revert in `src/data.ts` (`profile.bio`)
  if you prefer the original.
- **Masthead deck.** `profile.intro` is new copy written from the facts on the old site. Edit freely.
- **Status line.** "Open to new opportunities" is carried over from the old site; remove
  `profile.status` usage in `Masthead.tsx` when it stops being true.
- **Roles on personal projects** are listed as "Personal project" because the old site did not
  say who did what. Change `role` per project if any were team efforts.
- **Certifications.** The three August 2026 certifications are listed by title and date only.
  Add `issuer` and `url` in `certifications` (`src/data.ts`) to show the issuer and link each
  title to its credential.
- **Project summaries and points** (`summary`, `details` in `src/data.ts`) were rewritten from
  the original descriptions so each project reads as one line plus two to four points. Check the
  wording.

## Brand colours

Organisation names are coloured with their own brand colour wherever they appear, via
`src/brands.ts` and the `Brandify` component. Each brand has a paper variant and an ink variant
so both clear WCAG AA. Colours were taken from the organisations' own logo files: STC purple,
SAMI green, Arabian Cement navy, UBT slate navy, AWS orange, LinkedIn blue. Add a new name to
the map and it is coloured everywhere automatically.

## Icons

All icons are inline SVG in `src/components/icons.tsx`: functional glyphs (envelope, pin, clock,
copy, arrows), brand marks for GitHub and LinkedIn, and category glyphs for projects. A project's
glyph is chosen by the `icon` field in `src/data.ts`; the names map to components in
`src/components/iconMap.ts`. Icons are `aria-hidden` and always sit next to a text label.

## Scroll furniture

Nothing in this group ever sits on top of page content. It all lives in space the layout keeps
empty, in `src/components/ScrollRail.tsx`:

- **Mouse cue.** At the very top of the page a mouse glyph with a dropping wheel sits at the
  bottom centre (an arrow on touch laptops and tablets), linking to the work. The masthead's
  first screen is exactly one viewport tall on desktop and sizes the name from the viewport
  height as well as its width, so the bottom band is always empty for the cue. It fades after
  24px of scroll, and is not shown on phones or on windows shorter than 660px.
- **Progress rail.** A fixed rule, vertical in the right gutter on desktop and under the nav bar
  on phones, with a tick per section that fills as you scroll. Hover or focus a tick for its name.
- **Next-section cue.** "↓ 02 Experience", set vertically in the gutter under the rail on
  desktop and inside the nav bar on phones, or "↑ Top" at the end. Inside the pinned project
  roster it hands over to the roster bar, which lists all four projects as tabs and names the
  next one.

Only arrow glyphs move on hover (`.ic--arrow`); every other icon stays still.

## Adding a project screenshot

Projects render as typographic plates until an image is supplied. To add one:

1. Export a screenshot (about 1600×1000, WebP) to `public/work/<id>.webp`.
2. In `src/data.ts`, add to that project:
   `image: { src: 'work/<id>.webp', alt: '…', width: 1600, height: 1000 }`.

The plate switches to the image layout automatically; images are lazy-loaded with fixed
dimensions so nothing shifts.

## Visitor count

**Check it here: <https://hits.sh/azzamgm.github.io/portfolio/>**

That page shows total hits and unique visitors. No login — bookmark it and open it whenever you
want. Counting is handled by [hits.sh](https://github.com/silentsoft/hits) (free, MIT, no account,
no cookies). The code lives in `src/analytics.ts` and only runs in production builds, so
`npm run dev` never inflates the number.

It records a hit, not a full analytics profile — no per-page breakdown, referrers, or countries.
For that, swap in [GoatCounter](https://www.goatcounter.com/) or
[Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/); both are free and need a
one-line script tag plus a short signup.
