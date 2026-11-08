'use client'

import { useTheme } from '@/components/ThemeProvider'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@phosphor-icons/react'

export default function ThemeToggle({ className = 'nav__theme' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch — the theme is unknown on the server, so the icon,
  // label and title only reflect it after mount
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timeout)
  }, [])

  const isDark = resolvedTheme === 'dark'
  const label = !mounted ? 'Alternar tema' : isDark ? 'Ativar modo claro' : 'Ativar modo escuro'

  return (
    <button
      type="button"
      className={className}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={!mounted ? 'Alternar tema' : isDark ? 'Modo claro' : 'Modo escuro'}
    >
      {mounted ? (isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />) : <span style={{ width: 18, height: 18 }} />}
    </button>
  )
}
