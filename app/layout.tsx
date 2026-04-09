import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Alexandre - Ingénieur Logiciel & Développeur Fullstack',
    template: '%s | Alexandre',
  },
  description:
    'Portfolio d\'Alexandre, ingénieur logiciel et développeur fullstack. Spécialisé en Next.js, TypeScript, React et Node.js.',
  keywords: ['développeur fullstack', 'ingénieur logiciel', 'Next.js', 'React', 'TypeScript', 'Node.js'],
  authors: [{ name: 'Alexandre' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Alexandre - Ingénieur Logiciel & Développeur Fullstack',
    description:
      'Portfolio d\'Alexandre, ingénieur logiciel et développeur fullstack.',
    siteName: 'Alexandre Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexandre - Ingénieur Logiciel & Développeur Fullstack',
    description:
      'Portfolio d\'Alexandre, ingénieur logiciel et développeur fullstack.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
