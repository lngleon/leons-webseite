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
/* Seit 02.09.2026 (Vorbilder-Mischung; User: Foto NICHT im Hero, sondern hier):
   die Karten-Buehne aus dem Hero-Entwurf – Licht dahinter (violett oben, warm
   unten), weicher Akzent-Schatten und zwei schwebende Mono-Chips mit den echten
   Rollen aus dem whoami-Text. Chips/Licht rein dekorativ (aria-hidden bzw.
   reiner Text), das Bild selbst bleibt unveraendert lazy in der 4:5-Box. */
function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Der zweifarbige Akzent-Halo hinter dem Porträt ist am 02.09.2026
          ersatzlos entfallen. Tiefe kommt jetzt aus dem tragenden Rand und
          dem neutralen Schatten des Bildes, nicht aus farbigem Schein. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-kante border border-border-stark bg-muted shadow-2">
        <Image
          src="/leon-portrait.webp"
          alt="Porträtfoto von Leon Lang"
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover"
        />
      </div>
      <span className="absolute -left-3 top-6 inline-flex items-center gap-1.5 rounded-kante border border-border-stark bg-card px-3 py-1.5 font-mono text-[11px] text-foreground sm:-left-6">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-punkt bg-accent" />
        Webseiten &amp; Web-Apps
      </span>
      <span className="absolute -right-2 bottom-8 inline-flex items-center gap-1.5 rounded-kante border border-accent bg-card px-3 py-1.5 font-mono text-[11px] text-foreground sm:-right-5">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-punkt bg-accent" />
        KI-Integration
      </span>
    </div>
  )
}

export default function UeberMich() {
  // overflow-x-clip an der Sektion: das Portraet-Licht (negativer Inset) darf
  // auf schmalen Viewports keinen horizontalen Scroll erzeugen; clip statt
  // hidden, damit kein neuer Scroll-Container entsteht.
  return (
    <section id="ueber-mich" className="overflow-x-clip py-24 sm:py-32">
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
            <SectionHeading number="03"
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
