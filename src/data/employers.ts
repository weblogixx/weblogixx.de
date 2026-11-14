import type { Employer } from './types';
import type { SkillId } from './skills';

/**
 * Career entries. Order in this file doesn't matter — they're sorted by
 * start date (newest first) automatically.
 *
 * Promoted? Add another entry to `positions` — see the first template.
 *
 * To add a company: copy an entry, give it a unique `id`, drop the logo into
 * /public/logos/ and set its brand colors. `stack` autocompletes from skills.ts.
 *
 * TODO(chris): all entries below are TEMPLATES with placeholder content.
 */
export const employers: Employer<SkillId>[] = [
  {
    id: 'blue-corp',
    name: 'Blue Corp (Template)',
    url: 'https://example.com',
    location: 'Deutschland',
    positions: [
      {
        role: { de: 'Senior Frontend Engineer', en: 'Senior Frontend Engineer' },
        start: '2019-04',
        end: '2022-06',
      },
      {
        role: { de: 'Lead Frontend Engineer, Design System', en: 'Lead Frontend Engineer, Design System' },
        start: '2022-07',
        summary: {
          de: 'Technische Leitung des Design-System-Teams.',
          en: 'Technical lead of the design system team.',
        },
      },
    ],
    colors: { primary: '#1D6FD8' },
    tagline: {
      de: 'Aufbau und Skalierung eines konzernweiten Design Systems.',
      en: 'Building and scaling a company-wide design system.',
    },
    about: {
      de: [
        'Platzhalter: Ein paar Sätze über das Unternehmen — Branche, Größe, Produkte und was es besonders macht.',
        'Platzhalter: Meine Rolle im Team, mit wem ich zusammenarbeite und wofür ich verantwortlich bin.',
      ],
      en: [
        'Placeholder: a few sentences about the company — industry, size, products and what makes it special.',
        'Placeholder: my role in the team, who I work with and what I own.',
      ],
    },
    contributions: {
      de: [
        'Design Tokens als Single Source of Truth für Web und Native eingeführt.',
        'Komponentenbibliothek mit Web Components für mehrere Produktteams aufgebaut.',
        'Barrierefreiheit (WCAG 2.2 AA) im Entwicklungsprozess verankert.',
      ],
      en: [
        'Introduced design tokens as the single source of truth for web and native.',
        'Built a Web Components library used by multiple product teams.',
        'Made accessibility (WCAG 2.2 AA) part of the development workflow.',
      ],
    },
    facts: [
      { label: { de: 'Teamgröße', en: 'Team size' }, value: '8' },
      { label: { de: 'Produkte', en: 'Products' }, value: '12+' },
    ],
    stack: [
      'typescript',
      'webcomponents',
      'react',
      'designtokens',
      'storybook',
      'a11y',
      'vite',
      'playwright',
      'agents',
    ],
  },
  {
    id: 'green-industries',
    name: 'Green Industries (Template)',
    url: 'https://example.com',
    location: 'Deutschland',
    positions: [
      {
        role: { de: 'Senior Frontend Developer', en: 'Senior Frontend Developer' },
        start: '2011-09',
        end: '2019-03',
      },
    ],
    colors: { primary: '#2E9E44' },
    tagline: {
      de: 'Frontend-Architektur für eine große E-Commerce-Plattform.',
      en: 'Frontend architecture for a large e-commerce platform.',
    },
    about: {
      de: ['Platzhalter: Über das Unternehmen.', 'Platzhalter: Über meine Rolle.'],
      en: ['Placeholder: about the company.', 'Placeholder: about my role.'],
    },
    contributions: {
      de: [
        'Migration von jQuery zu einer komponentenbasierten Architektur geleitet.',
        'Build-Zeiten durch neues Tooling halbiert.',
      ],
      en: [
        'Led the migration from jQuery to a component-based architecture.',
        'Cut build times in half with new tooling.',
      ],
    },
    stack: ['javascript', 'typescript', 'react', 'sass', 'webpack', 'node', 'jquery'],
  },
  {
    id: 'meadow-media',
    name: 'Meadow Media (Template)',
    url: 'https://example.com',
    location: 'Deutschland',
    positions: [{ role: { de: 'Webentwickler', en: 'Web Developer' }, start: '2005-01', end: '2011-08' }],
    colors: { primary: '#7AB800' },
    tagline: {
      de: 'Websites und Web-Apps für Agenturkunden.',
      en: 'Websites and web apps for agency clients.',
    },
    about: {
      de: ['Platzhalter: Über das Unternehmen.'],
      en: ['Placeholder: about the company.'],
    },
    contributions: {
      de: ['Wiederverwendbares CSS-Framework für alle Kundenprojekte entwickelt.'],
      en: ['Built a reusable CSS framework for all client projects.'],
    },
    stack: ['html', 'css', 'javascript', 'php', 'jquery'],
  },
  {
    id: 'freelance',
    name: 'Freelance',
    positions: [
      {
        role: { de: 'Freiberuflicher Webentwickler', en: 'Freelance Web Developer' },
        start: '2000-01',
        end: '2004-12',
      },
    ],
    // No colors → stays Vintera.
    tagline: {
      de: 'Die Anfänge: HTML, CSS und viel Neugier.',
      en: 'Where it started: HTML, CSS and a lot of curiosity.',
    },
    about: {
      de: ['Platzhalter: Die ersten Projekte.'],
      en: ['Placeholder: the first projects.'],
    },
    contributions: { de: [], en: [] },
    stack: ['html', 'css', 'javascript', 'php'],
  },
];
