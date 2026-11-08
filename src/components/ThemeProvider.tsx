'use client'

// Tiny theme provider (replaces next-themes, whose <script> inside a client component triggers React 19's
// "script tag while rendering" warning). The pre-paint class comes from THEME_SCRIPT (lib/theme.ts), inlined in <head>.
import { useSyncExternalStore } from 'react'
import { THEME_KEY } from '@/lib/theme'

type Theme = 'light' | 'dark'

// The theme lives on <html> (set before paint by THEME_SCRIPT); React just subscribes to it.
const subscribe = (notify: () => void) => {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}
const getTheme = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light')

function setTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
  try { localStorage.setItem(THEME_KEY, theme) } catch {}
}

export function useTheme() {
  const resolvedTheme = useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme)
  return { resolvedTheme, setTheme }
}
