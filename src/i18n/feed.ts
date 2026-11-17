import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { profile } from '../data';
import type { Locale } from '../data/types';
import { getListedPosts, postLang, postSlug } from './blog';
import { blogPostPath, route } from './routes';
import { useT } from './ui';

/**
 * The blog as an RSS feed: the same posts as the language's blog page (including posts that only
 * exist in the other language), newest first. Each item carries the post's summary, not the full
 * text: readers come to the site for the rest.
 */
export async function blogFeed(lang: Locale, context: APIContext) {
  const t = useT(lang);
  const posts = await getListedPosts(lang);
  return rss({
    title: `${profile.name} · ${t('blog.title')}`,
    description: t('blog.lede'),
    // The channel links to the blog page; item links are absolute paths, so they resolve the same.
    site: new URL(route('blog', lang), context.site),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary ?? `${p.data.title} – ${p.data.description}`,
      pubDate: p.data.date,
      link: blogPostPath(postSlug(p), postLang(p)),
      categories: p.data.tags,
    })),
    customData: `<language>${lang === 'de' ? 'de-de' : 'en-us'}</language>`,
  });
}
