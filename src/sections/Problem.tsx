'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Card from '@/components/Card'
import SectionHeading from '@/components/SectionHeading'
import { problemHeading, problems } from '@/data/problems'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Problem() {
  return (
    <section id="problem" className="section-band py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="entrance-anim"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionHeading number="01" eyebrow="Das Problem" title={problemHeading} />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon
            // Chips wechseln zwischen Violett und dem warmen Zweitakzent –
            // dieselbe Flaechen-Sprache wie der CodeTag (10 % Fuellung, 25 % Rand).
            const chip =
              index % 2 === 0
                ? 'border-accent/25 bg-accent/10 text-accent group-hover:border-accent/50'
                : 'border-accent-warm/25 bg-accent-warm/10 text-accent-warm group-hover:border-accent-warm/50'
            return (
              <motion.article key={problem.title} variants={card} className="entrance-anim h-full">
                <Card className="flex h-full flex-col gap-4">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-200 ${chip}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {problem.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {problem.text}
                  </p>
                </Card>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
