import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscribers',
  type: 'document',
  fields: [
    defineField({name: 'email', title: 'Email', type: 'string', validation: (rule) => rule.required().email()}),
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'consent', title: 'Consent', type: 'boolean'}),
    defineField({name: 'sourcePage', title: 'Source page', type: 'string'}),
    defineField({name: 'createdAt', title: 'Created at', type: 'datetime'}),
  ],
  orderings: [{title: 'Newest first', name: 'createdAtDesc', by: [{field: 'createdAt', direction: 'desc'}]}],
})
