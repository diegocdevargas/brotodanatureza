'use client'

import CurrentYear from '@/components/CurrentYear'

export default function RootFooter() {
  return (
    <footer className="mt-20" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <p className="font-display text-lg mb-3" style={{ color: 'var(--text)' }}>
              O Broto da Natureza
            </p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Um arquivo vivo de conhecimento sobre plantas medicinais,
              reunido com cuidado e baseado em fontes históricas e científicas.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
              Explorar
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/plantas',   label: 'Enciclopédia' },
                { href: '/blog',      label: 'Artigos' },
                { href: '/dashboard', label: 'Dashboard' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
              Aviso
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              As informações aqui presentes têm caráter exclusivamente educativo
              e não substituem orientação médica ou farmacêutica profissional.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © <CurrentYear /> O Broto da Natureza — fins educativos
          </span>
          <span className="text-xs italic font-mono-dm" style={{ color: 'var(--text-faint)' }}>
            feito com cuidado
          </span>
        </div>

      </div>
    </footer>
  )
}
