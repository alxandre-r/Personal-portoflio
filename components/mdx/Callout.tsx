interface CalloutProps {
  title?: string
  children: React.ReactNode
}

export function Callout({ title, children }: CalloutProps) {
  return (
    <aside
      className="my-8 rounded-r-xl border-l-4 px-5 py-4 [&>p:last-child]:mb-0"
      style={{ borderColor: 'var(--project-accent)', background: 'var(--project-accent-soft)' }}
    >
      {title && (
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--project-accent-ink)]">
          {title}
        </p>
      )}
      {children}
    </aside>
  )
}
