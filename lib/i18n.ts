import 'server-only'
import type { Locale, Dictionary } from '@/lib/locales'

export { locales, defaultLocale, isLocale, type Locale, type Dictionary } from '@/lib/locales'

const dictionaries = {
  fr: () => import('@/dictionaries/fr.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
