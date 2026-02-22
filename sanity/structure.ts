import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Constructor del sitio')
    .items([
      S.listItem()
        .title('🚀 Editor fácil (paso a paso)')
        .child(
          S.list()
            .title('Editor fácil (paso a paso)')
            .items([
              S.listItem()
                .title('1) Ajustes globales (menú, footer, marca)')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('2) Página de inicio')
                .child(S.documentList().title('Página de inicio').schemaType('page').filter('_type == "page" && routeType == "home"')),
              S.listItem()
                .title('3) Páginas internas')
                .child(
                  S.documentList()
                    .title('Páginas internas')
                    .schemaType('page')
                    .filter('_type == "page" && (!defined(routeType) || routeType != "home")'),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('⚙️ Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.documentTypeListItem('page').title('📄 Pages'),
      ...S.documentTypeListItems().filter((item) => !['siteSettings', 'page'].includes(item.getId() ?? '')),
    ])
