import Link from 'next/link'
import { getPosts } from '@/lib/wordpress'

export const metadata = {
  title: 'Blog | O Broto da Natureza',
  description: 'Artigos sobre plantas medicinais, saúde natural e fitoterapia.',
}

export const revalidate = 3600

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(value))
}

function summarizeText(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
}

export default async function BlogPage() {
  const posts = await getPosts(1, 12)

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <div className="mb-12">
        <p className="font-mono-dm text-xs tracking-[3px] uppercase mb-2" style={{ color: 'var(--herb)' }}>
          Artigos
        </p>
        <h1 className="font-display text-4xl mb-3" style={{ color: 'var(--text)' }}>Blog</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Artigos sobre plantas medicinais, saúde natural e fitoterapia.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => {
            const image   = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
            const date    = formatDate(post.date)
            const summary = summarizeText(post.excerpt.rendered)

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface)',
                  border: i === 0 ? '1px solid var(--accent-border)' : '1px solid var(--border)',
                  boxShadow: '0 2px 8px var(--shadow)',
                }}
              >
                {image ? (
                  <div
                    className="h-40 bg-cover bg-center transition-opacity duration-300"
                    style={{ backgroundImage: `url(${image})`, opacity: 0.8 }}
                  />
                ) : (
                  <div className="h-40 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
                    <svg width="40" height="48" viewBox="0 0 40 48" fill="none" aria-hidden="true" className="opacity-20">
                      <path d="M20 46 C20 36 10 30 6 18 C2 6 12 2 20 10 C28 2 38 6 34 18 C30 30 20 36 20 46Z"
                        stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <path d="M20 46 L20 24" stroke="var(--text-muted)" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 3" />
                    </svg>
                  </div>
                )}
                <div className="p-5">
                  <p className="font-mono-dm text-[10px] tracking-wider mb-3" style={{ color: 'var(--text-faint)' }}>
                    {date}
                  </p>
                  <h2 className="font-display text-[15px] leading-snug mb-3 line-clamp-2 transition-colors" style={{ color: 'var(--text)' }}>
                    {post.title.rendered}
                  </h2>
                  <p className="text-xs line-clamp-3 leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                    {summary}
                  </p>
                  <span className="text-xs font-mono-dm" style={{ color: 'var(--accent)' }}>
                    ler artigo →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center mt-20">
          <div className="flex justify-center mb-6">
            <svg width="48" height="56" viewBox="0 0 48 56" fill="none" aria-hidden="true" className="opacity-20">
              <path d="M24 54 C24 42 12 34 8 22 C4 10 16 4 24 12 C32 4 44 10 40 22 C36 34 24 42 24 54Z"
                stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M24 54 L24 28" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
            </svg>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Nenhum artigo publicado ainda.</p>
        </div>
      )}

    </main>
  )
}