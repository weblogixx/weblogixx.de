import type { L10n } from './types';

export const skillCategories = {
  languages: { de: 'Sprachen', en: 'Languages' },
  frameworks: { de: 'Frameworks & Libraries', en: 'Frameworks & libraries' },
  design: { de: 'Design Systems & UI', en: 'Design systems & UI' },
  tooling: { de: 'Tooling & Build', en: 'Tooling & build' },
  quality: { de: 'Qualität & Testing', en: 'Quality & testing' },
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
 * TODO(chris): replace/extend with your real stack.
 */
export const skills = {
  html: { name: 'HTML', category: 'languages', featured: true },
  css: { name: 'CSS', category: 'languages', featured: true },
  javascript: { name: 'JavaScript', category: 'languages', featured: true },
  typescript: { name: 'TypeScript', category: 'languages', featured: true },
  php: { name: 'PHP', category: 'languages' },

  react: { name: 'React', category: 'frameworks', featured: true },
  vue: { name: 'Vue', category: 'frameworks' },
  astro: { name: 'Astro', category: 'frameworks' },
  webcomponents: { name: 'Web Components', category: 'frameworks', featured: true },
  jquery: { name: 'jQuery', category: 'frameworks' },

  designtokens: { name: 'Design Tokens', category: 'design', featured: true },
  storybook: { name: 'Storybook', category: 'design', featured: true },
  figma: { name: 'Figma', category: 'design' },
  a11y: { name: 'Accessibility (WCAG)', category: 'design', featured: true },
  sass: { name: 'Sass', category: 'design' },

  vite: { name: 'Vite', category: 'tooling' },
  webpack: { name: 'webpack', category: 'tooling' },
  node: { name: 'Node.js', category: 'tooling' },
  git: { name: 'Git', category: 'tooling' },
  ci: { name: 'CI/CD', category: 'tooling' },

  vitest: { name: 'Vitest', category: 'quality' },
  playwright: { name: 'Playwright', category: 'quality' },
  visualregression: { name: 'Visual Regression', category: 'quality' },

  agents: { name: 'Agentic Workflows', category: 'ai', featured: true },
  claudecode: { name: 'Claude Code', category: 'ai' },
  mcp: { name: 'MCP', category: 'ai' },
} as const satisfies Record<string, Skill>;

export type SkillId = keyof typeof skills;
