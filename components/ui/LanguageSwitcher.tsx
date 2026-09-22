'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/lib/locales'
import { cn } from '@/lib/utils/cn'

interface LanguageSwitcherProps {
  lang: Locale
}

export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname()

  function getLocalePath(locale: Locale): string {
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className="flex items-center gap-0.5 text-xs font-semibold">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-0.5">
          {i > 0 && <span className="text-[var(--color-border)]">|</span>}
          {locale === lang ? (
            <span className="px-1.5 py-0.5 rounded text-[var(--color-foreground)] bg-[var(--color-muted)]">
              {locale.toUpperCase()}
            </span>
          ) : (
            <Link
              href={getLocalePath(locale)}
              className={cn(
                'px-1.5 py-0.5 rounded transition-colors',
                'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
              )}
            >
              {locale.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}
