import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTagline', title: 'Site Tagline', type: 'string'}),
    defineField({name: 'newsletterHeading', title: 'Newsletter Heading', type: 'string'}),
    defineField({name: 'newsletterDescription', title: 'Newsletter Description', type: 'text'}),
    defineField({name: 'featuredEpisodeHeading', title: 'Featured Episode Heading', type: 'string'}),
  ],
})
