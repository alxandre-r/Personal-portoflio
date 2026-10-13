interface PlaceholderProps {
  /** What capture should go here, e.g. "GIF: fog closing in at dusk". */
  label: string
  /** CSS aspect-ratio, defaults to 16 / 9. */
  ratio?: string
}

/** Visible stand-in for a screenshot or clip that hasn't been added yet. */
export function Placeholder({ label, ratio = '16 / 9' }: PlaceholderProps) {
  return (
    <div
      className="my-8 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center"
      style={{ aspectRatio: ratio, borderColor: 'var(--project-accent-border)', background: 'var(--project-accent-soft)' }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--project-accent-ink)]" aria-hidden="true">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
      <p className="text-sm text-[var(--color-muted-foreground)]">{label}</p>
    </div>
  )
}
