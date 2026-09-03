import type { GastroBusiness } from './types'

/**
 * Demo-Betrieb „Barbier Klinge" – KOMPLETT ERFUNDEN.
 *
 * Kein realer Betrieb, keine realen Personen (auch die drei im Team nicht).
 * Straße frei erfunden; Telefonnummer aus dem Berliner Block `030 23125 xxx`,
 * der für Film/Fernsehen reserviert ist und nie an echte Anschlüsse vergeben
 * wird; E-Mail auf der reservierten Test-Domain `.example`, die per Definition
 * nicht auflöst. Vor einem echten Einsatz: Name, Adresse, Nummer, Mail und die
 * Personen ersetzen.
 *
 * Die vierte Demo (03.09.2026) – und die erste, die von Anfang an mit ALLEM
 * entsteht, was die drei Vorgänger nacheinander bekommen haben: eigener
 * Token-Satz (`theme: 'barbier'` → tiefes Flaschengrün + gealtertes Messing,
 * der zweite dunkle Satz nach Glut), Team-Ebene, Dauer- und Preisformen der
 * Leistungen UND die Termin-Attrappe. Sie ist zugleich der erste Betrieb, der
 * den LEISTUNGS-Zweig des ersten Buchungsschritts nutzt (`booking.choices`
 * statt `partySizes` – ein Barbier fragt „was machen wir?", kein „wie viele
 * seid ihr?").
 *
 * **Fotos:** zehn Bilder aus `public/demo/` (`barbier-*.webp`), erzeugt am
 * 03.09.2026 (KI-generiert wie bei den Vorgängern), jedes in der real
 * gerenderten Größe auf lesbare Schriftzüge, Marken und erkennbare Gesichter
 * abgesucht. Die drei Team-Bilder trennen auf allen drei Achsen (Frisur,
 * Kleidung, Werkzeug) – die Lehre aus den drei ununterscheidbaren
 * Wirbel-Porträts. Im Wartebereichs-Foto hängt ein gezeichnetes
 * Frisuren-Schaubild mit stilisierten Köpfen – eine Illustration, kein Foto
 * einer realen Person; vermerkt, damit es niemand für ein übersehenes
 * Porträt hält.
 */
export const barbierKlinge: GastroBusiness = {
  slug: 'barbier',
  theme: 'barbier',
  name: 'Barbier Klinge',
  displayName: 'Klinge',
  kind: 'Barbershop & Rasierstube',
  tagline: 'Fester Schnitt, heißes Tuch, klare Kante.',
  intro:
    'Wir schneiden kurzes Haar und pflegen Bärte – mehr nicht, das aber richtig. Jeder Termin endet mit Nackenkontur und heißem Tuch, die Preise stehen an der Wand und ändern sich nicht an der Kasse. Wer ohne Termin kommt, bekommt einen Kaffee und eine ehrliche Wartezeit gesagt.',

  nav: {
    start: 'Start',
    menu: 'Preise',
    contact: 'Kontakt',
    about: 'Über uns',
  },

  hero: {
    photo: {
      ratio: '4 / 5',
      src: '/demo/barbier-stuhl.webp',
      alt: 'Einzelner Barbierstuhl aus schwarzem Leder vor einer Nussbaum-Ablage, darüber ein messinggerahmter Spiegel und eine Wandlampe an der flaschengrünen Wand',
      placeholderLabel: 'Der Stuhl',
    },
  },

  marquee: [
    'Konturen mit dem Messer',
    'Heißes Tuch bei jeder Rasur',
    'Feste Preise, keine Überraschungen',
    'Ohne Termin willkommen',
  ],

  gallery: [
    {
      ratio: '1 / 1',
      src: '/demo/barbier-werkzeug.webp',
      alt: 'Von oben: aufgeklapptes Rasiermesser, alte Handmaschine, Schere, schwarzer Kamm und ein gefaltetes grünes Handtuch auf dunklem Nussbaumholz',
      placeholderLabel: 'Werkzeug',
    },
    {
      ratio: '1 / 1',
      src: '/demo/barbier-tuch.webp',
      alt: 'Dampfendes, gerolltes weißes Tuch auf einem dunklen Holzbord, daneben Rasierpinsel und eine Keramikschale mit Rasierschaum, dahinter die grüne Wand mit Messinglampe',
      placeholderLabel: 'Heißes Tuch',
    },
    {
      ratio: '3 / 2',
      src: '/demo/barbier-raum.webp',
      alt: 'Drei schwarze Lederstühle in einer Reihe vor langer Nussbaum-Ablage und drei goldgerahmten Spiegeln, darüber Messing-Pendelleuchten, flaschengrüne Wände und Fischgrätparkett',
      placeholderLabel: 'Der Raum',
    },
  ],

  /**
   * Die Preisliste heisst hier „Preise" – der Titel kommt aus den Daten, das
   * Routen-Segment (`/karte`) bleibt für alle Betriebe gleich. Dieselbe
   * Entscheidung wie beim Friseur („Leistungen") und beim Restaurant
   * („Karten").
   *
   * `allergens` und `allergenNote` fehlen: hier wird nichts serviert.
   */
  menu: {
    title: 'Preise',
    note: 'Alle Preise in Euro, inklusive Mehrwertsteuer. Die Zeiten sind Richtwerte – wir hetzen weder dich noch uns.',
    categories: [
      {
        id: 'schnitt',
        title: 'Schnitt',
        note: 'Jeder Schnitt endet mit Nackenkontur und heißem Tuch.',
        items: [
          { name: 'Klassischer Schnitt', description: 'Schere und Maschine, Beratung inklusive', price: 32, durationMinutes: 45 },
          { name: 'Skin Fade', description: 'Übergang auf null – braucht seine Zeit, bekommt sie auch', price: 36, durationMinutes: 60 },
          { name: 'Maschinenschnitt', description: 'eine Länge, Kontur mit dem Messer', price: 19, durationMinutes: 20 },
          { name: 'Kinderschnitt', description: 'bis zwölf Jahre', price: 21, durationMinutes: 30 },
          { name: 'Nachschnitt', description: 'innerhalb von zwei Wochen nach deinem Termin', price: 12, durationMinutes: 15 },
        ],
      },
      {
        id: 'bart',
        title: 'Bart & Rasur',
        note: 'Konturen grundsätzlich mit dem Messer.',
        items: [
          { name: 'Bartschnitt mit Kontur', description: 'Maschine, Schere, Messer – je nachdem, was dein Bart braucht', price: 18, durationMinutes: 25 },
          { name: 'Klassische Nassrasur', description: 'heißes Tuch, Seife, Messer, kaltes Tuch', price: 32, durationMinutes: 45 },
          { name: 'Konturen nachziehen', description: 'zwischendurch, wenn der Bart noch sitzt', price: 10, durationMinutes: 15 },
        ],
      },
      {
        id: 'kombi',
        title: 'Kombis',
        note: 'Ein Termin, ein Preis.',
        items: [
          { name: 'Schnitt & Bart', description: 'Klassischer Schnitt plus Bartschnitt mit Kontur', price: 46, durationMinutes: 70 },
          { name: 'Das volle Programm', description: 'Skin Fade, Nassrasur, Augenbrauen, heißes Tuch', price: 62, durationMinutes: 105 },
          { name: 'Vater & Sohn', description: 'zwei Schnitte nacheinander, ein Termin', price: 48, durationMinutes: 75 },
        ],
      },
      {
        id: 'kleinigkeiten',
        title: 'Kleinigkeiten',
        note: 'Ohne Termin, wenn gerade ein Stuhl frei ist.',
        items: [
          { name: 'Augenbrauen', description: 'Messer oder Pinzette', price: 8, durationMinutes: 10 },
          { name: 'Nacken ausrasieren', description: 'zwischen zwei Terminen', price: 8, durationMinutes: 10 },
          { name: 'Waschen & Stylen', description: 'vor dem Abend, nach dem Sport', price: 14, durationMinutes: 20 },
        ],
      },
    ],
  },

  hours: {
    title: 'Öffnungszeiten',
    note: 'Mit Termin bist du sicher dran. Ohne Termin gilt: reinschauen, Wartezeit erfragen, Kaffee trinken.',
    entries: [
      { label: 'Dienstag – Freitag', days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
      { label: 'Samstag', days: ['Saturday'], opens: '09:00', closes: '16:00' },
      { label: 'Sonntag & Montag', days: ['Sunday', 'Monday'], closed: true },
    ],
  },

  location: {
    title: 'So findest du uns',
    street: 'Gerberzeile 8',
    postalCode: '10245',
    city: 'Berlin',
    country: 'DE',
    countryName: 'Deutschland',
    note: 'Ebenerdig, ohne Stufe an der Tür; die Wartebank steht direkt am Fenster. Parken ist in der Straße eng – die Bahn hält zwei Ecken weiter.',
    directionsLabel: 'Route öffnen',
  },

  contact: {
    title: 'Termin',
    phone: { display: '030 23125 503', e164: '+493023125503' },
    email: 'termin@barbier-klinge.example',
    reservation: {
      label: 'Anfrage schreiben',
      note: 'Anruf ist der schnellste Weg – dann sagen wir dir gleich, welcher Stuhl wann frei ist. Ohne Termin kommst du trotzdem rein; sag dir nur selbst ehrlich, ob du warten magst.',
      subject: 'Terminanfrage',
      body: 'Hallo Klinge,\n\nich hätte gern einen Termin.\n\nLeistung:\nWunschtag:\nUhrzeit (ungefähr):\nName:\n\nViele Grüße',
    },
  },

  /**
   * Termin-Attrappe unter `/demo/barbier/reservieren` – die erste mit dem
   * LEISTUNGS-Zweig des ersten Schritts (`choices` statt `partySizes`).
   * Zeiten stehen hier NICHT noch einmal: `services[].hoursLabel` zeigt auf
   * die Einträge in `hours` oben, `buildBookingWeek` rechnet das Raster.
   * Erfunden ist allein die BELEGUNG, und die Legende sagt das.
   */
  booking: {
    title: 'Termin',
    intro:
      'Eine Vorschau darauf, wie eine Terminbuchung auf dieser Seite laufen könnte – fünf Schritte, und am Ende passiert nichts.',
    band: 'Vorschau · es wird kein Termin gebucht',
    hinweis:
      'Das hier ist eine Attrappe. Sie schickt nichts ab, spricht mit keinem Server und speichert nichts – auch nicht in deinem Browser. Ein Neuladen löscht jede Eingabe. Einen Termin bei Klinge gibt es per Telefon oder E-Mail.',
    entryLabel: 'Terminbuchung ansehen (Vorschau)',
    entryNote:
      'So könnte eine Online-Buchung auf dieser Seite aussehen. Die Strecke ist eine Vorschau und bucht nichts – einen Termin bekommst du über die beiden Wege oben.',
    ctaLabel: 'Termin buchen',

    noscript: {
      title: 'Diese Vorschau braucht JavaScript',
      body: 'Der Rest dieser Seite kommt ohne aus – nur diese Strecke nicht, weil sie deine Auswahl von Schritt zu Schritt mitführen muss. Gebucht hätte sie ohnehin nichts: Termine gibt es bei uns über Telefon oder E-Mail.',
    },

    choices: [
      { id: 'schnitt', label: 'Klassischer Schnitt', note: '45 Min. · 32 €' },
      { id: 'fade', label: 'Skin Fade', note: '60 Min. · 36 €' },
      { id: 'maschine', label: 'Maschinenschnitt', note: '20 Min. · 19 €' },
      { id: 'bart', label: 'Bartschnitt mit Kontur', note: '25 Min. · 18 €' },
      { id: 'rasur', label: 'Klassische Nassrasur', note: '45 Min. · 32 €' },
      { id: 'kombi', label: 'Schnitt & Bart', note: '70 Min. · 46 €' },
    ],
    choicesNote:
      'Das volle Programm und alles ab einer Stunde buchst du am besten telefonisch – dann blocken wir den Stuhl lang genug.',

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
        title: 'Was dürfen wir machen?',
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
        error: 'Ohne Namen wüssten wir nicht, für wen der Stuhl ist.',
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
          'In einer echten Umsetzung ginge an dieser Stelle eine Anfrage an den Laden – und die Zeiten kämen aus dem Terminkalender statt aus einer Beispielwoche.',
      },
      realTitle: 'So bekommst du wirklich einen Termin',
      restartLabel: 'Noch mal von vorn',
    },

    services: [
      {
        id: 'werktags',
        hoursLabel: 'Dienstag – Freitag',
        short: 'Di – Fr',
        // 10:00–19:00 minus 45 Minuten → letzter Termin 18:00.
        lastSeatingBeforeCloseMinutes: 45,
        busySlots: ['17:00', '17:30', '18:00'],
        tightSlots: ['16:30'],
      },
      {
        id: 'samstag',
        hoursLabel: 'Samstag',
        short: 'Samstag',
        // 09:00–16:00 minus 45 Minuten → letzter Termin 15:00.
        lastSeatingBeforeCloseMinutes: 45,
        busySlots: ['10:00', '11:30', '12:00'],
        tightSlots: ['10:30', '14:30'],
      },
    ],
  },

  team: {
    title: 'Wer am Stuhl steht',
    lead: 'Drei Barbiere, drei Spezialgebiete. Sag beim Buchen, zu wem du willst – oder nimm den ersten freien Stuhl.',
    members: [
      {
        id: 'deniz',
        name: 'Deniz Arslan',
        role: 'Inhaber & Barbier',
        text: 'Hat den Laden 2019 aufgemacht und vorher acht Jahre in zwei Shops gestanden, in denen es schneller gehen musste, als ihm lieb war. Sein Fach sind die Übergänge – wenn der Fade nicht sitzt, fängt er von vorn an, nicht du beim nächsten Besuch.',
        photo: {
          ratio: '1 / 1',
          src: '/demo/barbier-team-deniz.webp',
          alt: 'Von hinten aufgenommen: ein breitschultriger Barbier mit kurz rasiertem Kopf, weißem T-Shirt und schwarzer Arbeitsschürze, in der rechten Hand eine Haarschneidemaschine',
          placeholderLabel: 'Deniz',
        },
      },
      {
        id: 'ruben',
        name: 'Ruben Thal',
        role: 'Barbier',
        text: 'Schneidet am liebsten mit der Schere und nimmt sich für die Beratung die ersten zehn Minuten, ohne dass die Uhr läuft. Wer nicht genau weiß, was er will, ist bei ihm am besten aufgehoben – er fragt so lange, bis es beide wissen.',
        photo: {
          ratio: '1 / 1',
          src: '/demo/barbier-team-ruben.webp',
          alt: 'Von hinten aufgenommen: ein schlanker Barbier mit dunklem, tief gebundenem Haarknoten und olivgrünem Hemd, in der Hand Schere und Kamm, vor ihm das helle Fenster mit Vorhang',
          placeholderLabel: 'Ruben',
        },
      },
      {
        id: 'marko',
        name: 'Marko Vidak',
        role: 'Rasur & Bart',
        text: 'Der Älteste im Laden und der Einzige, der die Nassrasur noch gelernt hat, als sie kein Comeback war. Bei ihm dauert die Rasur fünfundvierzig Minuten, und wer dabei einschläft, wird nicht geweckt – das Tuch bleibt so lange warm.',
        photo: {
          ratio: '1 / 1',
          src: '/demo/barbier-team-marko.webp',
          alt: 'Von hinten aufgenommen: ein Barbier mit kurzem grauem Lockenhaar, dunklem Langarmshirt und Jeansschürze, der gefaltete weiße Tücher auf ein dunkles Holzbord neben dem Waschbecken legt',
          placeholderLabel: 'Marko',
        },
      },
    ],
  },

  about: {
    title: 'Über uns',
    lead: 'Klinge gibt es, weil uns woanders das Drumherum zu viel und das Handwerk zu wenig geworden ist. Hier ist es umgekehrt.',
    blocks: [
      {
        id: 'bank',
        title: 'Die Bank am Fenster',
        text: 'Wer ohne Termin kommt, sitzt nicht auf einem Plastikstuhl im Weg, sondern auf der Lederbank am Fenster – mit Kaffee, Wasser und einer ehrlichen Ansage, wie lange es dauert. Manchmal heißt die Ansage auch: heute wird das nichts mehr. Das ist uns lieber, als dich eine Stunde vertrösten und dann durchhetzen.',
        photo: {
          ratio: '3 / 2',
          src: '/demo/barbier-wartebank.webp',
          alt: 'Wartebereich mit cognacbraunem Ledersofa vor flaschengrüner Wand, davor ein niedriger Holztisch mit Wasserkaraffe und Gläsern, daneben Messing-Stehlampe und Garderobenständer; an der Wand gerahmte Schwarz-Weiß-Drucke und ein gezeichnetes Frisuren-Schaubild',
          placeholderLabel: 'Die Bank',
        },
      },
      {
        id: 'uebergang',
        title: 'Der Übergang entscheidet',
        text: 'Einen Schnitt sieht man von vorn, einen guten Schnitt von hinten. Deshalb geht bei uns kein Kopf aus der Tür, bevor der Nacken nicht mit dem Spiegel abgenommen wurde – und wenn der Übergang beim zweiten Blick doch eine Stufe hat, wird er neu gemacht. Auf die Uhr schauen wir dabei nicht, auf den Hinterkopf schon.',
        photo: {
          ratio: '4 / 5',
          src: '/demo/barbier-nacken.webp',
          alt: 'Nahaufnahme von hinten: die Hände eines Barbiers ziehen mit der Maschine die Nackenkontur eines Kunden mit kurzem dunklem Haar und grauem Umhang nach, dahinter unscharf die grüne Wand mit Pendelleuchte',
          placeholderLabel: 'Am Nacken',
        },
      },
      {
        id: 'messer',
        title: 'Das Messer bleibt',
        text: 'Die Nassrasur ist das langsamste, was wir anbieten, und genau deshalb steht sie auf der Karte: heißes Tuch, Seife aus der Schale, Messer, kaltes Tuch – in dieser Reihenfolge, ohne Abkürzung. Die Messer werden bei uns im Laden abgezogen und gepflegt. Wer das einmal hatte, versteht, warum wir dafür keinen Aufpreis „express" verkaufen.',
        photo: {
          ratio: '3 / 2',
          src: '/demo/barbier-messer.webp',
          alt: 'Eine Hand zieht ein aufgeklapptes Rasiermesser mit blanker Klinge über einen hängenden Lederriemen, darunter eine dunkle Holzablage mit Keramiktasse und Rasierpinsel vor grüner Wand',
          placeholderLabel: 'Am Riemen',
        },
      },
    ],
    outro: {
      menuLabel: 'Zu den Preisen',
      contactLabel: 'Termin anfragen',
    },
  },

  legal: {
    title: 'Impressum',
    lines: [
      'Barbier Klinge (Musterbetrieb)',
      'Gerberzeile 8, 10245 Berlin',
      'Vertreten durch: Vorname Nachname',
      'Telefon: 030 23125 503',
      'E-Mail: termin@barbier-klinge.example',
      'Umsatzsteuer-ID: DE000000000',
      'Handwerkskammer: Musterkammer, Eintragung Nr. 000000',
    ],
    note: 'Platzhalter – dieser Betrieb ist frei erfunden, ebenso die drei Personen auf „Über uns". Für eine echte Seite kommen hier die Angaben nach § 5 DDG hin; ein Barbier gehört zum Friseurhandwerk und nennt zusätzlich seine Handwerkskammer sowie die Berufsbezeichnung und den Staat, in dem sie verliehen wurde.',
  },

  privacy: {
    title: 'Datenschutz',
    note: 'Mustertext einer Demo-Seite. „Barbier Klinge" ist ein erfundener Betrieb – es gibt keinen Verantwortlichen, an den sich eine Anfrage richten könnte. Der Text beschreibt, was diese Seite technisch tatsächlich tut, und ist ausdrücklich keine Rechtsberatung. Eine echte Seite braucht eine auf den Betrieb zugeschnittene Erklärung.',
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
          'Weil dieser Betrieb erfunden ist, gibt es hier niemanden, an den sich das richten könnte. Auf einer echten Seite stehen an dieser Stelle die Kontaktdaten des Verantwortlichen. Ein Laden, der Termine mit Namen und Telefonnummer notiert, beschreibt hier außerdem, wie lange er diese Notizen aufbewahrt.',
        ],
      },
    ],
  },

  /**
   * `BarberShop` ist ein echter schema.org-Typ (unter HealthAndBeautyBusiness)
   * – ihn als `HairSalon` auszuzeichnen wäre ungenau, als `Restaurant` falsch.
   */
  seo: {
    priceRange: '€€',
    schemaType: 'BarberShop',
  },
}
