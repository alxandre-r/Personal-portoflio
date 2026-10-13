import { cn } from '@/lib/utils/cn'

interface ColumnsProps {
  children: React.ReactNode
  /**
   * Fixed width (px) for the second column, e.g. a phone screenshot beside a
   * list. The first column takes the rest. Omit for two equal columns.
   */
  side?: number
}

/**
 * Two columns from `sm` up, stacked on phones. Each direct child is a column.
 * Columns are top-aligned and their outer margins trimmed, so the first line
 * of each column starts on the same line.
 */
export function Columns({ children, side }: ColumnsProps) {
  return (
    <div
      className={cn(
        'my-8 grid items-start gap-6 [&>*]:my-0 [&>*]:min-w-0 [&>*>:first-child]:mt-0 [&>*>:last-child]:mb-0',
        side
          ? 'sm:grid-cols-[minmax(0,1fr)_var(--side)] sm:gap-10 [&>:last-child]:w-[var(--side)] [&>:last-child]:max-w-full [&>:last-child]:justify-self-center'
          : 'sm:grid-cols-2',
      )}
      style={side ? ({ '--side': `${side}px` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
