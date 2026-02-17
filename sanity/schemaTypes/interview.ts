export default {
  name: "interview",
  title: "Entrevistas",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "guest",
      title: "Invitado/a",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "date",
      title: "Fecha",
      type: "date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Resumen corto",
      type: "text",
      rows: 3,
    },
    {
      name: "summary",
      title: "Resumen largo",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "youtubeUrl",
      title: "Link de YouTube",
      type: "url",
    },
    {
      name: "spotifyUrl",
      title: "Link de Spotify",
      type: "url",
    },
    {
      name: "coverImage",
      title: "Imagen portada",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
