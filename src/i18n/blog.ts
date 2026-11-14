import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../data/types';

export type Post = CollectionEntry<'blog'>;

export const postLang = (p: Post) => p.id.split('/')[0] as Locale;
export const postSlug = (p: Post) => p.id.split('/').slice(1).join('/');

/** Published posts for a language, newest first. Drafts show up in dev only. */
export async function getPosts(lang: Locale) {
  const posts = await getCollection(
    'blog',
    (p) => postLang(p) === lang && (import.meta.env.DEV || !p.data.draft),
  );
  return posts.toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
