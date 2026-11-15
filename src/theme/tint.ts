/**
 * Scroll-driven theme tinting.
 *
 * Every element with [data-tint] carries a serialized theme (see themeDataAttrs).
 * Whichever one crosses a line 30% down the viewport becomes active, and the theme
 * colors on :root (--p-*, --a-*, and the logo mark's --mt-* / --mw-* / --mn-*, each
 * l/c/h) are tweened towards it.
 *
 * Why a JS tween and not a CSS transition on the registered properties:
 * while a CSS transition runs, Chrome updates styles through an optimized path
 * that doesn't refresh the separate :visited style of links. Visited links whose
 * colors depend on --p-* (header nav, language switch) flashed white until the
 * transition ended. Setting inline values per frame forces a normal style recalc.
 */

const DURATION = 750;

/*
 * Safari rebuilds the scrollbar whenever scrollbar-color changes; changing it every frame of
 * the tween makes it stutter and disappear. There, the scrollbar keeps its color while the
 * tween runs (pinned inline to its resolved value) and switches once at the end. Chrome and
 * Firefox repaint it smoothly, so they keep the animated color.
 * No feature test can tell this apart, hence the engine check (Safari and all iOS browsers).
 */
const PIN_SCROLLBAR =
  /AppleWebKit/.test(navigator.userAgent) &&
  !/Chrome|Chromium|Edg|Firefox|FxiOS|CriOS/.test(navigator.userAgent);
/** Color groups, in the order themeDataAttrs() writes them (see src/theme/color.ts). */
const GROUPS = ['p', 'a', 'mt', 'mw', 'mn'] as const;
const PROPS = GROUPS.flatMap((g) => [`--${g}-l`, `--${g}-c`, `--${g}-h`]);

type TintTheme = Record<(typeof GROUPS)[number], [number, number, number]>;

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

/** The i-th [l, c, h] triple of a flat value list. */
const triple = (v: number[], i: number): Lch => [v[i * 3]!, v[i * 3 + 1]!, v[i * 3 + 2]!];

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
  const current = PROPS.map((p) => Number.parseFloat(computed.getPropertyValue(p)) || 0);

  const write = (v: number[]) => {
    PROPS.forEach((p, i) => root.style.setProperty(p, String(Math.round(v[i]! * 1e4) / 1e4)));
  };

  let frame = 0;
  let pinned = false;
  const pinScrollbar = (pin: boolean) => {
    if (!PIN_SCROLLBAR || pin === pinned) return;
    pinned = pin;
    if (pin)
      root.style.setProperty('scrollbar-color', getComputedStyle(root).getPropertyValue('scrollbar-color'));
    else root.style.removeProperty('scrollbar-color');
  };

  const tweenTo = (to: number[]) => {
    cancelAnimationFrame(frame);
    if (reduceMotion.matches) {
      current.splice(0, to.length, ...to);
      write(current);
      pinScrollbar(false);
      return;
    }
    // Before the first frame changes anything (a tween interrupted mid-way stays pinned).
    pinScrollbar(true);
    // Each color travels in a straight line through OKLab.
    const from = GROUPS.map((_, i) => toLab(triple(current, i)));
    const target = GROUPS.map((_, i) => toLab(triple(to, i)));
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const k = easeInOutCubic(t);
      const next = GROUPS.flatMap((_, i) =>
        t < 1 ? toLch(lerp(from[i]!, target[i]!, k), current[i * 3 + 2]!) : triple(to, i),
      );
      current.splice(0, next.length, ...next);
      write(current);
      if (t < 1) frame = requestAnimationFrame(step);
      else pinScrollbar(false);
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
    tweenTo(GROUPS.flatMap((g) => theme[g]));
    if (label) label.textContent = el.dataset.themeName ?? '';
    if (prompt) swapText(prompt, el.dataset.handle ?? '', reduceMotion.matches);
  };

  /*
   * Which target is active:
   *  - at the very top: the first one (the page head → Sunny), however short it is;
   *  - at the very bottom: the last one (the contact block → Sunny). It sits right above the
   *    footer and often can't scroll up to the line, so it would never take over otherwise;
   *  - anywhere else: the section at a 1px line 30% down the viewport, i.e. once it fills
   *    most of the screen.
   */
  const first = targets[0];
  const last = targets.at(-1);
  let atLine: HTMLElement | undefined;
  const update = () => {
    const atBottom = window.scrollY + window.innerHeight >= root.scrollHeight - 16;
    const target = window.scrollY < 16 ? first : atBottom ? last : atLine;
    if (target) apply(target);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) atLine = entry.target as HTMLElement;
      }
      update();
    },
    { rootMargin: '-30% 0px -70% 0px', threshold: 0 },
  );
  for (const el of targets) observer.observe(el);

  window.addEventListener('scroll', update, { passive: true });
  update();
}
