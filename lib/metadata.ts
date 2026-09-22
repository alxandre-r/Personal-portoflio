import type { Locale } from '@/lib/locales'

// TODO: replace with the real production domain before this branch ships.
// No domain could be confirmed from package.json, README, vercel config, or
// git remotes at the time this was written — flagged in the fix-wave report.
export const SITE_URL = 'https://portfolio.example.com'

export const SITE_NAME = 'Alexandre Portfolio'

export function localeToOgLocale(lang: Locale): string {
  return lang === 'fr' ? 'fr_FR' : 'en_US'
}

/**
 * Shared OpenGraph defaults for every page's generateMetadata.
 *
 * Note: Next.js metadata merging is shallow — a page-level `openGraph`
 * object fully replaces the root layout's `openGraph` object rather than
 * merging into it. So `type`/`siteName` must be repeated here on every page
 * rather than relying on the root layout's defaults to survive.
 */
export function buildOpenGraph(lang: Locale) {
  return {
    type: 'website' as const,
    siteName: SITE_NAME,
    locale: localeToOgLocale(lang),
  }
}

/**
 * hreflang alternates + canonical URL for a given page.
 * `path` is the page's path without the locale prefix (e.g. '', '/about').
 */
export function buildAlternates(lang: Locale, path: string) {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      fr: `/fr${path}`,
      en: `/en${path}`,
      'x-default': `/fr${path}`,
    },
  }
}
