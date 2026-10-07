import '@/styles/journal.scss'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PenNibIcon } from '@phosphor-icons/react/dist/ssr'
import { getPost, getPosts, postMeta, sanitizeHtml } from '@/lib/wordpress'
import { decodeEntities, plainText, summary } from '@/lib/format'
import { disclaimer } from '@/lib/site'
import { Reveal } from '@/components/motion'
import { PlantImage } from '@/components/ui'
import { Meta, NeighbourCard } from '@/components/journal/parts'
import CtaCard from '@/components/shared/CtaCard'

export const revalidate = 3600

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  const title = decodeEntities(post.title.rendered)
  const description = summary(post.excerpt.rendered, 155)
  const { image } = postMeta(post)
  return {
    title,
    description,
    openGraph: { title, description, type: 'article', publishedTime: post.date, images: image ? [image] : undefined },
  }
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params
  const [post, recent] = await Promise.all([getPost(slug), getPosts(1, 20)])
  if (!post) notFound()

  const { image, author, category } = postMeta(post)
  const title = decodeEntities(post.title.rendered)
  const i = recent.findIndex((p) => p.slug === post.slug)
  const newer = i > 0 ? recent[i - 1] : undefined
  const older = i >= 0 && i < recent.length - 1 ? recent[i + 1] : undefined

  return (
    <main className="page-main">
      <article style={{ display: 'contents' }}>
        <section className="jo-ahead">
          <div className="jo-ahead__c">
            <Reveal y={28}>
              <nav aria-label="Trilha de navegação" className="jo-crumb t-12b">
                <Link href="/blog" className="muted">Blog</Link>
                {category && <><span className="muted" aria-hidden>/</span><span className="accent">{category}</span></>}
              </nav>
            </Reveal>
            <Reveal as="h1" y={28} delay={0.06} className="jo-h78 jo-ahead__title">{title}</Reveal>
            {post.excerpt?.rendered && (
              <Reveal as="p" y={24} delay={0.14} className="jo-lead soft jo-ahead__ex">{plainText(post.excerpt.rendered)}</Reveal>
            )}
            <Reveal y={20} delay={0.2}>
              <Meta post={post} withAuthor className="jo-meta--center jo-meta--stack" />
            </Reveal>
          </div>
          {image && <Reveal y={26} delay={0.26} className="jo-ahead__cover"><PlantImage src={image} alt="" /></Reveal>}
          <div className="jo-ahead__spacer" />
        </section>

        <section className="jo-abody">
          <div className="jo-abody__c">
            <Reveal y={28} amount={0.05}>
              <div className="wp-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.rendered) }} />
            </Reveal>
            {author && (
              <Reveal y={24} delay={0.08} className="jo-author">
                <span className="jo-author__av"><PenNibIcon size={22} aria-hidden /></span>
                <div className="jo-author__copy">
                  <p className="jo-author__name">{author}</p>
                  <p className="t-13 muted">Autor no Broto da Natureza</p>
                </div>
              </Reveal>
            )}
            <p className="t-13 muted jo-disclaimer">{disclaimer}</p>
          </div>
        </section>
      </article>

      {(newer || older) && (
        <section className="jo-sec jo-more" aria-labelledby="continue">
          <div className="jo-c">
            <Reveal y={28} className="jo-head jo-head--more">
              <h2 id="continue" className="jo-h40">Continue lendo</h2>
              <Link href="/blog" className="t-15b accent jo-all-link">Todos os artigos</Link>
            </Reveal>
            <div className="jo-pn">
              {older && <Reveal y={28}><NeighbourCard post={older} label="Artigo anterior" /></Reveal>}
              {newer && <Reveal y={28} delay={older ? 0.06 : 0}><NeighbourCard post={newer} label="Próximo artigo" /></Reveal>}
            </div>
          </div>
        </section>
      )}

      <div className="jo-cta jo-cta--tight jo-cta--mint" style={{ display: 'contents' }}>
        <CtaCard band="mint" pad="" title="Conheça as plantas citadas"
          copy="Usos, partes utilizadas, modo de preparo e contraindicações — tudo reunido na ficha de cada planta."
          primary={{ label: 'Abrir a enciclopédia', href: '/plantas' }} />
      </div>
    </main>
  )
}
