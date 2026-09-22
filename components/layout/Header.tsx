'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
// import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/utils/cn'
import type { Dictionary, Locale } from '@/lib/i18n'

interface HeaderProps {
  navT: Dictionary['nav']
  lang: Locale
}

export function Header({ navT, lang }: HeaderProps) {
  const navLinks = [
    { href: `/${lang}`, label: navT.home },
    { href: `/${lang}/projects`, label: navT.projects },
    { href: `/${lang}/about`, label: navT.about },
    { href: `/${lang}/contact`, label: navT.contact },
  ]
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
  <header
    className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
      scrolled
        ? 'bg-[var(--color-background)]/80 backdrop-blur-md shadow-sm border-[var(--color-border)]'
        : 'bg-transparent border-transparent'
    )}
  >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="group flex items-center gap-4">
            <Image src="/logo-AR.svg" alt="Logo" className='dark:invert' width={48} height={48} />
            <span className="text-lg font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
              Alexandre Robert
            </span>
          </Link>


          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'text-[var(--color-foreground)]'
                      : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-[var(--color-muted)] rounded-lg"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher lang={lang} />
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-[var(--color-muted)] transition-colors gap-1.5"
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-[var(--color-foreground)] rounded origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-[var(--color-foreground)] rounded"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-[var(--color-foreground)] rounded origin-center"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-md overflow-hidden"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      active
                        ? 'bg-[var(--color-muted)] text-[var(--color-foreground)]'
                        : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="px-3 pt-2 pb-1">
                <LanguageSwitcher lang={lang} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
