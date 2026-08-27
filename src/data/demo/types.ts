/**
 * Typen für die stillen Gastro-Demoseiten unter `/demo/*`.
 *
 * Ein Betrieb = EINE Datendatei (z.B. `cafe-klee.ts`), die diesen Typ erfüllt.
 * Die Komponenten unter `src/components/demo/` lesen ausschliesslich aus diesem
 * Objekt – es gibt keinen hartkodierten Inhalt. Ein zweiter Betrieb entsteht
 * dadurch allein durch eine zweite Datei + eine zweite `page.tsx`, die sie
 * hineinreicht.
 */

/** Allergen-Kürzel, wie in deutschen Speisekarten üblich (A = Gluten usw.). */
export type Allergen = {
  code: string
  label: string
}

export type MenuItem = {
  name: string
  description?: string
  /**
   * Preis in Euro als ZAHL (3.8), nicht als String.
   * Grund: schema.org braucht den Preis numerisch, die Anzeige formatiert
   * daraus deterministisch „3,80 €" (kein `Intl` im Render – Hydration-Regel).
   */
  price: number
  /** Kürzel aus `GastroBusiness.allergens`. */
  allergens?: string[]
}

/**
 * Ein Abschnitt INNERHALB einer Karte.
 *
 * Beim Restaurant sind das die **Gänge** (Vorspeisen → Zwischengang →
 * Hauptgänge → Nachspeisen), bei der Weinkarte die Gruppen (offen, weiß, rot).
 *
 * Die REIHENFOLGE steckt im Array und sonst nirgends: kein `position`, kein
 * `order`, nichts sortiert um. Ein Array IST bereits eine Folge – ein zweites
 * Feld daneben wäre eine zweite Wahrheit, die auseinanderlaufen kann.
 *
 * Welche dieser Abschnitte „Gänge" im engeren Sinn sind, sagt nicht der
 * Abschnitt selbst, sondern das {@link MenuBundle}, das sie aufzählt:
 * Gang-Sein ist eine ROLLE im Menü, keine Eigenschaft des Abschnitts. Deshalb
 * braucht die Weinkarte auch keinen „ist kein Gang"-Schalter.
 */
export type MenuSection = {
  id: string
  title: string
  /** Optionale Zeile unter dem Titel, z.B. „0,2 l" oder „offen ausgeschenkt". */
  note?: string
  items: MenuItem[]
}

/**
 * Menü-Bündel: mehrere Gänge zum FESTPREIS („Menü Glut, vier Gänge, 78 €").
 *
 * Hängt nur an einer Karte, die {@link MenuSection}s hat – der Typ erzwingt das
 * (siehe {@link MenuCategory}). Das ist die eigentliche Zusicherung: ein
 * Bündel ohne Gänge, aus denen es bündelt, lässt sich gar nicht erst
 * hinschreiben.
 */
export type MenuBundle = {
  id: string
  /** z.B. „Menü Glut – vier Gänge". */
  name: string
  description?: string
  /**
   * `id`s der Gänge DERSELBEN Karte, in der Reihenfolge des Servierens. Aus
   * jedem davon wählt der Gast ein Gericht. Eine `id`, die zu keinem Abschnitt
   * dieser Karte gehört, wird beim Rendern still übergangen.
   */
  courses: string[]
  /** Festpreis in Euro als ZAHL – gleiche Regel wie bei {@link MenuItem}. */
  price: number
  /** Einschränkung, z.B. „nur für den ganzen Tisch". */
  note?: string
}

/**
 * OBERSTE Ebene der Karte.
 *
 * Beim Café ist ein Eintrag eine Kategorie („Kaffee", „Frühstück"), beim
 * Restaurant eine ganze KARTE („Mittagstisch", „Abendkarte", „Weinkarte").
 * Beides ist dieselbe Rolle: die Gliederungspunkte der Kartenseite – und damit
 * genau das, was in der Sprungleiste steht.
 *
 * Das Feld heißt weiterhin `categories` (siehe `GastroBusiness.menu`), damit
 * die bestehende Datendatei des Cafés unverändert bleibt; gemeint ist die
 * EBENE, nicht die Kategorie.
 *
 * ENTWEDER Gerichte direkt (`items`, flache Karte) ODER Abschnitte
 * (`sections`, gegliederte Karte) – nie beides und nie keins. Die Union
 * verbietet über `?: never` beide Fehlformen; ein Eintrag ohne Inhalt liesse
 * sich sonst hinschreiben und rendert als leere Überschrift.
 */
export type MenuCategory = {
  id: string
  title: string
  /** Optionale Zeile unter dem Titel, z.B. „bis 14 Uhr". */
  note?: string
} & (
  | { items: MenuItem[]; sections?: never; bundles?: never }
  | { sections: MenuSection[]; bundles?: MenuBundle[]; items?: never }
)

export type OpeningHours = {
  /**
   * Anzeige, z.B. „Di – Fr".
   *
   * Muss innerhalb von `hours.entries` EINDEUTIG sein – die Liste nutzt das
   * Label als React-Key. Ein Betrieb mit getrennten Servicezeiten schreibt
   * deshalb zwei Einträge mit verschiedenen Labels („Di – Fr · Mittag",
   * „Di – Sa · Abend") statt zweier Zeitfenster in einem Eintrag; schema.org
   * will überlappende Tage ohnehin als zwei `OpeningHoursSpecification`.
   */
  label: string
  /** schema.org `dayOfWeek` (englisch, voll ausgeschrieben). */
  days: string[]
  /** „07:30" – bei Ruhetag weglassen. */
  opens?: string
  closes?: string
  /** Ruhetag: wird als „geschlossen" angezeigt und NICHT nach schema.org gegeben. */
  closed?: boolean
}

/**
 * Bild mit fest reserviertem Seitenverhältnis.
 *
 * Solange `src` fehlt, rendert ein gestalteter Platzhalter – in exakt derselben
 * Box. Dadurch springt beim späteren Einsetzen echter Handyfotos NICHTS
 * (kein Layout-Shift): nur `src` ergänzen, fertig.
 */
export type Photo = {
  /** CSS-`aspect-ratio`, z.B. '4 / 5'. Muss zum späteren Foto passen. */
  ratio: string
  /** Alt-Text – auch für den Platzhalter sinnvoll formulieren. */
  alt: string
  /** Pfad in `public/`. Fehlt er → Platzhalter. */
  src?: string
  /** Kurzes Wort im Platzhalter, z.B. „Tresen". */
  placeholderLabel: string
}

export type GastroBusiness = {
  slug: string
  /** Voller Name, z.B. „Café Klee". */
  name: string
  /** Kurzform für die grosse Versalien-Typo, z.B. „KLEE". */
  displayName: string
  /** Art des Betriebs, z.B. „Café & Backstube". */
  kind: string
  tagline: string
  intro: string

  /**
   * Beschriftung der vier Seiten in der Navigations-Pille.
   *
   * Bewusst hier und nicht in der Komponente: ein anderer Betrieb darf seine
   * Seiten anders nennen. Kurz halten – die Pille ist auf einem 320-px-Handy
   * schmal und scrollt sonst.
   */
  nav: {
    /** Startseite. */
    start: string
    /** Speisekarte (`/karte`). */
    menu: string
    /** Adresse, Zeiten, Kontakt (`/kontakt`). */
    contact: string
    /** Über uns (`/ueber-uns`). */
    about: string
  }

  hero: { photo: Photo }
  /** Zeilen des Laufbands (werden in Versalien gesetzt). */
  marquee: string[]
  gallery: Photo[]

  menu: {
    title: string
    note?: string
    categories: MenuCategory[]
    allergenNote: string
  }
  allergens: Allergen[]

  hours: {
    title: string
    note?: string
    entries: OpeningHours[]
  }

  location: {
    title: string
    street: string
    postalCode: string
    city: string
    /** ISO-Ländercode für schema.org, z.B. 'DE'. */
    country: string
    countryName: string
    note?: string
    directionsLabel: string
  }

  contact: {
    title: string
    phone: {
      /** Anzeige, z.B. „030 23125 470". */
      display: string
      /** Für `tel:` – international, ohne Leerzeichen. */
      e164: string
    }
    email: string
    reservation: {
      label: string
      note: string
      /** Betreff der vorbereiteten Mail. */
      subject: string
      /** Vorbefüllter Textkörper (Zeilenumbrüche mit \n). */
      body: string
    }
  }

  /**
   * „Über uns" – Lead plus Blöcke im Bild-Text-Wechsel.
   *
   * Die Blöcke wechseln die Seite automatisch (gerade/ungerade); die Anzahl ist
   * nicht festgelegt, drei sind der Normalfall.
   */
  about: {
    title: string
    lead: string
    blocks: {
      id: string
      title: string
      text: string
      photo: Photo
    }[]
    /** Abbinder: ein gefüllter und ein Ghost-Link auf Karte bzw. Kontakt. */
    outro: {
      menuLabel: string
      contactLabel: string
    }
  }

  legal: {
    title: string
    lines: string[]
    /** Sichtbarer Musterhinweis – der Betrieb ist erfunden. */
    note: string
  }

  /**
   * Datenschutz-Seite.
   *
   * Beschreibt bewusst den TATSÄCHLICHEN Zustand dieser Seite (keine Cookies,
   * kein Tracking, keine Fremd-Requests, Hosting) statt Standardbausteine zu
   * behaupten, die hier gar nicht zutreffen. Bei einem echten Betrieb gehört
   * hier eine auf ihn zugeschnittene Erklärung hin – das sagt `note` auch.
   */
  privacy: {
    title: string
    /** Sichtbarer Muster-/Demo-Hinweis, steht ganz oben. */
    note: string
    sections: {
      /** Kurzes ASCII-Kuerzel fuer die id im Markup (aria-labelledby). */
      id: string
      title: string
      /** Ein Absatz je Eintrag. */
      body: string[]
    }[]
  }

  /** schema.org-Zusatzangaben. */
  seo: {
    /** z.B. '€' oder '€€'. */
    priceRange: string
    servesCuisine: string[]
  }
}
