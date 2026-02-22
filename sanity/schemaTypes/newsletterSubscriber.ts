import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscribers',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'email', title: 'Email', type: 'string', validation: (rule) => rule.required().email()}),
    defineField({name: 'consent', title: 'Consent accepted', type: 'boolean'}),
    defineField({name: 'sourcePage', title: 'Source page', type: 'string'}),
    defineField({name: 'createdAt', title: 'Created at', type: 'datetime'}),
  ],
  orderings: [{title: 'Newest first', name: 'createdAtDesc', by: [{field: 'createdAt', direction: 'desc'}]}],
  preview: {select: {title: 'email', subtitle: 'name'}},
})
