import type { GastroBusiness } from './types'

/**
 * Demo-Betrieb „Salon Wirbel" – KOMPLETT ERFUNDEN.
 *
 * Kein realer Betrieb, keine realen Personen (auch die drei im Team nicht).
 * Straße frei erfunden; Telefonnummer aus dem Berliner Block `030 23125 xxx`,
 * der für Film/Fernsehen reserviert ist und nie an echte Anschlüsse vergeben
 * wird; E-Mail auf der reservierten Test-Domain `.example`, die per Definition
 * nicht auflöst. Vor einem echten Einsatz: Name, Adresse, Nummer, Mail und die
 * Personen ersetzen.
 *
 * Die dritte Demo – und die erste, die KEINE Gastronomie ist. Der Test war
 * nicht, ob eine Friseurseite entsteht, sondern ob sie DIESELBEN Komponenten
 * benutzt wie Café und Restaurant. Drei Dinge bringt ein Salon mit, die eine
 * Speisekarte nicht kennt:
 *
 * 1. **Dienstleistungen mit DAUER statt Speisen.** `MenuItem.durationMinutes`
 *    ist dafür dazugekommen – eine Zahl, kein Text, aus demselben Grund wie
 *    beim Preis. Gerendert wird sie von derselben `MenuRow`, die beim Café die
 *    Zimtschnecke setzt; sie fragt nach dem FELD, nicht nach der Branche.
 * 2. **Preisspannen statt Festpreisen.** „ab 49,00 €" (offen nach oben, weil
 *    es nach Haarlänge geht) und „52,00 – 68,00 €" (Spanne). Beides ist eine
 *    exklusive Union an `MenuItem` – die Fehlform „ab 52,00 – 68,00 €" lässt
 *    sich gar nicht erst hinschreiben.
 * 3. **Mitarbeiter als eigene Ebene.** `team` neben `about`, gerendert von
 *    `DemoTeam` – dieselbe Mechanik wie `booking` beim Restaurant: ein
 *    optionales Feld, das eine Fläche mitbringt, die die anderen nicht haben.
 *
 * `cafe-klee.ts` und `restaurant-glut.ts` blieben dafür Zeichen für Zeichen
 * unverändert.
 *
 * **Eigene Farbwelt:** `theme: 'friseur'` hängt in `DemoShell` eine zweite
 * Klasse an die Hülle, die in `demo.css` dieselben Variablen neu belegt –
 * kühles Porzellan und tiefes Pflaumenrot statt warmem Papier und gebranntem
 * Orange. Café und Restaurant haben kein `theme` und bleiben unberührt.
 *
 * **Kein Buchungsflow.** Bewusst ein Non-Goal dieser Stufe: Termine laufen über
 * Telefon und Mail. Weil `booking` fehlt, entfällt die Attrappe von selbst –
 * ohne dass `DemoContact` wüsste, dass hier ein Friseur rendert.
 *
 * **Fotos:** bewusst noch keine. Jedes `Photo` trägt sein `ratio`, der
 * Platzhalter belegt exakt dieselbe Fläche wie das spätere Bild – beim
 * Nachreichen kommt nur `src` dazu, es springt nichts.
 */
export const friseurWirbel: GastroBusiness = {
  slug: 'friseur',
  theme: 'friseur',
  name: 'Salon Wirbel',
  displayName: 'Wirbel',
  kind: 'Friseur & Barbier',
  tagline: 'Erst beraten, dann schneiden.',
  intro:
    'Wir sind ein kleiner Salon mit drei Stühlen und ohne Eile. Jeder Termin beginnt im Trockenen mit einer Beratung – erst danach steht fest, was gemacht wird und was es kostet. Wer nur zehn Minuten Zeit hat, ist bei uns falsch; wer seit drei Jahren denselben Schnitt trägt und ihn satt hat, richtig.',

  nav: {
    start: 'Start',
    menu: 'Leistungen',
    contact: 'Kontakt',
    about: 'Über uns',
  },

  hero: {
    photo: {
      ratio: '4 / 5',
      alt: 'Blick in den Salon: drei Stühle vor einer Spiegelwand aus altem Holz, davor Fensterlicht',
      placeholderLabel: 'Salon',
    },
  },

  marquee: [
    'Beratung vor dem Waschen',
    'Farbe nur nach Haarprobe',
    'Bart und Rasur mit dem Messer',
    'Drei Stühle, keine Fließbandtermine',
  ],

  gallery: [
    {
      ratio: '1 / 1',
      alt: 'Scheren und Kämme auf einem Leinentuch, daneben ein Rasiermesser',
      placeholderLabel: 'Werkzeug',
    },
    {
      ratio: '1 / 1',
      alt: 'Waschbecken aus Stein vor einer gefliesten Wand, darüber eine Lampe',
      placeholderLabel: 'Waschplatz',
    },
    {
      ratio: '3 / 2',
      alt: 'Der Salon von der Tür aus: Spiegelwand links, Wartebank rechts, Pflanzen am Fenster',
      placeholderLabel: 'Der Raum',
    },
  ],

  /**
   * Die Preisliste heisst hier „Leistungen" und nicht „Karte" – der Titel
   * kommt aus den Daten, das Routen-Segment (`/karte`) bleibt für alle
   * Betriebe gleich. Dieselbe Entscheidung wie beim Restaurant, dessen Seite
   * „Karten" heisst.
   *
   * `allergens` und `allergenNote` fehlen: hier wird nichts serviert. Dadurch
   * entfällt die Legende am Ende der Seite, ohne dass `DemoMenu` etwas über
   * die Branche wüsste – es sieht nur, dass niemand etwas zu kennzeichnen hat.
   */
  menu: {
    title: 'Leistungen',
    note: 'Alle Preise in Euro, inklusive Mehrwertsteuer. Die Zeiten sind Richtwerte – wir planen lieber großzügig als knapp.',
    categories: [
      /* Flache Liste: die Leistungen hängen direkt darunter – dieselbe Form,
         in der das Café seine Kategorien schreibt. */
      {
        id: 'schnitt',
        title: 'Schnitt',
        note: 'Immer mit Beratung, Waschen und Föhnen – wo nicht, steht es dabei.',
        items: [
          { name: 'Damenschnitt', description: 'Beratung, Waschen, Schnitt, Föhnen', price: 49, priceOpen: true, durationMinutes: 60 },
          { name: 'Herrenschnitt', description: 'Beratung, Waschen, Schnitt, Styling', price: 34, durationMinutes: 45 },
          { name: 'Trockenschnitt', description: 'ohne Waschen – nur, wenn dein Haar frisch gewaschen ist', price: 32, priceOpen: true, durationMinutes: 40 },
          { name: 'Kinderschnitt', description: 'bis zwölf Jahre', price: 24, durationMinutes: 30 },
          { name: 'Maschinenschnitt', description: 'eine Länge, ohne Übergang', price: 22, durationMinutes: 20 },
          { name: 'Pony nachschneiden', description: 'zwischendurch, wenn wir Luft haben', price: 12, durationMinutes: 15 },
        ],
      },
      /* Gegliederte Liste: zwei Abschnitte, weil Ansatzarbeit und Aufhellung
         zwei verschiedene Termine sind – in Aufwand, Dauer und Preis. Dieselbe
         Struktur, in der die Abendkarte des Restaurants ihre Gänge führt; nur
         ohne Bündel, weil ein Kombi-Termin im Salon kein „aus jedem Gang eins"
         ist, sondern schlicht eine eigene Leistung (siehe „Schnitt & Bart"). */
      {
        id: 'farbe',
        title: 'Farbe',
        note: 'Inklusive Waschen, Pflege und Föhnen · Spanne nach Haarlänge und Ansatzhöhe',
        sections: [
          {
            id: 'ansatz',
            title: 'Ansatz & Ton',
            note: 'bis vier Zentimeter Ansatz',
            items: [
              { name: 'Ansatzfarbe', price: 52, priceTo: 68, durationMinutes: 90 },
              { name: 'Tönung', description: 'ohne Ammoniak, wäscht sich langsam heraus', price: 46, priceTo: 62, durationMinutes: 75 },
              { name: 'Glossing', description: 'Glanz und Ton, keine Aufhellung', price: 38, priceTo: 49, durationMinutes: 45 },
            ],
          },
          {
            id: 'aufhellung',
            title: 'Strähnen & Aufhellung',
            note: 'Preis nach Haarlänge',
            items: [
              { name: 'Strähnen, Oberkopf', price: 78, priceTo: 105, durationMinutes: 120 },
              { name: 'Strähnen, ganzer Kopf', price: 115, priceTo: 165, durationMinutes: 165 },
              { name: 'Balayage', description: 'freihand gemalt, wächst weich heraus', price: 145, priceTo: 210, durationMinutes: 210 },
              { name: 'Blondierung', description: 'nur nach vorheriger Haarprobe – wir sagen auch ab', price: 160, priceOpen: true, durationMinutes: 240 },
            ],
          },
        ],
      },
      {
        id: 'pflege',
        title: 'Pflege & Styling',
        note: 'Auch einzeln zu haben, nicht nur zum Schnitt.',
        items: [
          { name: 'Kopfmassage & Waschen', description: 'zehn Minuten, die den Tag drehen', price: 18, durationMinutes: 20 },
          { name: 'Intensivkur', description: 'auf die Haarstruktur abgestimmt, mit Wärmehaube', price: 26, durationMinutes: 30 },
          { name: 'Bindungsaufbau', description: 'nach Blondierung oder starker Aufhellung', price: 34, priceTo: 48, durationMinutes: 45 },
          { name: 'Föhnen & Styling', price: 24, priceOpen: true, durationMinutes: 30 },
          { name: 'Hochsteckfrisur', description: 'Probetermin empfohlen, er wird angerechnet', price: 65, priceTo: 110, durationMinutes: 90 },
        ],
      },
      {
        id: 'bart',
        title: 'Bart & Rasur',
        items: [
          { name: 'Bart schneiden', description: 'Maschine und Schere, Konturen mit dem Messer', price: 19, durationMinutes: 25 },
          { name: 'Klassische Rasur', description: 'heißes Tuch, Messer, kaltes Tuch', price: 29, durationMinutes: 40 },
          { name: 'Schnitt & Bart', description: 'beides in einem Termin', price: 48, durationMinutes: 70 },
          { name: 'Konturen nachziehen', description: 'zwischendurch, wenn der Schnitt noch sitzt', price: 12, durationMinutes: 15 },
        ],
      },
    ],
  },

  hours: {
    title: 'Öffnungszeiten',
    note: 'Wir arbeiten mit Termin. Wenn ein Stuhl frei ist, geht auch spontan etwas – ruf kurz an, bevor du losläufst.',
    entries: [
      { label: 'Dienstag – Freitag', days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:30' },
      { label: 'Samstag', days: ['Saturday'], opens: '09:00', closes: '15:00' },
      { label: 'Sonntag & Montag', days: ['Sunday', 'Monday'], closed: true },
    ],
  },

  location: {
    title: 'So findest du uns',
    street: 'Quellweg 11',
    postalCode: '10965',
    city: 'Berlin',
    country: 'DE',
    countryName: 'Deutschland',
    note: 'Der Salon liegt im Erdgeschoss. Die Tür ist 90 Zentimeter breit, davor eine Schwelle von rund zwei Zentimetern. Ein Waschplatz lässt sich frei anfahren – sag beim Termin kurz Bescheid, dann halten wir ihn frei und räumen den Weg dorthin.',
    directionsLabel: 'Route öffnen',
  },

  contact: {
    title: 'Termin',
    phone: { display: '030 23125 486', e164: '+493023125486' },
    email: 'termin@salon-wirbel.example',
    reservation: {
      label: 'Anfrage schreiben',
      note: 'Am schnellsten geht ein Anruf – dann können wir gleich fragen, was du vorhast, und die richtige Länge einplanen. Für Farbe brauchen wir vorher eine kurze Haarprobe; die dauert zehn Minuten und kostet nichts.',
      subject: 'Terminanfrage',
      body: 'Hallo Salon Wirbel,\n\nich hätte gern einen Termin.\n\nLeistung:\nWunschtag:\nUhrzeit (ungefähr):\nName:\n\nViele Grüße',
    },
  },

  /**
   * Die Mitarbeiter – die Ebene, die Café und Restaurant nicht haben.
   *
   * Steht auf „Über uns" zwischen den Erzählblöcken und dem Abbinder. Bewusst
   * keine eigene Seite: die Navigations-Pille scrollt bei vier Einträgen
   * bereits, ein fünfter würde die wichtigsten Ziele aus dem Bild schieben.
   */
  team: {
    title: 'Wer schneidet',
    lead: 'Drei Leute, drei Handschriften. Sag beim Anruf, zu wem du willst – oder lass es uns vorschlagen, wir kennen unsere Stärken.',
    members: [
      {
        id: 'mira',
        name: 'Mira Kowald',
        role: 'Inhaberin & Meisterin',
        text: 'Hat den Laden 2014 aufgemacht, nachdem sie zwölf Jahre in fremden Salons gearbeitet hatte. Schneidet am liebsten kurz und geht trocken so lange nach, bis es wirklich sitzt. Bei ihr dauert die Beratung am längsten und der Schnitt am kürzesten.',
        photo: {
          ratio: '1 / 1',
          alt: 'Porträt einer Frau mit kurzen grauen Haaren, Schere in der Hand, im Hintergrund die Spiegelwand',
          placeholderLabel: 'Mira',
        },
      },
      {
        id: 'jonte',
        name: 'Jonte Reisig',
        role: 'Stylist & Barbier',
        text: 'Kommt aus der Barbier-Ecke und hat das Messer nie wieder weggelegt. Macht die klassischen Rasuren und alles, was mit Übergängen zu tun hat. Wenn im Salon jemand über Fußball redet, ist er es.',
        photo: {
          ratio: '1 / 1',
          alt: 'Porträt eines Mannes mit Vollbart, Rasiermesser in der Hand, hinter ihm ein Handtuchwärmer',
          placeholderLabel: 'Jonte',
        },
      },
      {
        id: 'aylin',
        name: 'Aylin Baruch',
        role: 'Coloristin',
        text: 'Verantwortet alles, was Farbe hat – und sagt als Einzige regelmäßig Termine ab, wenn die Haarprobe nicht mitspielt. Eine Balayage plant sie lieber über zwei Termine als über einen langen.',
        photo: {
          ratio: '1 / 1',
          alt: 'Porträt einer Frau mit langen dunklen Haaren, Farbschale und Pinsel in der Hand',
          placeholderLabel: 'Aylin',
        },
      },
    ],
  },

  about: {
    title: 'Über uns',
    lead: 'Der Wirbel ist die Stelle, an der das Haar selbst entscheidet, wohin es will. Danach kann man sich richten oder dagegen arbeiten – wir richten uns danach.',
    blocks: [
      {
        id: 'beratung',
        title: 'Erst reden, dann waschen',
        text: 'Jeder Termin fängt im Trockenen an. Wir sehen uns an, wie dein Haar wächst, wo es sich dreht und was der letzte Schnitt daraus gemacht hat – erst danach steht fest, was geht. Manchmal ist das Ergebnis, dass wir weniger machen als geplant, und ab und zu, dass wir gar nichts machen und dich in acht Wochen wiedersehen. Der Preis steht vor dem ersten Schnitt fest, nicht an der Kasse.',
        photo: {
          ratio: '3 / 2',
          alt: 'Zwei Personen im Gespräch vor dem Spiegel, das Haar noch trocken und offen',
          placeholderLabel: 'Beratung',
        },
      },
      {
        id: 'handwerk',
        title: 'Warum es länger dauert',
        text: 'Wir haben drei Stühle und legen keine Termine übereinander. Das heißt: keine Farbe, die im Nebenraum einwirkt, während hier jemand wartet. Eine Blondierung bekommt bei uns vier Stunden und eine Haarprobe vorher – und wenn die Probe schlecht ausfällt, sagen wir ab, statt es trotzdem zu versuchen. Das kostet uns Termine und dir erspart es abgebrochenes Haar.',
        photo: {
          ratio: '4 / 5',
          alt: 'Hände beim Auftragen von Farbe mit dem Pinsel, eine Strähne über Folie gelegt',
          placeholderLabel: 'Farbe',
        },
      },
      {
        id: 'raum',
        title: 'Der Laden',
        text: 'Eine alte Ladenwohnung mit hohen Fenstern nach Norden – das gleichmäßigste Licht, das man für Farbe bekommen kann, und der Grund, warum wir hier eingezogen sind. Kein Fernseher, kein Radio auf Zimmerlautstärke, Musik nur so laut, dass man sich normal unterhalten kann. Sonntag und Montag ist zu: an einem der beiden Tage machen wir die Bücher, am anderen gar nichts.',
        photo: {
          ratio: '3 / 2',
          alt: 'Hohe Sprossenfenster, davor die Wartebank und ein niedriger Tisch mit Zeitschriften',
          placeholderLabel: 'Fensterseite',
        },
      },
    ],
    outro: {
      menuLabel: 'Zu den Leistungen',
      contactLabel: 'Termin anfragen',
    },
  },

  legal: {
    title: 'Impressum',
    lines: [
      'Salon Wirbel (Musterbetrieb)',
      'Quellweg 11, 10965 Berlin',
      'Vertreten durch: Vorname Nachname',
      'Telefon: 030 23125 486',
      'E-Mail: termin@salon-wirbel.example',
      'Umsatzsteuer-ID: DE000000000',
      'Handwerkskammer: Musterkammer, Eintragung Nr. 000000',
    ],
    note: 'Platzhalter – dieser Betrieb ist frei erfunden, ebenso die drei Personen auf „Über uns". Für eine echte Seite kommen hier die Angaben nach § 5 DDG hin; ein Friseurbetrieb nennt zusätzlich seine Handwerkskammer sowie die Berufsbezeichnung und den Staat, in dem sie verliehen wurde.',
  },

  privacy: {
    title: 'Datenschutz',
    note: 'Mustertext einer Demo-Seite. „Salon Wirbel" ist ein erfundener Betrieb – es gibt keinen Verantwortlichen, an den sich eine Anfrage richten könnte. Der Text beschreibt, was diese Seite technisch tatsächlich tut, und ist ausdrücklich keine Rechtsberatung. Eine echte Seite braucht eine auf den Betrieb zugeschnittene Erklärung.',
    sections: [
      {
        id: 'nichts',
        title: 'Was diese Seite nicht tut',
        body: [
          'Diese Seite setzt keine Cookies und speichert nichts in deinem Browser. Es gibt keine Reichweitenmessung, keine Analyse-Software und kein Profiling – auch keine anonyme Statistik.',
          'Es gibt kein Formular und kein Terminbuchungssystem: Termine laufen über Telefon oder E-Mail, also über ein Programm auf deinem eigenen Gerät. Diese Seite selbst nimmt keine Eingabe entgegen. Deshalb steht hier auch kein Cookie-Banner – es gibt nichts, wozu du einwilligen müsstest.',
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
          'Weil dieser Betrieb erfunden ist, gibt es hier niemanden, an den sich das richten könnte. Auf einer echten Seite stehen an dieser Stelle die Kontaktdaten des Verantwortlichen. Ein Salon, der Termine mit Namen und Telefonnummer notiert, beschreibt hier ausserdem, wie lange er diese Notizen aufbewahrt.',
        ],
      },
    ],
  },

  /**
   * `servesCuisine` fehlt – hier wird nichts serviert, und ein leeres Feld wäre
   * eine Aussage über nichts. `schemaType` dagegen ist gesetzt: ein
   * Friseursalon als `Restaurant` auszuzeichnen wäre nicht ungenau, sondern
   * falsch. Der Vorgabewert bleibt `Restaurant`, damit Café und Restaurant das
   * Feld nicht tragen müssen.
   */
  seo: {
    priceRange: '€€',
    schemaType: 'HairSalon',
  },
}
