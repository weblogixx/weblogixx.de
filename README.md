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

## Vintera theme

`src/styles/vintera.css` derives every color from six registered custom properties
(`--p-l/c/h`, `--a-l/c/h`, OKLCH). On the career page, `src/theme/tint.ts` writes an
employer's (contrast-normalized, see `src/theme/color.ts`) values to `:root` when its
section crosses the viewport middle; CSS transitions animate the change.

## Commands

| Command          | Action                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| `npm run dev`    | Dev server (`astro dev --background` for background mode)              |
| `npm run build`  | Build to `dist/`                                                       |
| `npm run check`  | `astro check` + oxlint + oxfmt check                                   |
| `npm run lint`   | oxlint (also lints `.astro` frontmatter and scripts)                   |
| `npm run format` | oxfmt (does not support `.astro` files yet)                            |
| `npm run deploy` | Build and push `dist/` to `weblogixx/weblogixx.github.io` @ `gh-pages` |
