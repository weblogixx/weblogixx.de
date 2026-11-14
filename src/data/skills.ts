import type { L10n } from './types';

export const skillCategories = {
  languages: { de: 'Sprachen', en: 'Languages' },
  frameworks: { de: 'Frameworks & Libraries', en: 'Frameworks & libraries' },
  design: { de: 'Design Systems & UI', en: 'Design systems & UI' },
  architecture: { de: 'Architektur & Web', en: 'Architecture & web' },
  infrastructure: { de: 'Infrastruktur & Daten', en: 'Infrastructure & data' },
  ai: { de: 'KI & Agentic', en: 'AI & agentic' },
} satisfies Record<string, L10n>;

export type SkillCategory = keyof typeof skillCategories;

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Highlight on the home page. */
  featured?: boolean;
}

/**
 * All skills. The key is the id you reference in employers.ts → `stack`.
 * Order within a category = display order on the home page.
 * Mostly taken from LinkedIn; adjust freely.
 */
export const skills = {
  astro: { name: 'Astro', category: 'frameworks', featured: true },
  angular: { name: 'Angular', category: 'frameworks' },
  docker: { name: 'Docker', category: 'infrastructure' },
  playwright: { name: 'Playwright', category: 'frameworks' },
  storybook: { name: 'Storybook', category: 'design' },
  mcp: { name: 'Model Context Protocol', category: 'ai', featured: true },
  html: { name: 'HTML5', category: 'languages', featured: true },
  css: { name: 'CSS', category: 'languages', featured: true },
  javascript: { name: 'JavaScript', category: 'languages', featured: true },
  typescript: { name: 'TypeScript', category: 'languages', featured: true },
  php: { name: 'PHP', category: 'languages' },
  sql: { name: 'SQL', category: 'languages' },
  shell: { name: 'Shell Scripting', category: 'languages' },

  lit: { name: 'Lit', category: 'frameworks', featured: true },
  webcomponents: {
    name: 'Web Components',
    category: 'frameworks',
    featured: true,
  },
  react: { name: 'React', category: 'frameworks', featured: true },
  redux: { name: 'Redux', category: 'frameworks' },
  vue: { name: 'Vue.js', category: 'frameworks' },
  node: { name: 'Node.js', category: 'frameworks' },
  cakephp: { name: 'CakePHP', category: 'frameworks' },

  designsystems: { name: 'Design Systems', category: 'design', featured: true },
  designtokens: { name: 'Design Tokens', category: 'design' },
  sass: { name: 'Sass', category: 'design' },
  less: { name: 'LESS', category: 'design' },
  postcss: { name: 'PostCSS', category: 'design' },
  webdesign: { name: 'Web Design', category: 'design' },
  photoshop: { name: 'Adobe Photoshop', category: 'design' },
  fireworks: { name: 'Adobe Fireworks', category: 'design' },
  figma: { name: 'Figma', category: 'design' },

  frontendarch: {
    name: 'Frontend Architecture',
    category: 'architecture',
    featured: true,
  },
  microfrontends: { name: 'Microfrontends', category: 'architecture' },
  webapps: { name: 'Web Applications', category: 'architecture' },
  webservices: { name: 'Web Services & APIs', category: 'architecture' },
  embeddedui: { name: 'Embedded Web UIs', category: 'architecture' },
  ecommerce: { name: 'E-Commerce', category: 'architecture' },
  cms: { name: 'CMS', category: 'architecture' },
  seo: { name: 'SEO', category: 'architecture' },
  semanticweb: { name: 'Semantic Web', category: 'architecture' },

  linux: { name: 'Linux / Unix', category: 'infrastructure' },
  mysql: { name: 'MySQL', category: 'infrastructure' },
  webserver: { name: 'Webserver & Hosting', category: 'infrastructure' },
  networking: { name: 'Networking', category: 'infrastructure' },

  a11y: { name: 'Accessibility', category: 'infrastructure' },
  performance: { name: 'Performance Optimization', category: 'infrastructure' },
  agents: { name: 'Agentic Workflows', category: 'ai', featured: true },
} as const satisfies Record<string, Skill>;

export type SkillId = keyof typeof skills;
