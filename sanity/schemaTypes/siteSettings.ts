import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'brand', title: 'Brand'},
    {name: 'navigation', title: 'Navigation'},
    {name: 'footer', title: 'Footer'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'siteName', title: 'Site name', type: 'string', group: 'brand', validation: (Rule) => Rule.required()}),
    defineField({name: 'logoText', title: 'Logo text', type: 'string', group: 'brand'}),
    defineField({name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}, group: 'brand'}),
    defineField({name: 'brandCopy', title: 'Brand copy', type: 'text', rows: 3, group: 'brand'}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'link', group: 'navigation'}),
    defineField({name: 'navigation', title: 'Navigation links', type: 'array', of: [defineArrayMember({type: 'link'})], group: 'navigation'}),
    defineField({name: 'socialLinks', title: 'Social links', type: 'array', of: [defineArrayMember({type: 'link'})], group: 'footer'}),
    defineField({name: 'legalLinks', title: 'Legal links', type: 'array', of: [defineArrayMember({type: 'link'})], group: 'footer'}),
    defineField({name: 'footerCopy', title: 'Footer copy', type: 'text', rows: 2, group: 'footer'}),
    defineField({name: 'defaultSeo', title: 'Default SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {select: {title: 'siteName'}},
})
