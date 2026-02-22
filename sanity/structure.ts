import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Dashboard de contenidos')
    .items([
      S.listItem()
        .title('⭐ Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem()
        .title('🏠 Homepage')
        .id('homepage')
        .child(
          S.documentList()
            .title('Homepage')
            .schemaType('page')
            .filter('_type == "page" && routeType == "home"'),
        ),
      S.listItem()
        .title('🎙️ Podcast Page')
        .id('podcastPage')
        .child(
          S.documentList()
            .title('Podcast Page')
            .schemaType('page')
            .filter('_type == "page" && routeType == "resources"'),
        ),
      S.listItem()
        .title('📄 Pages')
        .id('pages')
        .child(
          S.documentList()
            .title('Pages')
            .schemaType('page')
            .filter('_type == "page" && (!defined(routeType) || !(routeType in ["home", "resources"]))'),
        ),
      S.listItem().title('⚙️ Global Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('📬 Newsletter Subscribers')
        .id('newsletterSubscribers')
        .child(
          S.documentTypeList('newsletterSignup')
            .title('Newsletter Subscribers')
            .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
        ),
    ])
