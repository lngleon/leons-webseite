import { Globe, LayoutTemplate, Search, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Problem = {
  icon: LucideIcon
  title: string
  text: string
}

export const problemHeading = 'Kommt dir das bekannt vor?'

export const problems: Problem[] = [
  {
    icon: Globe,
    title: 'Keine oder veraltete Webseite',
    text: 'Wer dich googelt, findet nichts Überzeugendes – oder gar nichts.',
  },
  {
    icon: Search,
    title: 'Unsichtbar im Netz',
    text: 'Kunden suchen nach dir und landen bei der Konkurrenz.',
  },
  {
    icon: LayoutTemplate,
    title: 'Wirkt unprofessionell',
    text: 'Baukasten-Optik lässt dich kleiner wirken, als du bist.',
  },
  {
    icon: Wallet,
    title: 'Teure Agenturen',
    text: 'Tausende Euro, Wochen Wartezeit, am Ende nur ein Template.',
  },
]
