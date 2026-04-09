import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { featuredProjects } from '@/lib/data/projects'

export const metadata: Metadata = {
  title: 'Alexandre - Ingénieur Logiciel & Développeur Fullstack',
  description:
    "Portfolio d'Alexandre, ingénieur logiciel et développeur fullstack. Spécialisé en Next.js, TypeScript, React et Node.js.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects projects={featuredProjects} />
      <SkillsSection />
    </>
  )
}
