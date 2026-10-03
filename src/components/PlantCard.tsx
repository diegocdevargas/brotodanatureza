'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Plant } from '@/lib/wordpress'

const CATEGORIA_CORES: Record<string, { text: string; dot: string }> = {
  digestiva:           { text: '#F59E0B', dot: '#F59E0B' },
  calmante:            { text: '#A78BFA', dot: '#A78BFA' },
  'anti-inflamatória': { text: '#2DD4BF', dot: '#2DD4BF' },
  imunológica:         { text: '#4ADE80', dot: '#4ADE80' },
  circulatória:        { text: '#F87171', dot: '#F87171' },
  respiratória:        { text: '#60A5FA', dot: '#60A5FA' },
  outros:              { text: '#94A3B8', dot: '#94A3B8' },
}

export default function PlantCard({ plant }: { plant: Plant }) {
  const { slug, title, acf } = plant
  const categoryKey = acf?.category?.toLowerCase() ?? 'outros'
  const cores       = CATEGORIA_CORES[categoryKey] ?? CATEGORIA_CORES.outros
  const image       = acf?.illustrative_image

  return (
    <Link
      href={`/plantas/${slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 8px var(--shadow)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-border)'
        e.currentTarget.style.boxShadow = '0 8px 24px var(--shadow-lg)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow)'
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden" style={{ background: 'var(--bg)' }}>
        {image ? (
          <Image
            src={image}
            alt={title.rendered}
            fill
            className="object-cover group-hover:scale-105 transition-all duration-500"
            style={{ opacity: 0.85 }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg width="48" height="56" viewBox="0 0 48 56" fill="none" aria-hidden="true" className="opacity-20">
              <path
                d="M24 54 C24 42 12 34 8 22 C4 10 16 4 24 12 C32 4 44 10 40 22 C36 34 24 42 24 54Z"
                stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round"
              />
              <path d="M24 54 L24 28" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
            </svg>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--surface) 0%, transparent 60%)' }}
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {acf?.category && (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cores.dot }} />
            <span className="text-[10px] tracking-wider uppercase font-medium" style={{ color: cores.text }}>
              {acf.category}
            </span>
          </div>
        )}

        <h3
          className="font-display text-[15px] leading-snug transition-colors duration-200"
          style={{ color: 'var(--text)' }}
        >
          {title.rendered}
        </h3>

        {acf?.scientific_name && (
          <p className="font-mono-dm text-[10px] italic leading-tight" style={{ color: 'var(--text-muted)' }}>
            {acf.scientific_name}
          </p>
        )}

        {acf?.used_parts && (
          <p className="text-[11px] mt-1 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Partes usadas:</span>{' '}
            {acf.used_parts}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <span
          className="text-[11px] font-mono-dm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: 'var(--accent)' }}
        >
          ver detalhes →
        </span>
      </div>
    </Link>
  )
}