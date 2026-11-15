import type { L10n } from "./types";
import { profile } from "./profile";

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
    label: "E-Mail",
    handle: profile.email,
    url: `mailto:${profile.email}`,
    description: {
      de: "Der direkte Weg für Projekte, Fragen oder einfach ein Hallo.",
      en: "The direct way for projects, questions or just a hello.",
    },
  },
  {
    label: "GitHub (personal)",
    handle: "@weblogixx",
    url: "https://github.com/weblogixx",
    description: {
      de: "Code, Experimente, Open Source.",
      en: "Code, experiments, open source.",
    },
  },
  {
    label: "GitHub (SICK AG)",
    handle: "@schilchSICKAG",
    url: "https://github.com/schilchSICKAG",
    description: {
      de: "Company account für Synergy, SICKs Open Source Design System",
      en: "Company account for Synergy, SICKs Open Source Design System",
    },
  },
  {
    label: "LinkedIn",
    handle: "Christian Schilling",
    url: "https://www.linkedin.com/in/christian-schilling-b999a2b2/",
    description: {
      de: "Beruflicher Werdegang und Kontakt.",
      en: "Professional profile and contact.",
    },
  },
  {
    label: "Xing",
    handle: "Christian Schilling",
    url: "https://www.xing.com/profile/Christian_Schilling18",
    description: {
      de: "Beruflicher Werdegang und Kontakt.",
      en: "Professional profile and contact.",
    },
  },
];
