import { site } from './site'

export const hero = {
  headline: site.tagline,
  subline:
    'Moderne Webseiten, Web-Apps und KI-Integration – individuell für dich programmiert, von der Idee bis zum Launch. Alles aus einer Hand.',
} as const

export type HeroStat = {
  /** Zahl, auf die hochgezählt wird. */
  value: number
  /** Optionales Suffix (z.B. "%"). */
  suffix?: string
  /** Beschriftung unter der Zahl. */
  label: string
}

export const heroStats: HeroStat[] = [
  { value: 2, label: 'Live-Projekte' },
  { value: 3, label: 'Tools entwickelt' },
  { value: 100, suffix: '%', label: 'individuell programmiert' },
  { value: 1, label: 'Person, voller Stack' },
]
