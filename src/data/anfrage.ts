/**
 * Der geführte Anfrage-Flow („Umfrage") der Kontakt-Sektion.
 *
 * ALLE Texte und Antwortmöglichkeiten stehen hier – die Komponente
 * `src/components/AnfrageFlow.tsx` ist rein datengetrieben. Eine Frage
 * ergänzen, umbenennen oder streichen heißt: nur diese Datei anfassen.
 *
 * `feld` ist der Schlüssel, unter dem die Antwort bei Formspree landet und
 * damit die Zeile, die in Leons Mail steht. Deshalb sprechende deutsche
 * Namen statt technischer IDs.
 */

export type AnfrageOption = {
  id: string
  label: string
}

export type AnfrageFrage = {
  id: string
  /** Feldname im Formspree-Payload = Zeilenbeschriftung in der Mail. */
  feld: string
  title: string
  note: string
  /** true → Mehrfachauswahl (Checkboxen statt Radios). */
  mehrfach?: boolean
  /** Meldung, wenn nichts gewählt wurde. */
  error: string
  options: AnfrageOption[]
}

export const anfrageFragen: AnfrageFrage[] = [
  {
    id: 'art',
    feld: 'Projektart',
    title: 'Was soll entstehen?',
    note: 'Eine Antwort reicht – ändern können wir das im Gespräch immer noch.',
    error: 'Wähl bitte aus, worum es ungefähr geht.',
    options: [
      { id: 'neu', label: 'Eine neue Webseite' },
      { id: 'redesign', label: 'Redesign meiner bestehenden Seite' },
      { id: 'app', label: 'Eine Web-App oder ein Tool' },
      { id: 'ki', label: 'KI in bestehende Abläufe bringen' },
      { id: 'unklar', label: 'Weiß ich noch nicht genau' },
    ],
  },
  {
    id: 'ziele',
    feld: 'Ziele',
    title: 'Was soll sie für dich tun?',
    note: 'Mehrfachauswahl – such dir alles aus, was zutrifft.',
    mehrfach: true,
    error: 'Wähl bitte mindestens ein Ziel aus.',
    options: [
      { id: 'anfragen', label: 'Mir Anfragen bringen' },
      { id: 'gefunden', label: 'Dafür sorgen, dass ich gefunden werde' },
      { id: 'wirkung', label: 'Professionell und hochwertig wirken' },
      { id: 'termine', label: 'Termine oder Reservierungen annehmen' },
      { id: 'arbeiten', label: 'Meine Arbeiten und Referenzen zeigen' },
      { id: 'erklaeren', label: 'Meine Leistungen verständlich erklären' },
    ],
  },
  {
    id: 'stand',
    feld: 'Ausgangslage',
    title: 'Was ist schon da?',
    note: 'Nichts davon ist Voraussetzung – es sagt mir nur, wo wir starten.',
    error: 'Sag mir kurz, wo du gerade stehst.',
    options: [
      { id: 'null', label: 'Noch nichts – ich fange bei null an' },
      { id: 'inhalte', label: 'Texte und Bilder liegen bereit' },
      { id: 'altseite', label: 'Eine alte Seite läuft noch' },
      { id: 'marke', label: 'Logo und Look stehen schon' },
    ],
  },
  {
    id: 'zeit',
    feld: 'Zeitrahmen',
    title: 'Wie eilig ist es?',
    note: 'Grobe Richtung genügt – ich plane danach meine Antwort.',
    error: 'Wähl bitte einen ungefähren Zeitrahmen.',
    options: [
      { id: 'sofort', label: 'So schnell wie möglich' },
      { id: 'wochen', label: 'In den nächsten Wochen' },
      { id: 'jahr', label: 'Irgendwann dieses Jahr' },
      { id: 'offen', label: 'Kein festes Datum' },
    ],
  },
]

export const anfrageCopy = {
  /** {n} / {gesamt} werden ersetzt. */
  counter: 'Schritt {n} von {gesamt}',
  start: 'Anfrage starten',
  weiter: 'Weiter',
  zurueck: 'Zurück',
  senden: 'Anfrage senden',
  sendet: 'Wird gesendet…',
  /** Wechsel zum klassischen Formular und zurück. */
  zumFreitext: 'Lieber frei schreiben? Zum normalen Formular',
  zumFlow: 'Lieber Schritt für Schritt? Zum geführten Fragebogen',
  kontakt: {
    title: 'Wohin darf ich antworten?',
    note: 'Letzter Schritt. Deine Angaben gehen nur an mich – kein Newsletter, keine Weitergabe.',
    zusammenfassung: 'Deine Angaben',
    nachricht: {
      label: 'Noch etwas, das ich wissen sollte?',
      optional: '(optional)',
      placeholder: 'Beispiel, Wunschtermin, Budgetrahmen, Fragen …',
    },
  },
  /** Eigene Bestätigung: „Nachricht" (contactMessages.success) passt zum
   *  freien Formular, nicht zu einer beantworteten Fragenstrecke. */
  erfolg:
    'Danke für deine Anfrage! Ich schaue mir deine Angaben an und melde mich zeitnah bei dir.',
  neueAnfrage: 'Noch eine Anfrage stellen',
} as const
