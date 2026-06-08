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

/* ── Terminal-Hero ──────────────────────────────────────────────
   Vier Tabs mit ECHTEM Output (kein Fake): der reale Stack, der reale
   Vite-Build, der echte Deploy-Weg (Push → Vercel) und „whoami". */

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
      { kind: 'cmd', text: 'npm create vite@latest leons-webseite -- --template react-ts' },
      { kind: 'out', text: '✓ Projekt erstellt' },
      { kind: 'cmd', text: 'npm install react react-dom react-router-dom framer-motion' },
      { kind: 'cmd', text: 'npm install -D tailwindcss @tailwindcss/vite typescript' },
      { kind: 'ok', text: '✓ Stack bereit: Vite · React · TypeScript · Tailwind · Framer Motion' },
    ],
  },
  {
    key: 'build',
    label: 'build',
    lines: [
      { kind: 'cmd', text: 'npm run build' },
      { kind: 'out', text: 'vite v8 building for production…' },
      { kind: 'out', text: '✓ 2181 modules transformed.' },
      { kind: 'out', text: 'dist/index.html             1.25 kB' },
      { kind: 'out', text: 'dist/assets/index.css      ~27 kB │ gzip:   5.6 kB' },
      { kind: 'out', text: 'dist/assets/index.js      ~428 kB │ gzip: 137.2 kB' },
      { kind: 'ok', text: '✓ built in 1.8s' },
    ],
  },
  {
    key: 'deploy',
    label: 'deploy',
    lines: [
      { kind: 'cmd', text: 'git push origin main' },
      { kind: 'out', text: '→ GitHub: lngleon/leons-webseite (main)' },
      { kind: 'out', text: 'Vercel: Auto-Deploy läuft …' },
      { kind: 'ok', text: '✓ Production: https://leons-webseite.vercel.app' },
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
