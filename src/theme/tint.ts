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

const DURATION = 750;
const PROPS = ['--p-l', '--p-c', '--p-h', '--a-l', '--a-c', '--a-h'] as const;
type Values = [number, number, number, number, number, number];

interface TintTheme {
  p: [number, number, number];
  a: [number, number, number];
}

/*
 * Colors are blended in OKLab, not by turning the hue. Brand hues can sit almost opposite
 * each other (Sunny yellow ≈ 79°, SICK blue ≈ 263°): rotating the hue then runs through
 * every color in between (yellow → orange → red → magenta → blue). A straight line in
 * OKLab passes through a calmer, less saturated middle instead – like CSS color-mix().
 */
type Lch = [number, number, number];
type Lab = [number, number, number];

const toLab = ([l, c, h]: Lch): Lab => {
  const rad = (h * Math.PI) / 180;
  return [l, c * Math.cos(rad), c * Math.sin(rad)];
};

/** Back to LCh. Near zero chroma the hue is meaningless; keep the previous one then. */
const toLch = ([l, a, b]: Lab, prevHue: number): Lch => {
  const c = Math.hypot(a, b);
  if (c < 1e-4) return [l, 0, prevHue];
  return [l, c, ((((Math.atan2(b, a) * 180) / Math.PI) % 360) + 360) % 360];
};

const lerp = (from: Lab, to: Lab, k: number): Lab => [
  from[0] + (to[0] - from[0]) * k,
  from[1] + (to[1] - from[1]) * k,
  from[2] + (to[2] - from[2]) * k,
];

/** Same feel as cubic-bezier(0.65, 0, 0.35, 1). */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Header prompt (weblogixx@handle): quick fade/slide out, swap the text, fade back in.
 * Rapid scrolling cancels the pending swap, so only the latest handle lands.
 */
let swapToken = 0;
async function swapText(el: HTMLElement, text: string, instant: boolean) {
  const token = ++swapToken;
  if (el.textContent === text) {
    // Scrolled back before a fade-out finished: undo it.
    el.getAnimations().forEach((a) => a.cancel());
    return;
  }
  if (instant || !el.animate) {
    el.textContent = text;
    return;
  }
  const timing = { duration: 140, easing: 'ease-in', fill: 'forwards' } as const;
  if (el.textContent) {
    await el.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-0.35em)' }], timing).finished;
    if (token !== swapToken) return;
  }
  el.textContent = text;
  if (!text) return;
  el.getAnimations().forEach((a) => a.cancel());
  el.animate(
    [
      { opacity: 0, transform: 'translateY(0.35em)' },
      { opacity: 1, transform: 'none' },
    ],
    {
      ...timing,
      duration: 220,
      easing: 'ease-out',
    },
  );
}

export function initTint() {
  const root = document.documentElement;
  const targets = [...document.querySelectorAll<HTMLElement>('[data-tint]')];
  const label = document.querySelector<HTMLElement>('[data-theme-label]');
  const prompt = document.querySelector<HTMLElement>('[data-header-at]');
  if (!targets.length) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const computed = getComputedStyle(root);
  // Start from whatever :root currently has (the @property initial values = Sunny).
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
    // Primary and accent each travel in a straight line through OKLab.
    const fromP = toLab([current[0], current[1], current[2]]);
    const fromA = toLab([current[3], current[4], current[5]]);
    const toP = toLab([to[0], to[1], to[2]]);
    const toA = toLab([to[3], to[4], to[5]]);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const k = easeInOutCubic(t);
      const p = t < 1 ? toLch(lerp(fromP, toP, k), current[2]) : ([to[0], to[1], to[2]] as Lch);
      const a = t < 1 ? toLch(lerp(fromA, toA, k), current[5]) : ([to[3], to[4], to[5]] as Lch);
      current.splice(0, 6, ...p, ...a);
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
    tweenTo([...theme.p, ...theme.a]);
    if (label) label.textContent = el.dataset.themeName ?? '';
    if (prompt) swapText(prompt, el.dataset.handle ?? '', reduceMotion.matches);
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

  // At the very top, always show the first target (the page head → Sunny),
  // however short it is.
  const [first] = targets;
  const atTop = () => {
    if (first && window.scrollY < 16) apply(first);
  };
  window.addEventListener('scroll', atTop, { passive: true });
  atTop();
}
