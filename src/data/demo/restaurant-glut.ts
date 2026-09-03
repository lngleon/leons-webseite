import type { GastroBusiness } from './types'

/**
 * Demo-Betrieb „Restaurant Glut" – KOMPLETT ERFUNDEN.
 *
 * Kein realer Betrieb, keine realen Personen. Straße frei erfunden;
 * Telefonnummer aus dem Berliner Block `030 23125 xxx`, der für Film/Fernsehen
 * reserviert ist und nie an echte Anschlüsse vergeben wird; E-Mail auf der
 * reservierten Test-Domain `.example`, die per Definition nicht auflöst.
 * Vor einem echten Einsatz: Name, Adresse, Nummer und Mail ersetzen.
 *
 * Die zweite Demo neben `cafe-klee.ts` – und der eigentliche Test des
 * Datenmodells: ein Restaurant bringt drei Dinge mit, die ein Café nicht hat.
 *
 * 1. **Mehrere Karten nebeneinander** (Mittagstisch, Abendkarte, Weinkarte).
 *    Sie stehen als drei Einträge in `menu.categories` – der obersten Ebene der
 *    Karte. Beim Café ist ein Eintrag dort eine Kategorie, hier eine ganze
 *    Karte; für die Seite ist beides dasselbe: ein Gliederungspunkt, und damit
 *    ein Eintrag in der Sprungleiste.
 * 2. **Gänge als Reihenfolge.** Die Abendkarte trägt `sections` statt `items`.
 *    Ihre Reihenfolge im Array IST die Reihenfolge des Servierens – es gibt
 *    kein `position`-Feld, das daneben dasselbe noch einmal behaupten könnte.
 * 3. **Menü-Bündel zum Festpreis.** `bundles` hängt an der Abendkarte und
 *    verweist per `id` auf ihre Gänge. Der Typ erlaubt `bundles` nur dort, wo
 *    es auch `sections` gibt – ein Bündel ohne Gänge lässt sich gar nicht erst
 *    hinschreiben.
 *
 * `cafe-klee.ts` blieb dafür Zeichen für Zeichen unverändert.
 *
 * **Fotos:** seit 27.08.2026 sieben echte Bilder aus `public/demo/`
 * (`restaurant-*.webp`). Weil jedes `Photo` sein `ratio` schon vorher trug und
 * der Platzhalter exakt dieselbe Fläche belegte, ist beim Nachreichen nur `src`
 * dazugekommen – es hat sich nichts verschoben. Der Hero ist inzwischen in
 * zweiter Fassung da (`restaurant-tafel.webp` statt der ersten, gelöschten
 * `restaurant-gastraum.webp`): die Zweitquelle war echtes Hochformat und
 * musste nicht aus einem Querformat herausgeschnitten werden.
 */
export const restaurantGlut: GastroBusiness = {
  slug: 'restaurant',
  /**
   * Seit 03.09.2026 mit EIGENER Farbwelt (vorher teilte Glut den hellen
   * Basis-Satz des Cafés): `.demo-scope--glut` in `demo.css` – verkohltes
   * Braunschwarz und Glut-Orange, der erste dunkle Token-Satz der Demos.
   * Ein Restaurant, das abends lebt und dessen Fotos Feuer und dunkles Holz
   * sind, liest sich dunkel richtiger als auf Backstuben-Papier. Das
   * zugehörige `viewport.themeColor` steht im neuen `layout.tsx` des Ordners.
   */
  theme: 'glut',
  name: 'Restaurant Glut',
  displayName: 'Glut',
  kind: 'À-la-carte-Restaurant',
  tagline: 'Feuer, Zeit und ein paar gute Zutaten.',
  intro:
    'Bei uns kocht ein offenes Feuer vom späten Vormittag bis in die Nacht. Was darauf landet, entscheidet sich morgens auf dem Hof – deshalb ist die Karte kurz und ändert sich öfter, als uns lieb ist.',

  nav: {
    start: 'Start',
    menu: 'Karten',
    contact: 'Kontakt',
    about: 'Über uns',
  },

  hero: {
    photo: {
      ratio: '4 / 5',
      src: '/demo/restaurant-tafel.webp',
      alt: 'Lange, leere Holztafel mit Stuhlreihen im dunklen Gastraum, darüber drei Glühbirnen, am Ende des Raums die offene Feuerstelle mit glimmender Glut',
      placeholderLabel: 'Gastraum',
    },
  },

  marquee: [
    'Alles über offenem Feuer',
    'Gemüse vom Hof am Stadtrand',
    'Menü in drei oder vier Gängen',
    'Weine offen ausgeschenkt',
  ],

  gallery: [
    {
      ratio: '1 / 1',
      src: '/demo/restaurant-feuerstelle.webp',
      alt: 'Glühende Holzkohle und Flammen unter einem schweren Rost, dahinter greift ein Koch mit der Zange ins Feuer',
      placeholderLabel: 'Feuerstelle',
    },
    {
      ratio: '1 / 1',
      src: '/demo/restaurant-teller.webp',
      alt: 'Teller mit gegrilltem Radicchio, Zucchini und geröstetem Brot auf dunklem Holz, links glimmt die Glut',
      placeholderLabel: 'Gedeck',
    },
    {
      ratio: '3 / 2',
      src: '/demo/restaurant-mittagslicht.webp',
      alt: 'Gedeckte Tische am Mittag: Tageslicht durch das hohe Fenster, rechts die offene Feuerstelle und daneben der Holzstapel',
      placeholderLabel: 'Mittagslicht',
    },
  ],

  menu: {
    title: 'Karten',
    note: 'Alle Preise in Euro, inklusive Mehrwertsteuer.',
    allergenNote:
      'Die Buchstaben hinter den Gerichten stehen für kennzeichnungspflichtige Allergene. Sag uns vorher Bescheid, wenn etwas nicht geht – wir kochen darum herum.',
    categories: [
      /* Flache Karte: die Gerichte hängen direkt darunter – dieselbe Form, in
         der das Café seine Kategorien schreibt. */
      {
        id: 'mittag',
        title: 'Mittagstisch',
        note: 'Dienstag bis Freitag, 12 bis 14:30 Uhr',
        items: [
          { name: 'Suppe des Tages', description: 'steht auf der Tafel an der Tür', price: 6.5, allergens: ['I'] },
          { name: 'Linsen mit Röstgemüse', description: 'Sauerteigbrot dazu', price: 14.5, allergens: ['A', 'I'] },
          { name: 'Kohlrouladen vom Feuer', description: 'Kartoffelstampf, Kümmeljus', price: 16.5, allergens: ['A', 'C', 'G', 'I', 'J'] },
          { name: 'Forelle aus der Glut', description: 'braune Butter, Petersilienkartoffeln', price: 18.5, allergens: ['D', 'G'] },
        ],
      },
      /* Gegliederte Karte in GÄNGEN: die Reihenfolge unten ist die Reihenfolge
         am Tisch. Dazu die beiden Bündel, die genau diese Gänge aufzählen. */
      {
        id: 'abend',
        title: 'Abendkarte',
        note: 'ab 18 Uhr',
        sections: [
          {
            id: 'vorspeisen',
            title: 'Vorspeisen',
            items: [
              { name: 'Geröstete Rote Bete', description: 'Haselnuss, Meerrettich, Dill', price: 12.0, allergens: ['G', 'H'] },
              { name: 'Sellerie aus der Asche', description: 'Bergkäse, Apfel', price: 11.5, allergens: ['G', 'I'] },
              { name: 'Räucherforelle', description: 'Gurke, Sauerrahm, Kresse', price: 14.0, allergens: ['D', 'G'] },
            ],
          },
          {
            id: 'zwischengang',
            title: 'Zwischengang',
            note: 'kleine Portion',
            items: [
              { name: 'Handgerollte Nudeln', description: 'Pfifferlinge, Estragon', price: 13.5, allergens: ['A', 'C', 'G'] },
              { name: 'Brotsuppe', description: 'Röstzwiebel, Kräuteröl', price: 10.5, allergens: ['A', 'I'] },
            ],
          },
          {
            id: 'hauptgaenge',
            title: 'Hauptgänge',
            items: [
              { name: 'Spitzkohl über der Glut', description: 'Buchweizen, Senfsaat, Brühe', price: 24.0, allergens: ['A', 'I', 'J'] },
              { name: 'Saibling im Ganzen', description: 'Fenchel, Zitrone, Olivenöl', price: 29.0, allergens: ['D'] },
              { name: 'Lammschulter aus dem Ofen', description: 'weiße Bohnen, Rosmarin', price: 31.0, allergens: ['I'] },
              { name: 'Rinderbrust vom Feuer', description: 'Zwiebel, Sellerie, Meerrettich', price: 33.0, allergens: ['I'] },
            ],
          },
          {
            id: 'nachspeisen',
            title: 'Nachspeisen',
            items: [
              { name: 'Gebrannte Sahne', description: 'Pflaume, Sauerkirsche', price: 9.5, allergens: ['C', 'G'] },
              { name: 'Apfel im Teig', description: 'Vanille, Zimt', price: 9.0, allergens: ['A', 'C', 'G'] },
              { name: 'Zweierlei Käse', description: 'aus der Region, mit Birnenbrot', price: 11.5, allergens: ['A', 'G', 'H'] },
            ],
          },
        ],
        bundles: [
          {
            id: 'menue-drei',
            name: 'Menü Glut – drei Gänge',
            description: 'Aus jedem Gang ein Gericht deiner Wahl.',
            courses: ['vorspeisen', 'hauptgaenge', 'nachspeisen'],
            price: 52.0,
            note: 'Pro Person. Nur für den ganzen Tisch, Küche bis 21 Uhr.',
          },
          {
            id: 'menue-vier',
            name: 'Menü Glut – vier Gänge',
            description: 'Dasselbe mit Zwischengang.',
            courses: ['vorspeisen', 'zwischengang', 'hauptgaenge', 'nachspeisen'],
            price: 64.0,
            note: 'Pro Person. Nur für den ganzen Tisch, Küche bis 21 Uhr.',
          },
        ],
      },
      /* Dritte Karte, wieder gegliedert – hier sind die Abschnitte aber KEINE
         Gänge, sondern Gruppen. Genau deshalb hängt die Gang-Eigenschaft nicht
         am Abschnitt: die Weinkarte bräuchte sonst ein „ist kein Gang"-Feld. */
      {
        id: 'weine',
        title: 'Weinkarte',
        note: 'Eine Auswahl – die volle Karte liegt am Tisch',
        sections: [
          {
            id: 'offen',
            title: 'Offen ausgeschenkt',
            note: '0,2 l',
            items: [
              { name: 'Weißburgunder, trocken', description: 'Pfalz', price: 7.5, allergens: ['L'] },
              { name: 'Silvaner vom Muschelkalk', description: 'Franken', price: 8.0, allergens: ['L'] },
              { name: 'Spätburgunder, leicht gekühlt', description: 'Baden', price: 8.5, allergens: ['L'] },
              { name: 'Traubensaft, naturtrüb', description: 'ohne Alkohol', price: 4.5 },
            ],
          },
          {
            id: 'weiss',
            title: 'Weiß',
            note: 'Flasche 0,75 l',
            items: [
              { name: 'Riesling vom Schiefer', description: 'Mosel', price: 38.0, allergens: ['L'] },
              { name: 'Grauburgunder im Holz', description: 'Baden', price: 44.0, allergens: ['L'] },
              { name: 'Chardonnay, gereift', description: 'Rheinhessen', price: 56.0, allergens: ['L'] },
            ],
          },
          {
            id: 'rot',
            title: 'Rot',
            note: 'Flasche 0,75 l',
            items: [
              { name: 'Lemberger, ungeschönt', description: 'Württemberg', price: 42.0, allergens: ['L'] },
              { name: 'Spätburgunder vom Kalk', description: 'Ahr', price: 48.0, allergens: ['L'] },
              { name: 'Blaufränkisch', description: 'Burgenland', price: 52.0, allergens: ['L'] },
            ],
          },
        ],
      },
    ],
  },

  allergens: [
    { code: 'A', label: 'Glutenhaltiges Getreide' },
    { code: 'C', label: 'Eier' },
    { code: 'D', label: 'Fisch' },
    { code: 'G', label: 'Milch und Laktose' },
    { code: 'H', label: 'Schalenfrüchte (Nüsse)' },
    { code: 'I', label: 'Sellerie' },
    { code: 'J', label: 'Senf' },
    { code: 'L', label: 'Sulfite (Schwefel)' },
  ],

  hours: {
    title: 'Öffnungszeiten',
    note: 'An Feiertagen weichen die Zeiten ab – wir sagen es rechtzeitig an.',
    // Mittag und Abend sind zwei EIGENE Einträge, nicht zwei Zeitfenster in
    // einem: die Tage decken sich ohnehin nicht (samstags gibt es nur abends),
    // und schema.org will überlappende Tage als zwei Angaben. Die Labels müssen
    // dabei unterschiedlich bleiben – sie sind der React-Key der Liste.
    entries: [
      { label: 'Dienstag – Freitag · Mittag', days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '12:00', closes: '14:30' },
      { label: 'Dienstag – Samstag · Abend', days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '18:00', closes: '23:00' },
      { label: 'Sonntag & Montag', days: ['Sunday', 'Monday'], closed: true },
    ],
  },

  location: {
    title: 'So findest du uns',
    street: 'Zeisigsteg 6',
    postalCode: '12045',
    city: 'Berlin',
    country: 'DE',
    countryName: 'Deutschland',
    note: 'An der Tür ist eine Stufe, drinnen liegt alles auf einer Ebene – sag kurz Bescheid, dann legen wir die Rampe an. Die Feuerstelle steht offen im Raum; die Tische davor sind die wärmsten im Haus.',
    directionsLabel: 'Route öffnen',
  },

  contact: {
    title: 'Reservierung',
    phone: { display: '030 23125 512', e164: '+493023125512' },
    email: 'tisch@restaurant-glut.example',
    reservation: {
      label: 'Anfrage schreiben',
      note: 'Wir haben vierunddreißig Plätze und reservieren gern. Ein Menü für sechs oder mehr melde bitte zwei Tage vorher an – dafür brennt das Feuer länger vor.',
      subject: 'Tischanfrage',
      body: 'Hallo Restaurant Glut,\n\nich würde gern einen Tisch reservieren.\n\nDatum:\nUhrzeit:\nPersonen:\nName:\n\nViele Grüße',
    },
  },

  /**
   * Reservierungs-ATTRAPPE unter `/demo/restaurant/reservieren`.
   *
   * Fünf Schritte, die NICHTS tun: kein Netzwerk-Request, keine Mail, kein
   * Speichern – auch nicht im Browser. Sie ist die einzige Stelle im Demo-Baum
   * mit eigenem Client-Code und auf jedem Schritt als Vorschau gekennzeichnet.
   *
   * Zeiten stehen hier NICHT noch einmal: `services[].hoursLabel` zeigt auf
   * einen Eintrag in `hours` oben, und `buildBookingWeek` rechnet daraus das
   * Raster. Ruhetage ergeben sich dadurch von selbst (Sonntag und Montag stehen
   * in keinem geöffneten Eintrag), und der Samstag bietet folgerichtig nur
   * abends etwas an. Erfunden ist allein die BELEGUNG.
   */
  booking: {
    title: 'Reservieren',
    intro:
      'Eine Vorschau darauf, wie eine Tischanfrage auf dieser Seite laufen könnte – fünf Schritte, und am Ende passiert nichts.',
    band: 'Vorschau · es wird nichts reserviert',
    hinweis:
      'Das hier ist eine Attrappe. Sie schickt nichts ab, spricht mit keinem Server und speichert nichts – auch nicht in deinem Browser. Ein Neuladen löscht jede Eingabe. Reserviert wird bei Glut per Telefon oder E-Mail.',
    entryLabel: 'Reservierung ansehen (Vorschau)',
    entryNote:
      'So könnte eine Reservierung auf dieser Seite aussehen. Die Strecke ist eine Vorschau und bucht nichts – reserviert wird über die beiden Wege oben.',
    ctaLabel: 'Reservieren',

    noscript: {
      title: 'Diese Vorschau braucht JavaScript',
      body: 'Der Rest dieser Seite kommt ohne aus – nur diese Strecke nicht, weil sie deine Auswahl von Schritt zu Schritt mitführen muss. Gebucht hätte sie ohnehin nichts: reserviert wird bei uns über Telefon oder E-Mail.',
    },

    partySizes: [1, 2, 3, 4, 5, 6, 7, 8],
    partyUnit: { one: 'Person', other: 'Personen' },
    partyMore:
      'Ab neun Personen ruf uns bitte an – dafür stellen wir den langen Tisch um.',

    slotStepMinutes: 30,
    slotLegend:
      'Beispielbelegung: welche Zeiten frei, knapp oder belegt sind, ist für diese Vorschau erfunden. In einer echten Umsetzung käme das aus dem Tischbuch.',
    slotStates: { busy: 'belegt', tight: 'fast voll' },
    dayNote:
      'Beispielwoche ohne Datum. Welche Tage geöffnet sind, kommt aus den Öffnungszeiten dieser Seite – die Ruhetage stimmen also.',
    closedLabel: 'Ruhetag',

    backLabel: 'Zurück',
    backToContactLabel: 'Zurück zum Kontakt',

    stepCounterLabel: 'Schritt {n} von {gesamt}',
    optionalLabel: '(optional)',
    timeSuffix: 'Uhr',
    // Wochenordnung der Anzeige. `key` muss zu `hours.entries[].days` passen.
    weekdays: [
      { key: 'Monday', label: 'Montag' },
      { key: 'Tuesday', label: 'Dienstag' },
      { key: 'Wednesday', label: 'Mittwoch' },
      { key: 'Thursday', label: 'Donnerstag' },
      { key: 'Friday', label: 'Freitag' },
      { key: 'Saturday', label: 'Samstag' },
      { key: 'Sunday', label: 'Sonntag' },
    ],

    steps: {
      party: {
        title: 'Wie viele seid ihr?',
        note: 'Vorschau: Deine Auswahl bleibt in diesem Browserfenster und wird nirgendwo hingeschickt.',
        action: 'Weiter zum Tag',
        actionNote: 'Es wird nichts gebucht – der Knopf blättert nur weiter.',
        error: 'Bitte wähle zuerst, wie viele Personen kommen.',
      },
      day: {
        title: 'An welchem Tag?',
        note: 'Vorschau: eine Beispielwoche ohne Datum. Die Ruhetage stammen aber aus den echten Öffnungszeiten dieser Seite.',
        action: 'Weiter zur Uhrzeit',
        actionNote: 'Kein Tisch wird gehalten, kein Kalender gefragt.',
        error: 'Bitte wähle zuerst einen Tag.',
      },
      time: {
        title: 'Um wie viel Uhr?',
        note: 'Vorschau: die Zeiten sind aus den Öffnungszeiten gerechnet, wer schon belegt ist, ist erfunden.',
        action: 'Weiter zu deinen Angaben',
        actionNote: 'Auch jetzt ist nichts reserviert.',
        error: 'Bitte wähle zuerst eine Uhrzeit.',
      },
      guest: {
        title: 'Wie erreichen wir dich?',
        note: 'Vorschau: Was du hier eintippst, verlässt dein Gerät nicht. Es geht keine Mail raus und nichts wird gespeichert.',
        action: 'Anfrage abschicken (Vorschau)',
        actionNote:
          'Dieser Knopf sendet nichts. Er zeigt dir nur, wie die Bestätigung aussähe.',
        // Kein `error` – auf diesem Schritt trägt jedes Feld sein eigenes.
      },
    },

    fields: [
      {
        id: 'name',
        label: 'Name',
        type: 'text',
        autoComplete: 'name',
        required: true,
        error: 'Ohne Namen wüssten wir nicht, für wen der Tisch ist.',
      },
      { id: 'telefon', label: 'Telefon', type: 'tel', inputMode: 'tel', autoComplete: 'tel' },
      { id: 'wunsch', label: 'Anmerkung', multiline: true },
    ],

    done: {
      title: 'So sähe deine Bestätigung aus',
      labels: {
        party: 'Tisch für',
        day: 'Wann',
        time: 'Uhrzeit',
        guest: 'Auf den Namen',
      },
      guestFallback: 'ohne Namen',
      truth: {
        title: 'Und jetzt der ehrliche Teil:',
        points: [
          'Es ist keine Anfrage rausgegangen – weder an uns noch an sonst jemanden.',
          'Es wurde nichts gespeichert, auch nicht in deinem Browser.',
          'Kein Tisch ist reserviert, kein Platz geblockt.',
          'Ein Neuladen dieser Seite löscht alles, was du eingetippt hast.',
        ],
        outlook:
          'In einer echten Umsetzung ginge an dieser Stelle eine Anfrage an den Betrieb – und die Zeiten kämen aus dem Tischbuch statt aus einer Beispielwoche.',
      },
      realTitle: 'So reservierst du wirklich',
      restartLabel: 'Noch mal von vorn',
    },

    services: [
      {
        id: 'mittag',
        hoursLabel: 'Dienstag – Freitag · Mittag',
        short: 'Mittag',
        // 12:00–14:30 minus 90 Minuten → letzte Sitzung 13:00.
        lastSeatingBeforeCloseMinutes: 90,
        busySlots: ['12:30'],
      },
      {
        id: 'abend',
        hoursLabel: 'Dienstag – Samstag · Abend',
        short: 'Abend',
        // 18:00–23:00 minus 90 Minuten → letzte Sitzung 21:30.
        lastSeatingBeforeCloseMinutes: 90,
        busySlots: ['19:00', '19:30', '20:00'],
        tightSlots: ['18:30', '20:30'],
      },
    ],
  },

  about: {
    title: 'Über uns',
    lead: 'Glut ist aus einer Trotzreaktion entstanden: Wir wollten wieder mit Feuer kochen, nicht mit Knöpfen. Alles andere hat sich daraus ergeben.',
    blocks: [
      {
        id: 'feuer',
        title: 'Ein Feuer, den ganzen Abend',
        text: 'Um halb zehn wird angezündet, gegen elf ist die Glut so weit – deshalb geht mittags überhaupt schon etwas vom Feuer. Von da an läuft alles über dieselbe Stelle: mittags, was schnell geht, abends das, was Zeit braucht. Das heißt auch, dass wir nicht beliebig nachlegen können – wenn die Lammschulter drin ist, ist sie drin. Deshalb dauert manches länger, als du es gewohnt bist, und deshalb sagen wir es vorher.',
        photo: {
          ratio: '3 / 2',
          src: '/demo/restaurant-holzofen.webp',
          alt: 'Ein Koch schiebt gespaltene Scheite in die glühende Brennkammer, darüber sprühen Funken; davor stapelt sich das Brennholz',
          placeholderLabel: 'Feuer',
        },
      },
      {
        id: 'einkauf',
        title: 'Was auf den Tisch kommt',
        text: 'Das Gemüse kommt von einem Hof am Stadtrand, zweimal die Woche, und wir nehmen ab, was gerade da ist – nicht, was auf einer Bestellliste steht. Fisch nur, wenn er frisch ist, und dann im Ganzen. Fleisch selten, dafür vom ganzen Tier: was diese Woche die Schulter war, ist nächste Woche etwas anderes. Die Karte ist kurz, weil sie ehrlich sein soll.',
        photo: {
          ratio: '4 / 5',
          src: '/demo/restaurant-fleisch.webp',
          alt: 'Hände tranchieren ein über dem Feuer gegartes Stück Fleisch auf einem Holzbrett, daneben grobes Salz; im Hintergrund brennt das Feuer',
          placeholderLabel: 'Tranchieren',
        },
      },
      {
        id: 'haus',
        title: 'Der kurze Weg',
        text: 'Wer anrichtet, hat eben noch am Feuer gestanden. Warm gestellt wird hier nichts – was fertig ist, geht raus, und die Teller eines Tisches gehen zusammen. Deshalb warten wir am Pass lieber, bis dein Tisch vollständig ist, als den ersten Teller allein loszuschicken.',
        photo: {
          ratio: '3 / 2',
          src: '/demo/restaurant-kueche.webp',
          alt: 'Zwei Köche von hinten an der Anrichte, vor ihnen angerichtete Teller, dahinter die offene Feuerstelle',
          placeholderLabel: 'An der Anrichte',
        },
      },
    ],
    outro: {
      menuLabel: 'Zu den Karten',
      contactLabel: 'Reservierung',
    },
  },

  legal: {
    title: 'Impressum',
    lines: [
      'Restaurant Glut (Musterbetrieb)',
      'Zeisigsteg 6, 12045 Berlin',
      'Vertreten durch: Vorname Nachname',
      'Telefon: 030 23125 512',
      'E-Mail: tisch@restaurant-glut.example',
      'Umsatzsteuer-ID: DE000000000',
    ],
    note: 'Platzhalter – dieser Betrieb ist frei erfunden. Für eine echte Seite kommen hier die Angaben nach § 5 DDG hin.',
  },

  privacy: {
    title: 'Datenschutz',
    note: 'Mustertext einer Demo-Seite. „Restaurant Glut" ist ein erfundener Betrieb – es gibt keinen Verantwortlichen, an den sich eine Anfrage richten könnte. Der Text beschreibt, was diese Seite technisch tatsächlich tut, und ist ausdrücklich keine Rechtsberatung. Eine echte Seite braucht eine auf den Betrieb zugeschnittene Erklärung.',
    sections: [
      {
        id: 'nichts',
        title: 'Was diese Seite nicht tut',
        body: [
          'Diese Seite setzt keine Cookies und speichert nichts in deinem Browser. Es gibt keine Reichweitenmessung, keine Analyse-Software und kein Profiling – auch keine anonyme Statistik.',
          'Auf der Seite „Reservieren" liegt eine Vorschau-Strecke. Sie läuft vollständig in deinem Browser: nichts wird gesendet, nichts gespeichert – auch nicht im Browser selbst. Ein Neuladen löscht jede Eingabe. Ein Buchungssystem gibt es hier nicht; reserviert wird über Telefon oder E-Mail, also über ein Programm auf deinem eigenen Gerät. Deshalb steht hier auch kein Cookie-Banner – es gibt nichts, wozu du einwilligen müsstest.',
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
    priceRange: '€€€',
    servesCuisine: ['Regionale Küche', 'Feuerküche', 'Wein'],
  },
}
