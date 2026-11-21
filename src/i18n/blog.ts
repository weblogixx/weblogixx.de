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

/**
 * Posts for a language's blog index: its own posts, plus posts that only exist in the other
 * language (listed in their own language, so the index never hides a post).
 */
export async function getListedPosts(lang: Locale) {
  const all = await getCollection('blog', (p) => import.meta.env.DEV || !p.data.draft);
  const own = new Set(all.filter((p) => postLang(p) === lang).map(postSlug));
  return all
    .filter((p) => postLang(p) === lang || !own.has(postSlug(p)))
    .toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** The date of the last real update, if it's later than the publication date. */
export const postUpdated = (post: Post) =>
  post.data.updated && post.data.updated > post.data.date ? post.data.updated : undefined;
