import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CompanyBadge } from '@/components/projects/CompanyBadge'
import type { Project, ProjectStatus } from '@/lib/data/types'
import type { ColorPalette } from '@/lib/projectColors'
import type { Dictionary } from '@/lib/locales'

interface ProjectHeaderProps {
  project: Project
  color: ColorPalette
  t: Dictionary['projects']['detail']
  categoryLabels: Dictionary['projects']['filters']
}

const statusKey: Record<ProjectStatus, keyof Dictionary['projects']['detail']['status']> = {
  production: 'production',
  'in-development': 'in_development',
  delivered: 'delivered',
}

const externalIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
)

/** Shared top of every project page. Everything below it is the project's MDX. */
export function ProjectHeader({ project, color, t, categoryLabels }: ProjectHeaderProps) {
  const pill = { background: color.bgSoft, color: color.text, border: `1px solid ${color.border}` }
  const primary = project.links?.demo
    ? { href: project.links.demo, label: project.personal ? t.use_app : t.see_demo }
    : project.links?.itch
      ? { href: project.links.itch, label: t.play_itch }
      : null

  return (
    <>
      <div className="h-1 w-16 rounded-full mb-6" style={{ background: color.topBar }} />

      <AnimatedSection className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.personal && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={pill}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color.topBar }} />
              {t.personal_badge}
            </span>
          )}
          {project.company && <CompanyBadge name={project.company} />}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={pill}>
            {t.status[statusKey[project.status]]}
          </span>
          <Badge variant="accent">{categoryLabels[project.category]}</Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-[var(--color-foreground)]">{project.title}</h1>

        {project.tagline && (
          <p className="text-xl font-medium mb-2" style={{ color: color.text }}>
            {project.tagline}
          </p>
        )}

        <p className="text-lg text-[var(--color-muted-foreground)] leading-relaxed">{project.shortDescription}</p>

        {(primary || project.links?.tryDemo || project.links?.github) && (
          <div className="flex flex-wrap gap-3 mt-6">
            {primary && (
              <a
                href={primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: color.topBar, color: '#fff' }}
              >
                {externalIcon}
                {primary.label}
              </a>
            )}
            {project.links?.tryDemo && (
              <a
                href={project.links.tryDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:shadow-lg"
                style={{ background: color.bgSoft, color: color.text, borderColor: color.border }}
              >
                {externalIcon}
                {t.try_demo}
              </a>
            )}
            {project.links?.github && (
              <Button href={project.links.github} external variant="outline" size="sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="sr-only">{t.tech_stack}</span>
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default">
              {tech}
            </Badge>
          ))}
        </div>
      </AnimatedSection>

      {project.cover && (
        <AnimatedSection className="mb-12">
          <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: color.border }}>
            <div className="h-0.5 w-full" style={{ background: color.topBar }} />
            <div className="relative aspect-[16/9]">
              <Image
                src={project.cover}
                alt={`${t.screenshot_alt} ${project.title}`}
                fill
                quality={90}
                className="object-cover object-top"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </AnimatedSection>
      )}
    </>
  )
}
