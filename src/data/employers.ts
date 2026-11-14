import type { Employer } from './types';
import type { SkillId } from './skills';

/**
 * Career entries. Order in this file doesn't matter — they're sorted by
 * start date (newest first) automatically.
 *
 * Promoted? Add another entry to `positions` (see SICK / Hella Gutmann).
 * No brand colors? Leave out `colors` and the section stays Vintera.
 * Logos live in /public/logos/. `logo` is the full (wide) logo for the career
 * page, `logoMark` a square-ish crop for small tiles.
 *
 * Content drafted from LinkedIn — TODO(chris): review wording.
 */
export const employers: Employer<SkillId>[] = [
  {
    id: 'sick',
    name: 'SICK',
    url: 'https://www.sick.com',
    logo: '/logos/sick.svg',
    logoMark: '/logos/sick-mark.svg',
    location: 'Freiburg im Breisgau · Hybrid',
    colors: { primary: '#0059FF' },
    positions: [
      {
        role: {
          de: 'Senior Architect – Expert Webtechnologies',
          en: 'Senior Architect – Expert Web Technologies',
        },
        start: '2021-09',
        end: '2023-08',
        summary: {
          de: 'Planung, Risikoanalyse, Architektur und Umsetzung von Frontend-Anwendungen, Microfrontends und Libraries.',
          en: 'Planning, risk analysis, architecture and implementation of frontend applications, microfrontends and libraries.',
        },
      },
      {
        role: { de: 'Frontend Architect', en: 'Frontend Architect' },
        start: '2023-08',
        summary: {
          de: 'Verantwortlich für Synergy, das Open-Source Design System von SICK.',
          en: 'Responsible for Synergy, SICK’s open source design system.',
        },
      },
    ],
    tagline: {
      de: 'Synergy – das Open-Source Design System von SICK.',
      en: 'Synergy – SICK’s open source design system.',
    },
    about: {
      de: [
        'SICK ist einer der weltweit führenden Hersteller von Sensorlösungen für industrielle Anwendungen.',
        'Als Frontend Architect verantworte ich Synergy, das Open-Source Design System von SICK, mit dem Teams im ganzen Unternehmen konsistente Oberflächen bauen.',
      ],
      en: [
        'SICK is one of the world’s leading manufacturers of sensor solutions for industrial applications.',
        'As Frontend Architect I’m responsible for Synergy, SICK’s open source design system, which teams across the company use to build consistent interfaces.',
      ],
    },
    contributions: {
      de: [
        'Verantwortung für Synergy, SICKs Open-Source Design System auf Basis von Web Components.',
        'Planung, Risikoanalyse und Architektur von Frontend-Anwendungen, Microfrontends und Libraries.',
        'Umsetzung und Begleitung von Frontend-Projekten von der Konzeption bis zur Auslieferung.',
      ],
      en: [
        'Owning Synergy, SICK’s open source design system built on Web Components.',
        'Planning, risk analysis and architecture of frontend applications, microfrontends and libraries.',
        'Implementing and guiding frontend projects from concept to delivery.',
      ],
    },
    links: [
      {
        label: 'Synergy Design System',
        url: 'https://github.com/synergy-design-system/synergy-design-system',
      },
    ],
    stack: [
      'designsystems',
      'frontendarch',
      'lit',
      'webcomponents',
      'designtokens',
      'typescript',
      'javascript',
      'html',
      'css',
      'sass',
      'react',
      'redux',
      'vue',
      'microfrontends',
      'node',
      'webdesign',
      'linux',
      'shell',
    ],
  },
  {
    id: 'hella-gutmann',
    name: 'Hella Gutmann Solutions',
    url: 'https://www.hella-gutmann.com',
    logo: '/logos/hella-gutmann.svg',
    logoMark: '/logos/hella-gutmann-mark.svg',
    logoBackground: '#004521',
    location: 'Ihringen',
    colors: { primary: '#004521' },
    positions: [
      {
        role: { de: 'Fullstack Developer', en: 'Fullstack Developer' },
        start: '2014-02',
        end: '2014-11',
        summary: {
          de: 'Fullstack-Webentwicklung mit Schwerpunkt Frontend.',
          en: 'Fullstack web development with a focus on frontend.',
        },
      },
      {
        role: { de: 'Software-Architekt – Web', en: 'Software Architect – Web' },
        start: '2014-12',
        end: '2021-09',
        summary: {
          de: 'Architektur, Core-Entwicklung, Performance-Optimierung und technische Teamleitung für webbasierte UIs auf Embedded-Geräten.',
          en: 'Architecture, core development, performance optimization and technical team lead for web-based UIs on embedded devices.',
        },
      },
    ],
    tagline: {
      de: 'Web-Oberflächen für Embedded-Diagnosegeräte.',
      en: 'Web UIs for embedded diagnostic devices.',
    },
    about: {
      de: [
        'Hella Gutmann Solutions entwickelt Diagnosetechnik für Kfz-Werkstätten.',
        'Dort habe ich die webbasierten Benutzeroberflächen der Embedded-Software-Geräte verantwortet – zunächst als Fullstack Developer, ab Ende 2014 als Software-Architekt.',
      ],
      en: [
        'Hella Gutmann Solutions builds diagnostic equipment for automotive workshops.',
        'I was responsible for the web-based user interfaces of their embedded software devices – first as a fullstack developer, from late 2014 as software architect.',
      ],
    },
    contributions: {
      de: [
        'Architektur und Core-Entwicklung der Web-UIs für Embedded-Software-Geräte.',
        'Performance-Optimierung der Oberflächen.',
        'Technische Leitung des Web-Teams.',
      ],
      en: [
        'Architecture and core development of the web UIs for embedded software devices.',
        'Performance optimization of the interfaces.',
        'Technical lead of the web team.',
      ],
    },
    stack: [
      'frontendarch',
      'embeddedui',
      'javascript',
      'react',
      'node',
      'html',
      'css',
      'sass',
      'less',
      'webapps',
      'webservices',
      'webdesign',
      'sql',
      'mysql',
      'linux',
      'shell',
    ],
  },
  {
    id: 'clicksports',
    name: 'CLICKSPORTS',
    url: 'https://www.clicksports.de',
    // Square mark only → square tile everywhere.
    logoMark: '/logos/clicksports.svg',
    location: 'Coburg',
    colors: { primary: '#C5E02D' },
    positions: [
      { role: { de: 'Senior Web Developer', en: 'Senior Web Developer' }, start: '2006-09', end: '2014-02' },
    ],
    tagline: {
      de: 'CMS, E-Commerce und Web-Applikationen – von der Konzeption bis zum Betrieb.',
      en: 'CMS, e-commerce and web applications – from concept to operations.',
    },
    about: {
      de: [
        'Konzeption und Realisierung von Webprojekten wie CMS-Systemen, E-Commerce-Plattformen und Web-Applikationen – inklusive Betrieb, Support und Projektplanung.',
      ],
      en: [
        'Designing and building web projects such as CMS systems, e-commerce platforms and web applications – including operations, support and project planning.',
      ],
    },
    contributions: {
      de: [
        'Konzeption und Realisierung von CMS-Systemen, E-Commerce-Plattformen und Web-Applikationen.',
        'Management der Server-Infrastruktur.',
        'First- und Second-Level-Support sowie Softwareschulungen.',
        'Projektplanung und Kalkulation.',
      ],
      en: [
        'Designed and built CMS systems, e-commerce platforms and web applications.',
        'Managed the server infrastructure.',
        'First- and second-level support and software training.',
        'Project planning and estimation.',
      ],
    },
    stack: [
      'html',
      'css',
      'javascript',
      'php',
      'cakephp',
      'sass',
      'less',
      'webdesign',
      'webapps',
      'webservices',
      'cms',
      'ecommerce',
      'sql',
      'mysql',
      'linux',
      'shell',
    ],
  },
  {
    id: 'weblogixx',
    name: 'Weblogixx',
    logoMark: '/logos/weblogixx.svg',
    logoBleed: true,
    location: 'Coburg',
    // That's me → Vintera.
    positions: [
      {
        role: { de: 'Webentwickler (selbstständig)', en: 'Web Developer (self-employed)' },
        start: '2005-09',
        end: '2006-08',
      },
    ],
    tagline: {
      de: 'Individuelle CMS- und E-Commerce-Lösungen für Kunden.',
      en: 'Custom CMS and e-commerce solutions for clients.',
    },
    about: {
      de: [
        'Umsetzung individueller webbasierter Kundenprojekte mit Schwerpunkt auf maßgeschneiderten CMS- und E-Commerce-Lösungen.',
      ],
      en: ['Building custom web projects for clients, focused on bespoke CMS and e-commerce solutions.'],
    },
    contributions: {
      de: [
        'Eigener E-Commerce-Stack und individuelle CMS-Lösungen mit PHP und MySQL.',
        'Semantisches HTML und Suchmaschinenoptimierung.',
        'Anbindung von Web-Services und APIs.',
        'Design mit Adobe Photoshop und Fireworks.',
      ],
      en: [
        'A custom e-commerce stack and bespoke CMS solutions built with PHP and MySQL.',
        'Semantic HTML and search engine optimization.',
        'Integrating web services and APIs.',
        'Design with Adobe Photoshop and Fireworks.',
      ],
    },
    stack: [
      'php',
      'mysql',
      'html',
      'css',
      'javascript',
      'cms',
      'ecommerce',
      'webservices',
      'seo',
      'semanticweb',
      'photoshop',
      'fireworks',
    ],
  },
  {
    id: 'hapo',
    name: 'H.A.PO – Handelsagentur POPP',
    logo: '/logos/hapo.jpg',
    location: 'Coburg',
    colors: { primary: '#70A8E0' },
    positions: [{ role: { de: 'Webentwickler', en: 'Web Developer' }, start: '2004-08', end: '2005-11' }],
    tagline: {
      de: 'Multi-Channel-E-Commerce und Netzwerkadministration.',
      en: 'Multi-channel e-commerce and network administration.',
    },
    about: {
      de: ['Administration der Netzwerkinfrastruktur und Webentwicklung im E-Commerce-Bereich.'],
      en: ['Network infrastructure administration and web development for e-commerce.'],
    },
    contributions: {
      de: [
        'Umsetzung einer Multi-Channel-E-Commerce-Lösung nach gängigen Web-Standards.',
        'Konzeption und Implementierung von E-Commerce-Seiten.',
        'Administration von Hosting und Datenbanken.',
        'Suchmaschinenoptimierung und Netzwerkadministration.',
      ],
      en: [
        'Built a multi-channel e-commerce solution following web standards.',
        'Designed and implemented e-commerce sites.',
        'Administered hosting and databases.',
        'Search engine optimization and network administration.',
      ],
    },
    stack: [
      'php',
      'mysql',
      'html',
      'css',
      'javascript',
      'ecommerce',
      'seo',
      'semanticweb',
      'webserver',
      'networking',
      'photoshop',
    ],
  },
  {
    id: 'schlaeger',
    name: 'Computersysteme R. Schläger',
    location: 'Coburg',
    // Typographic logo after the old employee badge; colors reconstructed from a photo of it
    // (sampled hues kept, saturation restored for the faded print).
    logo: '/logos/schlaeger.svg',
    colors: { primary: '#233C8C', accent: '#C0302A' },
    positions: [
      {
        role: {
          de: 'Ausbildung zum Fachinformatiker – Systemintegration',
          en: 'Apprenticeship: IT Specialist – System Integration',
        },
        start: '1999-09',
        end: '2003-05',
      },
    ],
    tagline: {
      de: 'Die Ausbildung – Netzwerke, Server und Shell.',
      en: 'The apprenticeship – networks, servers and shell.',
    },
    about: {
      de: [
        'Ausbildung zum Fachinformatiker mit Fachrichtung Systemintegration – das technische Fundament für alles danach.',
      ],
      en: [
        'Apprenticeship as an IT specialist for system integration (Fachinformatiker) – the technical foundation for everything that followed.',
      ],
    },
    contributions: {
      de: [
        'Netzwerktechnik: Windows NT/2000, Linux, Novell, Routing und Firewalls.',
        'Linux-/Unix-Server: DHCP, Proxy, Webserver, Datenbanken, SMB.',
        'Shell-Scripting.',
      ],
      en: [
        'Networking: Windows NT/2000, Linux, Novell, routing and firewalls.',
        'Linux/Unix servers: DHCP, proxy, web servers, databases, SMB.',
        'Shell scripting.',
      ],
    },
    stack: ['networking', 'linux', 'webserver', 'shell'],
  },
];
