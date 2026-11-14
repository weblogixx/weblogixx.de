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
    label: 'GitHub',
    handle: '@weblogixx',
    url: 'https://github.com/weblogixx',
    description: { de: 'Code, Experimente, Open Source.', en: 'Code, experiments, open source.' },
  },
  {
    label: 'LinkedIn',
    handle: 'TODO',
    url: 'https://www.linkedin.com/',
    description: { de: 'Beruflicher Werdegang und Kontakt.', en: 'Professional profile and contact.' },
  },
];
