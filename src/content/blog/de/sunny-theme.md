---
title: Das Sunny-Theme
description: Wie aus einer gelben Gitarre mit rotem Rennstreifen das Farbschema dieser Seite wurde – sechs Zahlen, OKLCH und ein paar Tricks.
date: 2026-11-15
tags: [design, css]
skills: [css, designtokens, designsystems, astro]
---

Das Farbschema dieser Seite heißt **Sunny**. Es stammt von meiner gelben Gitarre im Stil der Siebziger: warmgelber Korpus, roter Rennstreifen. Genau diese beiden Farben sind Primär- und Akzentfarbe. Und der Streifen – schmal, breit, schmal, im 45°-Winkel – taucht überall auf: im Logo, im Hero und an jeder Station auf der Seite _Erfahrung_.

<figure class="palette" aria-label="Sunny-Palette">
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

## Sechs Zahlen

Das ganze Theme hängt an sechs Zahlen: Helligkeit, Buntheit und Farbton (OKLCH) für die Primär- und die Akzentfarbe. Alles andere wird daraus abgeleitet – Hintergründe, Text, Rahmen und die Farbleiter oben. Selbst die Grautöne sind leicht zum Farbton hin getönt. Weil die sechs Zahlen als CSS-Eigenschaften registriert sind (`@property`), lässt sich das komplette Farbschema zur Laufzeit umstellen.

## Hell und dunkel

Jede Farbe ist mit `light-dark()` definiert und richtet sich nach `color-scheme`. Die Seite folgt der Systemeinstellung, der Schalter im Header überschreibt sie. Einzelne Bereiche lassen sich mit den Klassen `sunny-light` oder `sunny-dark` fest auf einen Modus setzen.

## Jede Station in ihren Farben

Auf der Seite _Erfahrung_ übernimmt die Seite beim Scrollen die Farben des jeweiligen Unternehmens. Markenfarben gibt es in jeder Helligkeit, deshalb werden sie angepasst: hell genug, um auf dunklem Grund lesbar zu bleiben. Beim Wechsel zwischen zwei Unternehmen mischen sich die Farben in OKLab, statt den Farbton zu drehen. So wird aus Gelb zu Blau ein kurzer, ruhiger Übergang statt eines Regenbogens über Rot und Pink. Am Ende der Seite geht es zurück zu Sunny.

## Schriften

Überschriften in Fraunces, Fließtext in Inter, Details in JetBrains Mono – alle direkt von dieser Seite ausgeliefert, ohne externe Dienste.
