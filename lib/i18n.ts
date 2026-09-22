import 'server-only'
import type frDict from '@/dictionaries/fr.json'
import type { Locale } from '@/lib/locales'

export { locales, defaultLocale, isLocale, type Locale } from '@/lib/locales'

const dictionaries = {
  fr: () => import('@/dictionaries/fr.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
}

export type Dictionary = typeof frDict

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
