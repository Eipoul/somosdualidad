import {draftMode} from 'next/headers'
import {type NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const secret = searchParams.get('secret')
  const redirectTo = searchParams.get('redirect') || '/'
  const expectedSecret = process.env.SANITY_PREVIEW_SECRET || process.env.SANITY_STUDIO_PREVIEW_SECRET

  if (!expectedSecret || secret !== expectedSecret) {
    return new NextResponse('Invalid secret', {status: 401})
  }

  const safeRedirect = redirectTo.startsWith('/') ? redirectTo : '/'
  ;(await draftMode()).enable()
  return NextResponse.redirect(new URL(safeRedirect, request.url), {status: 307})
}
