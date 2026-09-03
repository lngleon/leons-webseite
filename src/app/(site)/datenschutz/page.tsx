import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata, routeMeta } from '@/data/meta'

export const metadata: Metadata = pageMetadata(routeMeta.datenschutz)

export default function Datenschutz() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Datenschutzerklärung
      </h1>
      <p className="mt-6 text-muted-foreground">
        Platzhalter – die Datenschutzerklärung wird zu einem späteren Zeitpunkt
        ergänzt.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block rounded-sm text-sm text-accent transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        ← Zurück zur Startseite
      </Link>
    </article>
  )
}
