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

export type MenuCategory = {
  id: string
  title: string
  /** Optionale Zeile unter dem Kategorietitel, z.B. „bis 14 Uhr". */
  note?: string
  items: MenuItem[]
}

export type OpeningHours = {
  /** Anzeige, z.B. „Di – Fr". */
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
   * Beschriftung der drei Seiten in der Navigation.
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

  legal: {
    title: string
    lines: string[]
    note: string
  }

  /** schema.org-Zusatzangaben. */
  seo: {
    /** z.B. '€' oder '€€'. */
    priceRange: string
    servesCuisine: string[]
  }
}
