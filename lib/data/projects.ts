import type { Project } from './types'

// Card/header metadata only. Each page's body lives in
// content/projects/<slug>.<lang>.mdx; translated shortDescription/tagline
// come from dictionaries/<lang>.json (projects.content).
export const projects: Project[] = [
  {
    slug: 'sandy',
    title: 'Sandy',
    colorKey: 'indigo',
    cover: '/sandy.png',
    shortDescription:
      'Application web de gestion automobile personnelle et familiale — suivi des dépenses, de la consommation, des documents et de l\'entretien, en un seul endroit.',
    tagline: 'Toute la vie de votre voiture, en un seul endroit.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Node.js', 'PostgreSQL', 'Vercel'],
    category: 'fullstack',
    featured: true,
    personal: true,
    status: 'production',
    links: { demo: 'https://ma-voiture-sandy.vercel.app/' },
  },
  {
    slug: 'tempo',
    title: 'Tempo',
    colorKey: 'amber',
    shortDescription:
      'Outil interne de gestion du temps de travail pour Weinmann Technologies — déclarations d\'activités, validation managériale et synchronisation RH.',
    techStack: ['HTML', 'TailwindCSS', 'Node.js', 'Express', 'MySQL', 'PM2', 'Nginx'],
    category: 'fullstack',
    featured: true,
    personal: false,
    company: 'Weinmann Tech.',
    status: 'production',
  },
  {
    slug: 'bolero',
    title: 'Boléro',
    colorKey: 'green',
    shortDescription:
      'Planning interactif des interventions SAV pour Weinmann Technologies — visualisation en temps réel des techniciens, clients et tournées.',
    techStack: ['React', 'DayPilot Scheduler', 'TailwindCSS', 'Node.js', 'Express', 'MySQL', 'PM2', 'Nginx'],
    category: 'fullstack',
    featured: false,
    personal: false,
    company: 'Weinmann Tech.',
    status: 'production',
  },
  {
    slug: 'swing',
    title: 'Swing',
    colorKey: 'emerald',
    shortDescription:
      'Interface mobile de préparation des commandes pour les magasiniers de Weinmann Technologies — remplacement des feuilles papier par une app connectée à l\'ERP.',
    techStack: ['HTML', 'TailwindCSS', 'Node.js', 'Express', 'Python', 'MySQL', 'PM2', 'Nginx', 'Mobile-first'],
    category: 'fullstack',
    featured: false,
    personal: false,
    company: 'Weinmann Tech.',
    status: 'production',
  },
  {
    slug: 'espace-client-weinmann',
    title: 'Espace Client Weinmann',
    colorKey: 'amber',
    shortDescription:
      'Portail web client pour visualiser en temps réel les consommations et l\'état des cabines de peinture connectées — projet de fin d\'études.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Django', 'MySQL', 'VPS Linux'],
    category: 'fullstack',
    featured: true,
    personal: false,
    company: 'Weinmann Tech.',
    status: 'delivered',
  },
  {
    slug: 'fogwar',
    title: 'FogWar',
    colorKey: 'cyan',
    cover: '/projects/fogwar/main-menu.png',
    shortDescription:
      'RTS de survie en 2D isométrique et pixel art, dans un monde médiéval généré procéduralement : bâtissez un village le jour, défendez-le la nuit face aux pillards qui sortent du brouillard.',
    tagline: 'Le jour, on bâtit. La nuit, on tient.',
    techStack: ['Unity 6', 'C#', '2D URP', 'LibreSprite', 'Unity Test Framework'],
    category: 'game',
    featured: false,
    personal: true,
    status: 'in-development',
    links: { itch: 'https://alexandrenotdev.itch.io/fogwar' },
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
