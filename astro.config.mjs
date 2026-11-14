// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to https://weblogixx.github.io (user site → no base path).
// If this ever moves to a project page (e.g. /weblogixx.de/), set `base` here;
// all internal links go through `href()` in src/i18n/routes.ts and follow it.
export default defineConfig({
  site: 'https://weblogixx.github.io',
  trailingSlash: 'always',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
