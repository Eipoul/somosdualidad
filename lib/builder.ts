const BUILDER_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY
const BUILDER_API_BASE = 'https://cdn.builder.io/api/v3/content'

export type BuilderContentResponse = {
  id?: string
  data?: Record<string, unknown>
}

const getBuilderKey = (preview: boolean) => (preview ? BUILDER_PRIVATE_API_KEY || BUILDER_PUBLIC_API_KEY : BUILDER_PUBLIC_API_KEY)

export async function getBuilderPage(path: string, preview = false) {
  const key = getBuilderKey(preview)
  if (!key) return null

  const url = new URL(`${BUILDER_API_BASE}/page`)
  url.searchParams.set('apiKey', key)
  url.searchParams.set('userAttributes.urlPath', path)
  url.searchParams.set('includeRefs', 'true')
  url.searchParams.set('enrich', 'true')
  if (preview) {
    url.searchParams.set('includeUnpublished', 'true')
    url.searchParams.set('cachebust', 'true')
  }

  try {
    const response = await fetch(url.toString(), {
      next: preview ? {revalidate: 0} : {revalidate: 60},
      headers: preview && BUILDER_PRIVATE_API_KEY ? {Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`} : undefined,
    })

    if (!response.ok) return null

    const payload = (await response.json()) as {results?: BuilderContentResponse[]}
    return payload.results?.[0] ?? null
  } catch {
    return null
  }
}

export async function getBuilderPageHtml(path: string, preview = false) {
  const key = getBuilderKey(preview)
  if (!key) return null

  const url = new URL('https://cdn.builder.io/api/v1/html/page')
  url.searchParams.set('apiKey', key)
  url.searchParams.set('url', path)
  url.searchParams.set('includeRefs', 'true')
  if (preview) {
    url.searchParams.set('includeUnpublished', 'true')
    url.searchParams.set('cachebust', 'true')
  }

  try {
    const response = await fetch(url.toString(), {
      next: preview ? {revalidate: 0} : {revalidate: 60},
      headers: preview && BUILDER_PRIVATE_API_KEY ? {Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`} : undefined,
    })

    if (!response.ok) return null

    const payload = (await response.json()) as {html?: string}
    return payload.html ?? null
  } catch {
    return null
  }
}

