import '@/styles/journal.scss'
import type { Metadata } from 'next'
import { ArticleIcon } from '@phosphor-icons/react/dist/ssr'
import { getPosts } from '@/lib/wordpress'
import { Reveal } from '@/components/motion'
import { JoHero, FeaturedCard, ArticleCard } from '@/components/journal/parts'
import CtaCard from '@/components/shared/CtaCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos sobre plantas medicinais, saúde natural e fitoterapia.',
}

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getPosts(1, 13)
  const [featured, ...rest] = posts

  return (
    <main className="page-main">
      <JoHero eyebrow="Blog" line1="Histórias e saberes" line2="do mundo verde."
        copy="Artigos sobre plantas medicinais, saúde natural e fitoterapia — da história de cada erva ao que a pesquisa descobriu sobre ela." />

      {featured ? (
        <>
          <section className="jo-sec jo-featured" aria-labelledby="recentes">
            <div className="jo-c">
              <Reveal y={28} amount={0.25} className="jo-head jo-head--stack">
                <h2 id="recentes" className="jo-h40">Mais recente</h2>
                <p className="t-13 muted">Leituras para cultivar o cuidado com a saúde.</p>
              </Reveal>
              <Reveal y={28} amount={0.25} delay={0.08}><FeaturedCard post={featured} /></Reveal>
            </div>
          </section>
          {rest.length > 0 && (
            <section className="jo-sec jo-all" aria-labelledby="mais">
              <div className="jo-c">
                <Reveal y={28} amount={0.25} className="jo-head"><h2 id="mais" className="jo-h40">Mais leituras</h2></Reveal>
                <Reveal y={28} amount={0.05} delay={0.08}>
                  <ul className="jo-grid">
                    {rest.map((p) => <li key={p.id}><ArticleCard post={p} /></li>)}
                  </ul>
                </Reveal>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="jo-sec jo-featured">
          <div className="jo-c">
            <div className="jo-empty">
              <ArticleIcon size={40} aria-hidden className="accent" />
              <h2 className="jo-h32">Nenhum artigo publicado ainda</h2>
              <p className="t-15 soft">Os primeiros textos estão sendo preparados. Enquanto isso, explore a enciclopédia.</p>
            </div>
          </div>
        </section>
      )}

      <div className="jo-cta jo-cta--news jo-cta--cream" style={{ display: 'contents' }}>
        <CtaCard band="cream" pad="" title="Da leitura à prática"
          copy="Encontrou uma planta interessante em um artigo? Veja usos, preparo e contraindicações na ficha completa da enciclopédia."
          primary={{ label: 'Explorar a enciclopédia', href: '/plantas' }} />
      </div>
    </main>
  )
}
