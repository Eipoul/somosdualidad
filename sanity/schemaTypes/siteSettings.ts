import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteName', title: 'Site name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'logoText', title: 'Logo text', type: 'string'}),
    defineField({name: 'brandCopy', title: 'Brand copy', type: 'text'}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'link'}),
    defineField({name: 'navigation', title: 'Navigation links', type: 'array', of: [defineArrayMember({type: 'link'})]}),
    defineField({name: 'socialLinks', title: 'Social links', type: 'array', of: [defineArrayMember({type: 'link'})]}),
    defineField({name: 'legalLinks', title: 'Legal links', type: 'array', of: [defineArrayMember({type: 'link'})]}),
    defineField({name: 'footerCopy', title: 'Footer copy', type: 'text'}),
    defineField({name: 'newsletterHeadline', title: 'Default newsletter headline', type: 'string'}),
    defineField({name: 'newsletterCopy', title: 'Default newsletter copy', type: 'text'}),
    defineField({name: 'defaultSeo', title: 'Default SEO', type: 'seo'}),
  ],
})
