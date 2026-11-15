// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Deployed to https://weblogixx.github.io (user site → no base path).
// If this ever moves to a project page (e.g. /weblogixx.de/), set `base` here;
// all internal links go through `href()` in src/i18n/routes.ts and follow it.
export default defineConfig({
  site: 'https://weblogixx.github.io',
  trailingSlash: 'always',
  // MDX: prose pages in src/pages (about, imprint, privacy) and blog posts can use components.
  integrations: [mdx()],
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
