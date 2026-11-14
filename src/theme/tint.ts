/**
 * Scroll-driven theme tinting.
 *
 * Every element with [data-tint] carries a serialized theme (see themeDataAttrs).
 * Whichever one crosses a line 30% down the viewport becomes active, and the six
 * theme numbers on :root (--p-l/c/h, --a-l/c/h) are tweened towards it.
 *
 * Why a JS tween and not a CSS transition on the registered properties:
 * while a CSS transition runs, Chrome updates styles through an optimized path
 * that doesn't refresh the separate :visited style of links. Visited links whose
 * colors depend on --p-* (header nav, language switch) flashed white until the
 * transition ended. Setting inline values per frame forces a normal style recalc.
 */

const DURATION = 900;
const PROPS = ['--p-l', '--p-c', '--p-h', '--a-l', '--a-c', '--a-h'] as const;
type Values = [number, number, number, number, number, number];

interface TintTheme {
  p: [number, number, number];
  a: [number, number, number];
}

/** Move hue the short way round (e.g. 350 → 10 via 360, not via 180). */
function nearestHue(from: number, to: number) {
  const delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta;
}

/** Same feel as cubic-bezier(0.65, 0, 0.35, 1). */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

export function initTint() {
  const root = document.documentElement;
  const targets = [...document.querySelectorAll<HTMLElement>('[data-tint]')];
  const label = document.querySelector<HTMLElement>('[data-theme-label]');
  if (!targets.length) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const computed = getComputedStyle(root);
  // Start from whatever :root currently has (the @property initial values = Vintera).
  const current = PROPS.map((p) => Number.parseFloat(computed.getPropertyValue(p)) || 0) as Values;

  const write = (v: Values) => {
    PROPS.forEach((p, i) => root.style.setProperty(p, String(Math.round(v[i]! * 1e4) / 1e4)));
  };

  let frame = 0;
  const tweenTo = (to: Values) => {
    cancelAnimationFrame(frame);
    if (reduceMotion.matches) {
      current.splice(0, 6, ...to);
      write(current);
      return;
    }
    const from = [...current] as Values;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const k = easeInOutCubic(t);
      for (let i = 0; i < 6; i++) current[i] = from[i]! + (to[i]! - from[i]!) * k;
      write(current);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  };

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
    const [pl, pc, ph] = theme.p;
    const [al, ac, ah] = theme.a;
    tweenTo([pl, pc, nearestHue(current[2], ph), al, ac, nearestHue(current[5], ah)]);
    if (label) label.textContent = el.dataset.themeName ?? '';
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) apply(entry.target as HTMLElement);
      }
    },
    // A 1px line 30% down the viewport: a section takes over once it fills most of the screen.
    { rootMargin: '-30% 0px -70% 0px', threshold: 0 },
  );
  for (const el of targets) observer.observe(el);

  // At the very top, always show the first target (the page head → Vintera),
  // however short it is.
  const [first] = targets;
  const atTop = () => {
    if (first && window.scrollY < 16) apply(first);
  };
  window.addEventListener('scroll', atTop, { passive: true });
  atTop();
}
