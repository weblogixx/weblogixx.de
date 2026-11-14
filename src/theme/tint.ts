/**
 * Scroll-driven theme tinting.
 *
 * Every element with [data-tint] carries a serialized theme (see themeDataAttrs).
 * Whichever one crosses the vertical middle of the viewport becomes active and
 * its numbers are written to :root — the CSS transition on the registered
 * --p-* / --a-* properties does the animation.
 */

type Triple = [number, number, number];
interface TintTheme {
  p: Triple;
  a: Triple;
}

const PROPS = { p: ['--p-l', '--p-c', '--p-h'], a: ['--a-l', '--a-c', '--a-h'] } as const;

/** Move hue the short way round (e.g. 350 → 10 via 360, not via 180). */
function nearestHue(from: number, to: number) {
  const delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta;
}

export function initTint() {
  const root = document.documentElement;
  const targets = [...document.querySelectorAll<HTMLElement>('[data-tint]')];
  const label = document.querySelector<HTMLElement>('[data-theme-label]');
  if (!targets.length) return;

  const hues = { p: Number.NaN, a: Number.NaN };
  let active: HTMLElement | undefined;

  const apply = (el: HTMLElement) => {
    if (el === active) return;
    active = el;
    let theme: TintTheme;
    try {
      theme = JSON.parse(el.dataset.theme ?? '');
    } catch {
      return;
    }
    for (const key of ['p', 'a'] as const) {
      const [l, c, h] = theme[key];
      const current = Number.isNaN(hues[key])
        ? Number.parseFloat(getComputedStyle(root).getPropertyValue(PROPS[key][2]))
        : hues[key];
      hues[key] = nearestHue(Number.isNaN(current) ? h : current, h);
      root.style.setProperty(PROPS[key][0], String(l));
      root.style.setProperty(PROPS[key][1], String(c));
      root.style.setProperty(PROPS[key][2], String(hues[key]));
    }
    if (label) label.textContent = el.dataset.themeName ?? '';
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) apply(entry.target as HTMLElement);
      }
    },
    // A 1px line through the middle of the viewport.
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
  );
  for (const el of targets) observer.observe(el);
}
