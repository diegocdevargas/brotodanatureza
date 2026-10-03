import Link from 'next/link'
import { getPlants, getPosts } from '@/lib/wordpress'
import PlantaCard from '@/components/PlantCard'

export const revalidate = 3600

function summarizeText(html: string) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function HeroBotanical() {
  return (
    <svg
      width="320" height="320"
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      className="opacity-[0.06] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block"
    >
      <path d="M160 300 C160 240 155 200 160 160 C165 120 160 80 160 20" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M160 200 C140 185 110 180 90 160" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
      <path d="M160 160 C135 148 108 148 88 132" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
      <path d="M160 120 C142 110 120 112 104 98"  stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
      <path d="M160 220 C182 204 210 202 228 186" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
      <path d="M160 175 C185 162 212 164 230 150" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
      <path d="M160 135 C180 124 202 126 218 114" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="82"  cy="154" rx="18" ry="10" transform="rotate(-30 82 154)"  fill="var(--surface)" stroke="var(--accent)" strokeWidth="0.8" />
      <ellipse cx="80"  cy="126" rx="16" ry="9"  transform="rotate(-40 80 126)"  fill="var(--surface)" stroke="var(--accent)" strokeWidth="0.8" />
      <ellipse cx="96"  cy="94"  rx="14" ry="8"  transform="rotate(-50 96 94)"   fill="var(--surface)" stroke="var(--accent)" strokeWidth="0.8" />
      <ellipse cx="234" cy="180" rx="18" ry="10" transform="rotate(20 234 180)"  fill="var(--surface)" stroke="var(--accent)" strokeWidth="0.8" />
      <ellipse cx="236" cy="144" rx="16" ry="9"  transform="rotate(30 236 144)"  fill="var(--surface)" stroke="var(--accent)" strokeWidth="0.8" />
      <ellipse cx="222" cy="108" rx="14" ry="8"  transform="rotate(40 222 108)"  fill="var(--surface)" stroke="var(--accent)" strokeWidth="0.8" />
    </svg>
  )
}

export default async function HomePage() {
  const [featuredPlants, recentPosts] = await Promise.all([
    getPlants({ perPage: 4 }),
    getPosts(1, 3),
  ])

  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--bg), var(--bg-deep))' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        <HeroBotanical />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-start">
          <p className="font-mono-dm text-xs tracking-[3px] uppercase mb-6" style={{ color: 'var(--accent)' }}>
            Herbário Digital
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.1] max-w-3xl mb-6" style={{ color: 'var(--text)' }}>
            O conhecimento das plantas medicinais{' '}
            <em className="not-italic" style={{ color: 'var(--accent)' }}>ao seu alcance</em>
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mb-10" style={{ color: 'var(--text-muted)' }}>
            Uma enciclopédia baseada em fontes históricas e científicas sobre o poder curativo das plantas — do campo à sua saúde.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/plantas"
              className="px-6 py-3 text-sm font-semibold rounded-full transition-colors duration-200"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              Explorar enciclopédia
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 text-sm rounded-full transition-all duration-200"
              style={{ border: '1px solid var(--border-strong)', color: 'var(--text-secondary)' }}
            >
              Ler artigos
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />
      </section>

      {/* ── Plantas em destaque ───────────────────────────────────────────── */}
      {featuredPlants.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono-dm text-xs tracking-[3px] uppercase mb-2" style={{ color: 'var(--accent)' }}>
                Enciclopédia
              </p>
              <h2 className="font-display text-3xl" style={{ color: 'var(--text)' }}>
                Plantas em destaque
              </h2>
            </div>
            <Link href="/plantas" className="text-sm transition-colors hidden sm:block" style={{ color: 'var(--text-muted)' }}>
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {featuredPlants.map((plant) => <PlantaCard key={plant.id} plant={plant} />)}
          </div>
        </section>
      )}

      {/* ── Banner busca ──────────────────────────────────────────────────── */}
      <section className="mx-6 md:mx-auto md:max-w-7xl mb-20">
        <div
          className="section-cta botanical-border rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--text)' }}>
              Pesquise por sintoma ou planta
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Encontre informações sobre usos, preparo e contraindicações.
            </p>
          </div>
          <Link
            href="/plantas"
            className="flex-shrink-0 px-5 py-2.5 text-sm rounded-full transition-all duration-200"
            style={{ background: 'var(--accent-surface)', border: '1px solid var(--accent-border)', color: 'var(--accent)' }}
          >
            Abrir pesquisa →
          </Link>
        </div>
      </section>

      {/* ── Artigos recentes ──────────────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono-dm text-xs tracking-[3px] uppercase mb-2" style={{ color: 'var(--herb)' }}>
                Blog
              </p>
              <h2 className="font-display text-3xl" style={{ color: 'var(--text)' }}>
                Artigos recentes
              </h2>
            </div>
            <Link href="/blog" className="text-sm transition-colors hidden sm:block" style={{ color: 'var(--text-muted)' }}>
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentPosts.map((post, i) => {
              const summary = summarizeText(post.excerpt.rendered)
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl p-6 transition-all duration-200"
                  style={{
                    background: 'var(--surface)',
                    border: i === 0 ? '1px solid var(--accent-border)' : '1px solid var(--border)',
                  }}
                >
                  <p className="font-display text-[15px] mb-3 leading-snug line-clamp-2 transition-colors" style={{ color: 'var(--text)' }}>
                    {post.title.rendered}
                  </p>
                  <p className="text-xs line-clamp-3 leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                    {summary}
                  </p>
                  <span className="text-xs font-mono-dm" style={{ color: 'var(--accent)' }}>
                    ler artigo →
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      )}

    </main>
  )
}