import Hero from '@/sections/Hero'
import Problem from '@/sections/Problem'
import Leistungen from '@/sections/Leistungen'
import UeberMich from '@/sections/UeberMich'
import Prozess from '@/sections/Prozess'
import Projekte from '@/sections/Projekte'
import Statement from '@/sections/Statement'
import Kontakt from '@/sections/Kontakt'

/**
 * Startseite (Single-Page). Sektionen werden hier nacheinander eingehängt.
 * Reihenfolge: Hero → Problem → Leistungen → Über mich → Prozess → Projekte
 * → Statement → Kontakt.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Leistungen />
      <UeberMich />
      <Prozess />
      <Projekte />
      <Statement />
      <Kontakt />
    </>
  )
}
