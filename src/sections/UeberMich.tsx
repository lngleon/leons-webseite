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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-full"
        style={{
          background:
            'radial-gradient(58% 58% at 45% 32%, color-mix(in oklab, var(--accent) 26%, transparent), transparent 74%), radial-gradient(48% 48% at 70% 92%, color-mix(in oklab, var(--accent-warm) 14%, transparent), transparent 72%)',
        }}
      />
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl shadow-accent/25">
        <Image
          src="/leon-portrait.webp"
          alt="Porträtfoto von Leon Lang"
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover"
        />
      </div>
      <span className="absolute -left-3 top-6 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-background/85 px-3 py-1.5 font-mono text-[11px] text-foreground backdrop-blur sm:-left-6">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        Webseiten &amp; Web-Apps
      </span>
      <span className="absolute -right-2 bottom-8 inline-flex items-center gap-1.5 rounded-full border border-accent-warm/40 bg-background/85 px-3 py-1.5 font-mono text-[11px] text-foreground backdrop-blur sm:-right-5">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-warm" />
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
