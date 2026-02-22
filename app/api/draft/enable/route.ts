import {draftMode} from 'next/headers'
import {redirect} from 'next/navigation'
import {type NextRequest} from 'next/server'

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const redirectTo = searchParams.get('redirect') || searchParams.get('slug') || '/'
  const secret = searchParams.get('secret')
  const previewSecret = process.env.SANITY_PREVIEW_SECRET || process.env.SANITY_STUDIO_PREVIEW_SECRET

  if (previewSecret && secret !== previewSecret) {
    return new Response('Invalid secret', {status: 401})
  }

  const draft = await draftMode()
  draft.enable()

  if (!redirectTo.startsWith('/')) {
    redirect('/')
  }

  redirect(redirectTo)
}
