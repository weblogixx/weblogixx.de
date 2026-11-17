import type { Locale, SkillUsage } from '../data';
import { useT } from './ui';

/** Tooltip content for a skill chip (see Tooltip.astro / SkillChip.astro). */
export interface SkillTip {
  /** The skill's description, on top. */
  text?: string;
  /** Heading of the list, e.g. "Used when working for". */
  label: string;
  items: { name: string; color?: string }[];
  /** Below the list, e.g. the retired hint. */
  note?: string;
}

/**
 * Description → "Used when working for" + companies → retired note.
 * Shared by the home page and the career page. Undefined when there's nothing to show.
 */
export function skillTip(s: SkillUsage, lang: Locale): SkillTip | undefined {
  const t = useT(lang);
  const text = s.description?.[lang];
  const r = s.retired;
  const note =
    r &&
    [
      r.successor ? t(`skill.${r.kind}Successor`).replace('{0}', r.successor) : t(`skill.${r.kind}`),
      r.reason?.[lang],
    ]
      .filter(Boolean)
      .join('. ');
  if (!text && !s.usedAt.length && !note) return undefined;
  return {
    text,
    label: s.usedAt.length ? t('skill.usedAt') : '',
    items: s.usedAt,
    note,
  };
}
