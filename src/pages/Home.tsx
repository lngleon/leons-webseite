import Hero from '@/sections/Hero'

/**
 * Startseite (Single-Page). Sektionen werden hier nacheinander eingehängt.
 * Reihenfolge: Hero → Problem → Leistungen → Über mich → Prozess → Projekte → Kontakt.
 */
export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}
