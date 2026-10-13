/** Neutral badge naming the employer a project was built for, to set it apart from personal work. */
export function CompanyBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-[var(--color-border)] text-[var(--color-foreground)] bg-[var(--color-muted)]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01" />
      </svg>
      {name}
    </span>
  )
}
