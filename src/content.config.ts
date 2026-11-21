import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { skills } from './data/skills';
import { locales } from './data/types';

/** Skill ids from src/data/skills.ts: a typo in a post's `skills` fails the build. */
const skillIds = Object.keys(skills) as [keyof typeof skills, ...(keyof typeof skills)[]];

/**
 * Blog posts live in src/content/blog/<lang>/<slug>.md
 * A post's id is "<lang>/<slug>"; translations share the same slug.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Subtitle below the headline; may lean on the title ("Or: why …"). */
    description: z.string(),
    /**
     * One or two sentences that stand on their own: the meta/OG description (search results, link
     * previews). Without it, "<title> – <description>" is used.
     */
    summary: z.string().optional(),
    date: z.coerce.date(),
    /** Last real change to the content (not typo fixes). Shown next to the date; search engines get it as dateModified. */
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Skills the post is about, shown as chips like on the Experience page. */
    skills: z.array(z.enum(skillIds)).default([]),
    /**
     * Set on a translation: the language of the original (e.g. `en` on the German version of an
     * English-first post). The post then links to the original below its intro.
     */
    translatedFrom: z.enum(locales).optional(),
    /**
     * How AI assisted with this post, shown as a tag in the blog overview. `translation`: at least
     * partially translated, `fact-check`: content was fact-checked, `writing`: at least partially
     * written.
     */
    ai: z.array(z.enum(['translation', 'fact-check', 'writing'])).default([]),
  }),
});

export const collections = { blog };
