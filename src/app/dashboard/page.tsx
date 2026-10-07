import '@/styles/catalog.scss'
import '@/styles/journal.scss'
import '@/styles/dashboard.scss'
import type { Metadata } from 'next'
import { PlantIcon, ArticleIcon, SquaresFourIcon, ScrollIcon } from '@phosphor-icons/react/dist/ssr'
import { getDashboardStats, getPlants, getPosts } from '@/lib/wordpress'
import DashboardCharts from '@/components/DashboardCharts'
import { CaHero, CaHead, PlantGrid } from '@/components/catalog/parts'
import { ArticleCard } from '@/components/journal/parts'
import { Reveal } from '@/components/motion'

export const metadata: Metadata = { title: 'Dashboard' }
export const revalidate = 3600

export default async function DashboardPage() {
  const [stats, recentPlants, recentPosts] = await Promise.all([
    getDashboardStats(),
    getPlants({ perPage: 6 }),
    getPosts(1, 3),
  ])

  const metrics = [
    { icon: <PlantIcon size={22} aria-hidden />, label: 'Plantas cadastradas', value: stats.totalPlants },
    { icon: <ArticleIcon size={22} aria-hidden />, label: 'Artigos publicados', value: stats.totalPosts },
    { icon: <SquaresFourIcon size={22} aria-hidden />, label: 'Categorias', value: Object.keys(stats.categories).length },
    { icon: <ScrollIcon size={22} aria-hidden />, label: 'Fontes consultadas', value: '40+' },
  ]

  return (
    <main className="page-main">
      <CaHero eyebrow="Visão geral" line1="O herbário," line2="em números."
        copy="Acompanhe o crescimento da enciclopédia: plantas cadastradas, artigos publicados e como o acervo se distribui entre as categorias." />

      <section className="ca-sec db-sec" aria-label="Indicadores">
        <div className="ca-sec__wrap ca-stack36">
          <ul className="db-metrics">
            {metrics.map((m, i) => (
              <Reveal as="li" key={m.label} y={20} delay={i * 0.06} className={`db-metric${i === 0 ? ' db-metric--dark on-dark' : ''}`}>
                <span className="db-metric__icon">{m.icon}</span>
                <p className="stat">{m.value}</p>
                <p className="t-13 soft">{m.label}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal y={28} delay={0.1}>
            <DashboardCharts categories={stats.categories} />
          </Reveal>
        </div>
      </section>

      {recentPlants.length > 0 && (
        <section className="ca-sec db-sec db-sec--mint" aria-labelledby="db-plantas">
          <div className="ca-sec__wrap ca-stack36">
            <Reveal y={28}><CaHead id="db-plantas" title="Adicionadas recentemente" link={{ label: 'Ver todas', href: '/plantas' }} /></Reveal>
            <Reveal y={28} delay={0.08} amount={0.05}><PlantGrid plants={recentPlants} /></Reveal>
          </div>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className="ca-sec db-sec" aria-labelledby="db-artigos">
          <div className="ca-sec__wrap ca-stack36">
            <Reveal y={28}><CaHead id="db-artigos" title="Últimos artigos" link={{ label: 'Ver todos', href: '/blog' }} /></Reveal>
            <Reveal y={28} delay={0.08} amount={0.05}>
              <ul className="jo-grid">{recentPosts.map((p) => <li key={p.id}><ArticleCard post={p} /></li>)}</ul>
            </Reveal>
          </div>
        </section>
      )}
    </main>
  )
}
