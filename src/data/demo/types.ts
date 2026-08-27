/**
 * Typen für die stillen Demoseiten unter `/demo/*`.
 *
 * Ein Betrieb = EINE Datendatei (z.B. `cafe-klee.ts`), die diesen Typ erfüllt.
 * Die Komponenten unter `src/components/demo/` lesen ausschliesslich aus diesem
 * Objekt – es gibt keinen hartkodierten Inhalt. Ein zweiter Betrieb entsteht
 * dadurch allein durch eine zweite Datei + eine zweite `page.tsx`, die sie
 * hineinreicht.
 *
 * **Der Typ heisst weiterhin `GastroBusiness`, trägt seit Demo 3 (Friseur) aber
 * auch einen Betrieb, der nichts serviert.** Das ist bewusst NICHT umbenannt:
 * ein neuer Name hätte die Importzeile von `cafe-klee.ts` und
 * `restaurant-glut.ts` angefasst und damit die Zusage aufgegeben, dass die
 * beiden Vorgänger Zeichen für Zeichen unverändert bleiben. Derselbe Handel wie
 * beim Feldnamen `menu.categories`, in dem beim Restaurant ganze Karten stehen:
 * ein leicht gedehnter Name gegen eine unangetastete Vorgängerdatei. Was der Typ
 * beschreibt, ist ein KLEINER ORTSGEBUNDENER BETRIEB mit Preisliste, Zeiten und
 * Adresse – nicht speziell Gastronomie.
 *
 * Was NICHT gastro-neutral ist und es auch nicht werden soll, steht an seinem
 * Feld: `allergens` (nur wer serviert, kennzeichnet) und `seo.servesCuisine`.
 * Beide sind deshalb optional – ein Betrieb ohne sie rendert die zugehörigen
 * Blöcke schlicht nicht, ohne dass eine Komponente nach der Branche fragt.
 */

/** Allergen-Kürzel, wie in deutschen Speisekarten üblich (A = Gluten usw.). */
export type Allergen = {
  code: string
  label: string
}

/**
 * Ein Posten der Karte – beim Café und beim Restaurant ein GERICHT, beim
 * Friseur eine LEISTUNG. Derselbe Typ, weil es dieselbe Rolle ist: eine Zeile
 * der Preisliste, Name links, Preis rechts.
 *
 * Die Zusatzfelder sind alle optional und hängen an je EINEM Merkmal, das ein
 * Betrieb hat oder nicht hat – nie an seiner Branche: `allergens` (er
 * serviert), `durationMinutes` (er verkauft Zeit), die Preis-Union unten (sein
 * Preis steht nicht fest).
 */
export type MenuItem = {
  name: string
  description?: string
  /**
   * Preis in Euro als ZAHL (3.8), nicht als String.
   * Grund: schema.org braucht den Preis numerisch, die Anzeige formatiert
   * daraus deterministisch „3,80 €" (kein `Intl` im Render – Hydration-Regel).
   *
   * Bei den beiden unscharfen Formen unten ist das die UNTERGRENZE.
   */
  price: number
  /** Kürzel aus `GastroBusiness.allergens`. */
  allergens?: string[]
  /**
   * Richtwert der Dauer in MINUTEN – für Betriebe, die Zeit verkaufen statt
   * Teller. Der Friseur schreibt `45`, angezeigt wird „45 Min."; ab einer
   * vollen Stunde „2 Std." bzw. „1 Std. 30 Min.".
   *
   * Zahl und nicht Text, aus demselben Grund wie beim Preis: zwanzig von Hand
   * getippte Zeilen ergeben sonst „45 Min", „45 min" und „45 Minuten"
   * nebeneinander. Die eine Form setzt `formatDuration()` in `menu.ts`.
   *
   * Bewusst EIN Wert und keine Spanne: eine Dauer ist im Salon ohnehin ein
   * Richtwert, und zwei Zahlen nebeneinander („60 – 90 Min., 145 – 210 €")
   * lesen sich in einer Preislistenzeile als Zahlensalat. Dass es Richtwerte
   * sind, sagt die `note` der Kategorie – einmal, statt zwanzigmal.
   */
  durationMinutes?: number
} & (
  /**
   * Wie genau ist der Preis? Drei Formen als EXKLUSIVE Union – dieselbe
   * Technik wie bei {@link MenuCategory} und aus demselben Grund: die
   * Fehlform „ab 45,00 – 75,00 €" lässt sich gar nicht erst hinschreiben.
   *
   *   beide Felder fehlen  → FESTPREIS  „3,80 €"
   *   `priceTo: 75`        → SPANNE     „45,00 – 75,00 €"
   *   `priceOpen: true`    → AB-PREIS   „ab 39,00 €" (offen nach oben)
   *
   * Erwogen und verworfen war ein einzelnes `priceTo?: number | null`, in dem
   * `null` „offen" hiesse: `null` und `undefined` lassen sich mit `??` oder
   * einem Wahrheitswert-Test unfallfrei verwechseln, und dann rendert ein
   * Ab-Preis STILL als Festpreis – falsche Zahl, keine Fehlermeldung. Zwei
   * benannte Felder können das nicht.
   *
   * Nach schema.org ist das eine `PriceSpecification`: `price` wird bei beiden
   * unscharfen Formen zu `minPrice`, `priceTo` zu `maxPrice`, und ein Ab-Preis
   * hat schlicht keine Obergrenze. Die Union bildet also nicht nur die Anzeige
   * ab, sondern eine Unterscheidung, die das Vokabular selbst kennt.
   */
  | { priceTo?: never; priceOpen?: never }
  | { priceTo: number; priceOpen?: never }
  | { priceOpen: true; priceTo?: never }
)

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

/**
 * Eine Person im Betrieb.
 *
 * Eine EIGENE Ebene und nicht ein weiterer `about.blocks`-Eintrag. Die Blöcke
 * dort sind eine Erzählung im Bild-Text-Wechsel: jeder behauptet etwas
 * anderes, jeder bekommt eine halbe Seite. Mitarbeiter sind das Gegenteil –
 * gleichrangige Einträge derselben Form, die man als Raster liest und
 * miteinander vergleicht. In die Blöcke gezwängt bekäme die erste Person eine
 * Doppelseite und die dritte den Rest, und die Reihenfolge läse sich als
 * Rangfolge.
 */
export type TeamMember = {
  /** Stabile ASCII-id für React-Key und `aria-labelledby`. */
  id: string
  name: string
  /** Rolle im Betrieb, z.B. „Inhaberin & Meisterin". */
  role: string
  /** Ein bis zwei Sätze: Schwerpunkt, Handschrift, Eigenheit. */
  text: string
  photo: Photo
}

/**
 * Ein SERVICEFENSTER der Reservierungs-Attrappe (Mittag, Abend, …).
 *
 * Definiert selbst KEINE Zeiten, sondern zeigt über {@link BookingService.hoursLabel}
 * auf einen Eintrag in `hours.entries`. Damit kann die Attrappe den
 * ausgewiesenen Öffnungszeiten nicht widersprechen – es gibt nur eine Wahrheit,
 * und wer die Zeiten ändert, ändert die Strecke mit.
 */
export type BookingService = {
  /** Stabile ASCII-id für Markup-ids und React-Keys, z.B. 'mittag'. */
  id: string
  /**
   * MUSS exakt einem `hours.entries[].label` entsprechen (die sind dort
   * ohnehin eindeutig). Passt nichts, bietet der Service schlicht keine Zeiten
   * an – sichtbar im Raster, statt still etwas Falsches zu behaupten.
   */
  hoursLabel: string
  /** Kurzform für Zwischenüberschrift und Zusammenfassung, z.B. 'Mittag'. */
  short: string
  /**
   * Abstand der LETZTEN Tischvergabe zum `closes` des Eintrags, in Minuten.
   *
   * Bewusst je Service und nicht einmal für den ganzen Betrieb: der Mittag ist
   * bei Glut 150 Minuten lang, der Abend 300. Ein gemeinsamer Wert würde
   * entweder den Mittag leerräumen oder abends bis kurz vor die Sperrstunde
   * setzen lassen.
   */
  lastSeatingBeforeCloseMinutes: number
  /** Beispielbelegung: Startzeiten, die als „belegt" rendern. */
  busySlots?: string[]
  /** Beispielbelegung: Startzeiten, die als „fast voll" rendern. */
  tightSlots?: string[]
}

/** Ein Eingabefeld des Kontaktschritts. */
export type BookingField = {
  id: string
  label: string
  type?: 'text' | 'tel' | 'email'
  inputMode?: 'text' | 'tel' | 'email'
  /** WCAG 1.3.5 – 'name' | 'tel' | 'email'. */
  autoComplete?: string
  multiline?: boolean
  required?: boolean
  /** Meldung, wenn `required` und leer. */
  error?: string
}

/** Texte eines Schritts der Attrappe. */
export type BookingStepCopy = {
  title: string
  /**
   * Der schritteigene Vorschau-Satz unter der Überschrift.
   *
   * MUSS sich von den anderen unterscheiden: fünfmal derselbe Satz wird ab dem
   * zweiten Schritt nicht mehr gelesen, und genau daran scheitert eine
   * Kennzeichnung, die auf JEDEM Schritt tragen soll.
   */
  note: string
  /** Beschriftung des Weiter-Knopfes dieses Schritts. */
  action: string
  /** Zeile UNTER dem Knopf – nicht darin. */
  actionNote: string
  /**
   * Meldung, wenn der Schritt ohne AUSWAHL weitergeklickt wird – gilt also für
   * die Schritte mit Kacheln, nicht für den Kontaktschritt: dort trägt jedes
   * Feld sein eigenes {@link BookingField.error}. Der Weiter-Knopf bleibt
   * bewusst bedienbar; ein `disabled` liesse einen Tastaturnutzer ins Leere
   * tabben, ohne den Grund zu erfahren.
   */
  error?: string
}

/**
 * Reservierungs-ATTRAPPE – eine Vorschau, die NICHTS tut.
 *
 * Kein Netzwerk-Request, keine Mail, kein Speichern (auch nicht im Browser);
 * ein Neuladen löscht jede Eingabe. Das ist die EINZIGE Stelle im Demo-Baum
 * mit eigenem Client-Code – ohne JavaScript tritt `noscript` an ihre Stelle.
 *
 * Heisst `booking` und nicht `reservation`: `contact.reservation` gibt es
 * bereits (die vorbereitete Mail). Zwei Felder gleichen Namens auf zwei Ebenen
 * wären in jedem Grep mehrdeutig.
 *
 * Optional, und genau darin liegt die Regel: Eine Komponente fragt „ist dieses
 * FELD da?" (`business.booking`), nie „ist das ein Café oder ein Restaurant?".
 * Das Café hat kein `booking` – deshalb hat es weder die Strecke noch den
 * Einstieg auf der Kontaktseite, ohne dass eine Komponente den Betrieb kennt.
 *
 * Sämtliche Texte stehen hier und nicht in der Komponente – auch der
 * Schrittzähler, das Wort „(optional)", die Uhrzeit-Endung und die Namen der
 * Wochentage. Eine Attrappe für einen anderen Betrieb ist damit wirklich nur
 * Daten.
 */
export type BookingDemo = {
  /** H1. Kurz halten – bei 320 px passen rund 11 Versalien in eine Zeile. */
  title: string
  /** Einleitungssatz unter der H1. */
  intro: string
  /** Text des klebenden Vorschau-Bands. Eine Zeile bei 320 px. */
  band: string
  /** Ausführlicher Hinweis im `.demo-hinweis`-Block unter der H1. */
  hinweis: string
  /** Einstieg auf der Kontaktseite. */
  entryLabel: string
  entryNote: string
  /** Ersatzstück ohne JavaScript. */
  noscript: { title: string; body: string }

  partySizes: number[]
  /**
   * Einheit in der Zusammenfassung. Zwei Formen, weil `partySizes` bei 1
   * beginnt und „1 Personen" auf dem Bestätigungsbildschirm steht – also genau
   * dort, wo die Attrappe überzeugen soll.
   */
  partyUnit: { one: string; other: string }
  /** Satz unter dem Personenraster für grössere Runden. */
  partyMore: string

  /** Rasterweite der Startzeiten in Minuten. */
  slotStepMinutes: number
  /** Legende ÜBER dem Zeitraster – entwertet die Belegung im Klartext. */
  slotLegend: string
  /** Wortlaut der Zustände. Nie Mengenangaben („noch zwei Tische"). */
  slotStates: { busy: string; tight: string }
  /** Zeile unter dem Tagesraster. */
  dayNote: string
  /** Was in der Zeile eines Ruhetags steht. */
  closedLabel: string

  /** Beschriftung des Zurück-Knopfes bzw. des Ausstiegs auf Schritt 1. */
  backLabel: string
  backToContactLabel: string

  /**
   * Schrittzähler in der Überschrift, mit den Platzhaltern `{n}` und
   * `{gesamt}` – z.B. „Schritt {n} von {gesamt}". Steht hier und nicht im
   * Code, weil es der Text ist, den ein Screenreader bei JEDEM Schrittwechsel
   * als erstes vorliest.
   */
  stepCounterLabel: string
  /** Klammerzusatz hinter dem Label eines optionalen Feldes, z.B. „(optional)". */
  optionalLabel: string
  /** Endung hinter einer Uhrzeit, z.B. „Uhr". */
  timeSuffix: string
  /**
   * Die Wochentage in Anzeigereihenfolge. `key` MUSS ein schema.org-Wochentag
   * sein (`Monday` …), damit `hours.entries[].days` darauf passt; `label` ist
   * die Anzeige. Ein Betrieb, der seine Woche anders anfängt, sortiert hier um.
   */
  weekdays: { key: string; label: string }[]

  steps: {
    party: BookingStepCopy
    day: BookingStepCopy
    time: BookingStepCopy
    guest: BookingStepCopy
  }

  fields: BookingField[]

  /** Schritt 5 – der Bestätigungsschritt. Hier steht am deutlichsten, dass nichts geschah. */
  done: {
    /** Überschrift im KONJUNKTIV. */
    title: string
    labels: { party: string; day: string; time: string; guest: string }
    /** Steht in der Zusammenfassung, wenn kein Name eingetippt wurde. */
    guestFallback: string
    truth: { title: string; points: string[]; outlook: string }
    realTitle: string
    restartLabel: string
  }

  services: BookingService[]
}

export type GastroBusiness = {
  slug: string
  /**
   * Name des Token-Satzes in `demo.css` – ergibt die Klasse
   * `demo-scope--<theme>` neben `demo-scope` an der Hülle.
   *
   * FEHLT bei Café und Restaurant: die beiden teilen sich den Basis-Satz
   * (warmes Papier, gebranntes Orange), und ohne Feld hängt `DemoShell` auch
   * keine zweite Klasse an – ihr Markup bleibt Zeichen für Zeichen dasselbe.
   * Genau deshalb ist es ein eigenes Feld und nicht der `slug`: aus dem Slug
   * abgeleitet hätten die beiden Vorgänger plötzlich eine Klasse mehr im HTML.
   *
   * Der Wert ist bewusst NICHT der Slug, auch wenn er beim Friseur gleich
   * lautet: zwei Betriebe dürfen sich einen Look teilen (zwei Filialen, eine
   * Handschrift), und ein Betrieb darf seinen Slug ändern, ohne die Farben zu
   * verlieren.
   *
   * Der Betrieb, der eigene Farben mitbringt, braucht ausserdem ein eigenes
   * `viewport.themeColor` – das steht im `layout.tsx` seines Ordners, weil das
   * Gruppen-Layout den Wert für alle setzt.
   */
  theme?: string
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
    /**
     * Satz unter der Allergen-Legende. Gehört zu `allergens` und fehlt
     * zusammen mit ihr.
     */
    allergenNote?: string
  }

  /**
   * Kennzeichnungspflichtige Allergene – die Legende am Ende der Kartenseite.
   *
   * FEHLT bei Betrieben, die nichts servieren. `DemoMenu` bindet den ganzen
   * Legendenblock an dieses Feld: keine Allergene, keine Legende. Das ist
   * wieder eine Feldfrage – die Komponente erfährt nicht, dass ein Friseur
   * rendert, sondern nur, dass niemand etwas zu kennzeichnen hat.
   */
  allergens?: Allergen[]

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
   * Reservierungs-Attrappe (`/demo/<slug>/reservieren`). FEHLT beim Café – und
   * weil sie fehlt, entfallen dort Strecke und Einstieg von selbst, ohne dass
   * eine Komponente den Betrieb kennen müsste. Siehe {@link BookingDemo}.
   */
  booking?: BookingDemo

  /**
   * Die Mitarbeiter als eigene Ebene – FEHLT bei Café und Restaurant.
   *
   * Derselbe Mechanismus wie bei {@link BookingDemo}, nur eine Ebene weiter:
   * `DemoAbout` fragt „ist `team` da?" und hängt den Block zwischen die
   * Erzählblöcke und den Abbinder. Wer das Feld nicht hat, rendert dort
   * weiterhin nichts – ohne dass eine Komponente die Branche kennt.
   *
   * Bewusst KEINE eigene Seite: die Navigations-Pille trägt keinen fünften
   * Eintrag (gemessen, siehe `routes.ts`), und auf „Über uns" steht ein Team
   * ohnehin am richtigen Platz – zwischen „wer wir sind" und „so erreichst du
   * uns".
   */
  team?: {
    title: string
    /** Optionaler Satz unter der Überschrift. */
    lead?: string
    members: TeamMember[]
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
    /** Nur für Betriebe, die Speisen servieren – sonst weglassen. */
    servesCuisine?: string[]
    /**
     * Der schema.org-Typ des Betriebs. Fehlt er → `'Restaurant'`.
     *
     * Der Vorgabewert steht in `buildBusinessSchema()` und ist der Grund, warum
     * Café und Restaurant dieses Feld nicht tragen müssen: ihr Markup bleibt
     * unverändert. Ein Friseursalon ist nach schema.org ein `HairSalon` – ihn
     * als `Restaurant` auszuzeichnen wäre keine Ungenauigkeit, sondern eine
     * falsche Aussage an eine Maschine.
     *
     * Bewusst eine geschlossene Union und kein `string`: ein Tippfehler im
     * Typnamen ergibt stilles Unsinn-Markup, das niemandem auffällt. Ein
     * vierter Betrieb trägt seinen Typ hier ein – EINE Zeile, an EINER Stelle.
     */
    schemaType?: 'Restaurant' | 'HairSalon'
  }
}
