import Hero from '@/sections/Hero'
import Problem from '@/sections/Problem'
import Leistungen from '@/sections/Leistungen'
import UeberMich from '@/sections/UeberMich'
import Prozess from '@/sections/Prozess'
import Statement from '@/sections/Statement'
import Kontakt from '@/sections/Kontakt'

/**
 * Startseite (Single-Page). Sektionen werden hier nacheinander eingehängt.
 * Reihenfolge: Hero → Problem → Leistungen → Über mich → Prozess → (Projekte)
 * → Statement → Kontakt. Projekte folgt noch und wird vor dem Statement eingefügt.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Leistungen />
      <UeberMich />
      <Prozess />
      <Statement />
      <Kontakt />
    </>
  )
}
