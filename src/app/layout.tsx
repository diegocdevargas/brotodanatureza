import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Loader, { LOADER_SCRIPT } from '@/components/Loader'
import './globals.scss'

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'O Broto da Natureza — Enciclopédia de plantas medicinais',
    template: '%s | O Broto da Natureza',
  },
  description: 'Portal de plantas medicinais com enciclopédia, artigos e pesquisa. Baseado em fontes históricas e científicas.',
  openGraph: {
    title: 'O Broto da Natureza',
    description: 'Enciclopédia de plantas medicinais baseada em fontes históricas e científicas.',
    siteName: 'O Broto da Natureza',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="broto-theme"
        >
          <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
          <Loader />
          <Nav />
          <div className="page" id="conteudo">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
