import type { L10n } from './types';

export const profile = {
  name: 'Christian Schilling',
  handle: 'weblogixx',
  /** Year I started building for the web. */
  since: 2000,
  title: {
    de: 'Frontend Architect & Design Systems',
    en: 'Frontend Architect & Design Systems',
  } satisfies L10n,
  intro: {
    de: 'Ich baue seit über zwei Jahrzehnten Oberflächen für das Web — heute vor allem Design Systems, die Teams schneller und Produkte konsistenter machen.',
    en: "I've been building interfaces for the web for more than two decades — these days mostly design systems that make teams faster and products more consistent.",
  } satisfies L10n,
  focus: [
    {
      title: { de: 'Frontend-Architektur', en: 'Frontend architecture' },
      text: {
        de: 'Skalierbare, wartbare Codebasen mit TypeScript, Komponenten und klaren Grenzen.',
        en: 'Scalable, maintainable codebases with TypeScript, components and clear boundaries.',
      },
    },
    {
      title: { de: 'Design Systems', en: 'Design systems' },
      text: {
        de: 'Tokens, Komponenten, Dokumentation und die Prozesse dazwischen — von Figma bis Produktion.',
        en: 'Tokens, components, docs and the processes in between — from Figma to production.',
      },
    },
    {
      title: { de: 'Agentic Engineering', en: 'Agentic engineering' },
      text: {
        de: 'KI-Agenten sinnvoll in Entwicklungs- und Design-Workflows integrieren.',
        en: 'Putting AI agents to good use in development and design workflows.',
      },
    },
  ] satisfies { title: L10n; text: L10n }[],
  // TODO(chris): personal "About me" text.
  about: {
    de: [
      'Platzhalter: Wer ich bin, wo ich lebe und was mich antreibt.',
      'Platzhalter: Was ich abseits des Bildschirms mache — zum Beispiel Gitarre spielen. Das Farbschema dieser Seite heißt „Vintera“ und ist von meinem Fender Vintera II ’70s Competition Mustang abgeleitet.',
    ],
    en: [
      'Placeholder: who I am, where I live and what drives me.',
      'Placeholder: what I do away from the screen — playing guitar, for example. This site’s color theme is called “Vintera” and is sampled from my Fender Vintera II ’70s Competition Mustang.',
    ],
  } satisfies L10n<string[]>,
};
