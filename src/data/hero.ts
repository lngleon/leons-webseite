import { site } from './site'

export const hero = {
  headline: site.tagline,
  /** Wort der Headline, das den Akzent-Gradient bekommt (nicht die ganze Headline). */
  accentWord: 'spürbar',
  subline:
    'Moderne Webseiten, Web-Apps und KI-Integration – individuell für dich programmiert, von der Idee bis zum Launch. Alles aus einer Hand.',
} as const

/** Zweiter, ruhiger CTA neben dem Primär-CTA – führt zum Beweis (Projekte-Sektion). */
export const heroSecondaryCta = {
  label: 'Projekte ansehen',
  href: '/#projekte',
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

/* ── Terminal (seit 31.08.2026 auf /moeglichkeiten, vorher im Hero) ──
   Vier Tabs: der reale Stack, der reale Next-Build, der Deploy-Weg
   (Push → Vercel) und „whoami".

   ANONYMISIERUNG (gilt unverändert weiter): im öffentlich sichtbaren Output
   stehen KEINE echten Konto-/Repo-/Deploy-Identifier – stattdessen sprechende
   Dummies (`dein-projekt`, `https://deine-seite.de`). Auch die gezeigten
   Routen sind generische Beispiele und bewusst NICHT die echten Routen dieser
   Seite – die stille Route soll hier nicht auftauchen.

   KEINE erfundenen Messwerte: der Build-Tab zeigt die Form der Next-Ausgabe
   (`○` = statisch vorgerendert), aber keine ausgedachten Bundle-Größen oder
   Sekundenzahlen. Zeilenzahl je Tab bewusst wie gehabt (build = 7 Zeilen, das
   ist der Default-Tab und bestimmt die Panel-Höhe). */

export type TerminalLineKind = 'cmd' | 'out' | 'ok'

export type TerminalLine = {
  kind: TerminalLineKind
  text: string
}

export type TerminalTab = {
  key: string
  label: string
  lines: TerminalLine[]
}

export const terminalTabs: TerminalTab[] = [
  {
    key: 'install',
    label: 'install',
    lines: [
      { kind: 'cmd', text: 'npx create-next-app@latest dein-projekt --ts --tailwind --app' },
      { kind: 'out', text: '✓ Projekt erstellt' },
      { kind: 'cmd', text: 'npm install framer-motion lucide-react' },
      { kind: 'out', text: '✓ Abhängigkeiten installiert' },
      { kind: 'ok', text: '✓ Stack bereit: Next.js · React · TypeScript · Tailwind · Framer Motion' },
    ],
  },
  {
    key: 'build',
    label: 'build',
    lines: [
      { kind: 'cmd', text: 'npm run build' },
      { kind: 'out', text: '▲ Next.js – Production Build' },
      { kind: 'out', text: '✓ Compiled successfully' },
      { kind: 'out', text: 'Route (app)' },
      { kind: 'out', text: '○ /                      prerendered' },
      { kind: 'out', text: '○ /kontakt               prerendered' },
      { kind: 'ok', text: '✓ Alle Seiten statisch – kein Server nötig' },
    ],
  },
  {
    key: 'deploy',
    label: 'deploy',
    lines: [
      { kind: 'cmd', text: 'git push origin main' },
      { kind: 'out', text: '→ GitHub: dein-projekt (main)' },
      { kind: 'out', text: 'Vercel: Auto-Deploy läuft …' },
      { kind: 'ok', text: '✓ Production: https://deine-seite.de' },
      { kind: 'ok', text: '✓ Deployment ready' },
    ],
  },
  {
    key: 'whoami',
    label: 'whoami',
    lines: [
      { kind: 'cmd', text: 'whoami' },
      { kind: 'out', text: 'Leon Lang — Webentwickler & KI-Integration' },
      { kind: 'out', text: 'Webseiten · Web-Apps & Tools · Redesign · KI-Integration' },
      { kind: 'out', text: '1 Person, voller Stack – von der Idee bis zum Launch' },
      { kind: 'ok', text: '„Veränderungen, die spürbar werden."' },
    ],
  },
]

/** Standard-Tab beim Laden. */
export const defaultTerminalTab = 'build'
