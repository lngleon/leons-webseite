import type { NavItem } from '@/types'

/**
 * Hauptnavigation.
 *
 * Fünf der sechs Einträge sind ANKER auf der Startseite und stehen deshalb als
 * absoluter Pfad mit Raute (`/#leistungen`), nicht als blosses `#leistungen`:
 * so führen sie auch von einer Unterseite aus zuerst auf `/` und landen dort
 * am richtigen Abschnitt. Die Navbar rendert sie als einfaches `<a>` (kein
 * `next/link`) – der Browser macht daraus eine echte Navigation samt
 * Sprungmarke, ohne dass der Client-Router den Hash nachträglich auflösen muss.
 *
 * `Möglichkeiten` (seit 27.08.2026) ist der einzige Eintrag, der eine eigene
 * ROUTE ist. Er steht direkt hinter `Leistungen`, weil er dessen Beleg ist:
 * erst was ich baue, dann wie es aussieht, wenn es gebaut ist.
 *
 * Bewusst NICHT hier: die drei Demo-Betriebe einzeln. Die Leiste trägt sechs
 * Ziele plus Logo und CTA; drei weitere daneben wären keine Navigation mehr,
 * sondern eine Liste. Die Demos sind Belege, und ihr Platz dafür ist der
 * Kartenblock auf `/moeglichkeiten`.
 */
export const navItems: NavItem[] = [
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Möglichkeiten', href: '/moeglichkeiten' },
  { label: 'Über mich', href: '/#ueber-mich' },
  { label: 'Prozess', href: '/#prozess' },
  { label: 'Projekte', href: '/#projekte' },
  { label: 'Kontakt', href: '/#kontakt' },
]

export const ctaItem: NavItem = { label: 'Projekt anfragen', href: '/#kontakt' }
