import type { L10n, YearMonth } from './types';

export const profile = {
  name: 'Christian Schilling',
  shortName: 'Chris',
  handle: 'weblogixx',
  /** The one contact address: "Hallo sagen" buttons, Links page, imprint, privacy policy. */
  email: 'hello@weblogixx.de',
  /** Free for new projects from this month on. Shown next to the buttons; remove when booked out. */
  availableFrom: '2027-01' as YearMonth | undefined,
  /** Year I started building for the web. */
  since: 2000,
  title: {
    de: 'Frontend und Design-System Architektur',
    en: 'Frontend and Design-System Architecture',
  } satisfies L10n,
  greeting: {
    de: 'Hallo, ich bin',
    en: 'Hello, I’m',
  } satisfies L10n,
  intro: {
    de: 'Ich baue seit über zwei Jahrzehnten Oberflächen für das Web. Mein Schwerpunkt sind Design Systeme, die Teams schneller und Produkte konsistenter machen.',
    en: "I've been building interfaces for the web for more than two decades. My main focus are design systems that make teams faster and products more consistent.",
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
      title: { de: 'Design Systeme', en: 'Design systems' },
      text: {
        de: 'Tokens, Komponenten, Dokumentation und die Prozesse dazwischen - von Figma bis zur Produktivumgebung.',
        en: 'Tokens, components, docs and the processes in between - from Figma to production.',
      },
    },
    {
      title: {
        de: 'Agentische Frontends',
        en: 'Agentic frontends',
      },
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
      'Platzhalter: Was ich abseits des Bildschirms mache — zum Beispiel Gitarre spielen.',
    ],
    en: [
      'Placeholder: who I am, where I live and what drives me.',
      'Placeholder: what I do away from the screen — playing guitar, for example.',
    ],
  } satisfies L10n<string[]>,
};
