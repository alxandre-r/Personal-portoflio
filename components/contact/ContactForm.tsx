'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { scaleIn } from '@/lib/animations'
import { trackContactSubmit } from '@/lib/analytics'
import type { Dictionary } from '@/lib/i18n'

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

interface ContactFormProps {
  t: {
    fields: Dictionary['contact']['fields']
    validation: Dictionary['contact']['validation']
    success: Dictionary['contact']['success']
    submit_error: Dictionary['contact']['submit_error']
  }
}

export function ContactForm({ t }: ContactFormProps) {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<FieldError>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function validate(data: FormData): FieldError {
    const errs: FieldError = {}

    if (!data.name.trim()) {
      errs.name = t.validation.name_required
    }

    if (!data.email.trim()) {
      errs.email = t.validation.email_required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = t.validation.email_invalid
    }

    if (!data.message.trim()) {
      errs.message = t.validation.message_required
    } else if (data.message.trim().length < 20) {
      errs.message = t.validation.message_min
    }

    return errs
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof FieldError]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }

    if (submitError) {
      setSubmitError('')
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
    setSubmitError('')

    try {
      const formData = new FormData()

      formData.append(
        'access_key',
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ''
      )

      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('message', form.message)

      formData.append(
        'subject',
        `Nouveau message depuis le portfolio de ${form.name}`
      )

      formData.append('from_name', 'Portfolio Alexandre Robert')

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Web3Forms submission failed')
      }

      setSubmitted(true)
      trackContactSubmit()
    } catch (error) {
      console.error('Erreur Web3Forms:', error)

      setSubmitError(t.submit_error)
    } finally {
      setLoading(false)
    }
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
            {t.success.title}
          </h3>

          <p className="text-[var(--color-muted-foreground)]">
            {t.success.message.replace('{name}', form.name)}
          </p>

          <button
            onClick={() => {
              setForm({
                name: '',
                email: '',
                message: '',
              })

              setSubmitted(false)
            }}
            className="mt-6 text-sm text-[var(--color-accent)] hover:underline"
          >
            {t.success.send_another}
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
          {/* Honeypot anti-spam Web3Forms */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Nom */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5"
            >
              {t.fields.name} <span className="text-red-400">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder={t.fields.name_placeholder}
              value={form.name}
              onChange={handleChange}
              className={inputClass('name')}
              autoComplete="name"
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5"
            >
              {t.fields.email} <span className="text-red-400">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder={t.fields.email_placeholder}
              value={form.email}
              onChange={handleChange}
              className={inputClass('email')}
              autoComplete="email"
            />

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5"
            >
              {t.fields.message} <span className="text-red-400">*</span>
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t.fields.message_placeholder}
              value={form.message}
              onChange={handleChange}
              className={cn(
                inputClass('message'),
                'resize-none'
              )}
            />

            {errors.message && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          {/* Erreur d'envoi */}
          {submitError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400"
              role="alert"
            >
              {submitError}
            </motion.p>
          )}

          {/* Bouton */}
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full"
          >
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

                {t.fields.submitting}
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

                {t.fields.submit}
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
