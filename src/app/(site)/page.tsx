import type { Metadata } from 'next'
import Hero from '@/sections/Hero'
import Branchen from '@/sections/Branchen'
import Problem from '@/sections/Problem'
import Leistungen from '@/sections/Leistungen'
import UeberMich from '@/sections/UeberMich'
import Prozess from '@/sections/Prozess'
import Projekte from '@/sections/Projekte'
import Statement from '@/sections/Statement'
import Kontakt from '@/sections/Kontakt'
import { demoPreviews } from '@/data/demos'
import { pageMetadata, routeMeta } from '@/data/meta'

export const metadata: Metadata = pageMetadata(routeMeta.home)

/**
 * Startseite (Single-Page). Sektionen werden hier nacheinander eingehängt.
 * Reihenfolge: Hero → Branchen-Band → Problem → Leistungen → Über mich →
 * Prozess → Projekte → Statement → Kontakt.
 *
 * `demoPreviews` wird HIER (Server) geladen und Projekte als Prop
 * hineingereicht – `src/data/demos.ts` darf nicht in Client-Komponenten
 * importiert werden (zieht die vollen Betriebs-Objekte, siehe dortiger
 * Kopfkommentar). Serialisiert werden nur die kleinen Preview-Objekte.
 * (Die Hero-Bühne brauchte sie vorübergehend auch – seit sie ein fiktives,
 * gezeichnetes Interface zeigt, nicht mehr.)
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Branchen />
      <Problem />
      <Leistungen />
      <UeberMich />
      <Prozess />
      <Projekte muster={demoPreviews} />
      <Statement />
      <Kontakt />
    </>
  )
}
