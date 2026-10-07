import '@/styles/catalog.scss'
import type { Metadata } from 'next'
import { Button } from '@/components/ui'
import { CaHero } from '@/components/catalog/parts'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Página não encontrada' }

export default function NotFound() {
  return (
    <main className="page-main">
      <CaHero eyebrow="Erro 404" line1="Esta trilha" line2="não leva a lugar nenhum."
        copy="O link pode estar quebrado ou a página mudou de lugar. Que tal voltar ao início ou procurar uma planta na enciclopédia?">
        <div className="ca-hero__btns">
          <Button href="/" className="btn--cta">Voltar ao início</Button>
          <Link href="/plantas" className="ca-pill ca-pill--glass">Abrir a enciclopédia</Link>
        </div>
      </CaHero>
    </main>
  )
}
