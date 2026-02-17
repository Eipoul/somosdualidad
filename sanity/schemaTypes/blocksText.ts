export default {
  name: "blocksText",
  title: "Sección de texto",
  type: "object",
  fields: [
    { name: "title", title: "Título", type: "string" },
    { name: "body", title: "Contenido", type: "array", of: [{ type: "block" }] },
    {
      name: "align",
      title: "Alineación",
      type: "string",
      options: {
        list: [
          { title: "Izquierda", value: "left" },
          { title: "Centro", value: "center" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    },
  ],
};
