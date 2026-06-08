import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import type { DiagramKind } from '@/data/services'

/* Lebende Schaubilder für die Leistungen-Karten.
   Disziplin: EIN gemeinsamer, ruhiger Rahmen. Jede Animation läuft beim
   Reinscrollen GENAU EINMAL und bleibt dann als statisches End-Frame stehen –
   keine Dauerschleifen. Hover spielt die Sequenz erneut ab. Bei
   prefers-reduced-motion wird sofort das End-Frame gezeigt. Engine: Framer
   Motion + CSS, kein neues Package. Akzent nur über --accent / --accent-solid. */

type DiagramProps = { play: boolean; reduced: boolean }

const ease = [0.22, 1, 0.36, 1] as const

/** Zustand „rest" (vor dem Abspielen) vs. „show" (End-Frame). */
function useStates(play: boolean, reduced: boolean) {
  return {
    initial: reduced ? 'show' : 'rest',
    animate: reduced || play ? 'show' : 'rest',
  }
}

/* ── 1) Webseiten: Mini-Layout baut sich auf ────────────────────── */
function BrowserDiagram({ play, reduced }: DiagramProps) {
  const { initial, animate } = useStates(play, reduced)
  const container: Variants = {
    rest: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const block: Variants = {
    rest: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  }
  return (
    <motion.div variants={container} initial={initial} animate={animate} className="flex h-full flex-col">
      <motion.div variants={block} className="h-2.5 rounded bg-foreground/15" />
      <motion.div variants={block} className="mt-2 flex-1 rounded-md bg-foreground/10" />
      <div className="mt-2 flex gap-2">
        <motion.div variants={block} className="h-5 flex-1 rounded bg-foreground/10" />
        <motion.div variants={block} className="h-5 flex-1 rounded bg-foreground/10" />
      </div>
      <motion.div variants={block} className="mt-2 h-2.5 w-14 rounded-full bg-accent-solid" />
    </motion.div>
  )
}

/* ── 2) Web-Apps & Tools: UI reagiert (Toggle, Häkchen, Ladebalken) ── */
function AppDiagram({ play, reduced }: DiagramProps) {
  const { initial, animate } = useStates(play, reduced)
  const container: Variants = {
    rest: {},
    show: { transition: { staggerChildren: 0.25, delayChildren: 0.15 } },
  }
  const fade: Variants = { rest: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4, ease } } }

  return (
    <motion.div variants={container} initial={initial} animate={animate} className="flex h-full flex-col justify-center gap-4">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <span className="h-2 w-14 rounded bg-foreground/15" />
        <span className="relative inline-flex h-4 w-8 items-center rounded-full bg-foreground/15">
          <motion.span variants={fade} className="absolute inset-0 rounded-full bg-accent-solid" />
          <motion.span
            variants={{ rest: { x: 2 }, show: { x: 18, transition: { duration: 0.4, ease } } }}
            className="relative z-10 h-3 w-3 rounded-full bg-background shadow-sm"
          />
        </span>
      </div>
      {/* Häkchen */}
      <div className="flex items-center gap-2">
        <span className="relative inline-flex h-4 w-4 items-center justify-center rounded border border-border">
          <motion.span variants={fade} className="absolute inset-0 rounded bg-accent-solid" />
          <motion.svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"
            variants={{ rest: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease } } }}
            className="relative z-10 h-2.5 w-2.5 text-accent-foreground"
          >
            <path d="M20 6 9 17l-5-5" />
          </motion.svg>
        </span>
        <span className="h-2 w-20 rounded bg-foreground/15" />
      </div>
      {/* Ladebalken */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          variants={{ rest: { width: '12%' }, show: { width: '82%', transition: { duration: 0.7, ease } } }}
          className="h-full rounded-full bg-accent-solid"
        />
      </div>
    </motion.div>
  )
}

/* ── 3) Redesign: Vorher/Nachher-Wisch (hässlich-veraltet → clean violett) ──
   Erzählend: „Vorher" wird kurz gehalten (als hässlich registrierbar), dann
   wischt langsam das cleane „Nachher" herein.
   Hinweis: Der „Vorher"-Layer nutzt BEWUSST eigene, gedämpft-clashende
   Alt-Web-Illustrationsfarben (nicht die Theme-/Akzent-Palette) – er ist
   opak/selbsttragend und damit in Dark UND Light gleich lesbar. Der Marken-
   Akzent kommt weiterhin ausschließlich über Tokens (nur im „Nachher"). */
function RedesignDiagram({ play, reduced }: DiagramProps) {
  const { initial, animate } = useStates(play, reduced)
  return (
    <div className="relative h-full overflow-hidden rounded">
      {/* VORHER – glaubwürdig altes, hässliches Web (Illustration, keine Tokens) */}
      <div className="absolute inset-0 bg-[#d8d1ba] font-serif text-[#322c1c]">
        <div className="flex items-center justify-between border-b-2 border-[#6f6442] bg-[#356a6a] px-1.5 py-0.5">
          <span className="text-[9px] font-bold italic tracking-tight text-[#f2ead0]">
            Müller &amp; Söhne
          </span>
          <span className="text-[8px] text-[#cfe2d4]">★ Startseite ★</span>
        </div>
        <div className="-rotate-1 space-y-1 px-1.5 pt-2">
          <span className="block h-1.5 w-[85%] bg-[#7c6f4c]" />
          <span className="block h-1.5 w-[68%] bg-[#7c6f4c]" />
          <span className="block text-[9px] leading-none text-[#1a13c8] underline underline-offset-2">
            hier klicken!!
          </span>
          <span className="ml-2 inline-block rotate-2 border-2 border-[#4a4326] border-b-[#221d0e] border-r-[#221d0e] bg-[#b9ad86] px-1.5 py-px text-[8px] font-bold">
            ABSENDEN
          </span>
        </div>
      </div>

      {/* NACHHER – luftig, clean, violett-akzentuiert (Theme-Tokens + Akzent);
          hält „Vorher" kurz (delay) und wischt dann langsam herein. */}
      <motion.div
        variants={{
          rest: { clipPath: 'inset(0% 100% 0% 0%)' },
          show: {
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: { duration: 1.5, delay: 0.95, ease },
          },
        }}
        initial={initial}
        animate={animate}
        className="absolute inset-0 flex flex-col justify-center gap-2.5 bg-card px-2"
      >
        <span className="h-3 w-1/2 rounded bg-foreground/80" />
        <span className="h-1.5 w-3/4 rounded bg-foreground/15" />
        <span className="h-1.5 w-2/3 rounded bg-foreground/15" />
        <span className="mt-0.5 h-2.5 w-14 rounded-full bg-accent-solid" />
      </motion.div>
    </div>
  )
}

/* ── 4) KI-Integration: Mini-Chat, Antwort streamt rein ─────────── */
const CHAT_PROMPT = 'Mehr Anfragen über die Seite?'
const CHAT_ANSWER = 'Klar – mit klarer Struktur und starkem Call-to-Action.'

function ChatDiagram({ play, reduced }: DiagramProps) {
  const { initial, animate } = useStates(play, reduced)
  const [count, setCount] = useState(reduced ? CHAT_ANSWER.length : 0)

  useEffect(() => {
    if (reduced || !play) return
    let cancelled = false
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (cancelled) return
      i += 1
      setCount(i)
      if (i < CHAT_ANSWER.length) timer = setTimeout(tick, 26)
    }
    // erst nach dem Einblenden der Bubbles tippen
    timer = setTimeout(tick, 620)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [play, reduced])

  const bubble: Variants = {
    rest: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
  }
  const container: Variants = {
    rest: {},
    show: { transition: { staggerChildren: 0.35, delayChildren: 0.1 } },
  }
  const streaming = !reduced && count < CHAT_ANSWER.length

  return (
    <motion.div
      variants={container}
      initial={initial}
      animate={animate}
      className="flex h-full flex-col justify-end gap-1.5 text-[11px] leading-snug"
    >
      <motion.div
        variants={bubble}
        className="max-w-[80%] self-end rounded-lg rounded-br-sm bg-accent-solid px-2.5 py-1 text-accent-foreground"
      >
        {CHAT_PROMPT}
      </motion.div>
      <motion.div
        variants={bubble}
        className="max-w-[88%] self-start rounded-lg rounded-bl-sm border border-border bg-background px-2.5 py-1 text-foreground"
      >
        {CHAT_ANSWER.slice(0, count)}
        {streaming && (
          <span className="terminal-cursor ml-0.5 inline-block w-[0.5em] -translate-y-px border-b-2 border-accent align-middle" />
        )}
      </motion.div>
    </motion.div>
  )
}

const DIAGRAMS: Record<DiagramKind, ComponentType<DiagramProps>> = {
  browser: BrowserDiagram,
  app: AppDiagram,
  redesign: RedesignDiagram,
  chat: ChatDiagram,
}

type ServiceDiagramProps = {
  kind: DiagramKind
  icon: ComponentType<{ className?: string }>
}

export default function ServiceDiagram({ kind, icon: Icon }: ServiceDiagramProps) {
  const reduced = useReducedMotionSafe()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [runId, setRunId] = useState(0)

  // Erstes Abspielen beim Reinscrollen (einmal).
  useEffect(() => {
    if (inView) setRunId((r) => (r === 0 ? 1 : r))
  }, [inView])

  const replay = () => {
    if (!reduced) setRunId((r) => (r === 0 ? 1 : r + 1))
  }

  const Diagram = DIAGRAMS[kind]
  const play = runId > 0

  return (
    // Dekoratives Schaubild – Inhalt steht im Titel/Text daneben.
    <div
      ref={ref}
      aria-hidden="true"
      onMouseEnter={replay}
      onFocusCapture={replay}
      className="overflow-hidden rounded-lg border border-border bg-muted/40"
    >
      {/* Gemeinsame, ruhige Fensterleiste */}
      <div className="flex items-center gap-2 border-b border-border bg-background/40 px-3 py-1.5">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/20" />
        </span>
        <span className="ml-auto text-accent">
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      {/* Schaubild-Körper – einheitliche Höhe für alle Karten */}
      <div className="h-32 p-3 sm:h-36">
        {/* reduced im key: flippt reduced nach dem Mount, remountet das Schaubild
            → es startet direkt im End-Frame (kein nachträgliches Abspielen). */}
        <Diagram key={`${runId}:${reduced ? 'r' : 'm'}`} play={play} reduced={reduced} />
      </div>
    </div>
  )
}
