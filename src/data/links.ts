import type { L10n } from './types';

export interface ProfileLink {
  label: string;
  /** Shown in mono, e.g. the handle. */
  handle: string;
  url: string;
  description?: L10n;
}

// TODO(chris): verify URLs, add more.
export const links: ProfileLink[] = [
  {
    label: 'GitHub (personal)',
    handle: '@weblogixx',
    url: 'https://github.com/weblogixx',
    description: {
      de: 'Code, Experimente, Open Source.',
      en: 'Code, experiments, open source.',
    },
  },
  {
    label: 'GitHub (company)',
    handle: '@schilchSICKAG',
    url: 'https://github.com/schilchSICKAG',
    description: {
      de: 'Company account für Synergy, SICKs Open Source Design System',
      en: 'Company account for Synergy, SICKs Open Source Design System',
    },
  },
  {
    label: 'LinkedIn',
    handle: 'Christian Schilling',
    url: 'https://www.linkedin.com/in/christian-schilling-b999a2b2/',
    description: {
      de: 'Beruflicher Werdegang und Kontakt.',
      en: 'Professional profile and contact.',
    },
  },
];
