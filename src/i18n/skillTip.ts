import type { Locale, SkillUsage } from '../data';
import { useT } from './ui';

/** Tooltip content for a skill chip (see Tooltip.astro / SkillChip.astro). */
export interface SkillTip {
  /** The skill's description, on top. */
  text?: string;
  /** Heading of the list, e.g. "Used when working for". */
  label: string;
  items: { name: string; color?: string }[];
  /** Below the list, e.g. the legacy hint. */
  note?: string;
}

/**
 * Description → "Used when working for" + companies → legacy note.
 * Shared by the home page and the career page. Undefined when there's nothing to show.
 */
export function skillTip(s: SkillUsage, lang: Locale): SkillTip | undefined {
  const t = useT(lang);
  const text = s.description?.[lang];
  const note = s.legacy
    ? s.successor
      ? t('skill.legacySuccessor').replace('{0}', s.successor)
      : t('skill.legacy')
    : undefined;
  if (!text && !s.usedAt.length && !note) return undefined;
  return {
    text,
    label: s.usedAt.length ? t('skill.usedAt') : '',
    items: s.usedAt,
    note,
  };
}
