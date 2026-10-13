export type ProjectCategory = 'web' | 'fullstack' | 'tool' | 'mobile' | 'game'
export type ProjectColor = 'indigo' | 'blue' | 'green' | 'emerald' | 'cyan' | 'amber'
export type ProjectStatus = 'production' | 'in-development' | 'delivered'

export interface ProjectLinks {
  demo?: string
  /** Sign-up-free demo entry point, shown as a secondary button. */
  tryDemo?: string
  itch?: string
  github?: string
}

/**
 * Metadata used by cards, filters and the shared page header. The page body
 * itself is free-form MDX in content/projects/<slug>.<lang>.mdx.
 */
export interface Project {
  slug: string
  title: string
  shortDescription: string
  tagline?: string
  techStack: string[]
  category: ProjectCategory
  colorKey: ProjectColor
  featured: boolean
  personal: boolean
  /** Employer the project was built for, shown as a badge (e.g. 'Weinmann Tech.'). */
  company?: string
  status: ProjectStatus
  cover?: string
  links?: ProjectLinks
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'tools'
  level: 'expert' | 'advanced' | 'intermediate'
}
