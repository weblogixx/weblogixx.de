export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];

/** Localized value. German first. */
export type L10n<T = string> = { de: T; en: T };

/** 'YYYY-MM' */
export type YearMonth = `${number}-${string}`;

export interface Fact {
  label: L10n;
  value: L10n | string;
}

/**
 * One role at an employer. Promotions = several positions.
 * The employer's overall period is derived from these.
 */
export interface Position {
  role: L10n;
  start: YearMonth;
  /** Leave empty for the current position. */
  end?: YearMonth;
  /** Optional: what changed with this role. */
  summary?: L10n;
}

/** A skill in a job's stack: the plain id, or the id with its own period within the job. */
export type StackEntry<SkillId extends string = string> =
  | SkillId
  | { id: SkillId; from?: YearMonth; until?: YearMonth };

export interface Employer<SkillId extends string = string> {
  /** Stable id, used for anchors (#id). */
  id: string;
  name: string;
  /** Short name for the header prompt on the career page (weblogixx@handle). Default: id. */
  handle?: string;
  url?: string;
  /** Full logo in /public, e.g. '/logos/acme.svg' (SVG/PNG/JPG). Shown on the career page. */
  logo?: string;
  /** Square-ish logo mark for small tiles (home timeline). Falls back to a lettermark. */
  logoMark?: string;
  /** Tile background behind the logo, e.g. the brand color for white logos. Default: white. */
  logoBackground?: string;
  /** Logo fills its tile edge to edge (no padding), e.g. for full-bleed marks. */
  logoBleed?: boolean;
  location?: string;
  /** Number of client projects I worked on there (e.g. at an agency). Shown on the Experience page. */
  clientProjects?: number;
  /** Roles held there, any order (sorted newest first). At least one. */
  positions: [Position, ...Position[]];
  /**
   * Brand colors as hex. They re-tint the page while this section is in view.
   * Primary gets normalized for contrast; accent is derived when omitted.
   * Omit entirely to keep Sunny.
   */
  colors?: { primary: string; accent?: string };
  /**
   * Overrides for the logo mark (header logo, section marker), hex. By default the tile is a
   * near-black shade of the primary hue and the thin stripes a tone of the primary.
   */
  mark?: { tile?: string; thin?: string };
  /** Short one-liner shown in compact timelines. */
  tagline: L10n;
  /** Paragraphs about the company and my role there. */
  about: L10n<string[]>;
  /** What I contributed / how I helped the company reach its goals. */
  contributions: L10n<string[]>;
  facts?: Fact[];
  /** Extra links shown with the entry (projects, products, …). */
  links?: { label: string; url: string }[];
  /**
   * Skill ids from skills.ts — type-checked. A skill counts for the job's whole period; when that's
   * wrong (picked it up later, or it didn't exist yet), give it its own dates:
   * `{ id: 'webawesome', from: '2025-02' }`. `from` / `until` replace the job's start / end for
   * that skill only.
   */
  stack: StackEntry<SkillId>[];

  /** Whether the person was self-employed at this employer. */
  selfEmployed?: boolean;
}
