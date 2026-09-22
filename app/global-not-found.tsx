import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter, Geist_Mono } from 'next/font/google'
import { getDictionary, isLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import './globals.css'

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

// global-not-found.tsx bypasses the normal app/[lang]/layout.tsx rendering
// entirely (Next.js requires this because the root layout lives under the
// [lang] dynamic segment — see next.config.ts and docs/app/api-reference/
// file-conventions/not-found.md). It has no access to route params, so the
// locale is read from the `x-locale` header proxy.ts sets on every
// locale-prefixed request.
async function resolveLocale(): Promise<Locale> {
  const h = await headers()
  const fromHeader = h.get('x-locale')
  return fromHeader && isLocale(fromHeader) ? fromHeader : defaultLocale
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await resolveLocale()
  const t = await getDictionary(lang)
  return { title: t.common.not_found_title }
}

export default async function GlobalNotFound() {
  const lang = await resolveLocale()
  const t = await getDictionary(lang)

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
        <ThemeProvider>
          <Header navT={t.nav} lang={lang} />
          <main className="flex-1 pt-16">
            <div className="min-h-[60vh] flex items-center justify-center px-4">
              <div className="text-center">
                <p className="text-8xl font-bold gradient-text mb-4">404</p>
                <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">
                  {t.common.not_found_title}
                </h1>
                <p className="text-[var(--color-muted-foreground)] mb-8 max-w-md mx-auto">
                  {t.common.not_found_description}
                </p>
                <Button href={`/${lang}`} size="lg">
                  {t.common.back_home}
                </Button>
              </div>
            </div>
          </main>
          <Footer t={t.footer} />
        </ThemeProvider>
      </body>
    </html>
  )
}
