import type { ReactNode } from 'react'

/**
 * Gemeinsamer Abschnittsrahmen der Demo-Seite: Überschrift in der
 * Display-Schrift, optionale Notiz, dünne Trennlinie darüber.
 * Hält den Rhythmus der Seite an EINER Stelle.
 */
export default function DemoSection({
  id,
  title,
  note,
  wide = false,
  split = false,
  children,
}: {
  id: string
  title: string
  note?: string
  /**
   * Breite Bahn (1152 px) statt Lesespalte (768 px). Für Abschnitte, die auf
   * dem Desktop ein eigenes Raster aufspannen – Bilder, der Karten-Auszug.
   * Reiner Fliesstext (Rechtsseiten, „Über uns") bleibt schmal: eine 1152 px
   * breite Textzeile liest sich nicht.
   */
  wide?: boolean
  /**
   * Kopf links, Inhalt rechts (ab 60 rem, setzt `wide` voraus). Für kurze
   * Blöcke wie Adresse oder Öffnungszeiten: untereinander gestapelt ergaben
   * drei davon eine sehr lange Seite für sehr wenig Inhalt.
   */
  split?: boolean
  children: ReactNode
}) {
  const kopf = (
    <>
      <h2
        id={`${id}-titel`}
        className="demo-display text-foreground"
        /**
         * 9vw statt der früheren 8.2vw – die alte Zahl war für die
         * System-Serife gemessen und gilt seit dem Umstieg auf Fraunces
         * (26.08.2026) nicht mehr.
         *
         * Neu gemessen bei 320 px am längsten vorhandenen Display-String
         * („ÖFFNUNGSZEITEN", 280 px Container): Fraunces braucht **9,198 px
         * Breite je px Schriftgröße**, die alte Serife brauchte 10,34 – also
         * rund 11 % mehr. Der Sweep in echtem Layout:
         *   8.2vw → 28,00 px → 257,6 px  (22,4 px Reserve)
         *   9.0vw → 28,80 px → 264,9 px  (15,1 px Reserve)  ← gewählt
         *   9.4vw → 30,08 px → 276,7 px  ( 3,3 px Reserve)
         *   9.6vw → 30,72 px → bricht auf DREI Zeilen um
         * Gewählt sind 9vw und nicht die messbare Obergrenze 9.4vw: 5,4 %
         * Reserve überleben auch Safari/Firefox, 1,2 % nicht zwingend.
         *
         * Zu beachten: bei 320 px gewinnt bis 8.75vw die clamp-UNTERGRENZE
         * (1.75rem = 28 px) – jeder Wert darunter ändert dort gar nichts.
         * Und selbst wenn es zu eng würde, zieht die Seite sich NICHT mehr
         * horizontal auf: `hyphens: auto` + `overflow-wrap` in `.demo-display`
         * brechen das Wort um (bei 9.6vw verifiziert, Seitenüberlauf 0 px).
         *
         * OBERGRENZE seit 02.09.2026 4rem statt 3.5rem. Die alte Zahl war für
         * eine 768 px breite Spalte gemessen; in der 1152-px-Bahn las sich
         * eine 56-px-Überschrift wie eine Zwischenzeile. 64 px liegt im
         * Korridor, den die Vorbilder für Abschnittstitel fahren (56–64 px).
         * Nur Fenster ab ~711 px sehen den Unterschied – darunter gewinnt
         * weiterhin 9vw, die Handy-Messung oben bleibt also gültig.
         */
        style={{ fontSize: 'clamp(1.75rem, 9vw, 4rem)' }}
      >
        {title}
      </h2>
      {note ? (
        <p className="demo-lese mt-3 text-[0.9rem] text-muted-foreground">{note}</p>
      ) : null}
    </>
  )

  return (
    <section
      id={id}
      aria-labelledby={`${id}-titel`}
      className="demo-abschnitt border-t border-border"
    >
      {/* Ohne `split` bleibt das Markup ZEICHENGLEICH zu vorher: Kopf und
          Inhalt liegen direkt im Container, ohne zusätzlichen Knoten. Die
          beiden Hüllen entstehen nur dort, wo das Zweispalten-Raster sie als
          Gitterzellen braucht. */}
      <div
        className={
          wide ? (split ? 'demo-bahn demo-teiler' : 'demo-bahn') : 'mx-auto max-w-3xl'
        }
      >
        {split ? (
          <>
            <div>{kopf}</div>
            <div>{children}</div>
          </>
        ) : (
          <>
            {kopf}
            {children}
          </>
        )}
      </div>
    </section>
  )
}
