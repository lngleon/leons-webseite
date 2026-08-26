import type { GastroBusiness } from '@/data/demo/types'

/**
 * Impressum-Platzhalter als Seitenfuss. Bewusst klein und ruhig – gehört auf
 * die Seite, soll aber nichts vom Rest wegnehmen.
 */
export default function DemoLegal({ business }: { business: GastroBusiness }) {
  return (
    <footer
      id="impressum"
      className="border-t border-border px-5 py-12 sm:px-8"
      aria-labelledby="impressum-titel"
    >
      <div className="mx-auto max-w-3xl">
        <h2 id="impressum-titel" className="demo-eyebrow">
          {business.legal.title}
        </h2>
        <div className="mt-4 space-y-1 text-[0.85rem] leading-relaxed text-muted-foreground">
          {business.legal.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="mt-5 max-w-prose border-t border-border pt-5 text-[0.78rem] leading-relaxed text-muted-foreground">
          {business.legal.note}
        </p>
      </div>
    </footer>
  )
}
