import type { Project } from './types'
import type { Dictionary } from '@/lib/locales'

type ProjectContentMap = Dictionary['projects']['content']
type ProjectContentSlug = keyof ProjectContentMap

function hasLocalizedContent(
  slug: string,
  content: ProjectContentMap
): slug is ProjectContentSlug & string {
  return slug in content
}

/**
 * Overlays the translated card text (shortDescription, tagline) from the
 * active locale's dictionary onto a base `Project`. Page bodies are
 * localized separately, as one MDX file per locale.
 */
export function localizeProject(project: Project, content: ProjectContentMap): Project {
  if (!hasLocalizedContent(project.slug, content)) return project
  return { ...project, ...content[project.slug] }
}
