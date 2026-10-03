import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import RootFooter from '@/components/RootFooter'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'O Broto da Natureza',
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
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="broto-theme"
        >
          <Header />

          <div className="min-h-screen">
            {children}
          </div>

          <RootFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}