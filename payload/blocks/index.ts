import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'subhead', type: 'textarea' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Texto enriquecido', plural: 'Textos enriquecidos' },
  fields: [{ name: 'content', type: 'richText', required: true }],
}

export const SplitSectionBlock: Block = {
  slug: 'splitSection',
  labels: { singular: 'Sección dividida', plural: 'Secciones divididas' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'body', type: 'textarea' },
    { name: 'imageUrl', type: 'text' },
  ],
}

export const EpisodesSectionBlock: Block = {
  slug: 'episodesSection',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Episodios' },
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'latest',
      options: [
        { label: 'Últimos', value: 'latest' },
        { label: 'Destacados', value: 'featured' },
      ],
    },
  ],
}

export const AboutSectionBlock: Block = {
  slug: 'aboutSection',
  fields: [{ name: 'content', type: 'textarea' }],
}

export const SubscribeSectionBlock: Block = {
  slug: 'subscribeSection',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Suscríbete' },
    { name: 'description', type: 'textarea' },
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'buttonLabel', type: 'text' },
    { name: 'buttonHref', type: 'text' },
  ],
}

export const SpacerBlock: Block = {
  slug: 'spacer',
  fields: [{ name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' }],
}

export const pageBlocks = [
  HeroBlock,
  RichTextBlock,
  SplitSectionBlock,
  EpisodesSectionBlock,
  AboutSectionBlock,
  SubscribeSectionBlock,
  FAQBlock,
  CTABlock,
  SpacerBlock,
]
