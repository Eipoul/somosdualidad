import config from '@/payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type AdminPageProps = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata(props: AdminPageProps) {
  return generatePageMetadata({
    config,
    params: props.params,
    searchParams: props.searchParams,
  })
}

export default async function Page(props: AdminPageProps) {
  return RootPage({
    config,
    params: props.params,
    searchParams: props.searchParams,
  })
}
