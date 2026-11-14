import type { L10n } from "./types";

export const profile = {
  name: "Christian Schilling",
  shortName: "Chris",
  handle: "weblogixx",
  /** Year I started building for the web. */
  since: 2000,
  title: {
    de: "Frontend und Design-System Architektur",
    en: "Frontend and Design-System Architecture",
  } satisfies L10n,
  greeting: {
    de: "Hallo, ich bin",
    en: "Hello, I’m",
  } satisfies L10n,
  intro: {
    de: "Ich baue seit über zwei Jahrzehnten Oberflächen für das Web. Mein Schwerpunkt sind Design Systeme, die Teams schneller und Produkte konsistenter machen.",
    en: "I've been building interfaces for the web for more than two decades. My main focus are design systems that make teams faster and products more consistent.",
  } satisfies L10n,
  focus: [
    {
      title: { de: "Frontend-Architektur", en: "Frontend architecture" },
      text: {
        de: "Skalierbare, wartbare Codebasen mit TypeScript, Komponenten und klaren Grenzen.",
        en: "Scalable, maintainable codebases with TypeScript, components and clear boundaries.",
      },
    },
    {
      title: { de: "Design Systems", en: "Design systems" },
      text: {
        de: "Tokens, Komponenten, Dokumentation und die Prozesse dazwischen - von Figma bis zur Produktivumgebung.",
        en: "Tokens, components, docs and the processes in between - from Figma to production.",
      },
    },
    {
      title: { de: "Agentic Engineering", en: "Agentic engineering" },
      text: {
        de: "KI-Agenten sinnvoll in Entwicklungs- und Design-Workflows integrieren.",
        en: "Putting AI agents to good use in development and design workflows.",
      },
    },
  ] satisfies { title: L10n; text: L10n }[],
  // TODO(chris): personal "About me" text.
  about: {
    de: [
      "Platzhalter: Wer ich bin, wo ich lebe und was mich antreibt.",
      "Platzhalter: Was ich abseits des Bildschirms mache — zum Beispiel Gitarre spielen. Das Farbschema dieser Seite heißt „Sunny“ und ist von meiner Fender Vintera II Mustang namens „Sunny“ mit rotem Rennstreifen abgeleitet.",
    ],
    en: [
      "Placeholder: who I am, where I live and what drives me.",
      "Placeholder: what I do away from the screen — playing guitar, for example. This site’s color theme is called “Sunny” and is sampled from my Fender Vintera II Competition Mustang „Sunny“ with its red racing stripe.",
    ],
  } satisfies L10n<string[]>,
};
