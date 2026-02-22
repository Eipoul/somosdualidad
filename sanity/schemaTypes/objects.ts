import {defineArrayMember, defineField, defineType} from 'sanity'

export const linkObject = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Etiqueta', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'href', title: 'URL / Ruta', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

export const seoObject = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Título SEO', type: 'string'}),
    defineField({name: 'description', title: 'Descripción SEO', type: 'text', rows: 3}),
    defineField({name: 'ogImage', title: 'Imagen OG', type: 'image', options: {hotspot: true}}),
  ],
})

export const sectionHero = defineType({
  name: 'sectionHero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3}),
    defineField({name: 'primaryCta', title: 'CTA principal', type: 'link'}),
    defineField({name: 'secondaryCta', title: 'CTA secundaria', type: 'link'}),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})

export const sectionRichText = defineType({
  name: 'sectionRichText',
  title: 'Rich text',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({name: 'align', title: 'Alineación', type: 'string', options: {list: [{title: 'Izquierda', value: 'left'}, {title: 'Centro', value: 'center'}], layout: 'radio'}, initialValue: 'left'}),
    defineField({name: 'body', title: 'Contenido', type: 'blockContent', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'title'}},
})

export const sectionImage = defineType({
  name: 'sectionImage',
  title: 'Imagen',
  type: 'object',
  fields: [
    defineField({name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required()}),
    defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
  ],
})

export const sectionCta = defineType({
  name: 'sectionCta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3}),
    defineField({name: 'button', title: 'Botón', type: 'link'}),
  ],
})

export const sectionSteps = defineType({
  name: 'sectionSteps',
  title: 'Steps',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Pasos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Descripción', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})

export const sectionFaq = defineType({
  name: 'sectionFaq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Preguntas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'q', title: 'Pregunta', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'a', title: 'Respuesta', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'q'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})

export const sectionTestimonials = defineType({
  name: 'sectionTestimonials',
  title: 'Testimonials',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Testimonios',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'quote', title: 'Cita', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
            defineField({name: 'name', title: 'Nombre', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'role', title: 'Rol', type: 'string'}),
          ],
          preview: {select: {title: 'name', subtitle: 'quote'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})

export const sectionCardGrid = defineType({
  name: 'sectionCardGrid',
  title: 'Card grid / Features',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtítulo', type: 'text'}),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Descripción', type: 'text', rows: 3}),
            defineField({name: 'link', title: 'Link (opcional)', type: 'link'}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})

export const sectionSpacer = defineType({
  name: 'sectionSpacer',
  title: 'Divider / Spacer',
  type: 'object',
  fields: [
    defineField({name: 'height', title: 'Altura (px)', type: 'number', initialValue: 40, validation: (Rule) => Rule.min(8).max(240)}),
    defineField({name: 'showDivider', title: 'Mostrar divisor', type: 'boolean', initialValue: true}),
  ],
})
