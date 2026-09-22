'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import frDict from '@/dictionaries/fr.json'
import enDict from '@/dictionaries/en.json'

// error.tsx does not receive `params`, so the locale is detected
// client-side from the URL instead (see final i18n fix-wave, finding I6).
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const lang = pathname?.startsWith('/en') ? 'en' : 'fr'
  const t = (lang === 'en' ? enDict : frDict).common

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
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
      </motion.div>
    </div>
  )
}
