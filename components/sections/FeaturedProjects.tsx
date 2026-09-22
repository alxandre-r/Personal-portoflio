'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { projectColors } from '@/lib/projectColors'
import type { Project } from '@/lib/data/types'

interface FeaturedProjectsProps {
  projects: Project[]
}

function SandyHeroCard({ project }: { project: Project }) {
  const color = projectColors[project.colorKey]

  return (
    <motion.div variants={fadeInUp}>
      <Link href={`/projects/${project.slug}`} className="block group">
        <div
          className="relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl"
          style={{ borderColor: color.border }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 20px 60px ${color.bgSoft}`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${color.gradientFrom}18 0%, ${color.gradientTo}30 100%)`,
            }}
          />

          {/* Color top bar */}
          <div className="h-1 w-full relative" style={{ background: `linear-gradient(90deg, ${color.gradientFrom}, ${color.topBar})` }} />

          <div className="relative flex flex-col md:flex-row gap-0">
            {/* Content side */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-between min-h-[280px]">
              <div>
                {/* Personal badge */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: color.bgSoft, color: color.text, border: `1px solid ${color.border}` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color.topBar }} />
                    Projet personnel · En production
                  </span>
                  <Badge variant="default">Fullstack</Badge>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-[var(--color-foreground)]">
                  {project.title}
                </h3>
                <p className="text-[var(--color-muted-foreground)] leading-relaxed max-w-lg mb-6">
                  {project.shortDescription}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="default">{tech}</Badge>
                  ))}
                </div>
              </div>

            </div>

            {/* Visual side */}
            <div
              className="md:w-80 lg:w-96 min-h-[200px] md:min-h-0 relative overflow-hidden"
              style={{ background: `linear-gradient(160deg, ${color.gradientFrom}33, ${color.gradientTo}55)` }}
            >
              {/* Grid decoration */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, ${color.topBar} 0, ${color.topBar} 1px, transparent 0, transparent 40px), repeating-linear-gradient(90deg, ${color.topBar} 0, ${color.topBar} 1px, transparent 0, transparent 40px)`,
                }}
              />
              {/* Center image */}
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  quality={90}
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Sandy is always first (personal project hero), rest are enterprise projects
  const sandy = projects.find((p) => p.slug === 'sandy')
  const others = projects.filter((p) => p.slug !== 'sandy')

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-[var(--color-accent)] mb-2">Projets sélectionnés</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ce que j&apos;ai <span className="gradient-text">construit</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5 shrink-0"
          >
            Voir tous les projets
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col gap-6"
        >
          {/* Sandy - personal project hero */}
          {sandy && <SandyHeroCard project={sandy} />}

          {/* Enterprise projects grid */}
          {others.length > 0 && (
            <>
              <motion.p variants={fadeInUp} className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted-foreground)] mt-2">
                Projets en entreprise - Weinmann Technologies
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {others.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
