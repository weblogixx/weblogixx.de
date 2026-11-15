// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { codeBlocks } from './src/markdown/codeBlocks';

// Deployed to the web host's root via FTP (.github/workflows/deploy.yml); https and the
// www redirect are set up in public/.htaccess.
// If the site ever moves into a subfolder, set `base` here; all internal links go through
// `href()` in src/i18n/routes.ts and follow it.
export default defineConfig({
  site: 'https://weblogixx.de',
  trailingSlash: 'always',
  // MDX: prose pages in src/pages (about, imprint, privacy) and blog posts can use components.
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      // Token colors only, as --shiki-light / --shiki-dark: global.css picks one per mode
      // and sets the block background from Sunny.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      // Header (title, language, copy) and line numbers; options in src/markdown/codeBlocks.ts.
      transformers: [codeBlocks()],
    },
  },
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
