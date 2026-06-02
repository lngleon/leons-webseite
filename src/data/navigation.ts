import type { NavItem } from '@/types'

/** Anker-Navigation der Single-Page. Die Sektionen folgen in späteren Tasks;
 *  die Anker (#…) werden dann auf der Startseite gesetzt. */
export const navItems: NavItem[] = [
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Über mich', href: '/#ueber-mich' },
  { label: 'Prozess', href: '/#prozess' },
  { label: 'Projekte', href: '/#projekte' },
  { label: 'Kontakt', href: '/#kontakt' },
]

export const ctaItem: NavItem = { label: 'Projekt anfragen', href: '/#kontakt' }
