declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event',
      targetId: string,
      params?: Record<string, string | number | boolean>
    ) => void
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, params)
}

export function trackCvDownload(language: 'fr' | 'en') {
  trackEvent('cv_download', {
    language,
  })
}

export function trackExternalLink(
  platform: 'github' | 'linkedin' | 'demo',
  url?: string
) {
  trackEvent('external_link_click', {
    platform,
    ...(url ? { url } : {}),
  })
}

export function trackProjectView(project: string) {
  trackEvent('project_view', {
    project,
  })
}

export function trackContactSubmit() {
  trackEvent('contact_submit')
}