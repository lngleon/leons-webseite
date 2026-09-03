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
 * **Buchungsflow seit 03.09.2026** (vorher bewusst keiner): die
 * Termin-Attrappe unter `/demo/friseur/reservieren`, als erste im
 * LEISTUNGS-Modus – Schritt 1 fragt „Was steht an?" mit `booking.choices`
 * statt einer Personenzahl. Buchbar sind die planbaren Standards; alles, was
 * eine Haarprobe braucht (Strähnen, Balayage, Blondierung), sagt die
 * `choicesNote` bewusst ans Telefon – dieselbe Linie wie in
 * `contact.reservation.note`.
 *
 * **Fotos:** seit 27.08.2026 vollständig bebildert – zehn Bilder aus
 * `public/demo/` (`friseur-*.webp`) für Hero, Bildreihe, die drei
 * Über-uns-Blöcke und die drei Team-Plätze. Kein Platzhalter mehr übrig.
 * Zwei davon sind Zweitfassungen: der Hero (`friseur-platz.webp`) und die
 * Spiegelreihe (`friseur-spiegelreihe.webp`) haben ihre Vorgänger abgelöst,
 * die Vorgängerdateien sind gelöscht. Weil jedes `Photo` sein `ratio` schon
 * vorher trug, kam beim Nachreichen nur `src` dazu; es hat sich nichts
 * verschoben.
 *
 * **Offen und bewusst so gelassen:** die drei Team-Fotos zeigen alle eine
 * abgewandte Person mit schulterlangem Haar in Schürze – sie lesen sich als
 * dieselbe Person und belegen weder Jontes Barbier- noch Aylins
 * Coloristen-Rolle. `role` und `text` der drei stehen unverändert; wer die
 * Bilder ersetzt, sollte beides zusammen prüfen.
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
      src: '/demo/friseur-platz.webp',
      alt: 'Ein Frisierstuhl vor einer hellen Holzablage, darüber ein hoher rechteckiger Spiegel; links fällt Tageslicht durch den Vorhang der bodentiefen Fensterfront',
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
      src: '/demo/friseur-werkzeug.webp',
      alt: 'Schere, Kamm und zwei Haarklammern auf einer hellen Holzablage, daneben ein gefaltetes graues Handtuch',
      placeholderLabel: 'Werkzeug',
    },
    {
      ratio: '1 / 1',
      src: '/demo/friseur-waschplatz.webp',
      alt: 'Waschbecken des Rückwärtswaschplatzes mit Chromarmatur, über den Rand hängt ein graues Handtuch',
      placeholderLabel: 'Waschplatz',
    },
    {
      ratio: '3 / 2',
      src: '/demo/friseur-wartebank.webp',
      alt: 'Wartebank aus Holz mit hellen Auflagen an einer grauen Wand, davor ein runder Beistelltisch und ein großer Zimmerbaum',
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
   * Termin-Attrappe unter `/demo/friseur/reservieren` (03.09.2026) – die
   * erste im LEISTUNGS-Modus: Schritt 1 zeigt `choices` statt Personenzahlen.
   * Buchbar sind die planbaren Standards; Strähnen, Balayage und Blondierung
   * fehlen mit Absicht – sie brauchen die Haarprobe, und die `choicesNote`
   * sagt das. Zeiten kommen aus `hours` (via `services[].hoursLabel`),
   * erfunden ist allein die Belegung.
   */
  booking: {
    title: 'Termin',
    intro:
      'Eine Vorschau darauf, wie eine Terminbuchung auf dieser Seite laufen könnte – fünf Schritte, und am Ende passiert nichts.',
    band: 'Vorschau · es wird kein Termin gebucht',
    hinweis:
      'Das hier ist eine Attrappe. Sie schickt nichts ab, spricht mit keinem Server und speichert nichts – auch nicht in deinem Browser. Ein Neuladen löscht jede Eingabe. Einen Termin im Wirbel gibt es per Telefon oder E-Mail.',
    entryLabel: 'Terminbuchung ansehen (Vorschau)',
    entryNote:
      'So könnte eine Online-Buchung auf dieser Seite aussehen. Die Strecke ist eine Vorschau und bucht nichts – einen Termin bekommst du über die beiden Wege oben.',
    ctaLabel: 'Termin buchen',

    noscript: {
      title: 'Diese Vorschau braucht JavaScript',
      body: 'Der Rest dieser Seite kommt ohne aus – nur diese Strecke nicht, weil sie deine Auswahl von Schritt zu Schritt mitführen muss. Gebucht hätte sie ohnehin nichts: Termine gibt es bei uns über Telefon oder E-Mail.',
    },

    choices: [
      { id: 'damenschnitt', label: 'Damenschnitt', note: '60 Min. · ab 49 €' },
      { id: 'herrenschnitt', label: 'Herrenschnitt', note: '45 Min. · 34 €' },
      { id: 'kinderschnitt', label: 'Kinderschnitt', note: '30 Min. · 24 €' },
      { id: 'ansatzfarbe', label: 'Ansatzfarbe', note: '90 Min. · 52 – 68 €' },
      { id: 'kopfmassage', label: 'Kopfmassage & Waschen', note: '20 Min. · 18 €' },
      { id: 'bart', label: 'Bart schneiden', note: '25 Min. · 19 €' },
    ],
    choicesNote:
      'Strähnen, Balayage und Blondierung brauchen vorher eine kurze Haarprobe – die vereinbarst du telefonisch, sie dauert zehn Minuten und kostet nichts.',

    slotStepMinutes: 30,
    slotLegend:
      'Beispielbelegung: welche Zeiten frei, knapp oder belegt sind, ist für diese Vorschau erfunden. In einer echten Umsetzung käme das aus dem Terminkalender.',
    slotStates: { busy: 'belegt', tight: 'fast voll' },
    dayNote:
      'Beispielwoche ohne Datum. Welche Tage geöffnet sind, kommt aus den Öffnungszeiten dieser Seite – die geschlossenen Tage stimmen also.',
    closedLabel: 'geschlossen',

    backLabel: 'Zurück',
    backToContactLabel: 'Zurück zum Kontakt',

    stepCounterLabel: 'Schritt {n} von {gesamt}',
    optionalLabel: '(optional)',
    timeSuffix: 'Uhr',
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
        title: 'Was steht an?',
        note: 'Vorschau: Deine Auswahl bleibt in diesem Browserfenster und wird nirgendwo hingeschickt.',
        action: 'Weiter zum Tag',
        actionNote: 'Es wird nichts gebucht – der Knopf blättert nur weiter.',
        error: 'Bitte wähle zuerst eine Leistung.',
      },
      day: {
        title: 'An welchem Tag?',
        note: 'Vorschau: eine Beispielwoche ohne Datum. Die geschlossenen Tage stammen aber aus den echten Öffnungszeiten dieser Seite.',
        action: 'Weiter zur Uhrzeit',
        actionNote: 'Kein Stuhl wird gehalten, kein Kalender gefragt.',
        error: 'Bitte wähle zuerst einen Tag.',
      },
      time: {
        title: 'Um wie viel Uhr?',
        note: 'Vorschau: die Zeiten sind aus den Öffnungszeiten gerechnet, wer schon belegt ist, ist erfunden.',
        action: 'Weiter zu deinen Angaben',
        actionNote: 'Auch jetzt ist noch nichts gebucht.',
        error: 'Bitte wähle zuerst eine Uhrzeit.',
      },
      guest: {
        title: 'Wie erreichen wir dich?',
        note: 'Vorschau: Was du hier eintippst, verlässt dein Gerät nicht. Es geht keine Mail raus und nichts wird gespeichert.',
        action: 'Anfrage abschicken (Vorschau)',
        actionNote: 'Dieser Knopf sendet nichts. Er zeigt dir nur, wie die Bestätigung aussähe.',
      },
    },

    fields: [
      {
        id: 'name',
        label: 'Name',
        type: 'text',
        autoComplete: 'name',
        required: true,
        error: 'Ohne Namen wüssten wir nicht, für wen der Termin ist.',
      },
      { id: 'telefon', label: 'Telefon', type: 'tel', inputMode: 'tel', autoComplete: 'tel' },
      { id: 'wunsch', label: 'Anmerkung', multiline: true },
    ],

    done: {
      title: 'So sähe deine Bestätigung aus',
      labels: {
        party: 'Leistung',
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
          'Kein Termin ist gebucht, kein Stuhl geblockt.',
          'Ein Neuladen dieser Seite löscht alles, was du eingetippt hast.',
        ],
        outlook:
          'In einer echten Umsetzung ginge an dieser Stelle eine Anfrage an den Salon – und die Zeiten kämen aus dem Terminkalender statt aus einer Beispielwoche.',
      },
      realTitle: 'So bekommst du wirklich einen Termin',
      restartLabel: 'Noch mal von vorn',
    },

    services: [
      {
        id: 'werktags',
        hoursLabel: 'Dienstag – Freitag',
        short: 'Di – Fr',
        // 09:00–18:30 minus 60 Minuten → letzter Termin 17:30.
        lastSeatingBeforeCloseMinutes: 60,
        busySlots: ['10:00', '15:30', '16:00'],
        tightSlots: ['09:30', '17:00'],
      },
      {
        id: 'samstag',
        hoursLabel: 'Samstag',
        short: 'Samstag',
        // 09:00–15:00 minus 60 Minuten → letzter Termin 14:00.
        lastSeatingBeforeCloseMinutes: 60,
        busySlots: ['09:30', '10:00', '11:30'],
        tightSlots: ['12:30'],
      },
    ],
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
          src: '/demo/friseur-team-mira.webp',
          alt: 'Von hinten aufgenommen: eine Person mit sehr kurzem dunklem Haar in hellgrauem Kittel hält Kamm und Schere, dahinter die helle Holzablage am Fenster',
          placeholderLabel: 'Mira',
        },
      },
      {
        id: 'jonte',
        name: 'Jonte Reisig',
        role: 'Stylist & Barbier',
        text: 'Kommt aus der Barbier-Ecke und hält an der langsamen Variante fest: erst Pinsel und heißes Tuch, dann rasieren. Macht die klassischen Nassrasuren und alles, was mit Übergängen zu tun hat. Wenn im Salon jemand über Fußball redet, ist er es.',
        photo: {
          ratio: '1 / 1',
          src: '/demo/friseur-team-jonte.webp',
          alt: 'Von hinten aufgenommen: ein Mann mit rasiertem Kopf in dunklem Shirt und Jeansschürze legt am Waschtisch einen Rasierpinsel neben ein gefaltetes Handtuch',
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
          src: '/demo/friseur-team-aylin.webp',
          alt: 'Von hinten aufgenommen: eine Person mit hochgestecktem langem Haar, in Schwarz und mit Einweghandschuh, rührt auf dem Rollwagen Farbe in einer weißen Schale an',
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
          src: '/demo/friseur-beratung.webp',
          alt: 'Eine Friseurin steht hinter einer sitzenden Kundin und nimmt ihr das trockene, offene Haar in die Hand, davor der Spiegel',
          placeholderLabel: 'Beratung',
        },
      },
      {
        id: 'handwerk',
        title: 'Warum es länger dauert',
        text: 'Wir haben drei Stühle und legen keine Termine übereinander. Das heißt: keine Farbe, die im Nebenraum einwirkt, während hier jemand wartet. Eine Blondierung bekommt bei uns vier Stunden und eine Haarprobe vorher – und wenn die Probe schlecht ausfällt, sagen wir ab, statt es trotzdem zu versuchen. Das kostet uns Termine und dir erspart es abgebrochenes Haar.',
        photo: {
          ratio: '4 / 5',
          src: '/demo/friseur-schnitt.webp',
          alt: 'Hände schneiden eine abgeteilte Strähne nassen Haars mit der Schere, zwischen den Fingern liegt der Kamm',
          placeholderLabel: 'Schnitt',
        },
      },
      {
        id: 'raum',
        title: 'Was nicht auf der Ablage steht',
        text: 'Die Ablage ist ein durchgehendes Brett, kein Tisch pro Stuhl – und darauf steht so wenig wie möglich. Der Platz, an dem du sitzt, war vorhin noch der von jemand anderem. Wir wischen ihn nach jedem Termin leer: kein fremdes Haar, keine Zeitschrift von vorgestern, keine halbleere Flasche vom Vorgänger. Was gebraucht wird, rollt auf dem Wagen dazu und wieder weg.',
        photo: {
          ratio: '3 / 2',
          src: '/demo/friseur-spiegelreihe.webp',
          alt: 'Zwei Mitarbeiterinnen richten die Arbeitsplätze her: drei hohe rechteckige Spiegel in hellen Holzrahmen über der durchgehenden Ablage, eine wischt sie leer, die andere schiebt den Rollwagen mit den Flaschen; rechts die bodentiefe Fensterfront ins Grüne',
          placeholderLabel: 'Die Ablage',
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
          'Auf der Terminseite liegt eine Vorschau-Strecke. Sie läuft vollständig in deinem Browser: nichts wird gesendet, nichts gespeichert – auch nicht im Browser selbst. Ein Neuladen löscht jede Eingabe. Ein Buchungssystem gibt es hier nicht; Termine laufen über Telefon oder E-Mail, also über ein Programm auf deinem eigenen Gerät. Deshalb steht hier auch kein Cookie-Banner – es gibt nichts, wozu du einwilligen müsstest.',
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
