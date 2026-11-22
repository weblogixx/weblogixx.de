import { employers } from './employers';
import {
  skills,
  skillCategories,
  type RetiredKind,
  type Skill,
  type SkillId,
  type SkillCategory,
} from './skills';
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

export interface ResolvedEmployer extends Omit<Employer<SkillId>, 'stack'>, Period {
  /** Skill ids of the stack, for display. */
  stack: SkillId[];
  /** The stack with each skill's period: its own dates, else the job's. */
  uses: { id: SkillId; from: YearMonth; until?: YearMonth }[];
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
  const entries = e.stack.map((s) => (typeof s === 'string' ? { id: s } : s));
  return Object.assign({}, e, {
    positions,
    start,
    end,
    stack: entries.map((s) => s.id),
    uses: entries.map((s) => ({ id: s.id, from: s.from ?? start, until: s.until ?? end })),
    role: latest.role,
    current: !end && !e.selfEmployed,
    theme: e.colors ? themeFromBrand(e.colors.primary, e.colors.accent, e.mark) : sunny,
  });
}

/** Employers sorted newest first, with derived period, latest role and theme. */
export const career: ResolvedEmployer[] = employers
  .map(resolve)
  .toSorted((a, b) => b.start.localeCompare(a.start));

export const yearOf = (ym: YearMonth) => Number(ym.slice(0, 4));

/**
 * The job held right now (evaluated at build time): the newest position that has started and
 * has no end. A position starting in the future (e.g. going freelance next year) only counts
 * from its start month on.
 */
export function currentJob() {
  const now = thisMonth();
  return career
    .flatMap((employer) => employer.positions.map((position) => ({ employer, position })))
    .filter(({ position }) => position.start <= now && !position.end)
    .toSorted((a, b) => b.position.start.localeCompare(a.position.start))
    .at(0);
}

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
  /** No longer in my toolbox (see skills.ts), with the successor's display name. */
  retired?: { kind: RetiredKind; successor?: string; reason?: L10n };
  /** Optional short explanation (see skills.ts). */
  description?: L10n;
  /** Companies where I used it, newest first, with their brand color (CSS oklch()). */
  usedAt: { name: string; color: string }[];
}

/** This month at build time, e.g. "2026-11". */
const thisMonth = () => new Date().toISOString().slice(0, 7) as YearMonth;

/**
 * Skills enriched with where/since when I used them, derived from the career data: per job, the
 * stack entry's own dates, else the job's (see `stack` in types.ts). Uses that haven't started
 * yet (e.g. going freelance next year) don't count: a skill isn't "used since" a future year,
 * and the tooltip doesn't list a company I don't work for yet.
 */
export const skillUsage: SkillUsage[] = (Object.keys(skills) as SkillId[]).map((id) => {
  const s: Skill = skills[id];
  const uses = career.flatMap((e) =>
    e.uses
      .filter((u) => u.id === id && u.from <= thisMonth())
      .map((u) => ({ from: u.from, until: u.until, e })),
  );
  const at = uses.map((u) => u.e);
  return {
    id,
    name: s.name,
    category: s.category,
    featured: !!s.featured,
    since: uses.length ? Math.min(...uses.map((u) => yearOf(u.from))) : undefined,
    until:
      uses.length && uses.every((u) => u.until) ? Math.max(...uses.map((u) => yearOf(u.until!))) : undefined,
    retired: s.retired && {
      kind: s.retired.kind,
      successor: s.retired.successor && skills[s.retired.successor as SkillId]?.name,
      reason: s.retired.reason,
    },
    description: s.description,
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

/** Sort order group: featured first, then everything else, retired last. */
function skillRank(id: SkillId) {
  const s: Skill = skills[id];
  if (s.retired) return 2;
  if (s.featured) return 0;
  return 1;
}

/** Skill ids sorted featured → normal → retired, alphabetically within each group. */
export function sortSkillIds(ids: readonly SkillId[], lang: Locale) {
  return ids.toSorted(
    (a, b) => skillRank(a) - skillRank(b) || skills[a].name.localeCompare(skills[b].name, lang),
  );
}

/** Skills per category for the home page: active first, retired last, alphabetical within each. */
export const skillsByCategory = (Object.keys(skillCategories) as SkillCategory[]).map((cat) => ({
  id: cat,
  label: skillCategories[cat],
  skills: skillUsage
    .filter((s) => s.category === cat)
    .toSorted((a, b) => Number(!!a.retired) - Number(!!b.retired) || a.name.localeCompare(b.name)),
}));
