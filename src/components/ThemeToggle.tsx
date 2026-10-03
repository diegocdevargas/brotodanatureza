'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch — only render after mount
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timeout)
  }, [])
  if (!mounted) return <div className="w-8 h-8" aria-hidden="true" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
      className="
        w-8 h-8 rounded-lg flex items-center justify-center
        text-[var(--text-muted)] hover:text-[var(--text)]
        hover:bg-[var(--surface-hover)]
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--bg)]
      "
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="24px" height="24px" stroke="#80a98d" fill="none" version="1.1" viewBox="0 0 24 24">
        <path d="m7.2845 10.333c-0.18425 0.5213-0.28451 1.0823-0.28451 1.6667 0 2.7614 2.2386 5 5 5 2.7614 0 5-2.2386 5-5 0-2.7614-2.2386-5-5-5-0.5844 0-1.1454 0.10026-1.6667 0.28451"/>
        <path d="m12 2v2"/>
        <path d="m12 20v2"/>
        <path d="m4 12h-2"/>
        <path d="m22 12h-2"/>
        <path d="m19.778 4.2227-2.222 2.0316"/>
        <path d="m4.2222 4.2227 2.222 2.0316"/>
        <path d="m6.4443 17.556-2.2222 2.2222"/>
        <path d="m19.778 19.777-2.222-2.2222"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="24px" height="24px" fill="none" aria-hidden="true" version="1.1" viewBox="0 0 24 24">
        <path d="m21.067 11.857-0.6419-0.3878 0.6419 0.3878zm-8.924-8.924-0.3879-0.64191 0.3879 0.64191zm-4.7677 17.08c-0.35854-0.2074-0.81734-0.0849-1.0247 0.2736-0.20741 0.3586-0.08489 0.8174 0.27366 1.0248l0.75108-1.2984zm-4.6869-2.6375c0.2074 0.3586 0.6662 0.4811 1.0248 0.2737 0.35854-0.2074 0.48106-0.6662 0.27366-1.0247l-1.2984 0.751zm18.561-5.3755c0 5.1086-4.1414 9.25-9.25 9.25v1.5c5.9371 0 10.75-4.8129 10.75-10.75h-1.5zm-18.5 0c0-5.1086 4.1414-9.25 9.25-9.25v-1.5c-5.9371 0-10.75 4.8129-10.75 10.75h1.5zm12.75 2.25c-3.1756 0-5.75-2.5744-5.75-5.75h-1.5c0 4.0041 3.2459 7.25 7.25 7.25v-1.5zm4.9253-2.781c-1.0081 1.6683-2.8371 2.781-4.9253 2.781v1.5c2.6349 0 4.9407-1.4061 6.2092-3.5053l-1.2839-0.7757zm-10.675-2.969c0-2.0882 1.1127-3.9172 2.781-4.9253l-0.7757-1.2838c-2.0992 1.2684-3.5053 3.5742-3.5053 6.2092h1.5zm2.25-5.75c-0.0885 0-0.1923-0.03992-0.2676-0.11832-0.0638-0.06641-0.0786-0.12924-0.0821-0.15465-0.0042-0.03116-0.0021-0.12146 0.105-0.18618l0.7757 1.2838c0.5032-0.30402 0.665-0.86069 0.6058-1.2984-0.0614-0.45501-0.4202-1.0263-1.1368-1.0263v1.5zm9.7092 9.4947c-0.0648 0.1071-0.1551 0.1092-0.1862 0.105-0.0254-0.0035-0.0883-0.0183-0.1547-0.0821-0.0784-0.0753-0.1183-0.1791-0.1183-0.2676h1.5c0-0.7166-0.5713-1.0754-1.0263-1.1368-0.4377-0.0592-0.9944 0.1026-1.2984 0.6058l1.2839 0.7757zm-9.7092 9.0053c-1.6861 0-3.2647-0.4504-4.6245-1.237l-0.75108 1.2984c1.5819 0.9151 3.4187 1.4386 5.3755 1.4386v-1.5zm-8.013-4.6255c-0.7866-1.3598-1.237-2.9384-1.237-4.6245h-1.5c0 1.9568 0.52351 3.7936 1.4386 5.3755l1.2984-0.751z" fill="#55ae8a"/>
    </svg>

  )
}