'use client'

import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import ContactForm from '@/components/ContactForm'
import { InstagramIcon, WhatsAppIcon } from '@/components/BrandIcons'
import { contactIntro, directChannels } from '@/data/contact'
import type { DirectChannelKey } from '@/data/contact'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const channelIcon: Record<DirectChannelKey, ComponentType<{ className?: string }>> = {
  email: Mail,
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
}

function DirectContact() {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-foreground">Lieber direkt?</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Kein Formular-Typ? Erreich mich einfach direkt – ich antworte schnell.
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {directChannels.map((channel) => {
          const Icon = channelIcon[channel.key]
          return (
            <li key={channel.key}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition duration-200 ease-out hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 motion-safe:hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {/* Akzent-gewaschener Icon-Chip (bg/border wie CodeTag-Sprache):
                    die direkten Wege dürfen prominenter einladen als bisher. */}
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors duration-200 group-hover:border-accent/50">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">
                    {channel.label}
                  </span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {channel.description}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent"
                  aria-hidden="true"
                />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Kontakt() {
  return (
    <section id="kontakt" className="section-band py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="entrance-anim"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionHeading number="06"
            eyebrow={contactIntro.eyebrow}
            title={contactIntro.title}
            description={contactIntro.subline}
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16"
        >
          {/* Formular – links auf Desktop, auf Mobil oben. Der Glow dahinter
              macht den Abschluss der Seite zum Moment: statischer radialer
              Akzent-Schein (Tokens/color-mix wie Card-Glow), -z-10 hinter der
              Formular-Karte, aria-hidden, kein JS, kein Repaint. */}
          {/* `isolate` ist tragend, nicht kosmetisch: ohne eigenen Stacking-
              Context fällt das -z-10-Kind in den Root-Context und malt HINTER
              dem opaken section-band/bg-background – der Glow wäre im
              Endzustand unsichtbar (im Review empirisch nachgewiesen). */}
          <motion.div variants={item} className="entrance-anim relative isolate">
            {/* Horizontal schmaler als vertikal: -inset-x bleibt unter dem
                Seiten-Padding (16/24 px), sonst entsteht bei 320 px ein
                x-Überlauf (nachgemessen: -inset-8 ergab 16 px). */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-3 -inset-y-8 -z-10 rounded-[2.5rem] sm:-inset-x-5 md:-inset-x-8"
              style={{
                background:
                  'radial-gradient(38rem 22rem at 50% 30%, color-mix(in oklab, var(--accent) 13%, transparent), transparent 70%)',
              }}
            />
            <ContactForm />
          </motion.div>

          {/* Direkte Wege – rechts auf Desktop */}
          <motion.div variants={item} className="entrance-anim">
            <DirectContact />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
