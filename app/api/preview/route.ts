import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const slug = request.nextUrl.searchParams.get('slug') || '/'
  const previewSecret = process.env.PREVIEW_SECRET || process.env.SANITY_PREVIEW_SECRET

  if (previewSecret && secret !== previewSecret) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  draftMode().enable()
  return NextResponse.redirect(new URL(slug, process.env.NEXT_PUBLIC_SITE_URL || request.url))
}
