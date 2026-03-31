import type { Metadata } from 'next'
import { Inter, Playfair_Display, Crimson_Text } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const crimson = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson',
})

export const metadata: Metadata = {
  title: 'The Living Bread | Building the Kingdom of God Together',
  description: 'A platform bringing together all who believe in the name and power of Jesus Christ, in fellowship with one another, to love and share resources freely.',
  keywords: ['Christian', 'fellowship', 'community', 'Kingdom of God', 'Jesus Christ', 'faith', 'service'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${crimson.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-bread-50 to-white font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
