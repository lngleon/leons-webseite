import { Marquee } from '@/components/ui/Marquee'
import { branchen, branchenIntro } from '@/data/branchen'

/**
 * Branchen-Laufband direkt unter dem Hero. Server-Komponente: das Band ist
 * reine CSS-Animation (`Marquee`), kein State – reduced-motion friert es
 * über das bestehende Gate in `globals.css` ein. Nicht ganz „kein JS": die
 * lucide-Icons sind intern Client-Komponenten und hydrieren (12 × 4
 * Wiederholungen); das SVG-Markup steht aber bereits im Server-HTML.
 *
 * a11y: `Marquee` wiederholt seine Kinder viermal, damit die Schleife nahtlos
 * läuft – für Screenreader wäre das viermal dieselbe Liste. Deshalb ist das
 * Band `aria-hidden` und die Liste steht EINMAL als `sr-only`-<ul> daneben.
 */
export default function Branchen() {
  return (
    <section aria-labelledby="branchen-label" className="border-y border-border/60 py-6 sm:py-7">
      <p
        id="branchen-label"
        className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
      >
        {branchenIntro}
      </p>

      <ul className="sr-only">
        {branchen.map((b) => (
          <li key={b.label}>{b.label}</li>
        ))}
      </ul>

      <div className="relative mt-4">
        <Marquee aria-hidden="true" pauseOnHover className="[--duration:48s] [--gap:0.75rem]">
          {branchen.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-kante border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90"
            >
              {/* Ein Akzent seit 02.09.2026 – vorher wechselten die Icons
                  zwischen Violett und dem warmen Zweitakzent. */}
              <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
              {label}
            </span>
          ))}
        </Marquee>
        {/* Rand-Verläufe für ein edles Aus-/Einblenden (wie das Werkzeugkasten-Band) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background sm:w-32" />
      </div>
    </section>
  )
}
