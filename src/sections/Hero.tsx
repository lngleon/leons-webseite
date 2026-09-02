'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Counter from '@/components/Counter'
import HeroStage from '@/components/HeroStage'
import { withCodeTags } from '@/components/CodeTag'
import AuroraText from '@/components/AuroraText'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import { hero, heroSecondaryCta, heroStats } from '@/data/hero'
import { ctaItem } from '@/data/navigation'

/**
 * Generativer, code-basierter Hintergrund: weiche Violett-Blobs (Akzent über
 * --accent / --accent-solid, color-mix – nichts hardcoden), ein langsam
 * rotierender Lichtstrahl hinter der Showcase-Bühne (rechte Hälfte, ab lg)
 * und feines, statisches SVG-Korn. Alle Bewegung läuft per CSS-Keyframe auf
 * `transform` (Compositor-only); prefers-reduced-motion friert alles ein
 * (siehe globals.css).
 */
function HeroBackground() {
  const noiseId = 'hero-grain'
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Lichtstrahl: Conic-Verlauf mit breiten Stopps, Mittelpunkt hinter der
          Bühne (~72 % / 50 %), Radial-Maske blendet Zentrum und Außenrand
          weich aus. Größe in vmax, damit er auch bei 1900 px den Rand nicht
          zeigt. Nur ab lg – auf Mobil liegt die Bühne unter dem Text. */}
      <div
        className="hero-beam absolute left-[72%] top-1/2 hidden h-[120vmax] w-[120vmax] lg:block"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--accent) 16%, transparent) 34deg, transparent 76deg, transparent 180deg, color-mix(in oklab, var(--accent-solid) 13%, transparent) 214deg, transparent 258deg)',
          maskImage:
            'radial-gradient(closest-side, transparent 0%, #000 22%, #000 55%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(closest-side, transparent 0%, #000 22%, #000 55%, transparent 100%)',
        }}
      />
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
            'radial-gradient(circle, color-mix(in oklab, var(--accent-warm) 11%, transparent), transparent 70%)',
        }}
      />
      {/* Dritter, leiser Layer in der Mitte: mehr Tiefe zwischen den zwei
          Rand-Blobs, eigene (langsamere) Drift-Phase – gleiche Technik,
          gleiche Tokens, reduced-motion friert ihn mit ein. */}
      <div
        className="hero-blob-c absolute left-[28%] top-[30%] h-[50vh] w-[50vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%)',
        }}
      />
      {/* Dezentes Punktraster hinter der Showcase-Bühne (rechte Hälfte, per
          Maske weich auslaufend): statisches CSS-Pattern, kein Bild, kein JS. */}
      <div
        className="absolute inset-y-0 right-0 hidden w-1/2 opacity-35 lg:block"
        style={{
          backgroundImage:
            'radial-gradient(color-mix(in oklab, var(--foreground) 22%, transparent) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(closest-side at 65% 45%, #000, transparent)',
          WebkitMaskImage: 'radial-gradient(closest-side at 65% 45%, #000, transparent)',
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
  const reduce = useReducedMotionSafe()

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
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0, transition: { duration: 0 } } }
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

      {/* Stufe 2 (02.09.2026, Vorbild Ziegler: Typo als Buehne): die H1 steht
          allein ueber die volle Breite, darunter zwei Spalten (Lead + CTAs
          links, Buehne rechts), ganz unten die vier Zahlen als Band ueber die
          gesamte Breite. max-w-7xl nur im Hero – mehr Luft auf breiten Screens. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* H1 bewusst ohne Entrance-Opacity: LCP-Element sofort sichtbar (Mobil).
              Nur das Akzentwort bekommt den warmen Verlauf – als fliessender
              AuroraText (reine CSS-@keyframes, solider Fallback, reduced-motion
              = statisch). Groessen je Breite nachgemessen (kein Ueberlauf 320+). */}
          <h1 className="font-display max-w-5xl text-balance text-4xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            {hero.headline.split(hero.accentWord)[0]}
            <span className="aurora-warm">
              <AuroraText>{hero.accentWord}</AuroraText>
            </span>
            {hero.headline.split(hero.accentWord)[1] ?? ''}
          </h1>

          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <motion.p
                variants={item}
                className="entrance-anim text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {withCodeTags(hero.subline, ['Web-Apps'])}
              </motion.p>

              <motion.div variants={item} className="entrance-anim mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={ctaItem.href}
                  className="cta-gradient inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {ctaItem.label}
                </a>
                {/* Zweiter, ruhiger Weg: erst den Beweis ansehen, dann anfragen.
                    Ghost-Variante, flacher Akzent nur am Hover – der Primaer-CTA
                    bleibt der einzige gefuellte Knopf im Hero. */}
                <a
                  href={heroSecondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/60 hover:text-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {heroSecondaryCta.label}
                </a>
              </motion.div>
            </div>

            {/* Showcase-Buehne (gezeichnetes Interface, klickbar zu den echten
                Projekten). Eigene motion-Props (kein Variants-Kind): faedet als
                Ganzes ein. LCP-Hinweis bleibt: kaeme hier je ein BILD hinein,
                nie mit opacity 0 malen, nur `y` animieren. */}
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15, ease: 'easeOut' }}
              className="entrance-anim"
            >
              <HeroStage />
            </motion.div>
          </div>

          {/* Zahlen-Band: ueber die volle Breite, mit Haarlinie abgesetzt. */}
          <motion.div
            variants={item}
            role="list"
            className="entrance-anim mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 md:grid-cols-4"
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
      </div>
    </section>
  )
}
