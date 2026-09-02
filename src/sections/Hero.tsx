'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Counter from '@/components/Counter'
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

      {/* max-w-7xl statt 6xl (nur der Hero): mehr Luft für die Bühne auf
          breiten Screens; die Spalten bleiben 1:1 – „Veränderungen," bei
          72 px (494 px) braucht ab xl mindestens 512 px Spaltenbreite. */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Text + Zähler */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          {/* H1 bewusst ohne Entrance-Opacity: LCP-Element sofort sichtbar (Mobil).
              Nur das Akzentwort bekommt den Gradient – als fließender AuroraText
              (reine CSS-@keyframes, solider Fallback, reduced-motion = statisch). */}
          {/* Größer für den ersten Eindruck, aber 7xl erst ab xl: bei 72px
              misst „Veränderungen," 494 px und überliefe die Grid-Spalte
              zwischen 1024 und ~1130 px (nachgemessen, Spalte 442 px bei
              1024). Mobil bleibt 4xl – bei 320 px muss das Wort in die
              Spalte passen (ebenfalls nachgemessen). */}
          <h1 className="font-display text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            {hero.headline.split(hero.accentWord)[0]}
            {/* Akzentwort im WARMEN Verlauf (Vorbild-Mischung) – gleiche
                Aurora-Technik, nur der Verlauf kommt per Variable aus dem
                Zweitakzent (.aurora-warm, siehe globals.css). */}
            <span className="aurora-warm">
              <AuroraText>{hero.accentWord}</AuroraText>
            </span>
            {hero.headline.split(hero.accentWord)[1] ?? ''}
          </h1>

          <motion.p
            variants={item}
            className="entrance-anim mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
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
                Ghost-Variante, flacher Akzent nur am Hover – der Primär-CTA
                bleibt der einzige gefüllte Knopf im Hero. */}
            <a
              href={heroSecondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/60 hover:text-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {heroSecondaryCta.label}
            </a>
          </motion.div>

          <motion.div
            variants={item}
            role="list"
            className="entrance-anim mt-12 grid grid-cols-2 gap-x-6 gap-y-8"
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

        {/* Leon als Person in den Hero (User-Entscheidung 02.09.2026, wie bei
            den Vorbildern): Portraet-Karte mit Glow und zwei schwebenden
            Chips. Ersetzt auf diesem Branch die gezeichnete Showcase-Buehne
            (HeroStage) – Entscheidung darueber faellt mit dem Redesign.
            WICHTIG (LCP): das Bild wird NIE mit opacity 0 gemalt – nur `y`
            wird animiert (Lehre aus der frueheren Bild-Fassung), dazu
            `priority`, damit Next es sofort laedt. */}
        <motion.div
          initial={reduce ? { y: 0 } : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.1, ease: 'easeOut' }}
          className="entrance-anim relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          {/* Licht hinter der Karte: violett oben, warm unten – die Mischung. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 rounded-full"
            style={{
              background:
                'radial-gradient(58% 58% at 45% 32%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 74%), radial-gradient(48% 48% at 70% 92%, color-mix(in oklab, var(--accent-warm) 16%, transparent), transparent 72%)',
            }}
          />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-accent/25">
            <Image
              src="/leon-portrait.webp"
              alt="Leon Lang – Porträt"
              width={880}
              height={1100}
              priority
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 100vw"
              className="h-auto w-full object-cover"
            />
            {/* Abdunklung unten, damit der Namens-Chip auf jedem Foto traegt (R44). */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
              style={{
                background:
                  'linear-gradient(180deg, transparent, color-mix(in oklab, var(--background) 92%, transparent))',
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold text-foreground">Leon Lang</p>
                <p className="text-xs text-muted-foreground">Webentwickler &amp; KI-Integration</p>
              </div>
              <span aria-hidden="true" className="mb-1 inline-flex h-2.5 w-2.5 rounded-full bg-accent-warm" />
            </div>
          </div>
          {/* Zwei schwebende Chips wie beim Vorbild – Inhalte sind die echten
              Rollen aus dem whoami-Text, nichts erfunden. Mono = Label-Stimme. */}
          <span className="absolute -left-4 top-6 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-background/85 px-3 py-1.5 font-mono text-[11px] text-foreground backdrop-blur sm:-left-8">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Webseiten &amp; Web-Apps
          </span>
          <span className="absolute -right-3 bottom-20 inline-flex items-center gap-1.5 rounded-full border border-accent-warm/40 bg-background/85 px-3 py-1.5 font-mono text-[11px] text-foreground backdrop-blur sm:-right-6">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-warm" />
            KI-Integration
          </span>
        </motion.div>
      </div>
    </section>
  )
}
