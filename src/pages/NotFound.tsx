import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        Seite nicht gefunden
      </h1>
      <Link
        to="/"
        className="mt-8 text-sm text-accent transition-opacity hover:opacity-80"
      >
        ← Zurück zur Startseite
      </Link>
    </div>
  )
}
