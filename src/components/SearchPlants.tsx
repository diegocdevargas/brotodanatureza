'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useRef } from 'react'

interface Props {
  categories: string[]
}

export default function BuscaPlantas({ categories }: Props) {
  const router   = useRouter()
  const params   = useSearchParams()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const searchQuery = params.get('busca')     ?? ''
  const category    = params.get('categoria') ?? 'Todas'

  const push = useCallback(
    (newSearch: string, newCategory: string) => {
      const query = new URLSearchParams()
      if (newSearch) query.set('busca', newSearch)
      if (newCategory && newCategory !== 'Todas') query.set('categoria', newCategory)
      const qs = query.toString()
      router.push(qs ? `/plantas?${qs}` : '/plantas', { scroll: false })
    },
    [router]
  )

  const handleSearch = (value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => push(value, category), 400)
  }

  const handleCategory = (value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    push(searchQuery, value)
  }

  return (
    <div className="flex flex-col gap-3">

      <div className="relative w-full">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          defaultValue={searchQuery}
          placeholder="Buscar por nome, sintoma ou uso..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-200 outline-none"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'var(--accent-border)'
            e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-surface)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((categoryOption) => (
          <button
            key={categoryOption}
            onClick={() => handleCategory(categoryOption)}
            onTouchEnd={(e) => {
              e.preventDefault()
              handleCategory(categoryOption)
            }}
            className="px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 active:scale-95"
            style={
              category === categoryOption
                ? {
                    background: 'var(--accent-surface)',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent-border)',
                  }
                : {
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                  }
            }
          >
            {categoryOption}
          </button>
        ))}
      </div>

    </div>
  )
}