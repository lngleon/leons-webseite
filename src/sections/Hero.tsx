import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Counter from '@/components/Counter'
import Terminal from '@/components/Terminal'
import { hero, heroStats } from '@/data/hero'
import { ctaItem } from '@/data/navigation'

/**
 * Generativer, code-basierter Hintergrund: weiche Violett-Blobs (Akzent über
 * --accent / --accent-solid, color-mix – nichts hardcoden) + feines, statisches
 * SVG-Korn. Blob-Drift läuft per CSS-Keyframe (GPU-leicht); prefers-reduced-motion
 * friert alles ein (siehe index.css). Pro Mode adaptiv, weil der Akzent pro Mode
 * andere Werte hat und der Untergrund die Seiten-Hintergrundfarbe ist.
 */
function HeroBackground() {
  const noiseId = 'hero-grain'
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="hero-blob-a absolute -left-[12%] -top-[18%] h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--accent) 20%, transparent), transparent 70%)',
        }}
      />
      <div
        className="hero-blob-b absolute -bottom-[22%] -right-[12%] h-[65vh] w-[65vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--accent-solid) 16%, transparent), transparent 70%)',
        }}
      />
      {/* Feines Korn: prozedurales SVG (gekacheltes feTurbulence), statisch & günstig. */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.08] mix-blend-soft-light">
        <defs>
          <filter id={noiseId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves={2}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern
            id={`${noiseId}-tile`}
            width="140"
            height="140"
            patternUnits="userSpaceOnUse"
          >
            <rect width="140" height="140" filter={`url(#${noiseId})`} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${noiseId}-tile)`} />
      </svg>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()

  // Entrance gated auf reduced-motion: dann „statisches Frame" (kein Versatz/Fade).
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  }
  const item: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      }

  return (
    <section
      id="start"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Text + Zähler */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          {/* H1 bewusst ohne Entrance-Opacity: LCP-Element sofort sichtbar (Mobil).
              Nur das Akzentwort bekommt den Gradient (Text-Clip mit solidem Fallback). */}
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {hero.headline.split(hero.accentWord)[0]}
            <span className="accent-gradient-text">{hero.accentWord}</span>
            {hero.headline.split(hero.accentWord)[1] ?? ''}
          </h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {hero.subline}
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <a
              href={ctaItem.href}
              className="cta-gradient inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {ctaItem.label}
            </a>
          </motion.div>

          <motion.div
            variants={item}
            role="list"
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                role="listitem"
                aria-label={`${stat.value}${stat.suffix ?? ''} – ${stat.label}`}
                className="flex flex-col"
              >
                <span aria-hidden="true" className="mb-2 h-px w-8 bg-accent" />
                <span
                  aria-hidden="true"
                  className="accent-gradient-text text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm"
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15, ease: 'easeOut' }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}
