import type { GastroBusiness } from '@/data/demo/types'
import { demoHref } from './routes'

/**
 * Schlanker Seitenfuß auf allen Demo-Seiten: Betriebsname, die zwei
 * Rechtslinks – und darunter der Rückweg auf Leons Seite.
 *
 * Bis zur Aufteilung stand hier das VOLLE Impressum – auf jeder Seite. Seit es
 * `/impressum` als eigene Seite gibt, wäre das dieselbe Angabe doppelt; der Fuß
 * verweist deshalb nur noch darauf. Die beiden Links stehen bewusst NICHT in
 * der Navigations-Pille: sechs Einträge in einer Leiste, die schon bei vier
 * scrollen muss, wäre unbrauchbar. Rechtslinks gehören ohnehin in den Fuß.
 *
 * Der Rückweg (27.08.2026) schließt eine Lücke, die die Vollständigkeit der
 * Demos versteckt hatte: von keiner der 19 Seiten führte ein Link zurück auf
 * `/`. Wer eine Demo geschickt bekam, sah, WAS gebaut wurde, aber nicht, WER
 * es gebaut hat – genau der Schritt, für den die Demos existieren.
 *
 * Warum hier unten und nicht im Kopf: die Demo soll sich weiter wie die Seite
 * eines echten Betriebs lesen. Ein „gebaut von"-Balken über der Navigation
 * würde die Seite in dem Moment als Muster entlarven, in dem sie wirken soll.
 * Unten ist der Hinweis genau dann da, wenn jemand fertig gelesen hat.
 *
 * Die Zeile steht deshalb AUSSERHALB der Zeile mit den Betriebsangaben und
 * durch eine eigene Trennlinie abgesetzt: sie gehört uns, nicht dem Betrieb.
 * Verlinkt ist nur der Name – „Musterseite – gebaut von" ist die Einordnung,
 * „Leon Lang" ist das Ziel. Kein „zurück": die Demo ist ein Schaufenster,
 * kein Unterordner, aus dem man aufsteigt.
 *
 * `rel="author"` ist gesetzt und keine Gewohnheit: es ist der einzige
 * Link-Typ des HTML-Standards, der diese Beziehung beschreibt („gives a link
 * to the author of the current document"), und genau das sagt der sichtbare
 * Text auch. Bewusst NICHT gesetzt sind `noopener`/`noreferrer` – beides sind
 * Gegenmittel für `target="_blank"` und hier wirkungslos, und `noreferrer`
 * würde zusätzlich den Referrer abschneiden, also das eine Signal, an dem in
 * Vercel Web Analytics zu sehen wäre, dass ein Besuch aus einer Demo kam.
 * Ebenfalls bewusst nicht: `nofollow`. Der Link ist gleicher Herkunft und
 * zeigt auf unsere eigene Startseite; die Demos sind ohnehin `noindex` und
 * nicht in der Sitemap, es fließt also nichts, was zu drosseln wäre.
 *
 * Die Tap-Fläche kommt ohne neue Regel zustande: `.demo-scope footer
 * .demo-fuss-link` in `demo.css` gibt jedem Fuß-Link `min-height:
 * var(--demo-tap)`, also dieselben 2,75 rem wie den Rechtslinks daneben.
 */
export default function DemoLegal({ business }: { business: GastroBusiness }) {
  return (
    <footer
      className="border-t border-border px-5 py-10 sm:px-8"
      aria-label={business.name}
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="demo-eyebrow">{business.name}</p>

          <nav aria-label={business.legal.title}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem]">
              <li>
                <a href={demoHref(business.slug, 'imprint')} className="demo-fuss-link">
                  {business.legal.title}
                </a>
              </li>
              <li>
                <a href={demoHref(business.slug, 'privacy')} className="demo-fuss-link">
                  {business.privacy.title}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Eigene Zeile, eigene Trennlinie – der Hinweis gehört uns, nicht dem
            Betrieb. Der Text ist fest und kommt bewusst NICHT aus den drei
            Datendateien: er ist für alle Betriebe derselbe und hätte dort
            dreimal gepflegt werden müssen. */}
        <p className="mt-8 border-t border-border pt-4 text-[0.8rem] text-muted-foreground">
          Musterseite – gebaut von{' '}
          <a href="/" rel="author" className="demo-fuss-link">
            Leon Lang
          </a>
        </p>
      </div>
    </footer>
  )
}
