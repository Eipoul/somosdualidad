import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'settings', title: 'Page settings'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      group: 'content',
      description: 'Internal page name for editors.',
      options: {placeholder: 'Ej. Homepage'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page URL',
      type: 'slug',
      description: 'The route used on the website.',
      group: 'settings',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'routeType',
      title: 'Page category',
      description: 'Choose Homepage only once. Use Podcast Page for episodes/resources.',
      type: 'string',
      initialValue: 'custom',
      group: 'settings',
      options: {
        list: [
          {title: 'Homepage', value: 'home'},
          {title: 'Podcast Page', value: 'resources'},
          {title: 'About Page', value: 'about'},
          {title: 'Contact Page', value: 'contact'},
          {title: 'Custom Page', value: 'custom'},
        ],
      },
    }),
    defineField({
      name: 'sections',
      title: 'Page Builder Sections',
      description: 'Add blocks and drag to reorder the page visually.',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({type: 'sectionHero'}),
        defineArrayMember({type: 'sectionRichText'}),
        defineArrayMember({type: 'sectionImage'}),
        defineArrayMember({type: 'sectionCta'}),
        defineArrayMember({type: 'sectionSteps'}),
        defineArrayMember({type: 'sectionFaq'}),
        defineArrayMember({type: 'sectionTestimonials'}),
        defineArrayMember({type: 'sectionCardGrid'}),
        defineArrayMember({type: 'sectionNewsletterSignup'}),
        defineArrayMember({type: 'sectionSpacer'}),
      ],
      options: {sortable: true},
      validation: (Rule) => Rule.min(1).warning('Add at least one section to render the page.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
      description: 'Optional: custom title/description for search engines and social previews.',
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', routeType: 'routeType'},
    prepare({title, slug, routeType}) {
      return {title, subtitle: routeType === 'home' ? '/' : `/${slug || ''}`}
    },
  },
})
