import { LayoutDashboard, Monitor, Paintbrush, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/** Welches lebende Schaubild die Karte zeigt. */
export type DiagramKind = 'browser' | 'app' | 'redesign' | 'chat'

export type Service = {
  icon: LucideIcon
  title: string
  text: string
  /** Lebendes Schaubild der Karte (zeigt die Leistung, keine erfundenen Zahlen). */
  diagram: DiagramKind
  /** Highlight-Leistung – Akzent dauerhaft aktiv (KI-Integration). */
  highlight?: boolean
}

export const servicesHeading = {
  eyebrow: 'Leistungen',
  title: 'Das baue ich für dich.',
  subline:
    'Von der ersten Webseite bis zur KI-Funktion – alles aus einer Hand.',
} as const

export const services: Service[] = [
  {
    icon: Monitor,
    title: 'Webseiten',
    text: 'Moderne, schnelle Webseiten, individuell programmiert statt Baukasten. Sie repräsentieren dich oder dein Unternehmen so, wie du gesehen werden willst.',
    diagram: 'browser',
  },
  {
    icon: LayoutDashboard,
    title: 'Web-Apps & Tools',
    text: 'Maßgeschneiderte Anwendungen, die dir Arbeit abnehmen: vom Buchungssystem über Dashboards bis zum internen Tool, genau auf deinen Ablauf zugeschnitten.',
    diagram: 'app',
  },
  {
    icon: Paintbrush,
    title: 'Redesign & Modernisierung',
    text: 'Deine bestehende Seite wirkt veraltet oder ist kaum auffindbar? Ich bringe sie technisch und optisch auf den neuesten Stand.',
    diagram: 'redesign',
  },
  {
    icon: Sparkles,
    title: 'KI-Integration',
    text: 'Intelligente Funktionen, die deine Seite vom Standard abheben: smarte Assistenten und individuelle KI-Features, die echten Mehrwert schaffen.',
    diagram: 'chat',
    highlight: true,
  },
]
