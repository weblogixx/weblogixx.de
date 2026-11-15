import { employers } from './employers';
import { skills, skillCategories, type Skill, type SkillId, type SkillCategory } from './skills';
import type { Employer, L10n, Locale, Position, YearMonth } from './types';
import { themeFromBrand, sunny, type ThemeColors } from '../theme/color';

import { profile } from './profile';

export { profile };
export { links } from './links';
export { skills, skillCategories };
export type { SkillId, SkillCategory, Employer, Locale, Position };

interface Period {
  start: YearMonth;
  end?: YearMonth;
}

export interface ResolvedEmployer extends Employer<SkillId>, Period {
  /** Positions newest first. */
  positions: [Position, ...Position[]];
  /** Latest role. */
  role: Position['role'];
  theme: ThemeColors;
  current: boolean;
}

function resolve(e: Employer<SkillId>): ResolvedEmployer {
  const positions = e.positions.toSorted((a, b) =>
    b.start.localeCompare(a.start),
  ) as ResolvedEmployer['positions'];
  const [latest] = positions;
  const start = positions.at(-1)!.start;
  const ends = positions.map((p) => p.end);
  const end = ends.some((x) => !x) ? undefined : ends.toSorted().at(-1);
  return Object.assign({}, e, {
    positions,
    start,
    end,
    role: latest.role,
    current: !end && !e.selfEmployed,
    theme: e.colors ? themeFromBrand(e.colors.primary, e.colors.accent) : sunny,
  });
}

/** Employers sorted newest first, with derived period, latest role and theme. */
export const career: ResolvedEmployer[] = employers
  .map(resolve)
  .toSorted((a, b) => b.start.localeCompare(a.start));

export const yearOf = (ym: YearMonth) => Number(ym.slice(0, 4));

/**
 * "Verfügbar ab Januar 2027" / "Available from January 2027", or "Jetzt verfügbar" once that
 * month has come (evaluated at build time). Undefined when profile.availableFrom isn't set.
 */
export function availability(lang: Locale) {
  const from = profile.availableFrom;
  if (!from) return undefined;
  const now = new Date().toISOString().slice(0, 7);
  if (from <= now) return lang === 'de' ? 'Jetzt verfügbar' : 'Available now';
  const month = new Date(`${from}-01T00:00:00Z`).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return lang === 'de' ? `Verfügbar ab ${month}` : `Available from ${month}`;
}

export function formatPeriod(e: Period, lang: Locale) {
  const fmt = (ym: YearMonth) =>
    new Date(`${ym}-01T00:00:00Z`).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
  return `${fmt(e.start)} – ${e.end ? fmt(e.end) : lang === 'de' ? 'heute' : 'present'}`;
}

export interface SkillUsage {
  id: SkillId;
  name: string;
  category: SkillCategory;
  featured: boolean;
  /** Earliest year it appears in the career data. */
  since?: number;
  /** Last year I used it; undefined while a current/ongoing job still uses it. */
  until?: number;
  /** Discontinued tool (see skills.ts). */
  legacy: boolean;
  /** Name of the skill the know-how carried over to. */
  successor?: string;
  /** Optional short explanation (see skills.ts). */
  description?: L10n;
  /** Companies where I used it, newest first, with their brand color (CSS oklch()). */
  usedAt: { name: string; color: string }[];
}

/** Skills enriched with where/since when I used them, derived from the career data. */
export const skillUsage: SkillUsage[] = (Object.keys(skills) as SkillId[]).map((id) => {
  const s = skills[id];
  const at = career.filter((e) => e.stack.includes(id));
  return {
    id,
    name: s.name,
    category: s.category,
    featured: 'featured' in s && s.featured,
    since: at.length ? Math.min(...at.map((e) => yearOf(e.start))) : undefined,
    until: at.length && at.every((e) => e.end) ? Math.max(...at.map((e) => yearOf(e.end!))) : undefined,
    legacy: 'legacy' in s && s.legacy,
    successor: 'successor' in s ? skills[s.successor as SkillId]?.name : undefined,
    description: 'description' in s ? s.description : undefined,
    // Unique: several stints at the same company (e.g. Weblogixx) list it once.
    usedAt: [...new Map(at.map((e) => [e.name, e])).values()].map((e) => ({
      name: e.name,
      color: `oklch(${e.theme.primary.l} ${e.theme.primary.c} ${e.theme.primary.h})`,
    })),
  };
});

/** Lookup by id, e.g. for the stacks on the career page. */
export const skillUsageById = Object.fromEntries(skillUsage.map((s) => [s.id, s])) as Record<
  SkillId,
  SkillUsage
>;

/** Sort order group: featured first, then everything else, legacy last. */
function skillRank(id: SkillId) {
  const s: Skill = skills[id];
  if (s.legacy) return 2;
  if (s.featured) return 0;
  return 1;
}

/** Skill ids sorted featured → normal → legacy, alphabetically within each group. */
export function sortSkillIds(ids: readonly SkillId[], lang: Locale) {
  return ids.toSorted(
    (a, b) => skillRank(a) - skillRank(b) || skills[a].name.localeCompare(skills[b].name, lang),
  );
}

export const skillsByCategory = (Object.keys(skillCategories) as SkillCategory[]).map((cat) => ({
  id: cat,
  label: skillCategories[cat],
  skills: skillUsage.filter((s) => s.category === cat).toSorted((a, b) => a.name.localeCompare(b.name)),
}));
