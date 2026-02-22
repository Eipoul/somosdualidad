import {draftMode} from 'next/headers'
import {redirect} from 'next/navigation'
import {type NextRequest} from 'next/server'

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const url = searchParams.get('url') || '/'
  const secret = searchParams.get('secret')

  if (process.env.BUILDER_PREVIEW_SECRET && secret !== process.env.BUILDER_PREVIEW_SECRET) {
    return new Response('Invalid Builder preview secret', {status: 401})
  }

  ;(await draftMode()).enable()

  if (!url.startsWith('/')) {
    redirect('/')
  }

  redirect(url)
}
