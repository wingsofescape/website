import { defineField, defineType } from "sanity";

export const destinationType = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    defineField({
      name: "destinationHeading",
      type: "string",
    }),
    defineField({
      name: "slug", //
      type: "string",
    }),
    defineField({
      name: "destinationHeroBanner",
      type: "document",
      fields: [
        defineField({
          name: "name",
          type: "string",
        }),
        defineField({
          name: "title",
          type: "string",
        }),
        defineField({
          name: "description",
          type: "text",
        }),
        defineField({
          name: "heroImage",
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "destinationContent",
      title: "Destination Content",
      type: "document",
      fields: [
        defineField({
          name: "holidaysOverview",
          title: "Holidays Overview",
          type: "document",
          fields: [
            defineField({
              name: "id",
              type: "string",
            }),
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "document",
              fields: [
                defineField({
                  name: "paragraph",
                  title: "Paragraph",
                  type: "array",
                  of: [{ type: "string" }],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    {
      name: "recommendedToursContent",
      title: "Recommended Tours Content",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "description", title: "Description", type: "text" },
        ],
    },
  ],
});
