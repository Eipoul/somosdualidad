import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Páginas',
  type: 'document',
  fieldsets: [
    {name: 'basics', title: 'Paso 1: Datos básicos', options: {collapsible: true, collapsed: false}},
    {name: 'seo', title: 'Paso 3 (opcional): SEO', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la página',
      type: 'string',
      description: 'Ejemplo: Inicio, Sobre nosotros, Contacto.',
      fieldset: 'basics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      description: 'Dirección de la página. Se genera automáticamente desde el título, pero puedes editarla.',
      fieldset: 'basics',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'routeType',
      title: 'Tipo de página',
      description: 'Selecciona “Inicio” solo para la home principal. Para las demás, usa “Personalizada”.',
      type: 'string',
      initialValue: 'custom',
      fieldset: 'basics',
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
    defineField({
      name: 'sections',
      title: 'Paso 2: Bloques de contenido (constructor visual)',
      description:
        'Agrega bloques, rellena el contenido y arrastra para reordenar. Puedes abrir Presentation para ver cambios en vivo sin publicar.',
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
        defineArrayMember({type: 'sectionPodcasts'}),
        defineArrayMember({type: 'sectionEpisodes'}),
        defineArrayMember({type: 'sectionSubscribe'}),
        defineArrayMember({type: 'sectionSpacer'}),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'seo',
      title: 'SEO (opcional)',
      type: 'seo',
      fieldset: 'seo',
      description: 'Solo para Google y redes sociales. Si no sabes qué poner, puedes dejarlo vacío.',
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', routeType: 'routeType'},
    prepare({title, slug, routeType}) {
      return {title, subtitle: routeType === 'home' ? '/' : `/${slug || ''}`}
    },
  },
})
