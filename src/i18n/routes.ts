import type { Locale } from '../data/types';

/** Prefix a site-relative path with the configured base (see astro.config.mjs). */
export function href(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

export const routes = {
  home: { de: '/', en: '/en/' },
  about: { de: '/ueber-mich/', en: '/en/about/' },
  career: { de: '/werdegang/', en: '/en/career/' },
  blog: { de: '/blog/', en: '/en/blog/' },
  links: { de: '/links/', en: '/en/links/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export const route = (key: RouteKey, lang: Locale) => href(routes[key][lang]);

export const blogPostPath = (slug: string, lang: Locale) => href(`${routes.blog[lang]}${slug}/`);
