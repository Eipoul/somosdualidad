import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem().title('Site Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem().title('Homepage').child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem().title('Pages').child(S.documentTypeList('page').title('Pages')),
      S.divider(),
      S.listItem().title('Episodes').child(S.documentTypeList('episode').title('Episodes').defaultOrdering([{field: 'publishDate', direction: 'desc'}])),
      S.listItem().title('Seasons').child(S.documentTypeList('season').title('Seasons')),
      S.divider(),
      S.listItem().title('Newsletter Subscribers').child(S.documentTypeList('newsletterSubscriber').title('Newsletter Subscribers').defaultOrdering([{field: 'createdAt', direction: 'desc'}])),
    ])
