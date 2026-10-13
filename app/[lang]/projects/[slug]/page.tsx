import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PageTransition } from '@/components/layout/PageTransition'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectHeader } from '@/components/projects/ProjectHeader'
import { getDictionary, isLocale, locales, type Locale } from '@/lib/i18n'
import { buildAlternates, buildOpenGraph } from '@/lib/metadata'
import { getProjectBySlug, projects } from '@/lib/data/projects'
import { localizeProject } from '@/lib/data/localizeProject'
import { projectColors } from '@/lib/projectColors'

type Props = { params: Promise<{ lang: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const t = await getDictionary(lang as Locale)
  const project = getProjectBySlug(slug)
  if (!project) return { title: t.projects.detail.not_found }
  const localizedProject = localizeProject(project, t.projects.content)
  return {
    title: localizedProject.title,
    description: localizedProject.shortDescription,
    openGraph: buildOpenGraph(lang as Locale),
    alternates: buildAlternates(lang as Locale, `/projects/${slug}`),
  }
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug }))
  )
}

// Unknown slugs render the standard prerendered 404 treatment (Header,
// Footer, fonts, styles) instead of a bare request-time error shell.
export const dynamicParams = false

const backIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
)

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const rawProject = getProjectBySlug(slug)
  if (!rawProject) notFound()

  const t = await getDictionary(lang as Locale)
  const project = localizeProject(rawProject, t.projects.content)
  const { detail } = t.projects
  const color = projectColors[project.colorKey]

  // Free-form page body: content/projects/<slug>.<lang>.mdx
  const { default: Content } = await import(`@/content/projects/${slug}.${lang}.mdx`)

  // Accent tokens consumed by the MDX components and .project-prose styles.
  const accentVars = {
    '--project-accent': color.topBar,
    '--project-accent-strong': color.gradientFrom,
    '--project-accent-text': color.text,
    '--project-accent-soft': color.bgSoft,
    '--project-accent-border': color.border,
  } as CSSProperties

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatedSection className="mb-8">
          <Link
            href={`/${lang}/projects`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
          >
            {backIcon}
            {detail.back}
          </Link>
        </AnimatedSection>

        <ProjectHeader project={project} color={color} t={detail} categoryLabels={t.projects.filters} />

        <article className="project-prose mb-12" style={accentVars}>
          <Content />
        </article>

        <div className="pt-8 border-t border-[var(--color-border)]">
          <Button href={`/${lang}/projects`} variant="ghost">
            {backIcon}
            {detail.all_projects}
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
