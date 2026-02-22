import type { CollectionConfig } from 'payload'

export const Episodes: CollectionConfig = {
  slug: 'episodes',
  labels: { singular: 'Episodio', plural: 'Episodios' },
  admin: { useAsTitle: 'title', group: 'Podcast' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'publishDate', type: 'date', required: true },
    { name: 'season', type: 'relationship', relationTo: 'seasons' },
    { name: 'coverImage', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'showNotes', type: 'richText' },
    {
      name: 'platformLinks',
      type: 'group',
      fields: [
        { name: 'spotify', type: 'text' },
        { name: 'apple', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    { name: 'transcript', type: 'textarea' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
  versions: { drafts: true },
}
