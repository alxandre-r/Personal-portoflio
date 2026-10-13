'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { staggerContainer } from '@/lib/animations'
import type { Project } from '@/lib/data/types'
import type { Dictionary, Locale } from '@/lib/locales'

interface ProjectsGridProps {
  projects: Project[]
  categoryLabels: Dictionary['projects']['filters']
  lang: Locale
  cardT: Dictionary['projects']['card']
}

export function ProjectsGrid({ projects, categoryLabels, lang, cardT }: ProjectsGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          lang={lang}
          categoryLabels={categoryLabels}
          t={cardT}
        />
      ))}
    </motion.div>
  )
}
