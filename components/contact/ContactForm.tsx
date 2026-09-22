'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { scaleIn } from '@/lib/animations'

interface FormData {
  name: string
  email: string
  message: string
}

interface FieldError {
  name?: string
  email?: string
  message?: string
}

function validate(data: FormData): FieldError {
  const errors: FieldError = {}
  if (!data.name.trim()) errors.name = 'Le nom est requis.'
  if (!data.email.trim()) {
    errors.email = "L'email est requis."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "L'adresse email n'est pas valide."
  }
  if (!data.message.trim()) errors.message = 'Le message est requis.'
  else if (data.message.trim().length < 20) {
    errors.message = 'Le message doit contenir au moins 20 caractères.'
  }
  return errors
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldError>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FieldError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const inputClass = (field: keyof FieldError) =>
    cn(
      'w-full rounded-lg border px-4 py-3 text-sm bg-[var(--color-muted)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] transition-colors outline-none',
      'focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]',
      errors[field]
        ? 'border-red-500'
        : 'border-[var(--color-border)] hover:border-[var(--color-muted-foreground)]'
    )

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="text-center py-16"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 text-3xl">
            ✉️
          </div>
          <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
            Message envoyé !
          </h3>
          <p className="text-[var(--color-muted-foreground)]">
            Merci {form.name}. Je vous répondrai dans les plus brefs délais.
          </p>
          <button
            onClick={() => {
              setForm({ name: '', email: '', message: '' })
              setSubmitted(false)
            }}
            className="mt-6 text-sm text-[var(--color-accent)] hover:underline"
          >
            Envoyer un autre message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
              Nom <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jean Dupont"
              value={form.name}
              onChange={handleChange}
              className={inputClass('name')}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jean@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass('email')}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Bonjour, je souhaite vous contacter pour..."
              value={form.message}
              onChange={handleChange}
              className={cn(inputClass('message'), 'resize-none')}
            />
            {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? (
              <>
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Envoi en cours...
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                Envoyer le message
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
