import {BoltIcon, ComposeIcon, LinkIcon, HelpCircleIcon, SparklesIcon, UsersIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const linkObject = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'href', title: 'URL / Anchor', type: 'string', validation: (Rule) => Rule.required()}),
  ],
})

export const seoObject = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'SEO title', type: 'string'}),
    defineField({name: 'description', title: 'SEO description', type: 'text', rows: 3}),
    defineField({name: 'ogImage', title: 'Social image', type: 'image', options: {hotspot: true}}),
  ],
})

export const sectionHero = defineType({
  name: 'sectionHero',
  title: 'Hero',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Headline', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'subtitle', title: 'Subheadline', type: 'text', rows: 3}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'link'}),
    defineField({name: 'secondaryCta', title: 'Secondary CTA', type: 'link'}),
  ],
})

export const sectionWhoWeAre = defineType({
  name: 'sectionWhoWeAre',
  title: 'Quiénes Somos',
  type: 'object',
  icon: ComposeIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', initialValue: 'Quiénes somos'}),
    defineField({name: 'body', title: 'Copy', type: 'blockContent', validation: (Rule) => Rule.required()}),
  ],
})

export const sectionEpisodes = defineType({
  name: 'sectionEpisodes',
  title: 'Episodios',
  type: 'object',
  icon: BoltIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', initialValue: 'Episodios'}),
    defineField({name: 'subtitle', title: 'Copy', type: 'text'}),
    defineField({name: 'maxItems', title: 'Episodes to display', type: 'number', initialValue: 6, validation: (Rule) => Rule.min(1).max(12)}),
    defineField({name: 'showFeatured', title: 'Show featured episode', type: 'boolean', initialValue: true}),
  ],
})

export const sectionFaq = defineType({
  name: 'sectionFaq',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [defineArrayMember({type: 'object', fields: [defineField({name: 'q', title: 'Question', type: 'string'}), defineField({name: 'a', title: 'Answer', type: 'text'})]})],
    }),
  ],
})

export const sectionCta = defineType({
  name: 'sectionCta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Copy', type: 'text'}),
    defineField({name: 'button', title: 'Button', type: 'link'}),
  ],
})

export const sectionNewsletterSignup = defineType({
  name: 'sectionNewsletterSignup',
  title: 'Suscríbete',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', initialValue: 'Suscríbete'}),
    defineField({name: 'subtitle', title: 'Copy', type: 'text'}),
    defineField({name: 'namePlaceholder', title: 'Name placeholder', type: 'string', initialValue: 'Tu nombre (opcional)'}),
    defineField({name: 'emailPlaceholder', title: 'Email placeholder', type: 'string', initialValue: 'tu@email.com'}),
    defineField({name: 'buttonLabel', title: 'Button label', type: 'string', initialValue: 'Suscribirme'}),
    defineField({name: 'consentLabel', title: 'Consent text', type: 'string', initialValue: 'Acepto recibir novedades por email.'}),
    defineField({name: 'successMessage', title: 'Success message', type: 'string', initialValue: '¡Gracias por suscribirte!'}),
  ],
})
