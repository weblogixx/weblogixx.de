import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { skills } from './data/skills';

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
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Skills the post is about, shown as chips like on the Experience page. */
    skills: z.array(z.enum(skillIds)).default([]),
  }),
});

export const collections = { blog };
