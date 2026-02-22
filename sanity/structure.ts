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
                .child(
                  S.documentList().title('Página de inicio').schemaType('page').filter('_type == "page" && routeType == "home"'),
                ),
              S.listItem()
                .title('3) Páginas internas')
                .child(
                  S.documentList()
                    .title('Páginas internas')
                    .schemaType('page')
                    .filter('_type == "page" && (!defined(routeType) || routeType != "home")'),
                ),
              S.listItem()
                .title('4) Preview en vivo (edita sin publicar)')
                .child(
                  S.editor()
                    .id('preview-help')
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Usa la pestaña “Presentation” para ver el sitio en vivo'),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('👀 Preview en vivo (Presentation)')
        .child(
          S.editor()
            .id('preview-help-main')
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Preview visual en la herramienta “Presentation”'),
        ),
      S.listItem()
        .title('⚙️ Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.documentTypeListItem('page').title('📄 Pages'),
      ...S.documentTypeListItems().filter((item) => !['siteSettings', 'page'].includes(item.getId() ?? '')),
    ])
