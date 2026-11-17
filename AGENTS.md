## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Writing content

Rules for blog posts and prose pages (MDX). Check new content against them.

### Frontmatter of a post

- `description` is the subtitle below the headline. It may lean on the title ("Or: why this site
  runs on Astro").
- `summary` is what search results and link previews show (meta and OG description). One or two
  sentences that make sense without the title, about 150 characters at most. Without it the
  page uses "<title> – <description>", so every new post should have one.

### Languages

- Blog posts are written in **English first**: `src/content/blog/en/<slug>.mdx`. A German
  version follows under the same slug (`de/<slug>.mdx`), at least a basic one. It doesn't have to
  be word for word: translate the meaning, and let jokes that only work in English go.
- The translation gets `translatedFrom: en` in its frontmatter. It then shows a short note with
  a link to the original below its intro. The original never gets the field. (The Sunny post was
  written in German first, so it has no field in either language.)
- Until the German version exists, the German blog page lists the English post with an `EN` tag.

### Inline formatting: `code`, `<Abbr>`, plain text

- **`code`** only for things you could type into a terminal, editor or config file: commands
  (`rsync`, `npm run build`), file and folder names (`.htaccess`, `dist/`), identifiers, HTML
  elements (`<h1>`), CSS properties and values (`@property`, `font-display: optional`).
- **`<Abbr title="…">`** for an abbreviation readers may not know, on its **first** use in a
  page only: `<Abbr title="Common Gateway Interface">CGI</Abbr>`. The title is the written-out
  form, nothing more. Later uses are plain text. Abbreviations every reader of the site knows
  (HTML, CSS, URL, PHP, SQL, FTP) get no `<Abbr>` at all.
- **Plain text** for names: languages, products, protocols, companies (Perl, Markdown, Astro,
  FTP, GitHub). They aren't code, even when they are technical. Link the first mention instead,
  if a link helps.
- **`<mark>`** only for Sunny names (colors, the theme itself).

### Links

- Use `<Link href="…">` (src/components/Link.astro) for every link in MDX and for content links
  in components, not a hand-written `<a>`. It opens links to other sites in a new tab with the
  right `rel`, and leaves internal, `mailto:` and `tel:` links alone.
- Internal targets come from `route()` / `blogPostPath()` (src/i18n/routes.ts), never a
  hard-coded path.
- In MDX, never break a `<Link …>…</Link>` (or any inline tag) across lines. A tag that starts a
  line is fine as long as it closes on the same line. If it is spread over several lines, MDX
  treats it as a block of its own: a new paragraph instead of inline text. That's why MDX isn't
  run through a formatter (see .prettierignore).
