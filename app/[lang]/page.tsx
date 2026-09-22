import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'
import { buildAlternates, buildOpenGraph } from '@/lib/metadata'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { featuredProjects } from '@/lib/data/projects'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDictionary(lang as Locale)
  return {
    title: t.home.meta.title,
    description: t.home.meta.description,
    openGraph: buildOpenGraph(lang as Locale),
    alternates: buildAlternates(lang as Locale, ''),
  }
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDictionary(lang as Locale)

  return (
    <>
      <HeroSection t={t.home.hero} lang={lang} />
      <FeaturedProjects
        projects={featuredProjects}
        t={t.home.featured}
        lang={lang}
        categoryLabels={t.projects.filters}
        cardT={t.projects.card}
      />
      <SkillsSection t={t.home.skills} devopsHostingLabel={t.common.devops_hosting_label} />
    </>
  )
}
