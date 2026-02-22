import {draftMode} from 'next/headers'
import {type NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest) {
  const redirectTo = new URL(request.url).searchParams.get('redirect') || '/'
  const safeRedirect = redirectTo.startsWith('/') ? redirectTo : '/'
  ;(await draftMode()).disable()
  return NextResponse.redirect(new URL(safeRedirect, request.url), {status: 307})
}
