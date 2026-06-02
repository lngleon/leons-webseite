import { Link } from 'react-router-dom'

export default function Impressum() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Impressum
      </h1>
      <p className="mt-6 text-muted-foreground">
        Platzhalter – die rechtlichen Angaben werden zu einem späteren Zeitpunkt
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
