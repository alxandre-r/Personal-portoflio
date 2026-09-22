import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'
import { buildAlternates, buildOpenGraph } from '@/lib/metadata'
import { PageTransition } from '@/components/layout/PageTransition'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CvDownloadButton } from '@/components/ui/CvDownloadButton'
import { skillsByCategory, DEVOPS_HOSTING_SKILL_NAME } from '@/lib/data/skills'
import { icons } from '@/components/ui/SvgIcons'

type Props = { params: Promise<{ lang: string }> }

const SOFT_SKILL_ICONS = [icons.document, icons.search, icons.chat, icons.light]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDictionary(lang as Locale)
  return {
    title: t.about.meta.title,
    description: t.about.meta.description,
    openGraph: buildOpenGraph(lang as Locale),
    alternates: buildAlternates(lang as Locale, '/about'),
  }
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDictionary(lang as Locale)
  const { about } = t

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2">{about.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {about.title}
            <br />
            <span className="gradient-text">{about.title_highlight}</span>
          </h1>
          <div className="space-y-4">
            <p className="text-[var(--color-muted-foreground)] text-lg leading-relaxed">{about.description_1}</p>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">{about.description_2}</p>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
              {about.description_3_prefix}
              <strong className="text-[var(--color-foreground)]">{about.description_3_bold}</strong>
              {about.description_3_suffix}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button href={`/${lang}/contact`} size="lg">{about.cta_contact}</Button>
            <CvDownloadButton label={about.cta_cv} t={about.cv_modal} />
          </div>
        </AnimatedSection>

        {/* Soft skills */}
        <AnimatedSection className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)]">{about.sections.softSkills}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {about.softSkills.map((item, i) => (
              <div key={item.title} className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-5">
                <div className="text-2xl mb-3">{SOFT_SKILL_ICONS[i]}</div>
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-[var(--color-foreground)]">{about.sections.timeline}</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-border)]" />
            <div className="space-y-10">
              {about.timeline.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="relative pl-10">
                  <div className="absolute left-3.5 -translate-x-1/2 mt-1.5 w-3 h-3 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-background)]" />
                  <div>
                    <span className="text-xs font-medium text-[var(--color-accent)]">{item.year}</span>
                    <h3 className="text-base font-semibold text-[var(--color-foreground)] mt-1 mb-0.5">{item.title}</h3>
                    <p className="text-xs text-[var(--color-muted-foreground)] mb-3 italic">{item.institution}</p>
                    <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-3">{item.description}</p>
                    {item.highlight && (
                      <div className="mb-3 pl-3 border-l-2 border-[var(--color-accent)]/40 text-sm text-[var(--color-muted-foreground)] italic">
                        {item.highlight}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="default">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Skills */}
        <AnimatedSection className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)]">{about.sections.technicalSkills}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(Object.keys(skillsByCategory) as Array<keyof typeof skillsByCategory>).map((cat) => (
              <div key={cat} className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-5">
                <h3 className="text-sm font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider mb-3">
                  {about.categoryLabels[cat]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillsByCategory[cat].map((skill) => (
                    <Badge key={skill.name} variant="level" level={skill.level}>
                      {skill.name === DEVOPS_HOSTING_SKILL_NAME ? t.common.devops_hosting_label : skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--color-muted-foreground)]">{about.sections.certifications}</p>
        </AnimatedSection>

        {/* Languages */}
        <AnimatedSection>
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)]">{about.sections.languages}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {about.languages.map((l) => (
              <div key={l.lang} className="flex items-center gap-4 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-4">
                <span className="text-2xl">{l.flag}</span>
                <div>
                  <p className="font-semibold text-[var(--color-foreground)]">{l.lang}</p>
                  <p className="text-sm text-[var(--color-accent)] font-medium">{l.level}</p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">{l.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
