import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Dashboard de contenidos')
    .items([
      S.listItem().title('⭐ Site Settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem().title('⚙️ Global Settings').id('globalSettings').child(S.document().schemaType('globalSettings').documentId('globalSettings')),
      S.divider(),
      S.listItem().title('🎧 Episodes').id('episodes').child(S.documentTypeList('episode').title('Episodes').defaultOrdering([{field: 'publishDate', direction: 'desc'}])),
      S.listItem().title('📚 Seasons').id('seasons').child(S.documentTypeList('season').title('Seasons')),
      S.divider(),
      S.listItem()
        .title('📬 Newsletter Subscribers')
        .id('newsletterSubscribers')
        .child(
          S.list()
            .title('Newsletter Subscribers')
            .items([
              S.listItem().title('All Subscribers').child(S.documentTypeList('newsletterSubscriber').title('All Subscribers').defaultOrdering([{field: 'createdAt', direction: 'desc'}])),
              S.listItem().title('Consent accepted').child(S.documentList().title('Consent accepted').schemaType('newsletterSubscriber').filter('_type == "newsletterSubscriber" && consent == true').defaultOrdering([{field: 'createdAt', direction: 'desc'}])),
            ]),
        ),
      S.divider(),
      S.listItem().title('🏠 Homepage (Sanity fallback)').id('homepage').child(S.documentList().title('Homepage').schemaType('page').filter('_type == "page" && routeType == "home"')),
      S.listItem().title('📄 Pages (Sanity fallback)').id('pages').child(S.documentList().title('Pages').schemaType('page').filter('_type == "page" && (!defined(routeType) || !(routeType in ["home", "resources"]))')),
    ])
