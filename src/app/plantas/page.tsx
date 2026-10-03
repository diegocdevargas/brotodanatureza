import { Suspense, } from 'react'
import Link from 'next/link'
import { getPlants } from '@/lib/wordpress'
import PlantaCard from '@/components/PlantCard'
import BuscaPlantas from '@/components/SearchPlants'


export const metadata = {
  title: 'Enciclopédia de Plantas Medicinais | O Broto da Natureza',
  description: 'Explore nossa enciclopédia de plantas medicinais.',
}

export const revalidate = 3600

const CATEGORIES = [
  'Todas','Digestiva','Calmante','Anti-inflamatória',
  'Imunológica','Circulatória','Respiratória',
]

interface Props {
  searchParams: Promise<{ busca?: string; categoria?: string }>
}

export default async function PlantasPage({ searchParams }: Props) {
  const { busca: buscaRaw, categoria: categoriaRaw } = await searchParams
  const allPlants = await getPlants({ perPage: 100 })

  const busca     = buscaRaw?.toLowerCase().trim() ?? ''
  const categoria = categoriaRaw ?? 'Todas'

  const filtered = allPlants.filter((p) => {
    const matchBusca =
      !busca ||
      p.title.rendered.toLowerCase().includes(busca)            ||
      p.acf?.scientific_name?.toLowerCase().includes(busca)     ||
      p.acf?.medicinal_uses?.toLowerCase().includes(busca)      ||
      p.acf?.used_parts?.toLowerCase().includes(busca)          ||
      p.acf?.preparation_method?.toLowerCase().includes(busca)

    const matchCategoria =
      categoria === 'Todas' ||
      p.acf?.category?.toLowerCase() === categoria.toLowerCase()

    return matchBusca && matchCategoria
  })

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <div className="mb-12">
        <p className="font-mono-dm text-xs tracking-[3px] uppercase mb-2" style={{ color: 'var(--accent)' }}>
          Enciclopédia
        </p>
        <h1 className="font-display text-4xl mb-3" style={{ color: 'var(--text)' }}>
          Plantas Medicinais
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'planta encontrada' : 'plantas encontradas'}
          {busca && <span style={{ color: 'var(--text-faint)' }}> para &quot;{buscaRaw}&quot;</span>}
        </p>
      </div>

      <Suspense fallback={
        <div className="h-12 rounded-xl animate-pulse" style={{ background: 'var(--surface)' }} />
      }>
        <BuscaPlantas categories={CATEGORIES} />
      </Suspense>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {filtered.map((p) => <PlantaCard key={p.id} plant={p} />)}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <div className="flex justify-center mb-6">
            <svg width="48" height="56" viewBox="0 0 48 56" fill="none" aria-hidden="true" className="opacity-20">
              <path d="M24 54 C24 42 12 34 8 22 C4 10 16 4 24 12 C32 4 44 10 40 22 C36 34 24 42 24 54Z"
                stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M24 54 L24 28" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
            </svg>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Nenhuma planta encontrada.</p>
          <Link href="/plantas" className="text-sm mt-2 inline-block" style={{ color: 'var(--accent)' }}>
            Ver todas
          </Link>
        </div>
      )}

    </main>
  )
}