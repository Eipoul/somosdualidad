import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'brand', title: 'Brand'},
    {name: 'navigation', title: 'Navigation'},
    {name: 'footer', title: 'Footer'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Website name',
      type: 'string',
      group: 'brand',
      description: 'Main brand name displayed in metadata and shared templates.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'logoText', title: 'Logo text', type: 'string', group: 'brand', options: {placeholder: 'Somos Dualidad'}}),
    defineField({name: 'logo', title: 'Logo image', type: 'image', options: {hotspot: true}, group: 'brand'}),
    defineField({name: 'brandCopy', title: 'Brand description', type: 'text', rows: 3, group: 'brand'}),
    defineField({name: 'primaryCta', title: 'Primary button', type: 'link', group: 'navigation'}),
    defineField({name: 'navigation', title: 'Header navigation links', type: 'array', of: [defineArrayMember({type: 'link'})], group: 'navigation'}),
    defineField({name: 'socialLinks', title: 'Social links', type: 'array', of: [defineArrayMember({type: 'link'})], group: 'footer'}),
    defineField({name: 'legalLinks', title: 'Legal links', type: 'array', of: [defineArrayMember({type: 'link'})], group: 'footer'}),
    defineField({name: 'footerCopy', title: 'Footer description', type: 'text', rows: 2, group: 'footer'}),
    defineField({name: 'defaultSeo', title: 'Default SEO values', type: 'seo', group: 'seo'}),
  ],
  preview: {select: {title: 'siteName'}},
})
