'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import frDict from '@/dictionaries/fr.json'
import enDict from '@/dictionaries/en.json'

// not-found.tsx does not receive `params`, so the locale is detected
// client-side from the URL instead (see final i18n fix-wave, finding I6).
//
// Note: because the root layout lives under [lang] (app/[lang]/layout.tsx),
// Next.js routes genuinely-unmatched URLs and dynamicParams=false 404s
// through app/global-not-found.tsx instead of this file (verified via the
// route sweep in the fix-wave report). This file is kept as a defensive
// boundary in case a future page calls `notFound()` from within an
// already-matched, already-rendering segment under [lang] — the one case
// docs describe as reaching a segment-level not-found.tsx.
export default function NotFound() {
  const pathname = usePathname()
  const lang = pathname?.startsWith('/en') ? 'en' : 'fr'
  const t = (lang === 'en' ? enDict : frDict).common

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-8xl font-bold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">
          {t.not_found_title}
        </h1>
        <p className="text-[var(--color-muted-foreground)] mb-8 max-w-md mx-auto">
          {t.not_found_description}
        </p>
        <Button href={`/${lang}`} size="lg">
          {t.back_home}
        </Button>
      </motion.div>
    </div>
  )
}
