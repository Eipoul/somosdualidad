import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Pages } from './payload/collections/Pages'
import { Episodes } from './payload/collections/Episodes'
import { Seasons } from './payload/collections/Seasons'
import { Subscribers } from './payload/collections/Subscribers'
import { Users } from './payload/collections/Users'
import { SiteSettings } from './payload/globals/SiteSettings'

const previewSecret = process.env.PREVIEW_SECRET || process.env.SANITY_PREVIEW_SECRET || ''

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      url: process.env.NEXT_PUBLIC_SITE_URL,
      collections: ['pages', 'episodes'],
      globals: ['site-settings'],
    },
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'payload-dev-secret',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.POSTGRES_URL,
    },
  }),
  collections: [Users, Pages, Episodes, Seasons, Subscribers],
  globals: [SiteSettings],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  endpoints: [
    {
      path: '/preview-url',
      method: 'get',
      handler: async (req: any) => {
        const slug = typeof req.query.slug === 'string' ? req.query.slug : '/'
        const url = new URL('/api/preview', process.env.NEXT_PUBLIC_SITE_URL)
        url.searchParams.set('slug', slug)
        if (previewSecret) url.searchParams.set('secret', previewSecret)
        return Response.json({ previewURL: url.toString() })
      },
    },
  ],
})
