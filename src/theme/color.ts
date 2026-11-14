/**
 * Tiny color helpers: hex → OKLCH, plus normalization so any brand color
 * can drive the dark Sunny theme without breaking contrast.
 * Runs at build time only.
 */

export interface Oklch {
  l: number; // 0–1
  c: number; // 0–~0.37
  h: number; // 0–360
}

/** A theme as consumed by the CSS custom properties (--p-* / --a-*). */
export interface ThemeColors {
  primary: Oklch;
  accent: Oklch;
}

const toLinear = (v: number) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export function hexToOklch(hex: string): Oklch {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = [...h].map((ch) => ch + ch).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`Invalid hex color: ${hex}`);

  const r = toLinear(parseInt(h.slice(0, 2), 16));
  const g = toLinear(parseInt(h.slice(2, 4), 16));
  const b = toLinear(parseInt(h.slice(4, 6), 16));

  const lc = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const mc = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const sc = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  const L = 0.2104542553 * lc + 0.793617785 * mc - 0.0040720468 * sc;
  const A = 1.9779984951 * lc - 2.428592205 * mc + 0.4505937099 * sc;
  const B = 0.0259040371 * lc + 0.7827717662 * mc - 0.808675766 * sc;

  const C = Math.sqrt(A * A + B * B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;

  return { l: L, c: C, h: C < 1e-4 ? 0 : H };
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const round = (v: number, d = 4) => Math.round(v * 10 ** d) / 10 ** d;

/**
 * Brand colors come in every lightness. On a near-black background the
 * primary must stay light enough for text/links (≥ ~7:1 against --bg),
 * so lightness is clamped and chroma capped to stay inside sRGB-ish gamut.
 */
export function normalizePrimary(c: Oklch): Oklch {
  return { l: round(clamp(c.l, 0.74, 0.88)), c: round(clamp(c.c, 0, 0.19)), h: round(c.h, 2) };
}

/** Accent is used for decorative stripes and large UI, so it may be darker. */
export function normalizeAccent(c: Oklch): Oklch {
  return { l: round(clamp(c.l, 0.6, 0.74)), c: round(clamp(c.c, 0, 0.22)), h: round(c.h, 2) };
}

/**
 * Build a theme from brand hex colors. Without an explicit accent we rotate
 * the hue a bit and push chroma, like Sunny's yellow body / red stripe.
 */
export function themeFromBrand(primaryHex: string, accentHex?: string): ThemeColors {
  const p = hexToOklch(primaryHex);
  const a = accentHex ? hexToOklch(accentHex) : { l: 0.66, c: Math.max(p.c, 0.12), h: (p.h + 320) % 360 };
  return { primary: normalizePrimary(p), accent: normalizeAccent(a) };
}

/**
 * Inline style + attribute that give an element its own brand tokens
 * (see `[data-brand]` in sunny.css). Spread onto the element.
 */
export function brandScope(t: ThemeColors) {
  const { primary: p, accent: a } = t;
  return {
    'data-brand': '',
    style: `--p-l:${p.l};--p-c:${p.c};--p-h:${p.h};--a-l:${a.l};--a-c:${a.c};--a-h:${a.h}`,
  };
}

/** Serialize a theme into data-* attributes the client script reads. */
export function themeDataAttrs(name: string, t: ThemeColors) {
  return {
    'data-theme-name': name,
    'data-theme': JSON.stringify({
      p: [t.primary.l, t.primary.c, t.primary.h],
      a: [t.accent.l, t.accent.c, t.accent.h],
    }),
  };
}

/**
 * Sunny — sampled from my yellow '70s-style guitar: warm yellow body + red racing stripe.
 */
export const SUNNY_PRIMARY_HEX = '#FDB515';
export const SUNNY_ACCENT_HEX = '#F0532D';
export const sunny = themeFromBrand(SUNNY_PRIMARY_HEX, SUNNY_ACCENT_HEX);
