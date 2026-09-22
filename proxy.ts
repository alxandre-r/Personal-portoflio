import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/locales'

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language') ?? ''
  for (const part of acceptLang.split(',')) {
    const tag = part.split(';')[0].trim().toLowerCase()
    const match = locales.find((l) => tag === l || tag.startsWith(l + '-'))
    if (match) return match
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const matchedLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (matchedLocale) {
    // Forward the resolved locale as a request header so server code that
    // has no access to route params — e.g. app/global-not-found.tsx, which
    // Next.js requires for a locale-prefixed root layout (see I4/I6 in the
    // final i18n fix-wave report) — can still render locale-aware output.
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', matchedLocale)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo-AR.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|ico|txt|xml|json|webmanifest)$).*)',
  ],
}
