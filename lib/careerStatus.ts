/**
 * Career status switch — the single place to change when my situation changes.
 *
 *   'employed' → in a position (hero badge shows the current job, contact
 *                page invites a conversation rather than a job offer)
 *   'seeking'  → looking for a job (green "open to opportunities" badge,
 *                "available" card on the contact page)
 *
 * Every status-dependent string lives in the dictionaries as
 * `{ "employed": ..., "seeking": ... }` and is resolved with `forStatus()`.
 * Both variants are kept up to date, so switching is a one-line change here.
 *
 * Not covered by the switch (edit by hand when the job changes):
 * the "Background" timeline entries in `dictionaries/*.json` and the CVs
 * in `public/cv/`.
 */
export type CareerStatus = 'employed' | 'seeking'

export const CAREER_STATUS: CareerStatus = 'employed'

export type ByStatus<T> = Record<CareerStatus, T>

/** Picks the variant matching the current career status. */
export function forStatus<T>(variants: ByStatus<T>): T {
  return variants[CAREER_STATUS]
}

export const isSeeking = forStatus({ employed: false, seeking: true })
