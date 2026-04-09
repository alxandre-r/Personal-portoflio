import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PageTransition } from '@/components/layout/PageTransition'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { getProjectBySlug, projects } from '@/lib/data/projects'
import { projectColors } from '@/lib/projectColors'
import { MarketingProjectDetail } from '@/components/projects/MarketingProjectDetail'
import { icons } from '@/components/ui/SvgIcons'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Projet introuvable' }
  return {
    title: project.title,
    description: project.shortDescription,
  }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const color = projectColors[project.colorKey]

  if (project.features?.length) {
    return (
      <PageTransition>
        <MarketingProjectDetail project={project} color={color} />
      </PageTransition>
    )
  }

  const isPersonal = project.slug === 'sandy'

  const sections = [
    { label: 'Contexte', content: project.context, icon: icons.document },
    { label: 'Problème', content: project.problem, icon: icons.search },
    { label: 'Solution', content: project.solution, icon: icons.light },
    { label: 'Résultats', content: project.result, icon: icons.check },
  ]

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back */}
        <AnimatedSection className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Retour aux projets
          </Link>
        </AnimatedSection>

        {/* Colored top bar */}
        <div className="h-1 w-16 rounded-full mb-6" style={{ background: color.topBar }} />

        {/* Header */}
        <AnimatedSection className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {isPersonal && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: color.bgSoft, color: color.text, border: `1px solid ${color.border}` }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color.topBar }} />
                Projet personnel · En production
              </span>
            )}
            <Badge variant="accent">{project.category}</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-foreground)]">
            {project.title}
          </h1>
          <p className="text-xl text-[var(--color-muted-foreground)] leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Links */}
          {(project.demoUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-3 mt-6">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg"
                  style={{ background: color.topBar, color: '#fff' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" x2="21" y1="14" y2="3" />
                  </svg>
                  {isPersonal ? 'Utiliser l\'application' : 'Voir la démo'}
                </a>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} external variant="outline" size="sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              )}
            </div>
          )}
        </AnimatedSection>

        {/* Hero screenshot */}
        {project.image && (
          <AnimatedSection className="mb-10">
            <div
              className="relative rounded-xl overflow-hidden border"
              style={{ borderColor: color.border }}
            >
              {/* Colored top accent */}
              <div className="h-0.5 w-full" style={{ background: color.topBar }} />
              <div className="relative aspect-[16/9]">
                <Image
                  src={project.image}
                  alt={`Capture d'écran de ${project.title}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                />
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Sandy placeholder visual */}
        {!project.image && isPersonal && (
          <AnimatedSection className="mb-10">
            <div
              className="relative rounded-xl overflow-hidden border h-48 flex items-center justify-center"
              style={{ borderColor: color.border, background: `linear-gradient(135deg, ${color.gradientFrom}20, ${color.gradientTo}35)` }}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">🚗</div>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline"
                  style={{ color: color.text }}
                >
                  ma-voiture-sandy.vercel.app
                </a>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Tech stack */}
        <AnimatedSection className="mb-12">
          <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">
            Stack technique
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: color.bgSoft, color: color.text, border: `1px solid ${color.border}` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Storytelling sections */}
        <div className="space-y-4 mb-12">
          {sections.map((section, i) => (
            <AnimatedSection key={section.label} delay={i * 0.08}>
              <div
                className="rounded-xl border p-6"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-card)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span style={{ color: color.text }}>{section.icon}</span>
                  <h2 className="text-base font-semibold text-[var(--color-foreground)]">
                    {section.label}
                  </h2>
                </div>
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                  {section.content}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Navigation */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <Button href="/projects" variant="ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Tous les projets
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
