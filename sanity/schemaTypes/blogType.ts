import { defineField, defineType } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sub Title",
      type: "string",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Blog Creation Date",
      type: "date",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "blogContent",
      title: "Blog Content (in the form or paragraphs and images)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "subHeading", title: "Sub Heading", type: "string" },
            defineField({
              name: "paragraph",
              title: "Paragraph",
              type: "array",
              of: [{ type: "string" }],
            }),
            {
              name: "image",
              title: "Blog Content Image",
              type: "array",
              of: [
                {
                  type: "image",
                  name: "Image Name ( would also be used as alt text )",
                },
              ],
              validation: (Rule) => Rule.max(2).min(0),
            },
            {
              name: "imagesDescription",
              title: "Image(s) Description",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
