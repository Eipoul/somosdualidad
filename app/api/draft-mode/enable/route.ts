import {draftMode} from 'next/headers'
import {redirect} from 'next/navigation'
import {type NextRequest} from 'next/server'

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const slug = searchParams.get('slug') || '/'
  const secret = searchParams.get('secret')

  if (process.env.SANITY_PREVIEW_SECRET && secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid secret', {status: 401})
  }

  ;(await draftMode()).enable()
  redirect(slug)
}
