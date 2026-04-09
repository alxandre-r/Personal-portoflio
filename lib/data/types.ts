export type ProjectCategory = 'web' | 'fullstack' | 'tool' | 'mobile'
export type ProjectColor = 'indigo' | 'blue' | 'green' | 'emerald' | 'cyan' | 'amber'

export interface ProjectFeature {
  title: string
  description: string
}

export interface Project {
  slug: string
  title: string
  shortDescription: string
  context: string
  problem: string
  solution: string
  result: string
  techStack: string[]
  category: ProjectCategory
  colorKey: ProjectColor
  featured: boolean
  image?: string
  demoUrl?: string
  githubUrl?: string
  tagline?: string
  features?: ProjectFeature[]
  screenshots?: string[]
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'tools'
  level: 'expert' | 'advanced' | 'intermediate'
}
