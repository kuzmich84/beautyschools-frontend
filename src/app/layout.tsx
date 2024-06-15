import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import MainMenu from '@/components/menu/MainMenu'
import Footer from '@/components/footer/Footer'

const inter = Inter({
  subsets: ['cyrillic'],
  display: 'swap',
  weight: ['200', '400', '700'],
})

export const metadata: Metadata = {
  title: 'BeautySchools',
  description: 'Каталог курсов по красоте.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="main">
      <body className={inter.className}>
        <Providers>
          <MainMenu />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
