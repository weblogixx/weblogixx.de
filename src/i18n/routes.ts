import type { Locale } from "../data/types";

/** Prefix a site-relative path with the configured base (see astro.config.mjs). */
export function href(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}

/**
 * Routes to the main pages of the site, in both supported languages.
 */
export const routes = {
  home: { de: "/", en: "/en/" },
  about: { de: "/ueber-mich/", en: "/en/about/" },
  career: { de: "/werdegang/", en: "/en/career/" },
  blog: { de: "/blog/", en: "/en/blog/" },
  links: { de: "/links/", en: "/en/links/" },
} as const satisfies Record<string, Record<Locale, string>>;

/**
 * The keys of the `routes` object, used to type the `route()` function.
 */
export type RouteKey = keyof typeof routes;

/**
 * Route to a page in the current language.
 * @param key The url key
 * @param lang The language to route to
 * @param anchor An optional anchor to append to the url
 * @returns Href to the page in the current language, with optional anchor
 */
export const route = (key: RouteKey, lang: Locale, anchor?: string) =>
  href(routes[key][lang] + (anchor ? `#${anchor}` : ""));

export const blogPostPath = (slug: string, lang: Locale) =>
  href(`${routes.blog[lang]}${slug}/`);
