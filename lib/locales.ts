import type frDict from '@/dictionaries/fr.json'

export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

// Type-only import of the dictionary JSON shape — no runtime cost, so this
// stays safe to import from client components (unlike lib/i18n.ts, which
// pulls in `server-only` and the actual dictionary loader).
export type Dictionary = typeof frDict
