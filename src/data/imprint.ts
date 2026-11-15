/**
 * Legal notice (Impressum) per § 5 DDG and § 18 Abs. 2 MStV.
 *
 * Values in [brackets] are placeholders: the production build fails while any are left
 * (see ImprintAddress.astro), so the site can't go live with an incomplete imprint.
 * Optional fields: leave them out (undefined) and their block disappears.
 */
export interface Imprint {
  name: string;
  /** Business name, if you trade under one (e.g. "weblogixx"). */
  business?: string;
  street: string;
  postalCode: string;
  city: string;
  email: string;
  /** § 5 DDG asks for a second quick way to reach you besides e-mail; a phone number is the usual one. */
  phone?: string;
  /** USt-IdNr. per § 27a UStG, if you have one. */
  vatId?: string;
}

import { profile } from './profile';

// TODO(chris): fill in the bracketed values.
export const imprint: Imprint = {
  name: 'Christian Schilling',
  business: 'weblogixx',
  street: 'Im Stegen 5',
  postalCode: '79241',
  city: 'Ihringen',
  // Same address as everywhere else on the site.
  email: profile.email,
  phone: '0171 / 830 47 62',
  vatId: undefined,
};

/**
 * The web host, named in the privacy policy (it processes visitors' IP addresses in its server
 * logs). Same placeholder rule as the imprint.
 */
export interface Hoster {
  /** Company name, e.g. "Example Hosting GmbH". */
  name: string;
  /** Postal address in one line, e.g. "Musterstraße 1, 12345 Musterstadt". */
  address: string;
  /** Link to the host's privacy policy. */
  privacyUrl: string;
}

// TODO(chris): fill in your web host (see your contract or the host's own imprint).
export const hoster: Hoster = {
  name: 'ALL-INKL.COM - Neue Medien Münnich',
  address: 'Hauptstraße 68, D-02742 Friedersdorf',
  privacyUrl: 'https://all-inkl.com/datenschutzinformationen',
};

const placeholders = (data: object, prefix = '') =>
  Object.entries(data)
    .filter(([, v]) => typeof v === 'string' && /^\[.*\]$/.test(v))
    .map(([k]) => prefix + k);

/** Placeholder values still in the imprint or hoster (empty when complete). */
export const imprintPlaceholders = () => [...placeholders(imprint), ...placeholders(hoster, 'hoster.')];

/** Throws in production builds while placeholders are left: never ship an incomplete legal notice. */
export function assertImprintComplete() {
  const missing = imprintPlaceholders();
  if (import.meta.env.PROD && missing.length) {
    throw new Error(`Imprint incomplete: fill in ${missing.join(', ')} in src/data/imprint.ts`);
  }
}

/** tel: link for a phone number as written ("0171 / 830 47 62" → "tel:01718304762"). */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;
