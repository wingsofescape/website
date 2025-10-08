import { defineField, defineType } from "sanity";

export const byMonthTypes = defineType({
  name: "byMonth",
  title: "Where To go by Month",
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
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "content",
      title: "Content (in the form or paragraphs and images)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "href", title: "Button Link", type: "url" },
            { name: "button", title: "Button Text", type: "string" },
            { name: "subHeading", title: "Sub Heading", type: "string" },
            defineField({
              name: "paragraph",
              title: "Paragraph",
              type: "text",
            }),
            {
              name: "image",
              title: "Blog Content Image",
              type: "image",
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
