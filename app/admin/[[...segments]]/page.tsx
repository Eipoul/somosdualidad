import config from '@/payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type AdminPageProps = {
  params?: Promise<{ segments?: string[] }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata(props: AdminPageProps) {
  const params = (await props.params) ?? {}
  const searchParams = (await props.searchParams) ?? {}

  return generatePageMetadata({ config, params, searchParams })
}

export default async function Page(props: AdminPageProps) {
  const params = (await props.params) ?? {}
  const searchParams = (await props.searchParams) ?? {}

  return RootPage({ config, params, searchParams })
}
