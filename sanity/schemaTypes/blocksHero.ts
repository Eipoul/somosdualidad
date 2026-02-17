export default {
  name: "blocksHero",
  title: "Hero",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow (texto pequeño arriba)", type: "string" },
    { name: "title", title: "Título", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "subtitle", title: "Subtítulo", type: "text", rows: 3 },
    {
      name: "primaryCta",
      title: "CTA principal",
      type: "object",
      fields: [
        { name: "label", title: "Texto del botón", type: "string" },
        { name: "href", title: "Link", type: "string" },
      ],
    },
    {
      name: "secondaryCta",
      title: "CTA secundario",
      type: "object",
      fields: [
        { name: "label", title: "Texto del botón", type: "string" },
        { name: "href", title: "Link", type: "string" },
      ],
    },
  ],
};
