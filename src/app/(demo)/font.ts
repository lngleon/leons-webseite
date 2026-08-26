import localFont from 'next/font/local'

/**
 * Display-Schrift der Demo-Seiten: **Fraunces 72pt SemiBold**, lokal gehostet.
 *
 * Ausgewählt aus drei Kandidaten (Fraunces, Young Serif, Instrument Serif) nach
 * gemessenen Kriterien – Auswahl und verworfene Kandidaten stehen in
 * `docs/CURRENT-SCHEMA.md`. Der entscheidende Punkt war das GEWICHT: `.demo-display`
 * setzt `font-weight: 600`, und nur Fraunces liefert dafür einen echten Schnitt
 * (`usWeightClass 600`). Young Serif und Instrument Serif gibt es nur in 400 –
 * der Browser hätte den Fettschnitt rechnen müssen (Faux Bold, verschmierte
 * Konturen) oder das Design hätte sein Gewicht ändern müssen.
 *
 * Bewusst der STATISCHE 72pt-Schnitt und NICHT die Variable-Font-Datei: die trägt
 * vier Achsen (`opsz`, `wght`, `SOFT`, `WONK`), die hier keine gebraucht wird, und
 * wiegt nach demselben Latin-Subset 122,2 KB statt 18,2 KB – also das 6,7-Fache.
 *
 * Die Datei liegt IM REPO (`./fonts/…woff2`), nicht bei Google. Die harte Zusage
 * der Demo lautet „0 Fremd-Requests"; ein CDN-Webfont würde sie brechen. `next/font/local`
 * emittiert die Datei nach `/_next/static/media/` – gleiche Herkunft wie die Seite.
 *
 * Lizenz: SIL Open Font License 1.1 (Copyright 2018 The Fraunces Project Authors).
 * Die Lizenz erlaubt Einbettung und Weitergabe ausdrücklich, verlangt aber, dass
 * jede Kopie sie mitführt – deshalb liegt `./fonts/OFL-Fraunces.txt` daneben.
 * Die Datei NICHT löschen, auch wenn sie im Build nicht gebraucht wird.
 *
 * **Reserved Font Name: KEINER – geprüft am 26.08.2026.** Die OFL definiert den
 * Begriff als „any names specified as such after the copyright statement(s)".
 * Die Copyright-Zeile von Fraunces lautet vollständig
 *
 *     Copyright 2018 The Fraunces Project Authors (https://github.com/undercasetype/Fraunces)
 *
 * und danach folgt nur der Standard-Lizenztext – kein `with Reserved Font Name
 * "…"`; die Zeichenkette kommt in der ganzen Datei null Mal vor.
 *
 * Das ist relevant, weil unsere Datei durch das Latin-Subsetting eine „Modified
 * Version" im Sinne der Lizenz ist („any derivative made by adding to, deleting,
 * or substituting … any of the components of the Original Version"). Klausel 3
 * verbietet Modified Versions das Führen der Reserved Font Names – gäbe es hier
 * welche, hätten wir umbenennen müssen. Da es keine gibt, greift die Klausel
 * nicht und der Name darf bleiben. Unabhängig davon heisst die Familie im
 * ausgelieferten CSS ohnehin `demoDisplay` (von `next/font` vergeben), der
 * Originalname wird den Nutzern also gar nicht präsentiert – und genau darauf
 * schränkt Klausel 3 sich ein („only applies to the primary font name as
 * presented to the users").
 */
export const demoDisplay = localFont({
  src: './fonts/Fraunces72pt-SemiBold-latin.woff2',
  weight: '600',
  style: 'normal',
  display: 'swap',
  variable: '--font-demo-display',
  /**
   * Der Kern des CLS-Versprechens. Next erzeugt daraus eine zweite
   * `@font-face`-Regel für die Ersatzschrift und rechnet `size-adjust`,
   * `ascent-override`, `descent-override` und `line-gap-override` aus den
   * Metriken UNSERER Datei gegen die des Metrik-Spenders aus. Dadurch belegt der
   * Text vor und nach dem Laden exakt dieselbe Fläche – trotz `display: swap`.
   *
   * Spender ist `Times New Roman` und NICHT der Vorgabewert `Arial`: Fraunces ist
   * eine Serife, und der Ersatz muss in Laufweite und Höhen in derselben Liga
   * liegen, sonst rechnet die Korrektur gegen die falsche Grundlage.
   */
  adjustFontFallback: 'Times New Roman',
  /** Greift nur, falls die Datei gar nicht lädt – dann wieder der System-Stack von vorher. */
  fallback: ['ui-serif', 'Georgia', 'Iowan Old Style', 'Palatino Linotype', 'Palatino', 'Times New Roman', 'serif'],
})
