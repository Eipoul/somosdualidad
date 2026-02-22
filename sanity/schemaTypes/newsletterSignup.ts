import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletterSignup',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'consent',
      title: 'Marketing consent',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sourcePage',
      title: 'Source page',
      type: 'string',
      description: 'Page where the user submitted the newsletter form.',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'name',
    },
  },
})
