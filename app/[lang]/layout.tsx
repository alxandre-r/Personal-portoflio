import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, locales, type Locale } from '@/lib/i18n'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { SITE_NAME, SITE_URL } from '@/lib/metadata'
import '../globals.css'

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

// This is the effective root layout: it owns <html>/<body> even though it
// lives under the [lang] dynamic segment. Next.js supports this pattern for
// i18n (see docs/app/api-reference/file-conventions/layout.md — "Root
// Layout"), and proxy.ts guarantees every real request already carries a
// locale prefix, so [lang] is the only rendering path.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Alexandre',
    template: '%s | Alexandre',
  },
  keywords: ['développeur fullstack', 'ingénieur logiciel', 'Next.js', 'React', 'TypeScript', 'Node.js'],
  authors: [{ name: 'Alexandre' }],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDictionary(lang as Locale)

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
        <GoogleAnalytics />
        <ThemeProvider>
          <Header navT={t.nav} lang={lang} />
          <main className="flex-1 pt-16">{children}</main>
          <Footer t={t.footer} />
        </ThemeProvider>
      </body>
    </html>
  )
}
