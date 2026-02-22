import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: { singular: 'Suscriptor', plural: 'Suscriptores' },
  admin: { useAsTitle: 'email', group: 'Newsletter', defaultColumns: ['email', 'consent', 'createdAt'] },
  access: {
    create: () => true,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'name', type: 'text' },
    { name: 'consent', type: 'checkbox', required: true, defaultValue: true },
  ],
  timestamps: true,
}
