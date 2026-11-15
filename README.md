# weblogixx.de

Personal resume site — Astro, static, German first (`/`) with English under `/en/`.

## Editing content

All content is typed TS in `src/data/`:

| File           | What                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| `employers.ts` | Career entries incl. brand colors (hex). Sorted by `start` automatically. |
| `skills.ts`    | Skill ids → name/category. `employers[].stack` references these ids.      |
| `profile.ts`   | Name, intro, focus areas, about text.                                     |
| `links.ts`     | Links page.                                                               |

Logos go into `public/logos/` (SVG or PNG) and are referenced as `logo: '/logos/acme.svg'`.

Blog posts: `src/content/blog/<de|en>/<slug>.md`. Same slug = translation. `draft: true` hides a post in builds.

## Sunny theme

`src/styles/sunny.css` derives every color from six registered custom properties
(`--p-l/c/h`, `--a-l/c/h`, OKLCH). On the career page, `src/theme/tint.ts` writes an
employer's (contrast-normalized, see `src/theme/color.ts`) values to `:root` when its
section crosses the viewport middle; a JS tween in `tint.ts` animates the change.

### Light / dark mode

Every mode-dependent token is `light-dark(<light>, <dark>)`, resolved by `color-scheme`.
The page follows the OS setting; the mode toggle pins it via `<html data-mode="light|dark">`.

To force a mode on one element and everything inside it, regardless of the page's mode,
add a class:

```html
<section class="sunny-dark">…</section>
<aside class="sunny-light">…</aside>
```

`light-dark()` resolves against the `color-scheme` of the element using the token, so the
class only has to switch that; it also sets `background` and `color` again, because the
inherited text color is already resolved. For the whole page, use `data-mode` on `<html>`
instead (a class there would override the toggle). Elements with color transitions
(e.g. skill chips) fade over when the class is changed at runtime.

## Fonts

Self-hosted from Fontsource (`src/styles/fonts.css`), all under the SIL Open Font License 1.1:
Inter, JetBrains Mono, Fraunces. The OFL needs no credit on the page; the license texts ship
with the npm packages (`node_modules/@fontsource-variable/*/LICENSE`).

## Commands

| Command          | Action                                                    |
| ---------------- | --------------------------------------------------------- |
| `npm run dev`    | Dev server (`astro dev --background` for background mode) |
| `npm run build`  | Build to `dist/`                                          |
| `npm run check`  | `astro check` + oxlint + oxfmt check                      |
| `npm run lint`   | oxlint (also lints `.astro` frontmatter and scripts)      |
| `npm run format` | oxfmt (does not support `.astro` files yet)               |

## Deployment

Every push to `main` builds, checks and deploys the site to GitHub Pages via
`.github/workflows/deploy.yml` (repo `weblogixx/weblogixx.github.io`, Pages source: GitHub Actions).
