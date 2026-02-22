import config from '@/payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type PayloadPageProps = {
  params: Record<string, string | string[] | undefined>
  searchParams: Record<string, string | string[] | undefined>
}

export const generateMetadata = ({ params, searchParams }: PayloadPageProps) =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: PayloadPageProps) => RootPage({ config, params, searchParams })

export default Page
