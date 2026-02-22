import {createClient, type QueryParams} from '@sanity/client'
import {draftMode} from 'next/headers'

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error('Missing Sanity env vars: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET')
}

export const createSanityClient = (preview = false) =>
  createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !preview,
    perspective: preview ? 'drafts' : 'published',
    stega: preview,
    token: preview ? process.env.SANITY_API_READ_TOKEN : undefined,
  })

export async function sanityFetch<QueryResponse>({query, params = {}}: {query: string; params?: QueryParams}) {
  const preview = (await draftMode()).isEnabled

  if (preview && !process.env.SANITY_API_READ_TOKEN) {
    throw new Error('Draft mode requires SANITY_API_READ_TOKEN to fetch draft content from Sanity')
  }

  return createSanityClient(preview).fetch<QueryResponse>(query, params, {
    next: preview ? {revalidate: 0} : {revalidate: 60},
  })
}
