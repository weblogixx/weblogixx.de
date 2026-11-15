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

/**
 * Colors of the logo mark (header logo, section markers): a tile with thin–wide–thin stripes.
 * Unlike primary/accent these keep the real brand color, since nothing reads text off them.
 */
export interface MarkColors {
  tile: Oklch;
  wide: Oklch;
  thin: Oklch;
}

/** A theme as consumed by the CSS custom properties (--p-*, --a-*, --mt-* / --mw-* / --mn-*). */
export interface ThemeColors {
  primary: Oklch;
  accent: Oklch;
  mark: MarkColors;
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

const roundColor = (c: Oklch): Oklch => ({ l: round(c.l), c: round(c.c), h: round(c.h, 2) });

/**
 * Logo mark for a brand: a near-black tile with a trace of the brand hue, the real brand color
 * as the wide stripe and a tone of it as the thin ones (darker for light brands, lighter for
 * dark ones). Very dark brands are lifted so the stripe shows on the tile.
 * `tile` / `thin` (hex) override the derived colors.
 */
export function markFromBrand(
  primaryHex: string,
  override: { tile?: string; thin?: string } = {},
): MarkColors {
  const p = hexToOklch(primaryHex);
  const wide = p.l < 0.45 ? { l: 0.62, c: Math.max(p.c, 0.12), h: p.h } : p;
  const tile = override.tile ? hexToOklch(override.tile) : { l: 0.24, c: Math.min(p.c * 0.25, 0.04), h: p.h };
  const thin = override.thin
    ? hexToOklch(override.thin)
    : wide.l > 0.66
      ? { l: wide.l - 0.24, c: wide.c * 0.65, h: wide.h }
      : { l: wide.l + 0.18, c: wide.c * 0.6, h: wide.h };
  return { tile: roundColor(tile), wide: roundColor(wide), thin: roundColor(thin) };
}

/**
 * Build a theme from brand hex colors. Without an explicit accent we rotate
 * the hue a bit and push chroma, like Sunny's yellow body / red stripe.
 */
export function themeFromBrand(
  primaryHex: string,
  accentHex?: string,
  mark?: { tile?: string; thin?: string },
): ThemeColors {
  const p = hexToOklch(primaryHex);
  const a = accentHex ? hexToOklch(accentHex) : { l: 0.66, c: Math.max(p.c, 0.12), h: (p.h + 320) % 360 };
  return { primary: normalizePrimary(p), accent: normalizeAccent(a), mark: markFromBrand(primaryHex, mark) };
}

/**
 * Inline style + attribute that give an element its own brand tokens
 * (see `[data-brand]` in sunny.css). Spread onto the element.
 */
export function brandScope(t: ThemeColors) {
  const vars = Object.entries(themeTriples(t))
    .flatMap(([k, [l, c, h]]) => [`--${k}-l:${l}`, `--${k}-c:${c}`, `--${k}-h:${h}`])
    .join(';');
  return { 'data-brand': '', style: vars };
}

const lch = ({ l, c, h }: Oklch): [number, number, number] => [l, c, h];

/** Theme as [l, c, h] triples keyed by CSS prefix (--p-l, --mt-c, …); also what tint.ts tweens. */
function themeTriples(t: ThemeColors): Record<string, [number, number, number]> {
  return {
    p: lch(t.primary),
    a: lch(t.accent),
    mt: lch(t.mark.tile),
    mw: lch(t.mark.wide),
    mn: lch(t.mark.thin),
  };
}

/** Serialize a theme into data-* attributes the client script reads. */
export function themeDataAttrs(name: string, t: ThemeColors) {
  return {
    'data-theme-name': name,
    'data-theme': JSON.stringify(themeTriples(t)),
  };
}

/**
 * Sunny — sampled from my yellow '70s-style guitar: warm yellow body + red racing stripe.
 */
export const SUNNY_PRIMARY_HEX = '#FDB515';
export const SUNNY_ACCENT_HEX = '#F0532D';
const sunnyBase = themeFromBrand(SUNNY_PRIMARY_HEX, SUNNY_ACCENT_HEX);
/** Sunny's mark is the original logo: yellow tile, red stripes. */
export const sunny: ThemeColors = {
  ...sunnyBase,
  mark: { tile: sunnyBase.primary, wide: sunnyBase.accent, thin: sunnyBase.accent },
};
