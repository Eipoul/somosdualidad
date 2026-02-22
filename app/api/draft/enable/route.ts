import { draftMode } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const secret = searchParams.get('secret') || ''
    const redirectTo = searchParams.get('redirect') || '/'

    const previewSecret = process.env.SANITY_PREVIEW_SECRET || ''

    if (!previewSecret) {
      return new NextResponse('SANITY_PREVIEW_SECRET is MISSING on server', { status: 401 })
    }
    if (secret !== previewSecret) {
      return new NextResponse('SANITY_PREVIEW_SECRET is SET but does NOT MATCH', { status: 401 })
    }

    draftMode().enable()

    const safeRedirect = redirectTo.startsWith('/') ? redirectTo : '/'

    const url = new URL(request.url)
    url.pathname = safeRedirect
    url.search = ''
    url.hash = ''

    return NextResponse.redirect(url, { status: 307 })
  } catch (err) {
    console.error('Draft enable crashed:', err)
    return new NextResponse('Draft enable crashed. Check Vercel logs.', { status: 500 })
  }
}
