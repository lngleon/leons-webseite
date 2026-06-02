import Hero from '@/sections/Hero'
import Problem from '@/sections/Problem'
import Leistungen from '@/sections/Leistungen'
import UeberMich from '@/sections/UeberMich'

/**
 * Startseite (Single-Page). Sektionen werden hier nacheinander eingehängt.
 * Reihenfolge: Hero → Problem → Leistungen → Über mich → Prozess → Projekte → Kontakt.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Leistungen />
      <UeberMich />
    </>
  )
}
