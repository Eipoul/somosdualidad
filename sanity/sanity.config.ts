import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET

const enableDraftModePath = previewSecret
  ? `/api/draft-mode/enable?secret=${encodeURIComponent(previewSecret)}`
  : '/api/draft-mode/enable'

export default defineConfig({
  name: 'default',
  title: 'Somos Dualidad Admin',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'qi7d9rsb',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        origin: previewUrl,
        previewMode: {
          enable: enableDraftModePath,
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
