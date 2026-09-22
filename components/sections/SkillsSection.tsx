'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { skillsByCategory } from '@/lib/data/skills'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import type { Skill } from '@/lib/data/types'

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps & Cloud',
  tools: 'Outils',
}

const categoryIcons = {
  frontend: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  backend: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  ),
  devops: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  tools: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
}

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[var(--color-muted)] transition-colors group"
    >
      <span className="text-sm text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
        {skill.name}
      </span>
      <Badge variant="level" level={skill.level}>
        {skill.level === 'expert' ? 'Expert' : skill.level === 'advanced' ? 'Avancé' : 'Intermédiaire'}
      </Badge>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stack <span className="gradient-text">technique</span>
          </h2>
          <p className="text-[var(--color-muted-foreground)] max-w-xl mx-auto">
            Technologies que j&apos;utilise quotidiennement pour concevoir et déployer des applications.
          </p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {(Object.keys(skillsByCategory) as Array<keyof typeof skillsByCategory>).map((cat) => (
            <motion.div
              key={cat}
              variants={fadeInUp}
              className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-5 hover:border-[var(--color-accent)]/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4 text-[var(--color-accent)]">
                {categoryIcons[cat]}
                <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
                  {categoryLabels[cat]}
                </h3>
              </div>
              <div className="space-y-1">
                {skillsByCategory[cat].map((skill) => (
                  <SkillItem key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
