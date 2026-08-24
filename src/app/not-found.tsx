import Link from 'next/link'

/**
 * 404 – ersetzt die frühere Catch-all-Route `path="*"`. Anders als in der SPA
 * liefert Next hier jetzt auch einen echten HTTP-404 aus.
 */
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
        href="/"
        className="mt-8 inline-block rounded-sm text-sm text-accent transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        ← Zurück zur Startseite
      </Link>
    </div>
  )
}
