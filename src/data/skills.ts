import type { L10n } from './types';

export const skillCategories = {
  languages: { de: 'Sprachen', en: 'Languages' },
  frameworks: { de: 'Frameworks & Libraries', en: 'Frameworks & libraries' },
  design: { de: 'Design Systems & UI', en: 'Design systems & UI' },
  architecture: { de: 'Architektur & Plattform', en: 'Architecture & platform' },
  tooling: { de: 'Tooling & Qualität', en: 'Tooling & quality' },
  ai: { de: 'KI & Agentic', en: 'AI & agentic' },
} satisfies Record<string, L10n>;

export type SkillCategory = keyof typeof skillCategories;

export type RetiredKind = 'discontinued' | 'movedOn';

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Highlight on the home page. */
  featured?: boolean;
  /** No longer in my toolbox: shown muted and sorted last, with a note in the tooltip. */
  retired?: {
    /**
     * Why: `discontinued` — the tool itself is dead (no more releases, e.g. Prototype.js);
     * `movedOn` — it's still alive, I just don't use it anymore (e.g. REDAXO → Astro).
     */
    kind: RetiredKind;
    /** What the know-how carried over to / what I use instead (another skill id). */
    successor?: string;
    /** Optional extra sentence for the tooltip, after the generated note. */
    reason?: L10n;
  };
  /** Optional short explanation, shown at the top of the skill's tooltip. */
  description?: L10n;
}

/**
 * All skills. The key is the id you reference in employers.ts → `stack`.
 * Grouped by category (in the order of skillCategories), alphabetical by name within each group.
 * The home page uses the same order, but moves retired skills to the end of each category.
 * Mostly taken from LinkedIn; adjust freely.
 */
export const skills = {
  // ── Languages ──

  css: { name: 'CSS', category: 'languages', featured: true },

  gleam: {
    description: {
      de: 'Funktionale Programmiersprache, die auf der BEAM-VM läuft (wie Elixir und Erlang).',
      en: 'Functional programming language that runs on the BEAM VM (like Elixir and Erlang).',
    },
    name: 'Gleam',
    category: 'languages',
  },

  html: { name: 'HTML', category: 'languages', featured: true },

  javascript: { name: 'JavaScript', category: 'languages', featured: true },

  less: {
    name: 'LESS',
    category: 'languages',
    retired: {
      kind: 'movedOn',
      successor: 'css',
    },
  },

  markdown: {
    description: {
      de: 'Markdown ist eine schlanke Auszeichnungssprache, die schon als reiner Text gut lesbar ist – noch bevor sie in HTML umgewandelt wird.',
      en: 'Markdown is a lightweight markup language that stays easy to read as plain text, even before it is converted to HTML.',
    },
    name: 'Markdown',
    category: 'languages',
  },

  php: {
    name: 'PHP',
    category: 'languages',
    retired: { kind: 'movedOn', successor: 'node' },
  },

  sass: {
    name: 'Sass',
    category: 'languages',
  },

  shell: { name: 'Shell Scripting', category: 'languages' },

  sql: { name: 'SQL', category: 'languages' },

  typescript: { name: 'TypeScript', category: 'languages', featured: true },

  // ── end Languages ──

  // ── Frameworks & libraries ──

  angular: { name: 'Angular', category: 'frameworks' },

  astro: {
    description: {
      de: 'Framework für die Entwicklung von Webanwendungen, das auf Komponenten basiert. Unterstützt moderne Frontend-Frameworks wie React, Vue und Svelte.',
      en: 'Framework for building web applications that is based on components. Supports modern frontend frameworks like React, Vue, and Svelte.',
    },
    name: 'Astro',
    category: 'frameworks',
    featured: true,
  },

  cakephp: {
    name: 'CakePHP',
    category: 'frameworks',
    retired: {
      kind: 'movedOn',
      successor: 'astro',
    },
  },

  jquery: {
    name: 'jQuery',
    category: 'frameworks',
    retired: {
      kind: 'movedOn',
      successor: 'javascript',
    },
  },

  lit: { name: 'Lit', category: 'frameworks', featured: true },

  magento: {
    description: {
      de: 'E-Commerce-Plattform, die auf PHP basiert. Häufig für Online-Shops verwendet.',
      en: 'E-commerce platform based on PHP. Commonly used for online stores.',
    },
    name: 'Magento',
    category: 'frameworks',
  },

  node: {
    description: {
      de: 'JavaScript-Laufzeitumgebung, die es ermöglicht, JavaScript außerhalb des Browsers auszuführen. Häufig für Serveranwendungen und Tools verwendet.',
      en: 'JavaScript runtime environment that allows running JavaScript outside the browser. Commonly used for server applications and tools.',
    },
    name: 'Node.js',
    category: 'frameworks',
    featured: true,
  },

  prototype: {
    name: 'Prototype.js',
    category: 'frameworks',
    retired: { kind: 'discontinued', successor: 'javascript' },
  },

  react: { name: 'React', category: 'frameworks', featured: true },

  redaxo: {
    description: {
      de: 'Content-Management-System (CMS) auf PHP-Basis. Häufig für kleinere bis mittelgroße Websites verwendet.',
      en: 'Content management system (CMS) based on PHP. Commonly used for small to medium-sized websites.',
    },
    name: 'REDAXO',
    category: 'frameworks',
    retired: { kind: 'movedOn', successor: 'astro' },
  },

  redux: { name: 'Redux', category: 'frameworks' },

  shoelace: {
    description: {
      de: 'Komponenten-Bibliothek, die auf dem Web Components-Standard basiert. Bietet eine Sammlung von wiederverwendbaren UI-Komponenten.',
      en: 'Components library that is based on the Web Components standard. Provides a collection of reusable UI components.',
    },
    name: 'Shoelace',
    category: 'frameworks',
    retired: { kind: 'discontinued', successor: 'webawesome' },
  },

  vue: { name: 'Vue.js', category: 'frameworks', featured: true },

  webawesome: {
    description: {
      de: 'Komponenten-Bibliothek, die auf dem Web Components-Standard basiert. Bietet eine Sammlung von wiederverwendbaren UI-Komponenten.',
      en: 'Components library that is based on the Web Components standard. Provides a collection of reusable UI components.',
    },
    featured: false,
    name: 'Web Awesome',
    category: 'frameworks',
  },

  webcomponents: {
    name: 'Web Components',
    category: 'frameworks',
    featured: false,
  },

  zend: {
    description: {
      de: 'PHP-Framework, das in den 2000er Jahren populär war. Heute weitgehend durch modernere Frameworks ersetzt.',
      en: 'PHP framework that was popular in the 2000s. Today largely replaced by more modern frameworks.',
    },
    name: 'Zend Framework',
    category: 'frameworks',
    retired: { kind: 'discontinued', successor: 'astro' },
  },

  // ── end Frameworks & libraries ──

  // ── Design systems & UI ──

  a11y: {
    description: {
      de: 'Kurz für "Accessibility". Entwicklung von barrierefreien Webanwendungen, die für Menschen mit Behinderungen zugänglich sind. Berücksichtigung von Screenreadern, Tastaturnavigation und Farbkontrasten.',
      en: 'Short for "Accessibility". Development of accessible web applications that are usable by people with disabilities. Consideration of screen readers, keyboard navigation, and color contrasts.',
    },
    name: 'A11y',
    category: 'design',
    featured: true,
  },

  designsystems: {
    description: {
      de: 'Designsysteme sind Sammlungen von wiederverwendbaren UI-Komponenten, Designrichtlinien und Best Practices, die konsistente Benutzeroberflächen ermöglichen.',
      en: 'Design systems are collections of reusable UI components, design guidelines, and best practices that enable consistent user interfaces.',
    },
    name: 'Design Systems',
    category: 'design',
    featured: true,
  },

  designtokens: {
    description: {
      de: 'Design Tokens sind standardisierte Variablen, die Designentscheidungen wie Farben, Schriftarten und Abstände in Code umsetzen. Sie ermöglichen konsistente Designs über verschiedene Plattformen hinweg.',
      en: 'Design tokens are standardized variables that translate design decisions such as colors, fonts, and spacing into code. They enable consistent designs across different platforms.',
    },
    name: 'Design Tokens',
    category: 'design',
    featured: true,
  },

  figma: { name: 'Figma', category: 'design' },

  fireworks: {
    name: 'Fireworks',
    category: 'design',
    retired: { kind: 'discontinued', successor: 'figma' },
  },

  photoshop: {
    name: 'Photoshop',
    category: 'design',
    retired: { kind: 'movedOn', successor: 'figma' },
  },

  postcss: { name: 'PostCSS', category: 'design' },

  responsiveDesign: {
    name: 'Responsive Design',
    category: 'design',
    featured: true,
  },

  storybook: { name: 'Storybook', category: 'design', featured: true },

  webdesign: { name: 'Web Design', category: 'design' },

  ux: {
    name: 'User Experience',
    category: 'design',
  },

  // ── end Design systems & UI ──

  // ── Architecture & platform ──

  cms: {
    description: {
      de: 'Content-Management-Systeme (CMS) sind Softwaresysteme, mit denen sich Inhalte einer Website ohne tiefere technische Kenntnisse pflegen und veröffentlichen lassen.',
      en: 'Content management systems (CMS) let people create, edit and publish website content without deeper technical knowledge.',
    },
    name: 'CMS',
    category: 'architecture',
  },

  docker: { name: 'Docker', category: 'architecture' },

  dx: {
    description: {
      de: 'DX, kurz für "Developer Experience" ist die Fähigkeit, Software für Entwickler verständlich zu schreiben, so dass diese sie möglichst problemlos nutzen können.',
      en: 'DX, short for "Developer Experience" is the skill to write software in a way that is easy to understand and use for developers.',
    },
    name: 'Developer Experience',
    category: 'architecture',
  },

  ecommerce: { name: 'E-Commerce', category: 'architecture' },

  embeddedui: {
    description: {
      de: 'Entwicklung von Webanwendungen, die auf Embedded-Systemen laufen. Diese haben oft sehr begrenzte Ressourcen, daher ist Performance-Optimierung besonders wichtig.',
      en: 'Development of web applications that run on embedded systems. These often have very limited resources, so performance optimization is particularly important.',
    },
    name: 'Embedded Web UIs',
    category: 'architecture',
    featured: true,
  },

  frontendarch: {
    name: 'Frontend Architecture',
    category: 'architecture',
    featured: true,
  },

  linux: { name: 'Linux / Unix', category: 'architecture' },

  microfrontends: {
    name: 'Microfrontends',
    category: 'architecture',
    featured: true,
  },

  mysql: { name: 'MySQL', category: 'architecture' },

  networking: { name: 'Networking', category: 'architecture' },

  rest: {
    description: {
      de: 'Architekturstil für verteilte Systeme, der auf HTTP und RESTful-Prinzipien basiert. Häufig für Web-APIs verwendet.',
      en: 'Architectural style for distributed systems that is based on HTTP and RESTful principles. Commonly used for web APIs.',
    },
    name: 'REST',
    category: 'architecture',
  },

  seo: {
    description: {
      de: 'SEO (Search Engine Optimization, Suchmaschinenoptimierung) umfasst alles, was eine Website für Suchmaschinen verständlich macht – damit sie leichter gefunden wird.',
      en: 'SEO, short for search engine optimization, is the craft of making a website easy for search engines to understand and rank, so people can find it.',
    },
    name: 'SEO',
    category: 'architecture',
  },

  webapps: { name: 'Web Applications', category: 'architecture' },

  webservices: { name: 'Web Services & APIs', category: 'architecture' },

  webserver: {
    description: {
      de: 'Bereitstellung von Webanwendungen auf Servern, Konfiguration von Webserver-Software (z.B. Apache, Nginx, Mail), Einrichtung von Domains und SSL-Zertifikaten.',
      en: 'Deployment of web applications on servers, configuration of web server software (e.g., Apache, Nginx, Mail), setup of domains and SSL certificates.',
    },
    name: 'Webserver & Hosting',
    category: 'architecture',
  },

  websockets: { name: 'WebSockets', category: 'architecture' },

  // ── end Architecture & platform ──

  // ── Tooling & quality ──

  ci: {
    description: {
      de: 'Continuous Integration (CI) bezeichnet den Prozess, bei dem Codeänderungen automatisch gebaut, getestet und integriert werden. Ziel ist es, Fehler frühzeitig zu erkennen und die Qualität des Codes zu sichern. CD steht für Continuous Delivery/Deployment, also die kontinuierliche Auslieferung von Software.',
      en: 'Continuous Integration (CI) refers to the process of automatically building, testing, and integrating code changes. The goal is to catch errors early and ensure code quality. CD stands for Continuous Delivery/Deployment, i.e., the continuous delivery of software.',
    },
    featured: true,
    name: 'CI/CD',
    category: 'tooling',
  },

  github: { name: 'GitHub', category: 'tooling', featured: true },

  gitlab: { name: 'GitLab', category: 'tooling' },

  legacyBrowsers: {
    description: {
      de: 'Entwicklung von Webanwendungen, die auch auf älteren Browsern (z.B. Internet Explorer) funktionieren. Oft mit Polyfills und Fallbacks.',
      en: 'Development of web applications that also work on older browsers (e.g., Internet Explorer). Often with polyfills and fallbacks.',
    },
    name: 'Legacy Browsers',
    category: 'tooling',
    retired: { kind: 'discontinued', successor: 'responsiveDesign' },
  },

  linting: {
    description: {
      de: 'Automatische Prüfung und Formatierung von Code (z.B. jshint, ESLint, oxlint, Prettier, oxfmt) – Fehler und Stilfragen fallen auf, bevor jemand sie im Review suchen muss.',
      en: 'Automated code checks and formatting (e.g. jshint, ESLint, oxlint, Prettier, oxfmt) – mistakes and style issues show up before anyone has to look for them in review.',
    },
    name: 'Linting & Formatting',
    category: 'tooling',
  },

  macos: { name: 'macOS', category: 'tooling', featured: true },

  npm: { name: 'npm', category: 'tooling' },

  opensource: {
    description: {
      de: 'Ab und an erlaubt es mir meine Tätigkeit, direkt an Open-Source-Projekten mitzuarbeiten, sei es als Nutzer, Entwickler oder Contributor.',
      en: 'From time to time, my work allows me to contribute directly to open-source projects, whether as a user, developer, or contributor.',
    },
    name: 'Open Source',
    category: 'tooling',
    featured: true,
  },

  performance: {
    name: 'Performance Optimization',
    category: 'tooling',
    description: {
      de: 'Optimierung der Ladezeit und Performance von Webanwendungen, Troubleshooting bei Leistungsproblemen.',
      en: 'Optimization of loading time and performance of web applications, troubleshooting performance issues.',
    },
  },

  playwright: {
    description: {
      de: 'End-to-End-Test-Framework für Webanwendungen. Unterstützt moderne Browser und ermöglicht automatisierte Tests von Benutzeroberflächen.',
      en: 'End-to-end testing framework for web applications. Supports modern browsers and enables automated testing of user interfaces.',
    },
    name: 'Playwright',
    category: 'tooling',
    featured: true,
  },

  pnpm: { name: 'pnpm', category: 'tooling' },

  testing: {
    description: {
      de: 'Unit- und Integrationstests (z.B. node:assert, Vitest, Jest, Testing Library), die Logik und Komponenten absichern und Refactorings ohne Angst möglich machen.',
      en: 'Unit and integration tests (e.g. node:assert, Vitest, Jest, Testing Library) that cover logic and components and make refactoring safe.',
    },
    name: 'Unit & Integration Testing',
    category: 'tooling',
  },

  visres: {
    description: {
      de: 'Visual Regression Testing ist eine Methode, um visuelle Änderungen in Webanwendungen zu erkennen. Automatisierte Tests vergleichen Screenshots von verschiedenen Versionen der Anwendung, um unerwünschte Änderungen zu identifizieren.',
      en: 'Visual Regression Testing is a method for detecting visual changes in web applications. Automated tests compare screenshots of different versions of the application to identify unwanted changes.',
    },
    name: 'Visual Regression Testing',
    category: 'tooling',
  },

  vsCode: {
    description: {
      de: 'Microsoft Visual Studio Code',
      en: 'Microsoft Visual Studio Code',
    },
    name: 'VSCode',
    category: 'tooling',
    featured: true,
  },

  sublime: {
    name: 'Sublime',
    category: 'tooling',
    retired: {
      kind: 'movedOn',
      successor: 'vsCode',
    },
  },

  atom: {
    description: {
      de: 'Der Atom Editor von Github war das erste vollständig webbasierte IDE, der mir bekannt ist',
      en: 'Atom by Github was the first full fledged web based IDE that I know of',
    },
    name: 'Atom',
    category: 'tooling',
    retired: {
      kind: 'movedOn',
      successor: 'vsCode',
    },
  },

  dreamweaver: {
    description: {
      de: 'Dreamweaver ist ein IDE, die ursprünglich von Macromedia, heute von Adobe entwickelt wird',
      en: 'Dreamweaver is an IDE that was originally created by Macromedia and how developed by Adobe',
    },
    name: 'Dreamweaver',
    category: 'tooling',
    retired: {
      kind: 'movedOn',
      successor: 'vsCode',
    },
  },

  netbeans: {
    description: {
      de: 'TODO',
      en: 'TODO',
    },
    name: 'Netbeans',
    category: 'tooling',
    retired: {
      kind: 'movedOn',
      successor: 'vsCode',
    },
  },

  // ── end Tooling & quality ──

  // ── AI & agentic ──

  agents: {
    description: {
      de: 'Software-Agenten, die Aufgaben autonom ausführen können. Oft in Verbindung mit KI und Automatisierung.',
      en: 'Software agents that can perform tasks autonomously. Often associated with AI and automation.',
    },
    name: 'Agentic Workflows',
    category: 'ai',
    featured: true,
  },

  claude: {
    description: {
      de: 'KI-gestützter Assistent von Anthropic. Unterstützt Entwickler beim Schreiben von Code, indem er Vorschläge und Autovervollständigungen liefert.',
      en: 'AI-powered assistant from Anthropic. Helps developers write code by providing suggestions and autocompletions.',
    },
    name: 'Claude',
    category: 'ai',
    featured: true,
  },

  cursor: { name: 'Cursor', category: 'ai' },

  figmaMCP: {
    description: {
      de: 'Figma-Plugin, das den Model Context Protocol (MCP) Standard implementiert und so KI-Assistenten Zugriff auf Figma-Daten ermöglicht. Ermöglicht z.B. Code-to-Design- und Design-to-Code-Workflows.',
      en: 'Figma plugin that implements the Model Context Protocol (MCP) standard, allowing AI assistants to access Figma data. Enables code-to-design and design-to-code workflows, for example.',
    },
    name: 'Figma MCP',
    category: 'ai',
    featured: true,
  },

  githubCopilot: {
    description: {
      de: 'KI-gestützter Code-Assistent von GitHub. Unterstützt Entwickler beim Schreiben von Code, indem er Vorschläge und Autovervollständigungen liefert.',
      en: 'AI-powered code assistant from GitHub. Helps developers write code by providing suggestions and autocompletions.',
    },
    name: 'GitHub Copilot',
    category: 'ai',
    featured: true,
  },

  knowledgeArch: {
    description: {
      de: 'Rohdaten in Wissensschichten überführen – von Quellen über kuratierte Fakten bis zu Zusammenfassungen, mit denen KI-Agenten zuverlässig arbeiten können. Dazu gehört ein gemeinsames Vokabular, damit Begriffe überall dasselbe bedeuten.',
      en: 'Turning raw data into knowledge layers – from sources to curated facts to summaries that AI agents can reliably work with. Including a shared vocabulary, so terms mean the same thing everywhere.',
    },
    name: 'Knowledge Architecture',
    category: 'ai',
  },

  mcp: {
    name: 'MCP',
    category: 'ai',
    featured: true,
    description: {
      de: 'Kurz für "Model Context Protocol". Offener Standard, über den KI-Assistenten auf Tools und Datenquellen zugreifen.',
      en: 'Short for "Model Context Protocol". Open standard that lets AI assistants access tools and data sources.',
    },
  },

  // ── end AI & agentic ──
} as const satisfies Record<string, Skill>;

export type SkillId = keyof typeof skills;
