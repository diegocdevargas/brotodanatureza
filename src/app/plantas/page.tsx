import '@/styles/catalog.scss'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { PlantIcon, CookingPotIcon, WarningIcon, LeafIcon, SquaresFourIcon, MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { getPlants } from '@/lib/wordpress'
import { categories } from '@/lib/site'
import SearchPlants from '@/components/SearchPlants'
import { CaHero, CaHead, FeaturedPlant, PlantGrid, Included, CenterCta } from '@/components/catalog/parts'
import { Reveal } from '@/components/motion'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Enciclopédia de Plantas Medicinais',
  description: 'Pesquise plantas medicinais por nome, sintoma ou categoria: usos, partes utilizadas, modo de preparo e contraindicações.',
}

export const revalidate = 3600

const CATEGORY_NAMES = categories.map((c) => c.name)

interface Props {
  searchParams: Promise<{ busca?: string; categoria?: string }>
}

export default async function PlantasPage({ searchParams }: Props) {
  const { busca: buscaRaw, categoria: categoriaRaw } = await searchParams
  const allPlants = await getPlants({ perPage: 100 })

  const busca = buscaRaw?.toLowerCase().trim() ?? ''
  const categoria = categoriaRaw ?? 'Todas'
  const filtering = Boolean(busca) || categoria !== 'Todas'

  const filtered = allPlants.filter((p) => {
    const matchBusca =
      !busca ||
      p.title.rendered.toLowerCase().includes(busca) ||
      p.acf?.popular_name?.toLowerCase().includes(busca) ||
      p.acf?.scientific_name?.toLowerCase().includes(busca) ||
      p.acf?.medicinal_uses?.toLowerCase().includes(busca) ||
      p.acf?.used_parts?.toLowerCase().includes(busca) ||
      p.acf?.preparation_method?.toLowerCase().includes(busca)

    const matchCategoria = categoria === 'Todas' || p.acf?.category?.toLowerCase() === categoria.toLowerCase()

    return matchBusca && matchCategoria
  })

  const [featured, ...rest] = filtered
  const showFeatured = !filtering && featured && rest.length > 0
  const gridPlants = showFeatured ? rest : filtered
  const count = `${filtered.length} ${filtered.length === 1 ? 'planta encontrada' : 'plantas encontradas'}`

  return (
    <main className="page-main">
      <CaHero
        eyebrow="Enciclopédia"
        line1="Plantas medicinais,"
        line2="do campo à sua saúde."
        copy="Pesquise por nome popular, nome científico, sintoma ou uso. Cada ficha traz o que a tradição e a pesquisa dizem sobre a planta."
        facts={[
          { icon: <PlantIcon size={16} aria-hidden />, label: `${allPlants.length} plantas catalogadas` },
          { icon: <SquaresFourIcon size={16} aria-hidden />, label: `${CATEGORY_NAMES.length} categorias` },
          { icon: <WarningIcon size={16} aria-hidden />, label: 'Contraindicações em destaque' },
        ]}
      >
        <Suspense fallback={<div className="pl-search__input" aria-hidden />}>
          <SearchPlants categories={CATEGORY_NAMES} />
        </Suspense>
      </CaHero>

      {showFeatured && (
        <section className="ca-sec ca-sec--featured">
          <Reveal y={28} className="ca-sec__wrap">
            <FeaturedPlant plant={featured} />
          </Reveal>
        </section>
      )}

      <section className={`ca-sec ${showFeatured ? 'ca-sec--all' : 'ca-sec--featured'}`} aria-labelledby="resultados" aria-live="polite">
        <div className="ca-sec__wrap ca-stack36">
          <Reveal y={28}>
            <CaHead
              id="resultados"
              title={filtering ? (categoria !== 'Todas' ? categoria : 'Resultados') : 'Todas as plantas'}
              note={busca ? `${count} para “${buscaRaw}”` : count}
            />
          </Reveal>
          {gridPlants.length > 0 ? (
            <Reveal y={28} delay={0.08} amount={0.05}><PlantGrid plants={gridPlants} /></Reveal>
          ) : (
            <div className="ca-empty">
              <MagnifyingGlassIcon size={40} aria-hidden />
              <h3 className="ca-h32">Nenhuma planta encontrada</h3>
              <p className="t-15">Tente outro termo — um sintoma como “insônia”, um uso como “digestão” ou o nome científico.</p>
              <Link href="/plantas" className="ca-pill ca-pill--sm">Ver todas as plantas</Link>
            </div>
          )}
        </div>
      </section>

      <Included
        title="O que toda ficha da enciclopédia traz"
        items={[
          { icon: <LeafIcon size={20} aria-hidden />, title: 'Identificação', copy: 'Nome popular e científico, para não confundir espécies parecidas.' },
          { icon: <PlantIcon size={20} aria-hidden />, title: 'Usos medicinais', copy: 'Para que a planta é tradicionalmente usada e quais partes se aproveitam.' },
          { icon: <CookingPotIcon size={20} aria-hidden />, title: 'Modo de preparo', copy: 'Infusão, decocção, compressa ou tintura — e como fazer cada uma.' },
          { icon: <WarningIcon size={20} aria-hidden />, title: 'Contraindicações', copy: 'Quem deve evitar, interações conhecidas e cuidados com a dose.' },
        ]}
      />

      <CenterCta
        title="Não encontrou o que procurava?"
        copy="A enciclopédia cresce continuamente. Enquanto isso, os artigos do blog aprofundam preparo, história e pesquisa sobre as plantas."
        primary={{ label: 'Ler os artigos', href: '/blog' }}
        secondary={{ label: 'Ver todas as plantas', href: '/plantas' }}
      />
    </main>
  )
}
