import TextAnimation from '@/components/TextAnimation'

/**
 * Statement – stilles Scroll-Reveal direkt vor „Kontakt" (below the fold).
 * Zwei nacheinander einblendende Zeilen; „deine" im Akzent-Gradient über den
 * zentralen Showcase-Helper `.accent-gradient-text` (Tokens, nichts hardcoden),
 * der Rest flach. Reveal-Mechanik (blur + fade + y, SSR-/reduced-motion-sicher)
 * komplett in `TextAnimation`. Bewusst keine Überschrift/Eyebrow – die zwei
 * Zeilen sind die Aussage.
 */
export default function Statement() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <TextAnimation
          as="p"
          direction="up"
          classname="mx-auto max-w-3xl text-balance text-center text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
        >
          <span>Nicht noch eine Seite von der Stange.</span>
          <span>
            Sondern <span className="accent-gradient-text">deine</span>.
          </span>
        </TextAnimation>
      </div>
    </section>
  )
}
