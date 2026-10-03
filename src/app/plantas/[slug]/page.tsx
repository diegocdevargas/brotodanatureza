import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllPlantSlugs, getPlant, sanitizeHtml } from '@/lib/wordpress'

export const dynamicParams = true
export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPlantSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const plant = await getPlant(slug)
  if (!plant) return {}
  return {
    title: `${plant.title.rendered} | O Broto da Natureza`,
    description: plant.acf?.medicinal_uses?.slice(0, 155),
  }
}

export default async function PlantaPage({ params }: Props) {
  const { slug } = await params
  const plant = await getPlant(slug)
  if (!plant) notFound()

  const { title, acf, content } = plant

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono-dm mb-10 flex-wrap" style={{ color: 'var(--text-faint)' }}>
        <Link href="/" className="transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--text-muted)' }}>Início</Link>
        <span>/</span>
        <Link href="/plantas" className="transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--text-muted)' }}>Enciclopédia</Link>
        <span>/</span>
        <span style={{ color: 'var(--text)' }} className="line-clamp-1">{title.rendered}</span>
      </nav>

      {/* Hero */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {acf?.illustrative_image && (
          <div className="relative w-full md:w-64 h-64 rounded-2xl overflow-hidden flex-shrink-0" style={{ background: 'var(--surface)' }}>
            <Image
              src={acf.illustrative_image}
              alt={title.rendered}
              fill
              className="object-cover opacity-90"
            />
          </div>
        )}
        <div>
          {acf?.category && (
            <p className="font-mono-dm text-xs tracking-[2px] uppercase mb-3" style={{ color: 'var(--accent)' }}>
              {acf.category}
            </p>
          )}
          <h1 className="font-display text-3xl sm:text-4xl mb-2 leading-tight" style={{ color: 'var(--text)' }}>
            {title.rendered}
          </h1>
          {acf?.scientific_name && (
            <p className="font-mono-dm text-sm italic mb-4" style={{ color: 'var(--text-muted)' }}>
              {acf.scientific_name}
            </p>
          )}
          {acf?.used_parts && (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Partes utilizadas:</span>{' '}
              {acf.used_parts}
            </p>
          )}
          {/* Botanical divider */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, var(--accent-border), transparent)' }} />
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <path d="M6 13 C6 10 3 8 2 5 C1 2 4 1 6 3 C8 1 11 2 10 5 C9 8 6 10 6 13Z"
                stroke="var(--accent)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            </svg>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, var(--accent-border), transparent)' }} />
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {acf?.medicinal_uses && (
          <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--accent-border)' }}>
            <h2 className="font-display text-base mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <span>🌿</span> Usos Medicinais
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {acf.medicinal_uses}
            </p>
          </div>
        )}
        {acf?.preparation_method && (
          <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h2 className="font-display text-base mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <span>☕</span> Modo de Preparo
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {acf.preparation_method}
            </p>
          </div>
        )}
        {acf?.contraindications && (
          <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <h2 className="font-display text-base mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <span>⚠️</span> Contraindicações
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {acf.contraindications}
            </p>
          </div>
        )}
      </div>

      {/* Editorial content */}
      {content?.rendered && (
        <div
          className="prose-themed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.rendered) }}
        />
      )}

      {/* Disclaimer */}
      <div className="mt-12 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
          As informações desta página têm caráter educativo e não substituem orientação médica.
        </p>
      </div>

    </main>
  )
}