export default {
  name: "blocksFaq",
  title: "FAQ",
  type: "object",
  fields: [
    { name: "title", title: "Título", type: "string" },
    {
      name: "items",
      title: "Preguntas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", title: "Pregunta", type: "string", validation: (Rule: any) => Rule.required() },
            { name: "a", title: "Respuesta", type: "text", rows: 3, validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
      validation: (Rule: any) => Rule.min(1),
    },
  ],
};
