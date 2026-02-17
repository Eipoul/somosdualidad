export default {
  name: "pageHome",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 3 },
      ],
    },
    {
      name: "sections",
      title: "Secciones",
      type: "array",
      of: [
        { type: "blocksHero" },
        { type: "blocksText" },
        { type: "blocksFaq" },
        { type: "blocksCta" },
      ],
      validation: (Rule: any) => Rule.min(1),
    },
  ],
};
