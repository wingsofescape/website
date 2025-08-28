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
                  name: "description",
                  title: "Description",
                  type: "string",
                }),
                defineField({
                  name: "paragraph",
                  title: "Paragraph",
                  type: "string",
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "tourIdeas",
          title: "Tour Ideas",
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
                  name: "description",
                  title: "Description",
                  type: "string",
                }),
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
          type: "string",
        }),
        defineField({
          name: "heroImage",
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "destinationBreadcrumbs",
      type: "array",
      of: [
        {
          type: "object", // This indicates an object within the array
          name: "breadCrumbLinks", // A unique name for this object type
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
            },
            {
              name: "ref",
              title: "Ref",
              type: "string",
            },
            // Add more fields for your object as needed
          ],
        },
      ],
    }),
  ],
});
