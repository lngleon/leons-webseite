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
          style={{ fontSize: 'clamp(1.75rem, 8.2vw, 3.5rem)' }}
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
