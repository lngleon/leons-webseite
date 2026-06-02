import { Link } from 'react-router-dom'

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
        to="/"
        className="mt-10 inline-block text-sm text-accent transition-opacity hover:opacity-80"
      >
        ← Zurück zur Startseite
      </Link>
    </article>
  )
}
