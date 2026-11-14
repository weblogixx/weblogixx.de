import { employers } from './employers';
import { skills, skillCategories, type SkillId, type SkillCategory } from './skills';
import type { Employer, Locale, Position, YearMonth } from './types';
import { themeFromBrand, sunny, type ThemeColors } from '../theme/color';

export { profile } from './profile';
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
  usedAt: string[];
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
    usedAt: at.map((e) => e.name),
  };
});

export const skillsByCategory = (Object.keys(skillCategories) as SkillCategory[]).map((cat) => ({
  id: cat,
  label: skillCategories[cat],
  skills: skillUsage.filter((s) => s.category === cat),
}));
