import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'episode',
  title: 'Episode',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Short Description', type: 'text', rows: 3}),
    defineField({name: 'publishDate', title: 'Publish Date', type: 'datetime', validation: (rule) => rule.required()}),
    defineField({name: 'season', title: 'Season', type: 'reference', to: [{type: 'season'}]}),
    defineField({name: 'coverImage', title: 'Cover Image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'streamingLinks',
      title: 'Streaming Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'platform', title: 'Platform', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
        }),
      ],
    }),
    defineField({name: 'showNotes', title: 'Show Notes', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'transcript', title: 'Transcript (optional)', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'isFeatured', title: 'Featured Episode', type: 'boolean', initialValue: false}),
  ],
  orderings: [{title: 'Newest first', name: 'publishDateDesc', by: [{field: 'publishDate', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'publishDate', media: 'coverImage'},
    prepare(selection) {
      const subtitle = selection.subtitle ? new Date(selection.subtitle).toLocaleDateString('es-ES') : 'No publish date'
      return {...selection, subtitle}
    },
  },
})
