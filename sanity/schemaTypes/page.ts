import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Páginas',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Título de la página', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'routeType',
      title: 'Tipo de página',
      type: 'string',
      initialValue: 'custom',
      options: {
        list: [
          {title: 'Inicio', value: 'home'},
          {title: 'Sobre nosotros', value: 'about'},
          {title: 'Podcast / Recursos', value: 'resources'},
          {title: 'Contacto', value: 'contact'},
          {title: 'Personalizada', value: 'custom'},
        ],
      },
    }),
    defineField({name: 'seo', title: 'SEO (opcional)', type: 'seo'}),
    defineField({
      name: 'sections',
      title: 'Bloques de contenido',
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
