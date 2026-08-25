'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import { about } from '@/data/about'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/** Porträt: gerahmte Hülle im Hochformat (4∶5), gefüllt mit dem echten Foto als
 *  object-cover-<img>. Die 4∶5-Box bleibt erhalten (kein Layout-Shift), `bg-muted`
 *  dient als ruhiger Platzhalter, bis das (lazy geladene) Bild da ist. Statisches
 *  Bild aus public/ über next/image (`fill` + object-cover in der relativen 4∶5-Box,
 *  responsives srcset via `sizes`) → statisch gerendert, SSR-sicher. Quelle ist
 *  bereits als WebP optimiert (~20 KB). */
function Portrait() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-muted">
      <Image
        src="/leon-portrait.webp"
        alt="Porträtfoto von Leon Lang"
        fill
        sizes="(max-width: 640px) 100vw, 384px"
        className="object-cover"
      />
    </div>
  )
}

export default function UeberMich() {
  return (
    <section id="ueber-mich" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center lg:gap-16"
        >
          {/* Foto – links auf Desktop, auf Mobil oben (DOM-Reihenfolge) */}
          <motion.div variants={item} className="entrance-anim">
            <Portrait />
          </motion.div>

          {/* Text – rechts auf Desktop */}
          <motion.div variants={item} className="entrance-anim">
            <SectionHeading
              align="left"
              eyebrow={about.eyebrow}
              title={about.title}
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
