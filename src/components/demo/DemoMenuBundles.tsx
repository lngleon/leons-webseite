import type { MenuBundle, MenuSection } from '@/data/demo/types'
import { bundleCourses, formatEuro } from './menu'

/**
 * Die Menü-Bündel einer Karte: mehrere Gänge zum Festpreis.
 *
 * Stehen unter den Gängen, nicht zwischen ihnen – erst liest man, was es gibt,
 * dann was es zusammen kostet. Optisch bewusst ein abgesetzter Kasten statt
 * einer weiteren Preislistenzeile: ein Bündel ist kein Gericht.
 *
 * Die Gänge stehen als NUMMERIERTE Liste (`<ol>`), weil die Reihenfolge hier
 * die Aussage ist – erst Vorspeise, dann Hauptgang, dann Nachtisch. Jeder
 * Eintrag ist ein Anker auf den Gang weiter oben, also ein normaler Link ohne
 * eine Zeile JavaScript; `.demo-anchor` an den Gang-Überschriften hält den
 * Sprung unter den beiden klebenden Leisten frei. Die Ziffern sind
 * `aria-hidden` – die Reihenfolge trägt bereits das `<ol>`.
 *
 * Die Titel kommen aus den Abschnitten selbst (`bundleCourses`), nicht aus dem
 * Bündel: ein umbenannter Gang muss so nur an einer Stelle gepflegt werden.
 *
 * Der Preis steht in einer EIGENEN Zeile unter der Liste und nicht neben dem
 * Namen. Grund ist die schmale Spalte: bei 320 px bleiben im Kasten rund
 * 240 px, „Menü Glut – vier Gänge" braucht in der Display-Schrift allein schon
 * mehr – Name und Preis nebeneinander hätten den Namen über drei Zeilen
 * gezogen, während die gepunktete Führungslinie mittig daneben steht. In der
 * eigenen Zeile trägt die Linie ein kurzes Label, genau wie in der Preisliste.
 */
export default function DemoMenuBundles({
  sections,
  bundles,
}: {
  sections: MenuSection[]
  bundles: MenuBundle[]
}) {
  return (
    <div className="mt-10 space-y-4">
      {bundles.map((bundle) => {
        const courses = bundleCourses(sections, bundle)

        return (
          <article
            key={bundle.id}
            aria-labelledby={`buendel-${bundle.id}`}
            className="border border-accent/40 bg-card px-5 py-5 sm:px-6"
          >
            <p className="demo-eyebrow text-[0.6rem]">Menü</p>

            <h4
              id={`buendel-${bundle.id}`}
              className="demo-display mt-2 text-foreground"
              style={{ fontSize: 'clamp(1.15rem, 5vw, 1.45rem)' }}
            >
              {bundle.name}
            </h4>

            {bundle.description ? (
              <p className="mt-2 text-[0.85rem] leading-snug text-muted-foreground">
                {bundle.description}
              </p>
            ) : null}

            <ol className="mt-4 space-y-1.5">
              {courses.map((course, index) => (
                <li key={course.id} className="flex items-baseline gap-3 text-[0.9rem]">
                  <span
                    aria-hidden="true"
                    className="demo-price w-4 shrink-0 text-[0.75rem] text-accent"
                  >
                    {index + 1}
                  </span>
                  <a href={`#gang-${course.id}`} className="demo-fuss-link">
                    {course.title}
                  </a>
                </li>
              ))}
            </ol>

            <div className="demo-leader mt-5 border-t border-border pt-4">
              <span className="demo-eyebrow text-[0.6rem]">Festpreis</span>
              <span aria-hidden="true" className="demo-leader__fill" />
              <span className="demo-price text-lg font-medium text-foreground">
                {formatEuro(bundle.price)}
              </span>
            </div>

            {bundle.note ? (
              <p className="mt-3 text-[0.8rem] leading-relaxed text-muted-foreground">
                {bundle.note}
              </p>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
