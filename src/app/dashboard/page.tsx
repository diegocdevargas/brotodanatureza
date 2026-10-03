import Link from 'next/link'
import { getDashboardStats, getPlants, getPosts } from '@/lib/wordpress'
import DashboardCharts from '@/components/DashboardCharts'

export const metadata = { title: 'Dashboard | O Broto da Natureza' }
export const revalidate = 3600

export default async function DashboardPage() {
  const [stats, recentPlants, recentPosts] = await Promise.all([
    getDashboardStats(),
    getPlants({ perPage: 6 }),
    getPosts(1, 3),
  ])

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <div className="mb-10">
        <p className="font-mono-dm text-xs tracking-[3px] uppercase mb-2" style={{ color: 'var(--accent)' }}>
          Visão geral
        </p>
        <h1 className="font-display text-4xl" style={{ color: 'var(--text)' }}>Dashboard</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <MetricCard label="Plantas cadastradas"  value={stats.totalPlants}                    icon="🌿" />
        <MetricCard label="Artigos publicados"   value={stats.totalPosts}                     icon="📖" />
        <MetricCard label="Categorias"           value={Object.keys(stats.categories).length} icon="🗂️" />
        <MetricCard label="Fontes consultadas"   value="40+"                                  icon="📜" />
      </div>

      <DashboardCharts categories={stats.categories} />

      {/* Recent plants */}
      <section className="mt-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-mono-dm text-xs tracking-[3px] uppercase mb-1" style={{ color: 'var(--accent)' }}>
              Enciclopédia
            </p>
            <h2 className="font-display text-xl" style={{ color: 'var(--text)' }}>
              Adicionadas recentemente
            </h2>
          </div>
          <Link href="/plantas" className="text-sm transition-colors hidden sm:block" style={{ color: 'var(--text-muted)' }}>
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {recentPlants.map((plant) => (
            <Link
              key={plant.id}
              href={`/plantas/${plant.slug}`}
              className="group rounded-xl p-3 text-center transition-all duration-200"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="mb-2">
                <svg width="24" height="28" viewBox="0 0 24 28" fill="none" aria-hidden="true" className="mx-auto opacity-30 group-hover:opacity-60 transition-opacity">
                  <path d="M12 26 C12 20 6 16 4 10 C2 4 8 2 12 6 C16 2 22 4 20 10 C18 16 12 20 12 26Z"
                    stroke="var(--accent)" strokeWidth="1" fill="none" strokeLinecap="round" />
                  <path d="M12 26 L12 14" stroke="var(--text-muted)" strokeWidth="0.7" strokeLinecap="round" strokeDasharray="1 2" />
                </svg>
              </div>
              <p className="text-xs font-medium leading-tight line-clamp-2 transition-colors" style={{ color: 'var(--text)' }}>
                {plant.title.rendered}
              </p>
              {plant.acf?.category && (
                <span className="text-[10px] mt-1 inline-block" style={{ color: 'var(--text-muted)' }}>
                  {plant.acf.category}
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="mt-12 pt-10" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-mono-dm text-xs tracking-[3px] uppercase mb-1" style={{ color: 'var(--herb)' }}>
                Blog
              </p>
              <h2 className="font-display text-xl" style={{ color: 'var(--text)' }}>Últimos artigos</h2>
            </div>
            <Link href="/blog" className="text-sm transition-colors hidden sm:block" style={{ color: 'var(--text-muted)' }}>
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-xl p-5 transition-all duration-200"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p className="font-display text-sm mb-2 line-clamp-2 leading-snug transition-colors" style={{ color: 'var(--text)' }}>
                  {post.title.rendered}
                </p>
                <p
                  className="text-xs line-clamp-2 leading-relaxed mb-3"
                  style={{ color: 'var(--text-muted)' }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <span className="text-xs font-mono-dm" style={{ color: 'var(--accent)' }}>
                  ler artigo →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}

function MetricCard({ label, value, icon, suffix }: {
  label: string; value: number | string; icon: string; suffix?: string
}) {
  return (
    <div
      className="rounded-2xl p-5 transition-colors duration-200"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="text-xl mb-3 opacity-70">{icon}</div>
      <div className="font-display text-2xl" style={{ color: 'var(--text)' }}>
        {value}
        {suffix && <span className="text-base" style={{ color: 'var(--text-muted)' }}>{suffix}</span>}
      </div>
      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  )
}