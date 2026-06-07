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
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors duration-200 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-accent transition-colors duration-200 group-hover:border-accent/50">
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
    <section id="kontakt" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionHeading
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
          {/* Formular – links auf Desktop, auf Mobil oben */}
          <motion.div variants={item}>
            <ContactForm />
          </motion.div>

          {/* Direkte Wege – rechts auf Desktop */}
          <motion.div variants={item}>
            <DirectContact />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
