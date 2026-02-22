import { draftMode } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const redirectTo = searchParams.get('redirect') || '/'

    draftMode().disable()

    const safeRedirect = redirectTo.startsWith('/') ? redirectTo : '/'

    const url = new URL(request.url)
    url.pathname = safeRedirect
    url.search = ''
    url.hash = ''

    return NextResponse.redirect(url, { status: 307 })
  } catch (err) {
    console.error('Draft disable crashed:', err)
    return new NextResponse('Draft disable crashed. Check Vercel logs.', { status: 500 })
  }
}
