'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { CardBody, CardContainer, CardItem } from '@/components/ui/Tilt'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

/**
 * Die Showcase-Bühne im Hero: eine gekippte Browser-Karte, die die fünf
 * Projekte langsam durchblendet, zwei tonige Karten mit Tiefe dahinter,
 * das Ganze neigt sich sanft zur Maus (bestehender `Tilt`).
 *
 * Warum das hier steht und nicht das Terminal: die Zielgruppe sind Cafés,
 * Salons, Gärtnereien – die wollen Websites sehen, keine Build-Ausgabe.
 * Das Terminal lebt weiter auf `/moeglichkeiten`, wo es als Technik-Beweis
 * hingehört.
 *
 * SSR-/Hydration-sicher: Server und erster Client-Frame rendern NUR Slide 0
 * (`active` 0, `ready` false); die übrigen Bilder hängen sich erst nach dem
 * Mount in den Baum – und nur, wenn sie je sichtbar werden (nicht unter
 * `prefers-reduced-motion`, dort steht Slide 0 statisch). Der Wechsel läuft
 * über CSS-Opacity (kein Layout, kein Reflow), Bildbox mit festem
 * Seitenverhältnis → kein CLS.
 *
 * **LCP-Regel (wie bei der H1):** die Bühne darf NICHT mit Opacity
 * einfaden. Chrome zählt für den LCP nur den ERSTEN Paint eines Elements –
 * ein Bild, das bei opacity 0 zum ersten Mal gemalt wird, ist für immer
 * raus, und der LCP springt auf den nächsten großen Paint (gemessen: 9,8 s
 * statt 2,7 s, Performance 42). Der Wrapper in `Hero.tsx` animiert deshalb
 * nur `y`, und die Slides > 0 mounten erst nach dem ersten Paint.
 *
 * WCAG 2.2.2 (Pause, Stop, Hide): der Wechsel pausiert bei Hover und bei
 * Tastaturfokus (zwei getrennte Zustände – eine Quelle darf die andere nicht
 * aufheben), lässt sich über einen echten Knopf anhalten (Touch!), läuft
 * nicht in Hintergrund-Tabs weiter und ist unter `prefers-reduced-motion`
 * komplett aus. Alle fünf Projekte sind ohnehin in der Projekte-Sektion
 * erreichbar – die Bühne ist Teaser, nicht einziger Zugang.
 */
export type StageSlide = {
  name: string
  branche: string
  kind: 'live' | 'muster'
  image: string
  width: number
  height: number
}

const INTERVAL_MS = 4200

export default function HeroStage({ slides }: { slides: StageSlide[] }) {
  const reduce = useReducedMotionSafe()
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  /** Vom Nutzer per Knopf angehalten – bleibt, bis er ihn wieder drückt. */
  const [stopped, setStopped] = useState(false)

  const rotating = !reduce && !hovered && !focused && !stopped && slides.length > 1

  // Die vier weiteren Slides erst nach dem Mount – und nur, wenn sie je
  // sichtbar werden. `reduce` aus dem Hook ist im ersten Effekt-Durchlauf
  // noch `false` (Hydration-Regel), deshalb hier die Media Query direkt
  // (Effekt = client-only, kein Render-Zugriff auf `window`).
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setReady(true)
  }, [])

  useEffect(() => {
    if (!rotating) return
    const timer = setInterval(() => {
      if (document.visibilityState !== 'visible') return
      setActive((i) => (i + 1) % slides.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [rotating, slides.length])

  const current = slides[active]

  return (
    <CardContainer containerClassName="w-full" className="w-full">
      <CardBody className="relative w-full pt-5 pb-4">
        {/* Zwei tonige Karten dahinter – reine Tiefe, keine Bilder (Bytes). Die
            Rotation sitzt auf einem INNEREN Div: `CardItem` schreibt sein
            translateZ als Inline-Transform und würde eine rotate-Klasse auf
            demselben Element überschreiben. Insets größer als der Rotations-
            Überhang → kein x-Überlauf bei 320 px. */}
        <CardItem translateZ={-30} className="pointer-events-none absolute inset-x-[5%] top-0">
          <div
            aria-hidden="true"
            className="aspect-[16/10] rotate-[3deg] rounded-2xl border border-border/60 bg-card/70"
          />
        </CardItem>
        <CardItem translateZ={-15} className="pointer-events-none absolute inset-x-[3%] top-2.5">
          <div
            aria-hidden="true"
            className="aspect-[16/10] -rotate-[1.5deg] rounded-2xl border border-border/70 bg-card/80"
          />
        </CardItem>

        <CardItem translateZ={40} className="relative">
          <a
            href="/#projekte"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="group/stage block overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-accent/15 transition-shadow duration-300 hover:shadow-accent/30 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* Browser-Kopfzeile – reine Kulisse, deshalb aria-hidden: sonst
                stünde der Projektname doppelt im Link-Namen. */}
            <div aria-hidden="true" className="flex items-center gap-3 border-b border-border px-4 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              </span>
              <span className="mx-auto flex h-6 min-w-0 max-w-[60%] items-center rounded-md bg-muted px-3 font-mono text-[11px] text-muted-foreground">
                <span className="truncate">{current.name}</span>
              </span>
              {/* Platzhalter in Knopfbreite, damit die URL-Pille mittig bleibt */}
              <span className="w-11" />
            </div>

            {/* Bildbühne: festes 16∶10, alle Slides gestapelt, Wechsel per Opacity */}
            <div className="relative aspect-[16/10] bg-muted">
              {slides.map((slide, i) =>
                ready || i === 0 ? (
                  <Image
                    key={slide.image}
                    src={slide.image}
                    alt=""
                    fill
                    preload={i === 0}
                    sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
                    className={`object-cover object-top transition-opacity duration-700 ease-out ${
                      i === active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ) : null,
              )}

              {/* Verlauf unten PLUS ein eigenes Panel unter der Beschriftung:
                  vier der fünf Screenshots sind hell, ein Verlauf allein reichte
                  bei 320 px nicht (Eyebrow brach um und lag im hellen Bild –
                  im Mobil-Check gesehen). Eyebrow bleibt einzeilig (truncate). */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/95 via-background/55 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-5">
                <div className="min-w-0 rounded-xl bg-background/70 px-3 py-2 backdrop-blur-sm">
                  <p className="truncate text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                    {current.kind === 'live' ? 'Live im Netz' : 'Musterseite'} · {current.branche}
                  </p>
                  <p className="mt-0.5 truncate text-lg font-semibold text-foreground sm:text-xl">
                    {current.name}
                  </p>
                </div>
                {/* Unter sm ausgeblendet: die ganze Karte ist der Link, bei 288 px
                    Kartenbreite ist die Pille nur Gedränge. */}
                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur transition-colors duration-200 group-hover/stage:border-accent/60 group-hover/stage:text-accent sm:inline-flex">
                  Alle Projekte
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>

              {/* Fortschritts-Punkte – rein informativ, nicht bedienbar */}
              <div aria-hidden="true" className="absolute right-4 top-4 flex gap-1.5 sm:right-5">
                {slides.map((slide, i) => (
                  <span
                    key={slide.image}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? 'w-5 bg-accent' : 'w-1.5 bg-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </a>

          {/* Anhalten/Fortsetzen – GESCHWISTER des Links (kein Button im <a>),
              44×44-Tap-Fläche in der Kopfzeile. Für Touch-Nutzer der einzige
              Weg, die Rotation zu stoppen (Hover/Fokus haben sie nicht). Unter
              reduced-motion gibt es nichts anzuhalten → kein Knopf. */}
          {!reduce && slides.length > 1 && (
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              aria-pressed={stopped}
              aria-label={stopped ? 'Projektwechsel fortsetzen' : 'Projektwechsel anhalten'}
              className="absolute right-1 top-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              {stopped ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}
