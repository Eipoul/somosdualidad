import config from '@/payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type AdminPageProps = {
  params?: {
    segments?: string[]
  }
  searchParams?: Record<string, string | string[] | undefined>
}

export const generateMetadata = ({ params, searchParams }: AdminPageProps) =>
  generatePageMetadata({
    config,
    params: params ?? {},
    searchParams: searchParams ?? {},
  })

export default function Page({ params, searchParams }: AdminPageProps) {
  return RootPage({
    config,
    params: params ?? {},
    searchParams: searchParams ?? {},
  })
}
