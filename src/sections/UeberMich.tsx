import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
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
 *  <img> aus public/ → prerender-/SSR-sicher. Optimiert als WebP (~20 KB). */
function Portrait() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-muted">
      <img
        src="/leon-portrait.webp"
        alt="Porträtfoto von Leon Lang"
        width={768}
        height={960}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
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
          <motion.div variants={item}>
            <Portrait />
          </motion.div>

          {/* Text – rechts auf Desktop */}
          <motion.div variants={item}>
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
