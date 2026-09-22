import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'
import { buildAlternates, buildOpenGraph } from '@/lib/metadata'
import { PageTransition } from '@/components/layout/PageTransition'
import { ProjectsGrid } from '@/components/projects/ProjectsGrid'
import { projects } from '@/lib/data/projects'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDictionary(lang as Locale)
  return {
    title: t.projects.meta.title,
    description: t.projects.meta.description,
    openGraph: buildOpenGraph(lang as Locale),
    alternates: buildAlternates(lang as Locale, '/projects'),
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDictionary(lang as Locale)
  const { projects: p } = t

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2">{p.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {p.title} <span className="gradient-text">{p.title_highlight}</span>
          </h1>
          <p className="text-[var(--color-muted-foreground)] max-w-xl text-lg">{p.subtitle}</p>
        </div>
        <ProjectsGrid
          projects={projects}
          filterLabels={p.filters}
          empty={p.empty}
          lang={lang as Locale}
          cardT={p.card}
        />
      </div>
    </PageTransition>
  )
}
