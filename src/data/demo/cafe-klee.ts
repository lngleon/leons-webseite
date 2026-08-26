import type { GastroBusiness } from './types'

/**
 * Demo-Betrieb „Café Klee" – KOMPLETT ERFUNDEN.
 *
 * Kein realer Betrieb, keine realen Personen. Straße frei erfunden;
 * Telefonnummer aus dem Berliner Block `030 23125 xxx`, der für Film/Fernsehen
 * reserviert ist und nie an echte Anschlüsse vergeben wird; E-Mail auf der
 * reservierten Test-Domain `.example`, die per Definition nicht auflöst.
 * Vor einem echten Einsatz: Name, Adresse, Nummer und Mail ersetzen.
 *
 * Diese Datei ist die EINZIGE Inhaltsquelle der Seite `/demo/cafe`.
 * Ein zweiter Betrieb = eine Kopie dieser Datei mit anderen Werten + eine
 * zweite `page.tsx`, die sie hineinreicht. An den Komponenten ändert sich nichts.
 */
export const cafeKlee: GastroBusiness = {
  slug: 'cafe',
  name: 'Café Klee',
  displayName: 'Klee',
  kind: 'Café & Backstube',
  tagline: 'Guter Kaffee, warmes Brot, ein ruhiger Tisch.',
  intro:
    'Wir backen jeden Morgen selbst und rösten unseren Kaffee eine Straße weiter. Kein Schnickschnack – nur Dinge, die wir selbst gern essen.',

  hero: {
    photo: {
      ratio: '4 / 5',
      alt: 'Blick in den Gastraum des Café Klee am Morgen',
      placeholderLabel: 'Gastraum',
    },
  },

  marquee: [
    'Täglich frisch gebacken',
    'Hausröstung aus der Nachbarschaft',
    'Hafermilch ohne Aufpreis',
    'Sonntags Zimtschnecken',
  ],

  gallery: [
    { ratio: '1 / 1', alt: 'Zimtschnecken auf einem Blech', placeholderLabel: 'Backstube' },
    { ratio: '1 / 1', alt: 'Cappuccino auf dem Tresen', placeholderLabel: 'Tresen' },
    { ratio: '3 / 2', alt: 'Tisch am Fenster mit Morgensonne', placeholderLabel: 'Fensterplatz' },
  ],

  menu: {
    title: 'Karte',
    note: 'Alle Preise in Euro, inklusive Mehrwertsteuer.',
    allergenNote:
      'Die Buchstaben hinter den Gerichten stehen für kennzeichnungspflichtige Allergene. Frag uns gern – wir wissen, was drin ist.',
    categories: [
      {
        id: 'kaffee',
        title: 'Kaffee',
        note: 'Hausröstung, auch als Hafer- oder Sojavariante',
        items: [
          { name: 'Filterkaffee', price: 3.2 },
          { name: 'Espresso', price: 2.4 },
          { name: 'Cappuccino', price: 3.6, allergens: ['G'] },
          { name: 'Flat White', price: 4.1, allergens: ['G'] },
          { name: 'Milchkaffee', price: 4.2, allergens: ['G'] },
          { name: 'Chai Latte', description: 'selbst angesetzt, nicht zu süß', price: 4.0, allergens: ['G'] },
        ],
      },
      {
        id: 'fruehstueck',
        title: 'Frühstück',
        note: 'bis 14 Uhr',
        items: [
          { name: 'Butterbrot mit Marmelade', description: 'Sauerteig, Hofbutter', price: 4.5, allergens: ['A', 'G'] },
          { name: 'Rührei auf Sauerteig', description: 'mit Schnittlauch', price: 8.9, allergens: ['A', 'C', 'G'] },
          { name: 'Granola mit Joghurt', description: 'Haselnuss, Apfel, Honig', price: 7.2, allergens: ['A', 'G', 'H'] },
          { name: 'Klee-Frühstück für zwei', description: 'Brot, Aufstriche, Ei, Obst, zwei Kaffee', price: 22.0, allergens: ['A', 'C', 'G', 'H'] },
        ],
      },
      {
        id: 'backstube',
        title: 'Aus der Backstube',
        items: [
          { name: 'Zimtschnecke', price: 3.8, allergens: ['A', 'C', 'G'] },
          { name: 'Butterhörnchen', price: 2.6, allergens: ['A', 'G'] },
          { name: 'Käsekuchen', price: 4.4, allergens: ['A', 'C', 'G'] },
          { name: 'Pflaumenschnitte', description: 'nur im Herbst', price: 4.2, allergens: ['A', 'G'] },
        ],
      },
      {
        id: 'kalt',
        title: 'Kalte Getränke',
        items: [
          { name: 'Hausgemachte Limonade', description: 'Zitrone & Rosmarin', price: 3.9 },
          { name: 'Apfelschorle', price: 3.2 },
          { name: 'Eiskaffee', price: 4.6, allergens: ['G'] },
        ],
      },
    ],
  },

  allergens: [
    { code: 'A', label: 'Glutenhaltiges Getreide' },
    { code: 'C', label: 'Eier' },
    { code: 'G', label: 'Milch und Laktose' },
    { code: 'H', label: 'Schalenfrüchte (Nüsse)' },
  ],

  hours: {
    title: 'Öffnungszeiten',
    note: 'An Feiertagen ändern sich die Zeiten – wir hängen es rechtzeitig aus.',
    entries: [
      { label: 'Dienstag – Freitag', days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '18:00' },
      { label: 'Samstag', days: ['Saturday'], opens: '08:30', closes: '18:00' },
      { label: 'Sonntag', days: ['Sunday'], opens: '09:00', closes: '16:00' },
      { label: 'Montag', days: ['Monday'], closed: true },
    ],
  },

  location: {
    title: 'So findest du uns',
    street: 'Feldsteinweg 4',
    postalCode: '10437',
    city: 'Berlin',
    country: 'DE',
    countryName: 'Deutschland',
    note: 'Zweiter Hinterhof, ebenerdig. Kinderwagen und Rollstuhl kommen ohne Stufe herein.',
    directionsLabel: 'Route öffnen',
  },

  contact: {
    title: 'Tisch anfragen',
    phone: { display: '030 23125 470', e164: '+493023125470' },
    email: 'hallo@cafe-klee.example',
    reservation: {
      label: 'Anfrage schreiben',
      note: 'Ab sechs Personen reservieren wir gern fest. Für kleinere Runden halten wir immer ein paar Tische frei.',
      subject: 'Tischanfrage',
      body: 'Hallo Café Klee,\n\nich würde gern einen Tisch anfragen.\n\nDatum:\nUhrzeit:\nPersonen:\nName:\n\nViele Grüße',
    },
  },

  legal: {
    title: 'Impressum',
    lines: [
      'Café Klee (Musterbetrieb)',
      'Feldsteinweg 4, 10437 Berlin',
      'Vertreten durch: Vorname Nachname',
      'Telefon: 030 23125 470',
      'E-Mail: hallo@cafe-klee.example',
      'Umsatzsteuer-ID: DE000000000',
    ],
    note: 'Platzhalter – dieser Betrieb ist frei erfunden. Für eine echte Seite kommen hier die Angaben nach § 5 DDG hin.',
  },

  seo: {
    priceRange: '€',
    servesCuisine: ['Kaffee', 'Frühstück', 'Kuchen'],
  },
}
