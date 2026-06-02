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

/** Porträt-Platzhalter: gerahmte Hülle im Hochformat (4∶5), bereit für das echte
 *  Bild in Phase 3. Dann einfach den Inhalt durch ein
 *  <img className="absolute inset-0 h-full w-full object-cover" … /> ersetzen. */
function PortraitPlaceholder() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-muted">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="text-5xl font-semibold tracking-tight text-muted-foreground">
          LL
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
          Porträt folgt
        </span>
      </div>
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
          {/* Foto-Platzhalter – links auf Desktop, auf Mobil oben (DOM-Reihenfolge) */}
          <motion.div variants={item}>
            <PortraitPlaceholder />
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
