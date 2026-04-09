'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { fadeInUp } from '@/lib/animations'
import { projectColors } from '@/lib/projectColors'
import type { Project } from '@/lib/data/types'

interface ProjectCardProps {
  project: Project
}

const categoryLabels: Record<string, string> = {
  web: 'Web',
  fullstack: 'Fullstack',
  tool: 'Outil',
  mobile: 'Mobile',
}

export function ProjectCard({ project }: ProjectCardProps) {
  const color = projectColors[project.colorKey]
  const isPersonal = project.slug === 'sandy'

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group h-full"
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div
          className="h-full flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
          style={{
            borderColor: color.border,
            backgroundColor: 'var(--color-card)',
            boxShadow: `0 0 0 0 ${color.topBar}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 40px ${color.bgSoft}`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 0 transparent'
          }}
        >
          {/* Color top bar */}
          <div className="h-1 w-full" style={{ background: color.topBar }} />

          {/* Content */}
          <div className="flex flex-col flex-grow p-5 gap-3">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              {isPersonal && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
                  style={{ background: color.bgSoft, color: color.text, border: `1px solid ${color.border}` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color.topBar }} />
                  Projet personnel
                </span>
              )}
              <span
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                style={{ background: color.bgSoft, color: color.text, border: `1px solid ${color.border}` }}
              >
                {categoryLabels[project.category]}
              </span>
            </div>

            <h3
              className="text-base font-semibold leading-snug transition-colors"
              style={{ color: 'var(--color-foreground)' }}
            >
              <span className="group-hover:opacity-0 transition-opacity absolute">{project.title}</span>
              <span style={{ color: color.text }}>{project.title}</span>
            </h3>

            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed line-clamp-2 flex-grow">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 4 && (
                <Badge variant="default">+{project.techStack.length - 4}</Badge>
              )}
            </div>

            <div
              className="flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all"
              style={{ color: color.text }}
            >
              {isPersonal ? 'Ouvrir l\'application' : 'Voir le projet'}
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
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
