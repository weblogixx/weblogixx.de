import type { APIContext } from 'astro';
import { blogFeed } from '../../../i18n/feed';

export const GET = (context: APIContext) => blogFeed('en', context);
