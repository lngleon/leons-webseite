import { useContext } from 'react'
import { ThemeContext } from '@/lib/theme'

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme muss innerhalb von <ThemeProvider> verwendet werden')
  }
  return ctx
}
