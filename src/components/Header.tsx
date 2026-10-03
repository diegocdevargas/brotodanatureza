'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useLayoutEffect } from 'react'
import ThemeToggle from '@/components/ThemeToggle'

import { Fauna_One } from 'next/font/google'

const faunaOne = Fauna_One({ subsets: ['latin'], weight: '400', display: 'swap' })

const NAV = [
  { href: '/',           label: 'Início' },
  { href: '/plantas',    label: 'Enciclopédia' },
  { href: '/blog',       label: 'Blog' },
  { href: '/dashboard',  label: 'Dashboard' },
]

function BotanicalMark() {
  return (
    <svg width="30px" height="30px" fill="#8CB89A" version="1.1" viewBox="0 0 512 512">
      <path transform="matrix(1.5303 0 0 1.5303 -142.43 -163.19)" d="m406.47 155.03h-39.442c-47.453 0-88.387 28.427-106.68 69.146-18.29-40.718-59.226-69.146-106.68-69.146h-39.441c-5.633 0-10.199 4.567-10.199 10.199v39.442c0 64.447 52.431 116.88 116.88 116.88h29.242v61.066c1e-3 5.632 4.567 10.199 10.2 10.199s10.199-4.567 10.199-10.199v-61.066h29.242c64.447 0 116.88-52.431 116.88-116.88v-39.442c0-5.632-4.566-10.199-10.199-10.199zm-156.32 131.7-82.649-82.649c-3.983-3.982-10.441-3.982-14.425 0-3.983 3.983-3.983 10.441 0 14.425l82.65 82.649h-14.819c-53.198 0-96.478-43.28-96.478-96.479v-29.243h29.242c53.199 0 96.479 43.28 96.479 96.479zm146.12-82.055c0 53.199-43.28 96.479-96.479 96.479h-14.818l54.754-54.754c3.983-3.983 3.983-10.441 0-14.425-3.983-3.982-10.441-3.982-14.425 0l-54.753 54.753v-14.818c0-53.198 43.28-96.478 96.478-96.478h29.243z"/><path transform="matrix(1.5303 0 0 1.5303 -142.43 -163.19)" d="m367.62 204.07c-3.983-3.982-10.441-3.982-14.425 0l-4.008 4.008c-3.983 3.983-3.983 10.441 0 14.425 1.993 1.991 4.603 2.987 7.213 2.987s5.221-0.996 7.212-2.987l4.008-4.008c3.983-3.983 3.983-10.441 0-14.425z"/>
    </svg>
  )
}

export default function Header() {
  const pathname            = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { 
    const timer = setTimeout(() => setOpen(false), 0)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg) 95%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px var(--shadow)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="O Broto da Natureza — página inicial"
        >
          <BotanicalMark />
          <span
            className={'text-sm tracking-wide font-medium transition-colors duration-200' + ' ' + faunaOne.className}
            style={{ color: 'var(--text)' }}
          >
            O Broto da Natureza
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="relative px-3 py-1.5 rounded-lg text-sm transition-colors duration-200"
                style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                {label}
                {active && (
                  <span
                    className="absolute bottom-0.5 left-3 right-3 h-px rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                )}
              </Link>
            )
          })}

          {/* Search pill */}
          <Link
            href="/plantas"
            className="ml-3 px-4 py-1.5 text-sm rounded-full transition-all duration-200"
            style={{
              border: '1px solid var(--accent-border)',
              color: 'var(--accent)',
            }}
          >
            Pesquisar planta
          </Link>

          {/* Theme toggle */}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile right — toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg transition-colors hover:bg-[var(--surface)]"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setOpen(!open)}
            onTouchEnd={(e) => {
              e.preventDefault()
              setOpen(!open)
            }}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {open ? (
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="md:hidden px-6 py-4 flex flex-col gap-1 border-t"
          style={{ borderTopColor: 'var(--border)', background: 'var(--bg)' }}
        >
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2.5 rounded-lg text-sm transition-colors"
              style={{
                color: pathname === href ? 'var(--accent)' : 'var(--text-muted)',
                background: pathname === href ? 'var(--accent-surface)' : 'transparent',
              }}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}