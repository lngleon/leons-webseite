import type { ReactNode } from 'react'

/**
 * Gemeinsamer Rahmen der beiden Rechtsseiten (Impressum, Datenschutz).
 *
 * Der Musterhinweis steht bewusst GANZ OBEN und sichtbar abgesetzt, nicht klein
 * am Fuß: der Betrieb ist erfunden, und wer die Seite in einem Kundengespräch
 * sieht, soll das lesen, bevor er den Rest liest.
 *
 * Beide Seiten laufen absichtlich schmaler als der Rest der Demo
 * (`max-w-2xl`) – Rechtstexte sind Lesetext, keine Schaufensterfläche.
 */
export default function DemoLegalPage({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: ReactNode
}) {
  return (
    <section className="px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
      <div className="mx-auto max-w-2xl">
        <h1
          className="demo-display text-foreground"
          style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)' }}
        >
          {title}
        </h1>

        <p className="demo-hinweis mt-6">{note}</p>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
