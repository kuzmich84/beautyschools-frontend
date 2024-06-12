import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import MainMenu from '@/components/menu/MainMenu'

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
          {children}
        </Providers>
      </body>
    </html>
  )
}
