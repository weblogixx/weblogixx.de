# weblogixx.de

Personal resume site — Astro, static, German first (`/`) with English under `/en/`.

## Editing content

All content is typed TS in `src/data/`:

| File           | What                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| `employers.ts` | Career entries incl. brand colors (hex). Sorted by `start` automatically. |
| `skills.ts`    | Skill ids → name/category. `employers[].stack` references these ids.      |
| `profile.ts`   | Name, intro, focus areas.                                                 |
| `links.ts`     | Links page.                                                               |

Logos go into `public/logos/` (SVG or PNG) and are referenced as `logo: '/logos/acme.svg'`.

Blog posts: `src/content/blog/<de|en>/<slug>.md` (or `.mdx` to use components, e.g. images via
`astro:assets` as in the Sunny post; images live in `src/assets/blog/`). Same slug = translation. `draft: true` hides a post in builds.

Highlight a word with `<mark>Sunny</mark>` (accent color); `inline code` gets a small Sunny chip.

Code blocks get a header with language and copy button, and line numbers from two lines on.
Options after the language: ` ```ts title="src/theme/color.ts" ` (title in the header),
`nolines` (no line numbers), `lines` (line numbers for a single line too).
See `src/markdown/codeBlocks.ts`.

Prose pages are MDX files in `src/pages/` using `layout: …/layouts/MarkdownPage.astro`; the
frontmatter sets `lang`, `page` (route key), `title` and optionally `eyebrow`, `lede`,
`description` and `variant: legal`:

| Page    | DE                                | EN                                    |
| ------- | --------------------------------- | ------------------------------------- |
| About   | `src/pages/ueber-mich/index.mdx`  | `src/pages/en/about/index.mdx`        |
| Imprint | `src/pages/impressum/index.mdx`   | `src/pages/en/legal-notice/index.mdx` |
| Privacy | `src/pages/datenschutz/index.mdx` | `src/pages/en/privacy/index.mdx`      |

Imprint and privacy pull name, address and contact details from `src/data/imprint.ts` via
`<ImprintAddress />`, which fails the production build while placeholders are left.

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

## Styles

Native CSS nesting throughout. In components (Astro's scoped `<style>`), nest only what
refers to the element itself or its context:

```css
.lang {
  &:hover { … }                     /* states, modifiers, pseudo-elements */
  &.active { … }
  .featured & { … }                 /* context: "this element inside .featured" */
  :global([data-mode='light']) & { … }
  @media (max-width: 860px) { … }
}
.nav a { … }                        /* descendants stay flat */
```

Astro doesn't add its scope attribute to nested descendant selectors (`.nav { a { … } }`
compiles to `.nav[data-astro-cid-…] a`), which lowers their specificity and lets them leak into
child components. Write those flat, as before. `:global(…)` descendants are unscoped on
purpose and may be nested. Global stylesheets (`src/styles/`) aren't scoped, so anything goes there.

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

Every push to `main` builds, checks and uploads `dist/` to the web host via FTP over TLS
(`.github/workflows/deploy.yml`, needs the `FTP_*` secrets and variables listed at its top).
The target folder is mirrored, so files that aren't in the build are deleted there. Run the
workflow by hand (Actions → Deploy → Run workflow) for a dry run that only lists the changes.

Apache settings (404 page, https and www redirects, HSTS, caching) live in `public/.htaccess`.
The certificate is the host's (Let's Encrypt, ALL-INKL KAS).

The privacy policy names the host from `hoster` in `src/data/imprint.ts`; like the imprint,
the production build fails while it still has placeholders.
