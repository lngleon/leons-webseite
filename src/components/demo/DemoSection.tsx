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
  children,
}: {
  id: string
  title: string
  note?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titel`}
      className="border-t border-border px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-3xl">
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
           */
          style={{ fontSize: 'clamp(1.75rem, 9vw, 3.5rem)' }}
        >
          {title}
        </h2>
        {note ? (
          <p className="mt-2 text-[0.82rem] text-muted-foreground">{note}</p>
        ) : null}
        {children}
      </div>
    </section>
  )
}
