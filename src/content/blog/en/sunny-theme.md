---
title: The Sunny theme
description: How a yellow guitar with a red racing stripe became this site's color scheme – six numbers, OKLCH and a few tricks.
date: 2026-11-15
tags: [design, css]
skills: [css, designtokens, designsystems, astro]
---

This site's color scheme is called **Sunny**. It comes from my yellow '70s-style guitar: a warm yellow body with a red racing stripe. Those two colors are the primary and accent colors. And the stripe – thin, wide, thin, at 45° – shows up everywhere: in the logo, in the hero and on every position on the _Experience_ page.

<figure class="palette" aria-label="Sunny palette">
  <div class="swatches">
    <span style="background: var(--primary-100)"></span>
    <span style="background: var(--primary-200)"></span>
    <span style="background: var(--primary-300)"></span>
    <span style="background: var(--primary-400)"></span>
    <span style="background: var(--primary-500)"></span>
    <span style="background: var(--primary-600)"></span>
    <span style="background: var(--primary-700)"></span>
    <span style="background: var(--primary-800)"></span>
    <span style="background: var(--primary-900)"></span>
  </div>
  <div class="swatches accent">
    <span style="background: var(--accent-300)"></span>
    <span style="background: var(--accent-500)"></span>
    <span style="background: var(--accent-700)"></span>
  </div>
  <figcaption>Sunny · oklch</figcaption>
</figure>

## Six numbers

The whole theme hangs on six numbers: lightness, chroma and hue (OKLCH) for the primary and the accent color. Everything else is derived from them – backgrounds, text, borders and the color scale above. Even the grays are tinted slightly towards the hue. Because the six numbers are registered CSS properties (`@property`), the entire color scheme can change at runtime.

## Light and dark

Every color is defined with `light-dark()` and follows `color-scheme`. The site follows your system setting; the switch in the header overrides it. Single sections can be pinned to one mode with the classes `sunny-light` or `sunny-dark`.

## Every position in its own colors

On the _Experience_ page, the site takes on each company's colors as you scroll. Brand colors come in every lightness, so they're adjusted: light enough to stay readable on a dark background. When switching between two companies, the colors blend in OKLab instead of rotating the hue. That turns yellow to blue into a short, calm transition instead of a rainbow through red and pink. At the end of the page it returns to Sunny.

## Fonts

Headings in Fraunces, body text in Inter, details in JetBrains Mono – all served by this site itself, no external services.
