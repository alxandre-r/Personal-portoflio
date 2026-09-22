import type { Skill } from './types'

// This one skill name is French prose (not a proper noun/acronym like the
// others in this file), so it renders untranslated on English pages. Full
// translation of lib/data content is out of scope for this fix wave, but
// this single label is small enough to isolate via the dictionaries —
// components render `common.devops_hosting_label` instead of this raw name
// when they encounter it. See dictionaries/{fr,en}.json.
export const DEVOPS_HOSTING_SKILL_NAME = 'VPS & hébergement cloud'

export const skills: Skill[] = [
  // Frontend / Dev
  { name: 'JavaScript / TypeScript', category: 'frontend', level: 'advanced' },
  { name: 'React / Next.js', category: 'frontend', level: 'advanced' },
  { name: 'HTML / CSS', category: 'frontend', level: 'advanced' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'advanced' },
  { name: 'C / C++ / C#', category: 'frontend', level: 'intermediate' },

  // Backend
  { name: 'Node.js / Express', category: 'backend', level: 'advanced' },
  { name: 'Python / Django', category: 'backend', level: 'intermediate' },
  { name: 'PHP', category: 'backend', level: 'intermediate' },
  { name: 'MySQL', category: 'backend', level: 'advanced' },
  { name: 'WordPress / WooCommerce', category: 'backend', level: 'intermediate' },

  // Infrastructure & Systèmes
  { name: 'Windows Server / Linux', category: 'devops', level: 'intermediate' },
  { name: 'Active Directory', category: 'devops', level: 'intermediate' },
  { name: 'Nginx / Apache / PM2', category: 'devops', level: 'intermediate' },
  { name: DEVOPS_HOSTING_SKILL_NAME, category: 'devops', level: 'intermediate' },
  { name: 'Microsoft 365 Admin', category: 'devops', level: 'intermediate' },

  // Outils
  { name: 'Git / GitHub', category: 'tools', level: 'advanced' },
  { name: 'Trello / Notion', category: 'tools', level: 'advanced' },
  { name: 'DBeaver', category: 'tools', level: 'intermediate' },
  { name: 'LaTeX / Overleaf', category: 'tools', level: 'intermediate' },
  { name: 'ESP32 / Espressif', category: 'tools', level: 'intermediate' },
]

export const skillsByCategory = {
  frontend: skills.filter((s) => s.category === 'frontend'),
  backend: skills.filter((s) => s.category === 'backend'),
  devops: skills.filter((s) => s.category === 'devops'),
  tools: skills.filter((s) => s.category === 'tools'),
}
