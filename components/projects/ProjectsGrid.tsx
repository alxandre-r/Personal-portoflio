'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { ProjectFilter } from './ProjectFilter'
import { useProjectStore } from '@/lib/store/useProjectStore'
import { staggerContainer } from '@/lib/animations'
import type { Project } from '@/lib/data/types'
import type { Dictionary, Locale } from '@/lib/locales'

interface ProjectsGridProps {
  projects: Project[]
  filterLabels: Dictionary['projects']['filters']
  empty: string
  lang: Locale
  cardT: Dictionary['projects']['card']
}

export function ProjectsGrid({ projects, filterLabels, empty, lang, cardT }: ProjectsGridProps) {
  const activeFilter = useProjectStore((s) => s.activeFilter)
  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <div>
      <div className="mb-8">
        <ProjectFilter labels={filterLabels} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              lang={lang}
              categoryLabels={filterLabels}
              t={cardT}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      {filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--color-muted-foreground)]">{empty}</div>
      )}
    </div>
  )
}
