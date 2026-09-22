'use client'

import { motion } from 'framer-motion'
import { useProjectStore } from '@/lib/store/useProjectStore'
import { cn } from '@/lib/utils/cn'
import type { ProjectFilter as FilterType } from '@/lib/store/useProjectStore'
import type { Dictionary } from '@/lib/locales'

interface ProjectFilterProps {
  labels: Dictionary['projects']['filters']
}

export function ProjectFilter({ labels }: ProjectFilterProps) {
  const { activeFilter, setFilter } = useProjectStore()

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: labels.all },
    { value: 'fullstack', label: labels.fullstack },
    { value: 'web', label: labels.web },
    { value: 'tool', label: labels.tool },
    { value: 'mobile', label: labels.mobile },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const active = activeFilter === filter.value
        return (
          <button
            key={filter.value}
            onClick={() => setFilter(filter.value)}
            className={cn(
              'relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
              active
                ? 'text-white'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
            )}
          >
            {active && (
              <motion.span
                layoutId="filter-indicator"
                className="absolute inset-0 bg-[var(--color-accent)] rounded-full"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
