import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, sanitizeHtml } from '@/lib/wordpress'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return { title: `${post.title.rendered} | O Broto da Natureza` }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const date  = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(post.date))

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono-dm mb-10" style={{ color: 'var(--text-faint)' }}>
        <Link href="/" className="transition-colors" style={{ color: 'var(--text-muted)' }}>Início</Link>
        <span>/</span>
        <Link href="/blog" className="transition-colors" style={{ color: 'var(--text-muted)' }}>Blog</Link>
        <span>/</span>
        <span className="line-clamp-1" style={{ color: 'var(--text)' }}>{post.title.rendered}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="font-mono-dm text-[10px] tracking-[2px] uppercase mb-4" style={{ color: 'var(--text-faint)' }}>
          {date}
        </p>
        <h1
          className="font-display text-3xl sm:text-4xl leading-tight mb-4"
          style={{ color: 'var(--text)' }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {/* Botanical divider */}
        <div className="flex items-center gap-3 mt-6">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, var(--accent-border), transparent)' }} />
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
            <path d="M6 13 C6 10 3 8 2 5 C1 2 4 1 6 3 C8 1 11 2 10 5 C9 8 6 10 6 13Z"
              stroke="var(--accent)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          </svg>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, var(--accent-border), transparent)' }} />
        </div>
      </header>

      {/* Featured image */}
      {image && (
        <div
          className="w-full h-56 rounded-2xl bg-cover bg-center mb-10"
          style={{ backgroundImage: `url(${image})`, opacity: 0.85 }}
        />
      )}

      {/* Article */}
      <article
        className="prose-themed prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.rendered) }}
      />

      {/* Disclaimer */}
      <div className="mt-12 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
          As informações deste artigo têm caráter educativo e não substituem orientação médica.
        </p>
      </div>

      <Link
        href="/blog"
        className="inline-block mt-6 text-sm font-mono-dm transition-colors"
        style={{ color: 'var(--accent)' }}
      >
        ← Voltar para o blog
      </Link>

    </main>
  )
}