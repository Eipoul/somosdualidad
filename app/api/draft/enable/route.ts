import { draftMode } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

// Force Node runtime (draftMode needs Node, edge can be problematic)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
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

    ;(await draftMode()).enable()

    const safeRedirect = redirectTo.startsWith('/') ? redirectTo : '/'

    // Use relative redirect to avoid URL construction weirdness
    return NextResponse.redirect(safeRedirect, { status: 307 })
  } catch (err) {
    console.error('Draft enable crashed:', err)
    return new NextResponse('Draft enable crashed. Check Vercel logs.', { status: 500 })
  }
}
