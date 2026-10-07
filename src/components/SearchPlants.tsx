'use client'

// Search field + category chips. State lives in the URL (?busca=&categoria=) so results are
// server-rendered, shareable and work with the back button.
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useTransition } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

const ALL = 'Todas'

export default function SearchPlants({ categories }: { categories: string[] }) {
  const router = useRouter()
  const params = useSearchParams()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [pending, startTransition] = useTransition()

  const searchQuery = params.get('busca') ?? ''
  const category = params.get('categoria') ?? ALL

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const push = useCallback(
    (newSearch: string, newCategory: string) => {
      const query = new URLSearchParams()
      if (newSearch.trim()) query.set('busca', newSearch.trim())
      if (newCategory && newCategory !== ALL) query.set('categoria', newCategory)
      const qs = query.toString()
      startTransition(() => router.push(qs ? `/plantas?${qs}` : '/plantas', { scroll: false }))
    },
    [router]
  )

  const handleSearch = (value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => push(value, category), 400)
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (timerRef.current) clearTimeout(timerRef.current)
    push(String(new FormData(e.currentTarget).get('busca') ?? ''), category)
  }

  return (
    <form role="search" className="pl-search" onSubmit={handleSubmit} aria-busy={pending}>
      <div className="pl-search__field">
        <MagnifyingGlassIcon size={18} aria-hidden />
        <label htmlFor="busca-plantas" className="sr-only">Buscar plantas</label>
        <input
          id="busca-plantas"
          name="busca"
          type="search"
          className="pl-search__input"
          defaultValue={searchQuery}
          placeholder="Buscar por nome, sintoma ou uso…"
          autoComplete="off"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="pl-chips" role="group" aria-label="Filtrar por categoria">
        {[ALL, ...categories].map((option) => (
          <button
            key={option}
            type="button"
            className="pl-chip"
            aria-pressed={category === option}
            onClick={() => push(searchQuery, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </form>
  )
}
