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

  nav: {
    start: 'Start',
    menu: 'Karte',
    contact: 'Kontakt',
    about: 'Über uns',
  },

  hero: {
    photo: {
      ratio: '4 / 5',
      src: '/demo/cafe-gastraum.webp',
      alt: 'Blick durch die offene Glastür in den Gastraum: Holztische entlang der Fensterfront, dahinter eine terrakottafarbene Wand',
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
    {
      ratio: '1 / 1',
      src: '/demo/cafe-zimtschnecken.webp',
      alt: 'Neun frisch gebackene Zimtschnecken von oben in einer dunklen Backform',
      placeholderLabel: 'Backstube',
    },
    {
      ratio: '1 / 1',
      src: '/demo/cafe-cappuccino.webp',
      alt: 'Cappuccino mit Kakaohaube in einer hellen Keramiktasse auf einem Holztisch',
      placeholderLabel: 'Tresen',
    },
    {
      ratio: '3 / 2',
      src: '/demo/cafe-fensterplatz.webp',
      alt: 'Tisch am Fenster in der Morgensonne, darauf eine Vase mit Trockenblumen und eine kleine Tasse',
      placeholderLabel: 'Fensterplatz',
    },
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
        // Steht wortgleich auch im „Über uns"-Block „Was im Becher landet".
        // Bewusst als Kategorie-`note` statt als zweiter Prosa-Absatz in einer
        // Komponente: so trägt die Karte die Aussage selbst (und schema.org
        // gibt sie als `MenuSection.description` mit aus).
        note: 'Was am Abend übrig ist, geht in der letzten Stunde zum halben Preis raus.',
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
    note: 'Ebenerdig direkt an der Straße, unter der hellen Markise – Kinderwagen und Rollstuhl kommen ohne Stufe herein. Bei gutem Wetter stehen ein paar Stühle draußen.',
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

  about: {
    title: 'Über uns',
    lead: 'Café Klee gibt es, weil in dieser Straße etwas gefehlt hat: ein Ort, an dem man eine Stunde sitzen kann, ohne etwas nachbestellen zu müssen.',
    blocks: [
      {
        id: 'ecke',
        title: 'Die Ecke',
        text: 'Angefangen hat es mit einem leeren Ladenlokal und drei Monaten Eigenleistung. Wände raus, Fenster auf, den alten Dielenboden abgeschliffen statt ersetzt. Vieles hier ist gebraucht gekauft und weiterbenutzt – die Stühle stammen aus einer aufgelösten Schulaula, die Theke ist aus dem Holz der alten Zwischendecke gebaut. Das war keine Design-Entscheidung, sondern eine Budget-Entscheidung. Geblieben ist es trotzdem.',
        photo: {
          ratio: '3 / 2',
          src: '/demo/cafe-aussenansicht.webp',
          alt: 'Strassenseite des Cafés: helle Markise über dem Fenster zum Tresen, davor zwei Holzstühle zwischen Olivenbäumen in Terrakottatöpfen',
          placeholderLabel: 'Aussenansicht',
        },
      },
      {
        id: 'becher',
        title: 'Was im Becher landet',
        text: 'Geröstet wird eine Straße weiter, zwei Sorten im Wechsel, dazu eine Filterkanne für alle, die es milder mögen. Die Mühle wird jeden Morgen neu eingestellt, weil sich Bohne, Luftfeuchtigkeit und Tagesform nun einmal ändern. Gebacken wird ab halb sechs in der Küche nebenan. Was am Abend übrig ist, geht in der letzten Stunde zum halben Preis raus.',
        photo: {
          ratio: '4 / 5',
          src: '/demo/cafe-handwerk.webp',
          alt: 'Hände setzen den Siebträger in die Espressomaschine ein, davor eine Keramiktasse auf der Holztheke',
          placeholderLabel: 'Handwerk',
        },
      },
      {
        id: 'team',
        title: 'Wer hier steht',
        text: 'Wir sind zu fünft, drei davon in Teilzeit. Alle wechseln zwischen Maschine, Service und Küche – deshalb kann jede und jeder am Tresen sagen, was heute im Kuchen ist. Wenn es voll wird, dauert es manchmal ein paar Minuten länger. Wir nehmen uns die Zeit lieber für den Espresso als für die Warteschlange.',
        photo: {
          ratio: '3 / 2',
          src: '/demo/cafe-team.webp',
          alt: 'Zwei Personen von hinten hinter der Theke, vor ihnen ein Holzbrett mit Gebäck, dahinter ein Regal mit Keramikgeschirr',
          placeholderLabel: 'Team',
        },
      },
    ],
    outro: {
      menuLabel: 'Zur Karte',
      contactLabel: 'Kontakt',
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

  privacy: {
    title: 'Datenschutz',
    note: 'Mustertext einer Demo-Seite. „Café Klee" ist ein erfundener Betrieb – es gibt keinen Verantwortlichen, an den sich eine Anfrage richten könnte. Der Text beschreibt, was diese Seite technisch tatsächlich tut, und ist ausdrücklich keine Rechtsberatung. Eine echte Seite braucht eine auf den Betrieb zugeschnittene Erklärung.',
    sections: [
      {
        id: 'nichts',
        title: 'Was diese Seite nicht tut',
        body: [
          'Diese Seite setzt keine Cookies und speichert nichts in deinem Browser. Es gibt keine Reichweitenmessung, keine Analyse-Software und kein Profiling – auch keine anonyme Statistik.',
          'Es gibt kein Formular. Es werden keine Daten erhoben, die über den reinen Abruf der Seite hinausgehen. Deshalb steht hier auch kein Cookie-Banner: Es gibt nichts, wozu du einwilligen müsstest.',
        ],
      },
      {
        id: 'fremde-server',
        title: 'Keine fremden Server',
        body: [
          'Alles, was die Seite braucht, liegt auf demselben Server wie die Seite selbst: Schriften, Bilder, Stile. Es werden keine Webfonts von einem fremden Dienst nachgeladen, keine Karte eingebettet, kein Video von einer Videoplattform. Dein Browser nimmt beim Aufruf also zu keinem dritten Anbieter Verbindung auf.',
          'Der Link zur Route ist ein gewöhnlicher Link auf einen Kartendienst. Erst wenn du ihn antippst, verlässt du diese Seite – und erst dann gelten die Bedingungen des Anbieters. Dasselbe gilt für die Telefonnummer und die E-Mail-Adresse: beide öffnen nur ein Programm auf deinem Gerät.',
        ],
      },
      {
        id: 'hosting',
        title: 'Hosting',
        body: [
          'Die Seite wird als fertiges HTML ausgeliefert und liegt bei Vercel Inc. Wie jeder Webserver verarbeitet der Hoster dabei die technisch notwendigen Verbindungsdaten – etwa IP-Adresse, Zeitpunkt und die abgerufene Datei. Ohne diese Angaben lässt sich eine Seite technisch nicht ausliefern.',
          'Bei einem echten Betrieb gehören an diese Stelle der Name des Hosters, der Zweck und die Rechtsgrundlage der Verarbeitung sowie die Speicherdauer – abgestimmt mit dem Anbieter.',
        ],
      },
      {
        id: 'rechte',
        title: 'Deine Rechte',
        body: [
          'Gegenüber einem Verantwortlichen bestehen nach der DSGVO unter anderem Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer Aufsichtsbehörde.',
          'Weil dieser Betrieb erfunden ist, gibt es hier niemanden, an den sich das richten könnte. Auf einer echten Seite stehen an dieser Stelle die Kontaktdaten des Verantwortlichen.',
        ],
      },
    ],
  },

  seo: {
    priceRange: '€',
    servesCuisine: ['Kaffee', 'Frühstück', 'Kuchen'],
  },
}
