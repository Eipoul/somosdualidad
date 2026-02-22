import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://somosdualidad.com')
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET

const enableDraftModePath = `/api/draft/enable${previewSecret ? `?secret=${encodeURIComponent(previewSecret)}` : ''}`

export default defineConfig({
  name: 'default',
  title: 'Somos Dualidad Admin',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'qi7d9rsb',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: enableDraftModePath,
          disable: '/api/draft/disable',
        },
      },
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
