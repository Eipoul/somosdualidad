import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL || 'https://somosdualidad.com'

const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET

export default defineConfig({
  name: 'default',
  title: 'Somos Dualidad Admin',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'qi7d9rsb',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: previewSecret
            ? `/api/draft/enable?secret=${encodeURIComponent(
                previewSecret
              )}&redirect=/`
            : '/api/draft/enable',
          disable: '/api/draft/disable?redirect=/',
        },
      },
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
