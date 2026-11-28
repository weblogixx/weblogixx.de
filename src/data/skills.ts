import type { L10n } from './types';

export const skillCategories = {
  languages: { de: 'Sprachen', en: 'Languages' },
  frameworks: { de: 'Frameworks & Libraries', en: 'Frameworks & libraries' },
  design: { de: 'Design Systems & UI', en: 'Design systems & UI' },
  architecture: { de: 'Architektur & Plattform', en: 'Architecture & platform' },
  tooling: { de: 'Arbeitsweise & Qualität', en: 'Workflow & quality' },
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
 * Grouped by category (in the order of skillCategories), alphabetical by name within each group;
 * practices like planning or code review sit together in their own block at the end. The order
 * here doesn't matter for the page: it sorts each category by name, retired skills last.
 * Mostly taken from LinkedIn; adjust freely.
 */
export const skills = {
  // ── Languages ──

  css: {
    name: 'CSS',
    category: 'languages',
    featured: true,
    description: {
      de: 'Die Sprache fürs Aussehen im Web: Layout, Farben, Typografie, Animationen. Mit Grid, Container Queries, :has() und Nesting kann sie heute vieles, wofür man früher JavaScript oder einen Präprozessor brauchte.',
      en: 'The language for how the web looks: layout, color, typography, animation. With grid, container queries, :has() and nesting it now covers much of what once took JavaScript or a preprocessor.',
    },
  },

  gleam: {
    name: 'Gleam',
    category: 'languages',
    description: {
      de: 'Statisch typisierte, funktionale Sprache für die BEAM, die VM hinter Erlang und Elixir. Kompiliert auf Wunsch auch zu JavaScript.',
      en: 'Statically typed functional language for the BEAM, the VM behind Erlang and Elixir. Can compile to JavaScript too.',
    },
  },

  html: {
    name: 'HTML',
    category: 'languages',
    featured: true,
    description: {
      de: 'Das Grundgerüst jeder Webseite. Mit semantischem HTML verstehen Browser, Screenreader und Suchmaschinen, was auf der Seite steht – und vieles funktioniert ganz ohne JavaScript.',
      en: 'The skeleton of every web page. Semantic HTML tells browsers, screen readers and search engines what’s on the page, and a lot works without any JavaScript.',
    },
  },

  javascript: {
    name: 'JavaScript',
    category: 'languages',
    featured: true,
    description: {
      de: 'Die Programmiersprache des Browsers. Macht Seiten interaktiv und läuft mit Node.js längst auch auf dem Server und in Build-Tools.',
      en: 'The programming language of the browser. Makes pages interactive, and with Node.js it runs on servers and in build tools too.',
    },
  },

  less: {
    name: 'LESS',
    category: 'languages',
    retired: {
      kind: 'movedOn',
      successor: 'css',
    },
    description: {
      de: 'CSS-Präprozessor mit Variablen, Mixins und Verschachtelung, in JavaScript geschrieben. Eine Zeit lang überall, nicht zuletzt dank Bootstrap.',
      en: 'CSS preprocessor with variables, mixins and nesting, written in JavaScript. Was everywhere for a while, not least thanks to Bootstrap.',
    },
  },

  markdown: {
    name: 'Markdown',
    category: 'languages',
    description: {
      de: 'Schlanke Auszeichnungssprache: Überschriften, Listen und Links mit ein paar Satzzeichen. Bleibt als reiner Text lesbar und wird zu HTML – die Beiträge in diesem Blog sind darin geschrieben.',
      en: 'Lightweight markup: headings, lists and links with a few punctuation marks. Reads fine as plain text and turns into HTML – the posts on this blog are written in it.',
    },
  },

  php: {
    name: 'PHP',
    category: 'languages',
    retired: { kind: 'movedOn', successor: 'node' },
    description: {
      de: 'Skriptsprache für den Server, die lange einen Großteil des Webs angetrieben hat (und das immer noch tut) – von WordPress bis zum selbst gebauten CMS.',
      en: 'Server-side scripting language that powered much of the web for a long time (and still is), from WordPress to home-grown CMSs.',
    },
  },

  sass: {
    name: 'Sass',
    category: 'languages',
    description: {
      de: 'CSS-Präprozessor mit Variablen, Mixins, Funktionen und Modulen. Vieles davon kann CSS inzwischen selbst, in großen Codebasen bleibt Sass trotzdem praktisch.',
      en: 'CSS preprocessor with variables, mixins, functions and modules. Plain CSS has caught up on a lot of it, but Sass is still handy in large codebases.',
    },
  },

  shell: {
    name: 'Shell Scripting',
    category: 'languages',
    description: {
      de: 'Kleine Bash- und zsh-Skripte für die lästigen Routinen: Builds, Deployments, Dateien umbenennen und aufräumen.',
      en: 'Small Bash and zsh scripts for the tedious bits: builds, deployments, renaming and cleaning up files.',
    },
  },

  sql: {
    name: 'SQL',
    category: 'languages',
    description: {
      de: 'Abfragesprache für relationale Datenbanken: Daten lesen, filtern, verknüpfen und ändern.',
      en: 'Query language for relational databases: reading, filtering, joining and changing data.',
    },
  },

  typescript: {
    name: 'TypeScript',
    category: 'languages',
    featured: true,
    description: {
      de: 'JavaScript mit Typen. Der Compiler findet viele Fehler schon beim Schreiben, und der Editor weiß, was eine Funktion erwartet. Für mich Standard in jedem größeren Projekt.',
      en: 'JavaScript with types. The compiler catches many mistakes while you type, and the editor knows what a function expects. My default for any project of real size.',
    },
  },

  // ── end Languages ──

  // ── Frameworks & libraries ──

  angular: {
    name: 'Angular',
    category: 'frameworks',
    description: {
      de: 'Komplettes Frontend-Framework von Google mit Routing, Formularen, Dependency Injection und eigener CLI. Nimmt einem viele Entscheidungen ab.',
      en: 'Full frontend framework from Google with routing, forms, dependency injection and its own CLI. Makes a lot of decisions for you.',
    },
  },

  astro: {
    name: 'Astro',
    category: 'frameworks',
    featured: true,
    description: {
      de: 'Framework für Websites mit viel Inhalt: rendert standardmäßig statisches HTML und lädt JavaScript nur dort, wo eine Komponente es wirklich braucht. Diese Seite ist damit gebaut.',
      en: 'Framework for content-heavy websites: renders static HTML by default and only ships JavaScript where a component actually needs it. This site is built with it.',
    },
  },

  cakephp: {
    name: 'CakePHP',
    category: 'frameworks',
    retired: {
      kind: 'movedOn',
      successor: 'astro',
    },
    description: {
      de: 'MVC-Framework für PHP, stark von Ruby on Rails inspiriert: Konvention statt Konfiguration.',
      en: 'MVC framework for PHP, heavily inspired by Ruby on Rails: convention over configuration.',
    },
  },

  jquery: {
    name: 'jQuery',
    category: 'frameworks',
    retired: {
      kind: 'movedOn',
      successor: 'javascript',
    },
    description: {
      de: 'Die Bibliothek, die DOM, Events und Ajax über alle Browser hinweg vereinheitlicht hat – damals ein Segen. Heute kann der Browser das meiste selbst.',
      en: 'The library that smoothed over the DOM, events and Ajax across browsers – a blessing at the time. Today browsers do most of it natively.',
    },
  },

  lit: {
    name: 'Lit',
    category: 'frameworks',
    featured: true,
    description: {
      de: 'Kleine Bibliothek von Google für Web Components: reaktive Properties und schnelles Templating, ohne viel Ballast.',
      en: 'Small library from Google for building Web Components: reactive properties and fast templating without much overhead.',
    },
  },

  magento: {
    name: 'Magento',
    category: 'frameworks',
    description: {
      de: 'E-Commerce-Plattform auf PHP-Basis, heute Adobe Commerce. Kann sehr viel und ist berüchtigt komplex.',
      en: 'PHP-based e-commerce platform, now Adobe Commerce. Can do a lot, and is notoriously complex.',
    },
  },

  node: {
    name: 'Node.js',
    category: 'frameworks',
    featured: true,
    description: {
      de: 'JavaScript-Laufzeit außerhalb des Browsers, auf Basis von Chromes V8. Treibt Server, CLI-Tools und praktisch jede Frontend-Toolchain an.',
      en: 'JavaScript runtime outside the browser, built on Chrome’s V8. Powers servers, CLI tools and practically every frontend toolchain.',
    },
  },

  prototype: {
    name: 'Prototype.js',
    category: 'frameworks',
    retired: { kind: 'discontinued', successor: 'javascript' },
    description: {
      de: 'Eine der ersten großen JavaScript-Bibliotheken: erweiterte die eingebauten Objekte und vereinfachte Ajax, noch bevor jQuery übernahm.',
      en: 'One of the first big JavaScript libraries: extended the built-in objects and simplified Ajax, before jQuery took over.',
    },
  },

  react: {
    name: 'React',
    category: 'frameworks',
    featured: true,
    description: {
      de: 'UI-Bibliothek von Meta: Oberflächen als Komponenten aus State und Props, deklarativ beschrieben. Riesiges Ökosystem.',
      en: 'UI library from Meta: interfaces as components built from state and props, described declaratively. Huge ecosystem.',
    },
  },

  redaxo: {
    name: 'REDAXO',
    category: 'frameworks',
    retired: { kind: 'movedOn', successor: 'astro' },
    description: {
      de: 'Schlankes CMS aus Deutschland auf PHP-Basis. Bei Agenturen für kleine und mittlere Websites beliebt, weil es sich leicht anpassen lässt.',
      en: 'Lean PHP CMS from Germany. Popular with agencies for small and mid-sized sites because it’s easy to customize.',
    },
  },

  redux: {
    name: 'Redux',
    category: 'frameworks',
    description: {
      de: 'Bibliothek für globalen State: ein zentraler Store, der sich nur über Actions und Reducer ändert. Dadurch sind Änderungen vorhersehbar und gut zu debuggen.',
      en: 'Library for global state: one central store that only changes through actions and reducers. That makes changes predictable and easy to debug.',
    },
  },

  shoelace: {
    name: 'Shoelace',
    category: 'frameworks',
    retired: { kind: 'discontinued', successor: 'webawesome' },
    description: {
      de: 'Sammlung fertiger UI-Komponenten auf Basis von Web Components, die dadurch in jedem Framework funktionieren.',
      en: 'Collection of ready-made UI components built as Web Components, so they work in any framework.',
    },
  },

  vue: {
    name: 'Vue.js',
    category: 'frameworks',
    featured: true,
    description: {
      de: 'Progressives Frontend-Framework: Single-File Components mit Template, Logik und Styles in einer Datei, dazu ein Reaktivitätssystem, das sich angenehm schreibt.',
      en: 'Progressive frontend framework: single-file components with template, logic and styles in one file, plus a reactivity system that’s pleasant to write.',
    },
  },

  webawesome: {
    name: 'Web Awesome',
    category: 'frameworks',
    featured: false,
    description: {
      de: 'Nachfolger von Shoelace: Komponenten-Bibliothek auf Basis von Web Components, frameworkunabhängig und über CSS-Variablen anpassbar.',
      en: 'Successor to Shoelace: component library built on Web Components, framework-agnostic and themeable with CSS custom properties.',
    },
  },

  webcomponents: {
    name: 'Web Components',
    category: 'frameworks',
    featured: false,
    description: {
      de: 'Browser-Standard für eigene HTML-Elemente mit Custom Elements und Shadow DOM. Braucht kein Framework und läuft deshalb in jedem.',
      en: 'Browser standard for your own HTML elements, with custom elements and shadow DOM. Needs no framework, so it works in all of them.',
    },
  },

  wordpress: {
    name: 'WordPress',
    category: 'frameworks',
    retired: { kind: 'movedOn', successor: 'astro' },
    description: {
      de: 'Das meistgenutzte CMS der Welt, in PHP geschrieben. Riesiges Plugin-Ökosystem – praktisch, solange man die Updates im Griff hat.',
      en: 'The most widely used CMS in the world, written in PHP. Huge plugin ecosystem – handy, as long as you keep on top of the updates.',
    },
  },

  zend: {
    name: 'Zend Framework',
    category: 'frameworks',
    retired: { kind: 'discontinued', successor: 'astro' },
    description: {
      de: 'Großes PHP-Framework aus den 2000ern, aufgebaut aus lose gekoppelten Komponenten. Lebt heute als Laminas weiter.',
      en: 'Large PHP framework from the 2000s, built from loosely coupled components. Lives on today as Laminas.',
    },
  },

  zustand: {
    name: 'Zustand',
    category: 'frameworks',
    description: {
      de: 'Schlanke State-Management-Bibliothek für React: ein Store als Hook, ohne Provider, Actions und Reducer-Boilerplate. Wo Redux zu schwer wäre.',
      en: 'Lean state management library for React: a store as a hook, without providers, actions and reducer boilerplate. For when Redux would be too heavy.',
    },
  },

  // ── end Frameworks & libraries ──

  // ── Design systems & UI ──

  a11y: {
    name: 'A11y',
    category: 'design',
    featured: true,
    description: {
      de: 'Kurz für Accessibility, also Barrierefreiheit: Oberflächen, die auch mit Screenreader, nur mit Tastatur oder bei schlechter Sicht funktionieren. Die 11 steht für die elf Buchstaben zwischen a und y.',
      en: 'Short for accessibility: interfaces that work with a screen reader, with just a keyboard, or with poor eyesight. The 11 stands for the eleven letters between a and y.',
    },
  },

  designsystems: {
    name: 'Design Systems',
    category: 'design',
    featured: true,
    description: {
      de: 'Gemeinsame Basis für Design und Code: Komponenten, Tokens, Richtlinien und Doku an einem Ort, damit nicht jedes Team seinen eigenen Button baut.',
      en: 'A shared foundation for design and code: components, tokens, guidelines and docs in one place, so no team has to build its own button.',
    },
  },

  designtokens: {
    name: 'Design Tokens',
    category: 'design',
    featured: true,
    description: {
      de: 'Designentscheidungen wie Farben, Abstände und Schriftgrößen als benannte Werte. Aus einer Quelle entstehen CSS-Variablen, Figma-Variablen oder Code für andere Plattformen, z.B. mit Style Dictionary.',
      en: 'Design decisions like colors, spacing and font sizes as named values. One source generates CSS custom properties, Figma variables or code for other platforms, e.g. with Style Dictionary.',
    },
  },

  figma: {
    name: 'Figma',
    category: 'design',
    description: {
      de: 'Design-Tool im Browser, in dem Design und Entwicklung gemeinsam an Komponenten, Variablen und Prototypen arbeiten.',
      en: 'Browser-based design tool where designers and developers work on components, variables and prototypes together.',
    },
  },

  fireworks: {
    name: 'Fireworks',
    category: 'design',
    retired: { kind: 'discontinued', successor: 'figma' },
    description: {
      de: 'Grafik-Tool von Macromedia, später Adobe, gemacht für Webgrafiken und Screendesign.',
      en: 'Graphics tool from Macromedia, later Adobe, made for web graphics and screen design.',
    },
  },

  photoshop: {
    name: 'Photoshop',
    category: 'design',
    retired: { kind: 'movedOn', successor: 'figma' },
    description: {
      de: 'Adobes Bildbearbeitung. Früher wurden darin ganze Websites gestaltet und anschließend in Slices zerschnitten.',
      en: 'Adobe’s image editor. Back in the day, whole websites were designed in it and then cut into slices.',
    },
  },

  responsiveDesign: {
    name: 'Responsive Design',
    category: 'design',
    featured: true,
    description: {
      de: 'Layouts, die sich jeder Bildschirmgröße anpassen, vom Smartphone bis zum großen Monitor. Mit Media und Container Queries, flexiblen Grids und fließender Typografie.',
      en: 'Layouts that adapt to any screen, from phone to big monitor. With media and container queries, flexible grids and fluid type.',
    },
  },

  storybook: {
    name: 'Storybook',
    category: 'design',
    featured: true,
    description: {
      de: 'Werkstatt für UI-Komponenten: jede Komponente isoliert in all ihren Zuständen entwickeln, testen und dokumentieren.',
      en: 'Workshop for UI components: build, test and document each component in isolation, in all its states.',
    },
  },

  webdesign: {
    name: 'Web Design',
    category: 'design',
    description: {
      de: 'Gestaltung von Websites: Layout, Typografie, Farbe und Hierarchie – mit Blick darauf, wie es sich später im Browser umsetzen lässt.',
      en: 'Designing websites: layout, typography, color and hierarchy – with an eye on how it will actually be built in the browser.',
    },
  },

  ux: {
    name: 'User Experience',
    category: 'design',
    description: {
      de: 'Wie sich ein Produkt benutzen lässt: verständliche Abläufe, klares Feedback, keine Sackgassen. Gute UX fällt meist erst auf, wenn sie fehlt.',
      en: 'How a product feels to use: clear flows, clear feedback, no dead ends. Good UX mostly gets noticed when it’s missing.',
    },
  },

  // ── end Design systems & UI ──

  // ── Architecture & platform ──

  cms: {
    name: 'CMS',
    category: 'architecture',
    description: {
      de: 'Content-Management-Systeme: Software, mit der sich die Inhalte einer Website pflegen lassen, ohne Code anzufassen.',
      en: 'Content management systems: software for editing a website’s content without touching code.',
    },
  },

  docker: {
    name: 'Docker',
    category: 'architecture',
    description: {
      de: 'Packt Anwendungen mit allen Abhängigkeiten in Container. Die laufen lokal genauso wie auf dem Server, und „bei mir geht’s“ hört man seltener.',
      en: 'Packs applications and their dependencies into containers. They run the same locally as on the server, so you hear “works on my machine” less often.',
    },
  },

  dx: {
    name: 'Developer Experience',
    category: 'architecture',
    description: {
      de: 'Wie angenehm sich Tools, APIs und Komponenten für Entwickler benutzen lassen: gute Defaults, klare Fehlermeldungen, Doku, die man findet.',
      en: 'How pleasant tools, APIs and components are for developers to use: good defaults, clear error messages, docs you can find.',
    },
  },

  ecommerce: {
    name: 'E-Commerce',
    category: 'architecture',
    description: {
      de: 'Online-Shops und alles drumherum: Produktkatalog, Warenkorb, Checkout, Zahlungsanbieter und die Anbindung an die Warenwirtschaft.',
      en: 'Online shops and everything around them: product catalog, cart, checkout, payment providers and the link to inventory systems.',
    },
  },

  embeddedui: {
    name: 'Embedded Web UIs',
    category: 'architecture',
    featured: true,
    description: {
      de: 'Weboberflächen, die direkt auf Geräten wie Sensoren oder Diagnosegeräten laufen. Wenig Speicher, schwache CPUs: Hier zählt jedes Kilobyte.',
      en: 'Web interfaces that run right on devices like sensors or diagnostic tools. Little memory and slow CPUs, so every kilobyte counts.',
    },
  },

  frontendarch: {
    name: 'Frontend Architecture',
    category: 'architecture',
    featured: true,
    description: {
      de: 'Die Struktur hinter dem Frontend: wie Code aufgeteilt, gebaut, getestet und ausgeliefert wird, damit Teams auch in ein paar Jahren noch gut damit arbeiten.',
      en: 'The structure behind a frontend: how code is split, built, tested and shipped, so teams can still work with it well a few years down the line.',
    },
  },

  linux: {
    name: 'Linux / Unix',
    category: 'architecture',
    description: {
      de: 'Unix-artige Betriebssysteme, auf denen fast jeder Webserver läuft: Kommandozeile, Prozesse, Rechte und Dienste. Angefangen hat es bei mir mit IRIX- und SunOS-Workstations.',
      en: 'Unix-like operating systems that run almost every web server: command line, processes, permissions and services. For me it started with IRIX and SunOS workstations.',
    },
  },

  microfrontends: {
    name: 'Microfrontends',
    category: 'architecture',
    description: {
      de: 'Ein großes Frontend, aufgeteilt in Teile, die verschiedene Teams unabhängig voneinander entwickeln und ausliefern – wie Microservices, nur im Browser.',
      en: 'One big frontend split into parts that different teams build and ship independently – like microservices, but in the browser.',
    },
  },

  mysql: {
    name: 'MySQL',
    category: 'architecture',
    description: {
      de: 'Verbreitete relationale Open-Source-Datenbank, lange das M im LAMP-Stack.',
      en: 'Popular open source relational database, long the M in the LAMP stack.',
    },
  },

  networking: {
    name: 'Networking',
    category: 'architecture',
    description: {
      de: 'Die Grundlagen darunter: DNS, TCP/IP, HTTP, Ports, Firewalls und Proxies. Hilft enorm, wenn eine Anfrage mal nicht ankommt.',
      en: 'The basics underneath: DNS, TCP/IP, HTTP, ports, firewalls and proxies. A big help when a request doesn’t arrive.',
    },
  },

  rest: {
    name: 'REST',
    category: 'architecture',
    description: {
      de: 'Architekturstil für Web-APIs: Ressourcen hinter URLs, bearbeitet mit HTTP-Methoden wie GET, POST und DELETE.',
      en: 'Architectural style for web APIs: resources behind URLs, handled with HTTP methods like GET, POST and DELETE.',
    },
  },

  seo: {
    name: 'SEO',
    category: 'architecture',
    description: {
      de: 'Suchmaschinenoptimierung: alles, was eine Website für Suchmaschinen verständlich macht, damit sie leichter gefunden wird.',
      en: 'Search engine optimization: making a website easy for search engines to understand and rank, so people can find it.',
    },
  },

  webapps: {
    name: 'Web Applications',
    category: 'architecture',
    description: {
      de: 'Anwendungen, die im Browser laufen und sich wie Desktop-Software anfühlen: mit Zustand, Routing und Live-Updates.',
      en: 'Applications that run in the browser and feel like desktop software: with state, routing and live updates.',
    },
  },

  webservices: {
    name: 'Web Services & APIs',
    category: 'architecture',
    description: {
      de: 'Schnittstellen, über die Systeme Daten austauschen: anfangs SOAP und XML, später abgelöst durch REST und JSON. Entwerfen, anbinden, dokumentieren.',
      en: 'Interfaces that systems use to exchange data: SOAP and XML at first, later replaced by REST and JSON. Designing, integrating, documenting.',
    },
  },

  webserver: {
    name: 'Webserver & Hosting',
    category: 'architecture',
    description: {
      de: 'Websites auf den Server bringen: Apache und Nginx einrichten, Domains, DNS und TLS-Zertifikate, dazu Mailserver.',
      en: 'Getting websites onto servers: setting up Apache and Nginx, domains, DNS and TLS certificates, plus mail servers.',
    },
  },

  websockets: {
    name: 'WebSockets',
    category: 'architecture',
    description: {
      de: 'Dauerhafte Verbindung zwischen Browser und Server, über die beide Seiten jederzeit Nachrichten schicken können – Live-Daten ohne ständiges Nachfragen.',
      en: 'A persistent connection between browser and server where both sides can send messages at any time – live data without constant polling.',
    },
  },

  // ── end Architecture & platform ──

  // ── Workflow & quality ──

  ci: {
    name: 'CI/CD',
    category: 'tooling',
    featured: true,
    description: {
      de: 'Continuous Integration und Delivery: Jede Änderung wird automatisch gebaut, getestet und ausgeliefert. Fehler fallen früh auf, Releases werden Routine.',
      en: 'Continuous integration and delivery: every change is built, tested and shipped automatically. Bugs show up early and releases become routine.',
    },
  },

  github: {
    name: 'GitHub',
    category: 'tooling',
    featured: true,
    description: {
      de: 'Plattform für Git-Repositories mit Pull Requests, Code Review, Issues und Actions für CI/CD. Zuhause fast jedes Open-Source-Projekts.',
      en: 'Platform for Git repositories with pull requests, code review, issues and Actions for CI/CD. Home of almost every open source project.',
    },
  },

  gitlab: {
    name: 'GitLab',
    category: 'tooling',
    description: {
      de: 'Git-Plattform, die sich auch selbst hosten lässt, mit eingebauten CI/CD-Pipelines, Issues und Container-Registry.',
      en: 'Git platform you can also host yourself, with built-in CI/CD pipelines, issues and a container registry.',
    },
  },

  legacyBrowsers: {
    name: 'Legacy Browsers',
    category: 'tooling',
    retired: { kind: 'discontinued', successor: 'responsiveDesign' },
    description: {
      de: 'Websites, die auch in alten Browsern wie dem Internet Explorer laufen – mit Polyfills, Fallbacks und viel Geduld.',
      en: 'Websites that still work in old browsers like Internet Explorer – with polyfills, fallbacks and a lot of patience.',
    },
  },

  linting: {
    name: 'Linting & Formatting',
    category: 'tooling',
    description: {
      de: 'Automatische Prüfung und Formatierung von Code (z.B. jshint, ESLint, oxlint, Prettier, oxfmt) – Fehler und Stilfragen fallen auf, bevor jemand sie im Review suchen muss.',
      en: 'Automated code checks and formatting (e.g. jshint, ESLint, oxlint, Prettier, oxfmt) – mistakes and style issues show up before anyone has to look for them in review.',
    },
  },

  macos: {
    name: 'macOS',
    category: 'tooling',
    description: {
      de: 'Apples Betriebssystem, unter der Haube ein Unix. Terminal und Entwickler-Tools fühlen sich deshalb ähnlich an wie auf dem Server.',
      en: 'Apple’s operating system, a Unix under the hood. So the terminal and dev tools feel much like they do on a server.',
    },
  },

  npm: {
    name: 'npm',
    category: 'tooling',
    description: {
      de: 'Paketmanager und Registry von Node.js: installiert Abhängigkeiten und führt die Skripte aus der package.json aus.',
      en: 'The Node.js package manager and registry: installs dependencies and runs the scripts in package.json.',
    },
    featured: true,
  },

  opensource: {
    name: 'Open Source',
    category: 'tooling',
    featured: true,
    description: {
      de: 'Ab und zu kann ich im Job direkt zu Open-Source-Projekten beitragen: mit Bug-Reports, Pull Requests oder eigenen Paketen.',
      en: 'Now and then my work lets me contribute to open source directly: bug reports, pull requests or packages of my own.',
    },
  },

  performance: {
    name: 'Performance Optimization',
    category: 'tooling',
    description: {
      de: 'Seiten schneller machen: Ladezeit, Bundle-Größe, Rendering und Core Web Vitals messen und verbessern – und herausfinden, warum etwas hakt.',
      en: 'Making pages faster: measuring and improving load time, bundle size, rendering and Core Web Vitals – and finding out why something stutters.',
    },
  },

  playwright: {
    name: 'Playwright',
    category: 'tooling',
    featured: true,
    description: {
      de: 'End-to-End-Tests von Microsoft: steuert Chromium, Firefox und WebKit und klickt sich wie echte Nutzer durch die Anwendung.',
      en: 'End-to-end testing from Microsoft: drives Chromium, Firefox and WebKit and clicks through the app like a real user.',
    },
  },

  pnpm: {
    name: 'pnpm',
    category: 'tooling',
    description: {
      de: 'Schneller Paketmanager für Node.js, der jedes Paket nur einmal auf der Platte speichert. Stark bei Monorepos.',
      en: 'Fast Node.js package manager that stores each package only once on disk. Great with monorepos.',
    },
  },

  postcss: {
    name: 'PostCSS',
    category: 'tooling',
    description: {
      de: 'Werkzeug, das CSS mit JavaScript-Plugins umbaut: Vendor-Präfixe ergänzen, moderne Syntax für ältere Browser übersetzen, minifizieren.',
      en: 'Tool that transforms CSS with JavaScript plugins: adding vendor prefixes, compiling modern syntax for older browsers, minifying.',
    },
  },

  testing: {
    name: 'Unit & Integration Testing',
    category: 'tooling',
    description: {
      de: 'Unit- und Integrationstests (z.B. Karma, Jasmine, Jest, Vitest, node:assert, Testing Library), die Logik und Komponenten absichern und Refactorings ohne Angst möglich machen.',
      en: 'Unit and integration tests (e.g. Karma, Jasmine, Jest, Vitest, node:assert, Testing Library) that cover logic and components and make refactoring safe.',
    },
  },

  visres: {
    name: 'Visual Regression Testing',
    category: 'tooling',
    description: {
      de: 'Automatische Screenshot-Vergleiche zwischen zwei Versionen: Ein verrutschter Abstand oder eine falsche Farbe fällt auf, bevor sie live geht.',
      en: 'Automated screenshot comparisons between two versions: a shifted margin or a wrong color shows up before it goes live.',
    },
  },

  vsCode: {
    name: 'VSCode',
    category: 'tooling',
    featured: true,
    description: {
      de: 'Visual Studio Code, der Code-Editor von Microsoft, gebaut auf Electron. Schnell, mit riesigem Erweiterungs-Ökosystem und sehr gutem TypeScript-Support.',
      en: 'Visual Studio Code, Microsoft’s code editor, built on Electron. Fast, with a huge extension ecosystem and great TypeScript support.',
    },
  },

  sublime: {
    name: 'Sublime',
    category: 'tooling',
    retired: {
      kind: 'movedOn',
      successor: 'vsCode',
    },
    description: {
      de: 'Sublime Text: schneller, schlanker Code-Editor, bekannt für Multi-Cursor und die Befehlspalette.',
      en: 'Sublime Text: fast, lean code editor known for multiple cursors and its command palette.',
    },
  },

  atom: {
    name: 'Atom',
    category: 'tooling',
    retired: {
      kind: 'discontinued',
      successor: 'vsCode',
    },
    description: {
      de: 'Der „hackbare“ Editor von GitHub, komplett mit Webtechnologien gebaut. Aus ihm ist Electron entstanden, auf dem heute VS Code läuft.',
      en: 'GitHub’s “hackable” editor, built entirely with web technologies. Electron came out of it, and VS Code runs on Electron today.',
    },
  },

  dreamweaver: {
    name: 'Dreamweaver',
    category: 'tooling',
    retired: {
      kind: 'movedOn',
      successor: 'vsCode',
    },
    description: {
      de: 'Web-Editor von Macromedia, später Adobe, mit Code- und WYSIWYG-Ansicht nebeneinander. Für viele der Einstieg ins Webdesign.',
      en: 'Web editor from Macromedia, later Adobe, with code and WYSIWYG views side by side. Where many people got started with web design.',
    },
  },

  netbeans: {
    name: 'Netbeans',
    category: 'tooling',
    retired: {
      kind: 'movedOn',
      successor: 'vsCode',
    },
    description: {
      de: 'Open-Source-IDE, ursprünglich für Java und heute bei Apache. Hatte auch einen ordentlichen PHP-Support.',
      en: 'Open source IDE, originally for Java and now at Apache. Had solid PHP support too.',
    },
  },

  // ── end Workflow & quality ──

  // ── AI & agentic ──

  agents: {
    name: 'Agentic Workflows',
    category: 'ai',
    featured: true,
    description: {
      de: 'KI-Agenten, die Aufgaben über mehrere Schritte selbst erledigen: Code lesen, Befehle ausführen, Ergebnisse prüfen. Dazu gehören Abläufe, Regeln und Leitplanken, die festlegen, was sie dürfen.',
      en: 'AI agents that handle multi-step tasks on their own: reading code, running commands, checking results. Plus the workflows, rules and guardrails that decide what they’re allowed to do.',
    },
  },

  claude: {
    name: 'Claude',
    category: 'ai',
    featured: true,
    description: {
      de: 'KI-Modell von Anthropic. Mit Claude Code arbeitet es direkt im Projekt: liest Code, ändert Dateien und führt Befehle aus.',
      en: 'AI model from Anthropic. With Claude Code it works right inside a project: reading code, editing files and running commands.',
    },
  },

  cursor: {
    name: 'Cursor',
    category: 'ai',
    description: {
      de: 'Code-Editor auf Basis von VS Code mit eingebauter KI: Autovervollständigung, Chat und ein Agent-Modus.',
      en: 'Code editor based on VS Code with AI built in: autocomplete, chat and an agent mode.',
    },
  },

  figmaMCP: {
    name: 'Figma MCP',
    category: 'ai',
    featured: true,
    description: {
      de: 'MCP-Server von Figma, über den KI-Assistenten Designs, Komponenten und Variablen direkt lesen. So wird aus einem Design Code, der zum Design System passt.',
      en: 'Figma’s MCP server, which lets AI assistants read designs, components and variables directly. Turns a design into code that fits the design system.',
    },
  },

  githubCopilot: {
    name: 'GitHub Copilot',
    category: 'ai',
    featured: true,
    description: {
      de: 'KI-Assistent von GitHub im Editor: schlägt beim Tippen Code vor, beantwortet Fragen im Chat und erledigt im Agent-Modus ganze Aufgaben.',
      en: 'GitHub’s AI assistant in the editor: suggests code as you type, answers questions in chat and handles whole tasks in agent mode.',
    },
  },

  knowledgeArch: {
    name: 'Knowledge Architecture',
    category: 'ai',
    description: {
      de: 'Rohdaten in Wissensschichten überführen – von Quellen über kuratierte Fakten bis zu Zusammenfassungen, mit denen KI-Agenten zuverlässig arbeiten können. Dazu gehört ein gemeinsames Vokabular, damit Begriffe überall dasselbe bedeuten.',
      en: 'Turning raw data into knowledge layers – from sources to curated facts to summaries that AI agents can reliably work with. Including a shared vocabulary, so terms mean the same thing everywhere.',
    },
  },

  mcp: {
    name: 'MCP',
    category: 'ai',
    featured: true,
    description: {
      de: 'Model Context Protocol: offener Standard, über den KI-Assistenten Tools und Datenquellen anbinden – eine Art USB-Anschluss für KI.',
      en: 'Model Context Protocol: open standard for connecting AI assistants to tools and data sources – a kind of USB port for AI.',
    },
  },

  // ── end AI & agentic ──

  // ── Architecture & collaboration ──
  // Practices and responsibilities rather than technologies. Kept together here, but shown in
  // the existing categories on the page (its `category`), so the grid stays at six groups.

  i18n: {
    name: 'i18n',
    category: 'architecture',
    description: {
      de: 'Kurz für Internationalisierung: Oberflächen, die mehrere Sprachen, Datums- und Zahlenformate können, ohne dass Texte im Code festgenagelt sind.',
      en: 'Short for internationalization: interfaces that handle several languages, date and number formats, without text hard-coded in the components.',
    },
  },

  migration: {
    name: 'Modernization & Migration',
    category: 'architecture',
    description: {
      de: 'Bestehende Anwendungen Schritt für Schritt auf neue Technik bringen, ohne den laufenden Betrieb anzuhalten – etwa von Shoelace zu Web Awesome.',
      en: 'Moving existing applications to new tech step by step, without stopping what’s running – say from Shoelace to Web Awesome.',
    },
  },

  monorepos: {
    name: 'Monorepos',
    category: 'architecture',
    description: {
      de: 'Viele zusammengehörige Pakete in einem Repository, etwa Komponenten, Tokens und Framework-Wrapper eines Design Systems – mit gemeinsamen Tools und abgestimmten Releases.',
      en: 'Many related packages in one repository, like a design system’s components, tokens and framework wrappers – with shared tooling and coordinated releases.',
    },
  },

  projectPlanning: {
    name: 'Project Planning & Estimation',
    category: 'architecture',
    description: {
      de: 'Projekte in machbare Schritte zerlegen, Aufwände schätzen und Angebote kalkulieren – und den Plan anpassen, wenn die Realität dazwischenkommt.',
      en: 'Breaking projects into doable steps, estimating effort and pricing quotes – and adjusting the plan when reality gets in the way.',
    },
  },

  riskAnalysis: {
    name: 'Risk Analysis',
    category: 'architecture',
    description: {
      de: 'Vor dem Bauen fragen, was schiefgehen kann: technische Risiken, Abhängigkeiten und offene Fragen früh sichtbar machen, solange Änderungen noch günstig sind.',
      en: 'Asking what could go wrong before building: making technical risks, dependencies and open questions visible early, while changes are still cheap.',
    },
  },

  stakeholders: {
    name: 'Stakeholder Alignment',
    category: 'architecture',
    description: {
      de: 'Produkt, Design, Entwicklung und Fachbereiche an einen Tisch bringen: Anforderungen klären, Kompromisse aushandeln und Entscheidungen so erklären, dass alle mitgehen.',
      en: 'Getting product, design, engineering and business on the same page: clarifying requirements, negotiating trade-offs and explaining decisions so everyone is on board.',
    },
  },

  teamLead: {
    name: 'Team Lead & Coaching',
    category: 'architecture',
    description: {
      de: 'Ein Team aufbauen und führen: Aufgaben verteilen, Prioritäten setzen und Leute fördern – von Azubis bis zu erfahrenen Entwicklern.',
      en: 'Building and leading a team: handing out work, setting priorities and helping people grow – from apprentices to experienced developers.',
    },
  },

  techLeadership: {
    name: 'Technical Leadership',
    category: 'architecture',
    description: {
      de: 'Technische Richtung vorgeben und Verantwortung dafür übernehmen: Architekturentscheidungen treffen, Standards setzen und dem Team den Rücken freihalten.',
      en: 'Setting the technical direction and owning it: making architecture decisions, setting standards and clearing the way for the team.',
    },
    featured: true,
  },

  agile: {
    name: 'Agile / Scrum',
    category: 'tooling',
    description: {
      de: 'In kurzen Iterationen arbeiten: Sprints, Planning, Dailies und Retros – liefern, Feedback holen, nachjustieren.',
      en: 'Working in short iterations: sprints, planning, dailies and retros – ship, get feedback, adjust.',
    },
  },

  buildTools: {
    name: 'Build Tools',
    category: 'tooling',
    description: {
      de: 'Alles rund um den Build: bündeln, transpilieren, minifizieren, Projekte aufsetzen. Von Grunt, Gulp, Bower und Yeoman über Babel und webpack bis Rollup, Vite und esbuild.',
      en: 'Everything around the build: bundling, transpiling, minifying, scaffolding projects. From Grunt, Gulp, Bower and Yeoman via Babel and webpack to Rollup, Vite and esbuild.',
    },
  },

  codeReview: {
    name: 'Mentoring & Code Review',
    category: 'tooling',
    description: {
      de: 'Code anderer lesen und konstruktives Feedback geben, Wissen im Team verteilen und Leute beim Einstieg begleiten.',
      en: 'Reading other people’s code and giving constructive feedback, spreading knowledge across the team and helping people get started.',
    },
  },

  docsAsCode: {
    name: 'Docs as Code',
    category: 'tooling',
    description: {
      de: 'Dokumentation, die im Repository neben dem Code lebt: in Markdown geschrieben, im Review geprüft und automatisch gebaut und veröffentlicht.',
      en: 'Documentation that lives in the repository next to the code: written in Markdown, checked in review, built and published automatically.',
    },
  },

  publishing: {
    name: 'Library Publishing & SemVer',
    category: 'tooling',
    description: {
      de: 'Bibliotheken als npm-Pakete veröffentlichen: Semantic Versioning, Changelogs und Breaking Changes. Mit semantic-release entstehen Version und Changelog automatisch aus den Commit-Messages.',
      en: 'Publishing libraries as npm packages: semantic versioning, changelogs and breaking changes. With semantic-release, the version and changelog come straight from the commit messages.',
    },
  },

  support: {
    name: 'Customer Support',
    category: 'tooling',
    description: {
      de: 'First- und Second-Level-Support: Probleme von Kunden verstehen, nachstellen und lösen – oder an die richtige Stelle weitergeben.',
      en: 'First- and second-level support: understanding customer problems, reproducing and fixing them – or passing them on to the right person.',
    },
  },

  talks: {
    name: 'Workshops & Talks',
    category: 'tooling',
    description: {
      de: 'Wissen weitergeben: Schulungen, interne Workshops und Vorträge, etwa über Design Systems.',
      en: 'Passing knowledge on: trainings, internal workshops and talks, for example on design systems.',
    },
  },

  techWriting: {
    name: 'Technical Writing',
    category: 'tooling',
    description: {
      de: 'Technische Inhalte so aufschreiben, dass andere damit arbeiten können: Doku, Anleitungen, Changelogs und Blogposts wie die hier.',
      en: 'Writing technical content that other people can actually work with: docs, guides, changelogs and blog posts like the ones here.',
    },
  },

  // ── end Architecture & collaboration ──
} as const satisfies Record<string, Skill>;

export type SkillId = keyof typeof skills;
