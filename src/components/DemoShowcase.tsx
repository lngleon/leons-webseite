import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cardClassName } from '@/components/Card'
import { demoPreviews, demoShowcaseIntro } from '@/data/demos'

/**
 * Die drei Musterseiten als Kartenreihe – der stärkste Beleg auf
 * `/moeglichkeiten` und deshalb direkt unter dem Intro, VOR dem Bento-Grid.
 *
 * Alles darunter zeigt Effekte; das hier zeigt fertige Seiten. Läge der Block
 * hinter drei anderen Abschnitten, wäre der beste Beweis der Seite der, den
 * die wenigsten sehen.
 *
 * **Server-Komponente, bewusst ohne `'use client'`.** `Moeglichkeiten` ist eine
 * Client-Komponente; dieser Block wird ihr als fertiger Knoten hineingereicht,
 * damit die drei vollständigen Betriebs-Objekte (Karten, Zeiten, Rechtstexte)
 * auf dem Server bleiben und nicht für drei Überschriften ins Browser-Bundle
 * wandern. Siehe Kopfkommentar von `src/data/demos.ts`.
 *
 * **Die ganze Karte ist der Link, nicht ein „mehr"-Text am Ende.** Ein
 * `<a>` um Bild, Name und Zeile herum – die Fläche IST das Angebot. Das
 * `cardClassName`-Muster kommt unverändert von `Card`; nur der Knoten ist ein
 * `<a>` statt eines `<div>`, damit die Hover-Sprache dieselbe bleibt wie bei
 * jeder anderen Karte der Seite.
 *
 * **Gleicher Tab, kein `target="_blank"`.** Seit dem 27.08.2026 führt der Fuß
 * jeder Demo-Seite zurück auf `/`; ein neuer Tab wäre eine Krücke für einen
 * fehlenden Rückweg, den es nicht mehr gibt.
 */
export default function DemoShowcase() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {demoShowcaseIntro.title}
        </h2>
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {demoShowcaseIntro.subline}
        </p>
      </div>

      <ul className="grid w-full grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
        {demoPreviews.map((demo) => (
          <li key={demo.slug} className="flex">
            <a
              href={demo.href}
              className={`${cardClassName} flex w-full flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              {/* Voll-bleed oben wie bei den Projekte-Karten: die negativen
                  Margins heben das Card-Padding auf, die aspect-Box reserviert
                  den Platz vor dem Laden – kein Layout-Shift. */}
              <div className="-mx-6 -mt-6 mb-6 aspect-[8/5] overflow-hidden bg-muted sm:-mx-7 sm:-mt-7">
                <Image
                  src={demo.image}
                  alt={`Startseite der Musterseite ${demo.name}`}
                  width={demo.width}
                  height={demo.height}
                  // Im Browser gemessen statt geschätzt: 348 px ab `lg`
                  // (dreispaltig, gemessen 347,3), darunter einspaltig die
                  // volle Kartenbreite – das ist die Viewport-Breite abzüglich
                  // Seitenrand und Kartenrahmen, gemessen 750 bei 800 px und
                  // 286 bei 320 px.
                  sizes="(min-width: 1024px) 348px, (min-width: 640px) calc(100vw - 50px), calc(100vw - 34px)"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {demo.kind}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                {demo.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {demo.tagline}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Musterseite ansehen
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
