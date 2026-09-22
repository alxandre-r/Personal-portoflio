import type { Metadata } from 'next'
import { PageTransition } from '@/components/layout/PageTransition'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { skillsByCategory } from '@/lib/data/skills'
import { icons } from '@/components/ui/SvgIcons'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Ingénieur informatique diplômé du CNAM, développeur fullstack curieux et organisé, à la recherche d'un emploi à temps plein.",
}

const timeline = [
  {
    year: '2022 — 2025',
    title: 'Diplôme d\'ingénieur informatique en alternance',
    institution: 'CNAM Grand Est, Strasbourg',
    description:
      'Formation en alternance chez Weinmann Technologies, une PME industrielle. Évolution au sein du service informatique : support utilisateur (50 collaborateurs), amélioration de l\'infrastructure réseau et de la sauvegarde, refonte des droits Active Directory, et développement d\'outils internes comme Tempo (gestion du temps), Swing (gestion des stocks) et l\'Espace Client Weinmann (portail de visualisation des données).',
    highlight: 'Stage 2 mois · Žilina, Slovaquie — Recherche sur la production d\'électricité par les arbres. Travaux sur systèmes embarqués ESP32 et rédaction d\'articles au format IEEE avec LaTeX.',
    tags: ['Algorithmique et Programmation objet', 'Réseaux et Systèmes', 'Gestion de projet', 'ERP', 'Méthodologie'],
  },
  {
    year: '2020 — 2022',
    title: 'BTS SIO — Option SLAM',
    institution: 'Lycée René Cassin, Strasbourg · Mention Bien (14.16/20)',
    description:
      'Formation axée sur le développement web et les infrastructures réseau, avec une spécialisation SLAM (Solutions Logicielles et Applications Métiers). ',
    highlight: 'Stage chez Impact Web : développement d\'un site e-commerce client avec WordPress et WooCommerce — architecture, personnalisation du thème, intégration du catalogue produits et des moyens de paiement.',
    tags: ['Développement web', 'Base de données', 'Réseaux'],
  },
  {
    year: '2017 — 2020',
    title: 'Bac STMG — Option Marketing',
    institution: 'Lycée Henri Meck, Molsheim · Mention Bien (14.02/20)',
    description:
      'Premiers pas dans le monde de l\'entreprise et découverte des fondamentaux du marketing, de la gestion et de la communication.',
    tags: ['Gestion', 'Economie & Droit', 'Communication', 'Management des organisations'],
  },
]

const softSkills = [
  {
    icon: icons.document,
    title: 'Organisé',
    desc: 'Gestion efficace des tâches et des priorités, même en environnement multi-projets.',
  },
  {
    icon: icons.search,
    title: 'Méticuleux',
    desc: 'Attention portée aux détails, code propre et maintenable, rigueur dans la livraison.',
  },
  {
    icon: icons.chat,
    title: 'À l\'écoute',
    desc: 'Capacité à comprendre les besoins des utilisateurs comme des collègues, et à y répondre.',
  },
  {
    icon: icons.light ,
    title: 'Curieux',
    desc: 'Envie constante d\'apprendre, de comprendre comment les choses fonctionnent et de découvrir de nouvelles technologies.',
  },
]

const languages = [
  { lang: 'Français', level: 'Natif', detail: 'Projet Voltaire (2024)', flag: '🇫🇷' },
  { lang: 'Anglais', level: 'TOEIC 965/990', detail: 'Bon niveau professionnel — 2025', flag: '🇬🇧' },
  { lang: 'Espagnol', level: 'A2', detail: 'Niveau conversationnel de base', flag: '🇪🇸' },
  { lang: 'Coréen', level: 'A1', detail: 'École Coréenne de Strasbourg', flag: '🇰🇷' },
]

const categoryLabels = {
  frontend: 'Développement Frontend',
  backend: 'Backend & Bases de données',
  devops: 'Infrastructure & Systèmes',
  tools: 'Outils & Spécialités',
}

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2">À propos</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Ingénieur logiciel,
            <br />
            <span className="gradient-text">curieux de nature</span>
          </h1>
          <div className="space-y-4">
            <p className="text-[var(--color-muted-foreground)] text-lg leading-relaxed">
              Je suis Alexandre, fraîchement diplômé ingénieur informatique du CNAM. Au fil de mon
              parcours, en formation comme en entreprise, j&apos;ai acquis des compétences techniques
              et humaines dans des domaines variés : développement web, infrastructure système,
              gestion de projet et même informatique embarquée.
            </p>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
              Je suis capable de m&apos;adapter rapidement à de nouveaux environnements et de monter en
              compétence de manière autonome grâce à ma curiosité et à mon sens de l&apos;organisation.
            </p>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
              Je recherche aujourd&apos;hui un <strong className="text-[var(--color-foreground)]">emploi à temps plein</strong> dans
              une entreprise où je pourrai continuer à apprendre, relever des défis techniques et
              contribuer à des projets concrets.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Button href="/contact" size="lg">
              Me contacter
            </Button>
            <Button href="#" variant="outline" size="lg" external>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Télécharger mon CV
            </Button>
          </div>
        </AnimatedSection>

        {/* Soft skills */}
        <AnimatedSection className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)]">
            Savoir-être
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {softSkills.map((item) => (
              <div
                key={item.title}
                className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-5"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-[var(--color-foreground)]">
            Parcours
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-border)]" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="relative pl-10">
                  <div className="absolute left-3.5 -translate-x-1/2 mt-1.5 w-3 h-3 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-background)]" />
                  <div>
                    <span className="text-xs font-medium text-[var(--color-accent)]">
                      {item.year}
                    </span>
                    <h3 className="text-base font-semibold text-[var(--color-foreground)] mt-1 mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--color-muted-foreground)] mb-3 italic">
                      {item.institution}
                    </p>
                    <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-3">
                      {item.description}
                    </p>
                    {item.highlight && (
                      <div className="mb-3 pl-3 border-l-2 border-[var(--color-accent)]/40 text-sm text-[var(--color-muted-foreground)] italic">
                        {item.highlight}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
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
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)]">
            Compétences techniques
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(Object.keys(skillsByCategory) as Array<keyof typeof skillsByCategory>).map((cat) => (
              <div
                key={cat}
                className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-5"
              >
                <h3 className="text-sm font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider mb-3">
                  {categoryLabels[cat]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillsByCategory[cat].map((skill) => (
                    <Badge key={skill.name} variant="level" level={skill.level}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--color-muted-foreground)]">
            Certifications : <span className="font-medium">RGPD</span> (bonnes pratiques de confidentialité) · <span className="font-medium">ANSSI</span> (sensibilisation sécurité informatique)
          </p>
        </AnimatedSection>

        {/* Languages */}
        <AnimatedSection>
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)]">
            Langues
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languages.map((l) => (
              <div
                key={l.lang}
                className="flex items-center gap-4 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-4"
              >
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
