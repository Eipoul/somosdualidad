import type { CollectionConfig } from 'payload'

export const Seasons: CollectionConfig = {
  slug: 'seasons',
  labels: { singular: 'Temporada', plural: 'Temporadas' },
  admin: { useAsTitle: 'title', group: 'Podcast' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'number', type: 'number', required: true, unique: true },
    { name: 'description', type: 'textarea' },
  ],
}
