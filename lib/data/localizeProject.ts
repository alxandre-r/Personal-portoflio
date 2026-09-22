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
 * Overlays translated prose (tagline, shortDescription, context, problem,
 * solution, result, features) from the active locale's dictionary onto a
 * base `Project`. Fields not present in the dictionary (slug, title,
 * colorKey, image, techStack, category, featured, demoUrl, githubUrl,
 * screenshots) are left untouched.
 */
export function localizeProject(project: Project, content: ProjectContentMap): Project {
  if (!hasLocalizedContent(project.slug, content)) return project
  return { ...project, ...content[project.slug] }
}
