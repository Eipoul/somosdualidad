import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'order', title: 'Season Number', type: 'number'}),
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})
