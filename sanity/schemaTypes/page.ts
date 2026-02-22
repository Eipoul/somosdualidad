import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'routeType',
      title: 'Route type',
      type: 'string',
      initialValue: 'custom',
      options: {
        list: [
          {title: 'Home', value: 'home'},
          {title: 'About', value: 'about'},
          {title: 'Podcast / Resources', value: 'resources'},
          {title: 'Contact', value: 'contact'},
          {title: 'Custom', value: 'custom'},
        ],
      },
    }),
    defineField({name: 'seo', title: 'SEO overrides', type: 'seo'}),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({type: 'sectionHero'}),
        defineArrayMember({type: 'sectionRichText'}),
        defineArrayMember({type: 'sectionImage'}),
        defineArrayMember({type: 'sectionCta'}),
        defineArrayMember({type: 'sectionSteps'}),
        defineArrayMember({type: 'sectionFaq'}),
        defineArrayMember({type: 'sectionTestimonials'}),
        defineArrayMember({type: 'sectionCardGrid'}),
        defineArrayMember({type: 'sectionSpacer'}),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', routeType: 'routeType'},
    prepare({title, slug, routeType}) {
      return {title, subtitle: routeType === 'home' ? '/' : `/${slug || ''}`}
    },
  },
})
