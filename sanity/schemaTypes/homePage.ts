import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Internal title', type: 'string', initialValue: 'Homepage'}),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({type: 'sectionHero'}),
        defineArrayMember({type: 'sectionWhoWeAre'}),
        defineArrayMember({type: 'sectionEpisodes'}),
        defineArrayMember({type: 'sectionNewsletterSignup'}),
        defineArrayMember({type: 'sectionFaq'}),
        defineArrayMember({type: 'sectionCta'}),
      ],
      options: {sortable: true},
      validation: (Rule) => Rule.min(1),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
