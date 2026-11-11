import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { THEME_SCRIPT } from '@/lib/theme'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import Loader from '@/components/Loader'
import { LOADER_SCRIPT } from '@/lib/loader'
import './globals.scss'

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Broto da Natureza — Enciclopédia de plantas medicinais',
    template: '%s | Broto da Natureza',
  },
  description: 'Portal de plantas medicinais com enciclopédia, artigos e pesquisa. Baseado em fontes ancestrais, históricas e científicas.',
  openGraph: {
    title: 'Broto da Natureza',
    description: 'Enciclopédia de plantas medicinais baseada em fontes ancestrais, históricas e científicas.',
    siteName: 'Broto da Natureza',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `${THEME_SCRIPT};${LOADER_SCRIPT}` }} />
      </head>
      <body suppressHydrationWarning>
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        <SmoothScroll />
        <Loader />
        <Nav />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className="page" id="conteudo">
              {children}
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
