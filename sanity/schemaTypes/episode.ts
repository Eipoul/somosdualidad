import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'episode',
  title: 'Podcast Episode',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Full description of the episode',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'podcast',
      title: 'Podcast',
      type: 'reference',
      to: {type: 'podcast'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio File URL',
      type: 'url',
      description: 'Link to the audio file or streaming platform',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      description: 'Episode duration in minutes',
    }),
    defineField({
      name: 'guests',
      title: 'Guests',
      type: 'array',
      of: [{type: 'reference', to: {type: 'author'}}],
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'blockContent',
      description: 'Optional episode transcript',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      episodeNumber: 'episodeNumber',
      media: 'image',
      podcast: 'podcast.title',
    },
    prepare(selection) {
      const {episodeNumber, podcast} = selection
      return {...selection, subtitle: `Episode ${episodeNumber} - ${podcast}`}
    },
  },
})
