export default {
  name: "blocksCta",
  title: "Llamado a la acción (CTA)",
  type: "object",
  fields: [
    { name: "title", title: "Título", type: "string" },
    { name: "subtitle", title: "Subtítulo", type: "text", rows: 3 },
    {
      name: "button",
      title: "Botón",
      type: "object",
      fields: [
        { name: "label", title: "Texto", type: "string" },
        { name: "href", title: "Link", type: "string" },
      ],
    },
  ],
};
