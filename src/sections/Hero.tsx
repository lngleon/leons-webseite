import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Counter from '@/components/Counter'
import { hero, heroStats } from '@/data/hero'
import { ctaItem } from '@/data/navigation'

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="start"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
    >
      {/* Dezenter Akzent-Glow im Hintergrund – nur über --accent. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--accent), transparent 60%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        <motion.h1
          variants={item}
          className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {hero.subline}
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <a
            href={ctaItem.href}
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {ctaItem.label}
          </a>
        </motion.div>

        <motion.div
          variants={item}
          role="list"
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 md:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              role="listitem"
              aria-label={`${stat.value}${stat.suffix ?? ''} – ${stat.label}`}
              className="flex flex-col items-center"
            >
              <span aria-hidden="true" className="mb-3 h-px w-8 bg-accent" />
              <span
                aria-hidden="true"
                className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span
                aria-hidden="true"
                className="mt-2 max-w-[8rem] text-xs uppercase tracking-wider text-muted-foreground sm:text-sm"
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
