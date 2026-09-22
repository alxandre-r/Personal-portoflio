'use client'

import { useState } from 'react'
import { trackCvDownload } from '@/lib/analytics'

import { Button } from '@/components/ui/Button'

export function CvDownloadButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => setOpen(true)}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
        Télécharger mon CV
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
              Choisir la langue du CV
            </h2>

            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              Sélectionnez la version que vous souhaitez télécharger.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="/cv/Alexandre-Robert-CV-FR.pdf"
                onClick={() => trackCvDownload('fr')}
                download
                className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]"
              >
                🇫🇷 Français
              </a>

              <a
                href="/cv/Alexandre-Robert-CV-EN.pdf"
                onClick={() => trackCvDownload('en')}
                download
                className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]"
              >
                🇬🇧 English
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 w-full text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </>
  )
}