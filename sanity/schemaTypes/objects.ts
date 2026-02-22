import {
  ComposeIcon,
  ControlsIcon,
  HeartIcon,
  ImageIcon,
  LinkIcon,
  MasterDetailIcon,
  MenuIcon,
  SparklesIcon,
  SplitHorizontalIcon,
  UsersIcon,
} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const linkObject = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({name: 'label', title: 'Button label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'href', title: 'URL / Route', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

export const seoObject = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'SEO title', type: 'string', description: 'Appears in Google and social cards.'}),
    defineField({name: 'description', title: 'SEO description', type: 'text', rows: 3}),
    defineField({name: 'ogImage', title: 'Social image', type: 'image', options: {hotspot: true}}),
  ],
})

export const sectionHero = defineType({
  name: 'sectionHero',
  title: 'Hero Section',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow text', type: 'string'}),
    defineField({name: 'title', title: 'Main heading', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'subtitle', title: 'Supporting text', type: 'text', rows: 3}),
    defineField({name: 'primaryCta', title: 'Primary button', type: 'link'}),
    defineField({name: 'secondaryCta', title: 'Secondary button', type: 'link'}),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}, prepare: ({title, subtitle}) => ({title: title || 'Hero', subtitle, media: SparklesIcon})},
})

export const sectionRichText = defineType({
  name: 'sectionRichText',
  title: 'Text Section',
  type: 'object',
  icon: ComposeIcon,
  fields: [
    defineField({name: 'title', title: 'Section title', type: 'string'}),
    defineField({name: 'align', title: 'Alignment', type: 'string', options: {list: [{title: 'Left', value: 'left'}, {title: 'Center', value: 'center'}], layout: 'radio'}, initialValue: 'left'}),
    defineField({name: 'body', title: 'Content', type: 'blockContent', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'title'}, prepare: ({title}) => ({title: title || 'Text section', media: ComposeIcon})},
})

export const sectionImage = defineType({
  name: 'sectionImage',
  title: 'Image Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required()}),
    defineField({name: 'alt', title: 'Alt text', type: 'string'}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
  ],
  preview: {select: {title: 'caption', media: 'image'}, prepare: ({title, media}) => ({title: title || 'Image section', media: media || ImageIcon})},
})

export const sectionCta = defineType({
  name: 'sectionCta',
  title: 'Call To Action',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({name: 'title', title: 'Headline', type: 'string'}),
    defineField({name: 'subtitle', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'button', title: 'Button', type: 'link'}),
  ],
  preview: {select: {title: 'title'}, prepare: ({title}) => ({title: title || 'CTA section', media: HeartIcon})},
})

export const sectionSteps = defineType({
  name: 'sectionSteps',
  title: 'Steps Section',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({name: 'title', title: 'Section title', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Step title', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Step description', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {select: {title: 'title'}, prepare: ({title}) => ({title: title || 'Steps section', media: MenuIcon})},
})

export const sectionFaq = defineType({
  name: 'sectionFaq',
  title: 'FAQ Section',
  type: 'object',
  icon: MasterDetailIcon,
  fields: [
    defineField({name: 'title', title: 'Section title', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'q', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'a', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'q'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {select: {title: 'title'}, prepare: ({title}) => ({title: title || 'FAQ section', media: MasterDetailIcon})},
})

export const sectionTestimonials = defineType({
  name: 'sectionTestimonials',
  title: 'Testimonials Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({name: 'title', title: 'Section title', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
            defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'role', title: 'Role', type: 'string'}),
          ],
          preview: {select: {title: 'name', subtitle: 'quote'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {select: {title: 'title'}, prepare: ({title}) => ({title: title || 'Testimonials section', media: UsersIcon})},
})

export const sectionCardGrid = defineType({
  name: 'sectionCardGrid',
  title: 'Feature Cards Section',
  type: 'object',
  icon: ControlsIcon,
  fields: [
    defineField({name: 'title', title: 'Section title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Section subtitle', type: 'text'}),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Card title', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Card description', type: 'text', rows: 3}),
            defineField({name: 'link', title: 'Link (optional)', type: 'link'}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {select: {title: 'title'}, prepare: ({title}) => ({title: title || 'Cards section', media: ControlsIcon})},
})

export const sectionNewsletterSignup = defineType({
  name: 'sectionNewsletterSignup',
  title: 'Newsletter Signup Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({name: 'title', title: 'Section title', type: 'string', initialValue: 'Suscríbete al newsletter'}),
    defineField({name: 'subtitle', title: 'Section subtitle', type: 'text', rows: 3}),
    defineField({name: 'buttonLabel', title: 'Button label', type: 'string', initialValue: 'Suscribirme'}),
    defineField({name: 'consentLabel', title: 'Consent checkbox label', type: 'string', initialValue: 'Acepto recibir novedades por email.'}),
    defineField({name: 'successMessage', title: 'Success message', type: 'string', initialValue: '¡Gracias! Revisa tu correo para confirmar.'}),
  ],
  preview: {select: {title: 'title'}, prepare: ({title}) => ({title: title || 'Newsletter section', media: UsersIcon})},
})

export const sectionSpacer = defineType({
  name: 'sectionSpacer',
  title: 'Spacer / Divider',
  type: 'object',
  icon: SplitHorizontalIcon,
  fields: [
    defineField({name: 'height', title: 'Height (px)', type: 'number', initialValue: 40, validation: (Rule) => Rule.min(8).max(240)}),
    defineField({name: 'showDivider', title: 'Show divider line', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {height: 'height'}, prepare: ({height}) => ({title: `Spacer (${height || 40}px)`, media: SplitHorizontalIcon})},
})
