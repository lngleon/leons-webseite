import { motion } from 'framer-motion'

/**
 * Startseite – aktuell nur die leere Single-Page-Hülle.
 * Die inhaltlichen Sektionen (Hero, Leistungen, … ) kommen in den
 * nächsten Tasks in src/sections und werden hier eingehängt.
 */
export default function Home() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        Grundgerüst bereit
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
        className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        Hier entsteht die Single-Page von Leon Lang.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 max-w-xl text-muted-foreground"
      >
        Layout, Theme-Umschaltung, Navigation und Footer stehen. Die Sektionen
        folgen in den nächsten Schritten.
      </motion.p>
    </div>
  )
}
