import 'server-only'
import type frDict from '@/dictionaries/fr.json'

const dictionaries = {
  fr: () => import('@/dictionaries/fr.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
}

export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export type Dictionary = typeof frDict

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
