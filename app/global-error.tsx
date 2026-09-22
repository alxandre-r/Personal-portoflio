'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Inter, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import frDict from '@/dictionaries/fr.json'
import enDict from '@/dictionaries/en.json'
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

// error.js does not wrap the layout.js in its own segment, only nested
// children — so app/[lang]/error.tsx cannot catch errors thrown by
// app/[lang]/layout.tsx itself (the effective root layout, since it renders
// <html>/<body> directly). global-error.tsx is Next.js's documented fix for
// this exact scenario (see node_modules/next/dist/docs/01-app/03-api-reference/
// 03-file-conventions/error.md — "Global Error"). It replaces the root
// layout entirely when active, so it must render its own <html>/<body> and
// cannot rely on any parent layout for chrome (mirrors global-not-found.tsx).
// Like error.tsx, it also has no access to route params, so the locale is
// detected client-side from the URL instead (see final i18n fix-wave,
// finding I6) rather than via headers()/getDictionary(), which are
// server-only and unavailable in this Client Component.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const lang = pathname?.startsWith('/en') ? 'en' : 'fr'
  const dict = lang === 'en' ? enDict : frDict
  const t = dict.common

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
        <GoogleAnalytics />
        <ThemeProvider>
          <Header navT={dict.nav} lang={lang} />
          <main className="flex-1 pt-16">
            <div className="min-h-[60vh] flex items-center justify-center px-4">
              <div className="text-center">
                <p className="text-6xl font-bold gradient-text mb-4">Oops</p>
                <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">
                  {t.error_title}
                </h1>
                <p className="text-[var(--color-muted-foreground)] mb-8 max-w-md mx-auto">
                  {t.error_description}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={reset} size="lg">
                    {t.retry}
                  </Button>
                  <Button href={`/${lang}`} variant="outline" size="lg">
                    {t.back_home}
                  </Button>
                </div>
              </div>
            </div>
          </main>
          <Footer t={dict.footer} />
        </ThemeProvider>
      </body>
    </html>
  )
}
