import { notFound } from 'next/navigation'
import { getDictionary, isLocale, locales, type Locale } from '@/lib/i18n'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HtmlLang } from '@/components/ui/HtmlLang'

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

  const FooterAny = Footer as any

  return (
    <ThemeProvider>
      <HtmlLang lang={lang} />
      <Header navT={t.nav} lang={lang} />
      <main className="flex-1 pt-16">{children}</main>
      <FooterAny t={t.footer} />
    </ThemeProvider>
  )
}
