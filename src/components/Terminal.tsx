import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import { clsx } from 'clsx'
import { defaultTerminalTab, terminalTabs } from '@/data/hero'
import type { TerminalLine } from '@/data/hero'

const CHAR_MS = 18
const LINE_MS = 240
const START_MS = 220

type TypeState = { line: number; char: number; done: boolean }

const kindClass: Record<TerminalLine['kind'], string> = {
  cmd: 'text-foreground',
  out: 'text-muted-foreground',
  ok: 'text-accent',
}

/**
 * Tippt die Zeilen eines Tabs Zeichen für Zeichen, Zeile für Zeile.
 * Wird vom Eltern-Element per `key={activeKey}` frisch gemountet, sodass der
 * Tab-Wechsel sauber von vorn startet (kein Aufblitzen von Alt-Zustand + Neu-Inhalt).
 * Bei prefers-reduced-motion sofort der Endzustand (statisches Frame).
 */
function TerminalOutput({ lines, reduced }: { lines: TerminalLine[]; reduced: boolean }) {
  const [state, setState] = useState<TypeState>(() =>
    reduced
      ? { line: lines.length, char: 0, done: true }
      : { line: 0, char: 0, done: false },
  )

  useEffect(() => {
    if (reduced) {
      setState({ line: lines.length, char: 0, done: true })
      return
    }
    let cancelled = false
    let li = 0
    let ci = 0
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (cancelled) return
      if (li >= lines.length) {
        setState({ line: li, char: 0, done: true })
        return
      }
      const len = lines[li].text.length
      if (ci < len) {
        ci += 1
        setState({ line: li, char: ci, done: false })
        timer = setTimeout(tick, CHAR_MS)
      } else {
        li += 1
        ci = 0
        setState({ line: li, char: 0, done: false })
        timer = setTimeout(tick, LINE_MS)
      }
    }

    timer = setTimeout(tick, START_MS)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [lines, reduced])

  const cursorLine = state.done
    ? lines.length - 1
    : Math.min(state.line, lines.length - 1)

  return (
    <pre className="m-0 whitespace-pre-wrap break-words">
      {lines.map((line, i) => {
        if (!state.done && i > state.line) return null
        const isTyping = !state.done && i === state.line
        const text = isTyping ? line.text.slice(0, state.char) : line.text
        return (
          <div key={i} className={kindClass[line.kind]}>
            {line.kind === 'cmd' && (
              <span className="text-accent" aria-hidden="true">
                ${' '}
              </span>
            )}
            {text}
            {i === cursorLine && (
              <span
                className="terminal-cursor ml-0.5 inline-block w-[0.55em] -translate-y-[1px] border-b-2 border-accent align-middle"
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </pre>
  )
}

export default function Terminal() {
  const reduced = useReducedMotion() ?? false
  const [activeKey, setActiveKey] = useState(defaultTerminalTab)
  const activeIndex = Math.max(
    0,
    terminalTabs.findIndex((t) => t.key === activeKey),
  )
  const tab = terminalTabs[activeIndex]
  const uid = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Pfeiltasten-Navigation der Tabs (WAI-ARIA Tabs-Muster, roving tabindex).
  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const dir = event.key === 'ArrowRight' ? 1 : -1
    const next = (activeIndex + dir + terminalTabs.length) % terminalTabs.length
    setActiveKey(terminalTabs[next].key)
    tabRefs.current[next]?.focus()
  }

  return (
    // Dark-only: das Terminal nutzt direkt die (einzigen) Theme-Variablen.
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40">
        {/* Fensterleiste: dezente Punkte + Tabs (keine Refresh-/Download-Buttons) */}
        <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
            <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <span className="h-3 w-3 rounded-full bg-muted-foreground/20" />
          </div>
          <div
            role="tablist"
            aria-label="Terminal-Ausgaben"
            className="ml-1 flex gap-1 font-mono text-xs"
          >
            {terminalTabs.map((t, i) => {
              const selected = t.key === activeKey
              return (
                <button
                  key={t.key}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`${uid}-tab-${t.key}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveKey(t.key)}
                  onKeyDown={onTabKeyDown}
                  className={clsx(
                    'rounded-md px-2.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    selected
                      ? 'bg-foreground/10 text-accent'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Ausgabe – Panel selbst fokussierbar (keine fokussierbaren Kinder, WAI-ARIA). */}
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${activeKey}`}
          tabIndex={0}
          className="min-h-[15rem] px-4 py-4 font-mono text-xs leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:min-h-[16rem] sm:text-sm"
        >
          <TerminalOutput key={activeKey} lines={tab.lines} reduced={reduced} />
        </div>
      </div>
  )
}
