import Hero from '@/sections/Hero'
import Problem from '@/sections/Problem'

/**
 * Startseite (Single-Page). Sektionen werden hier nacheinander eingehängt.
 * Reihenfolge: Hero → Problem → Leistungen → Über mich → Prozess → Projekte → Kontakt.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
    </>
  )
}
