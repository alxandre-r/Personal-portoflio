import type { Metadata } from 'next'
import { PageTransition } from '@/components/layout/PageTransition'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Envoyez-moi un message pour discuter de vos projets ou opportunités d\'emploi. Je réponds sous 24h.',
}

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: 'Email',
    value: 'alexandre.robert.127@gmail.com',
    href: 'mailto:alexandre.robert.127@gmail.com',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.99-1.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z" />
      </svg>
    ),
    label: 'Téléphone',
    value: '+33 (0)6 87 44 29 08',
    href: 'tel:+33687442908',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/alexandre-robert-str',
    href: 'https://www.linkedin.com/in/alexandre-robert-str/',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/alxandre-r',
    href: 'https://github.com/alxandre-r',
  },
]

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatedSection className="mb-12 text-center">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Travaillons <span className="gradient-text">ensemble</span>
          </h1>
          <p className="text-[var(--color-muted-foreground)] max-w-xl mx-auto text-lg">
            Vous recrutez ? Vous avez un projet ou une collaboration en tête ? N&apos;hésitez pas à
            m&apos;écrire - je réponds généralement sous 24h.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <AnimatedSection className="lg:col-span-2 space-y-6">
            <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-5">
                Me retrouver
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-0.5 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted-foreground)]">{item.label}</p>
                      <p className="text-sm font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-accent)]/5 rounded-xl border border-[var(--color-accent)]/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-[var(--color-foreground)]">
                  Disponible
                </span>
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Fraîchement diplômé ingénieur, je suis à la recherche d&apos;un emploi à temps plein
                dans une entreprise ambitieuse.
              </p>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection className="lg:col-span-3">
            <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-8">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-6">
                Envoyer un message
              </h2>
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  )
}
