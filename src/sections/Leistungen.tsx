import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Card from '@/components/Card'
import SectionHeading from '@/components/SectionHeading'
import ServiceDiagram from '@/components/ServiceDiagram'
import { services, servicesHeading } from '@/data/services'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Leistungen() {
  return (
    <section id="leistungen" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionHeading
            eyebrow={servicesHeading.eyebrow}
            title={servicesHeading.title}
            description={servicesHeading.subline}
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {services.map((service) => (
            <motion.article key={service.title} variants={card} className="h-full">
              <Card highlight={service.highlight} className="flex h-full flex-col gap-4">
                <ServiceDiagram kind={service.diagram} icon={service.icon} />
                <h3 className="text-base font-semibold text-foreground sm:text-lg">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.text}
                </p>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
