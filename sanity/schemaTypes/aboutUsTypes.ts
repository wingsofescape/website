import { defineField, defineType } from "sanity";

export const aboutUsTypes = defineType({
  name: "aboutUs",
  title: "About Us",
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
      hidden: true,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "aboutUsImage",
      title: "About Us Image",
      type: "image",
    }),
    defineField({
      name: "aboutUsContent",
      title: "About Us Content",
      type: "array",
      of: [{ type: "text" }],
    }),
  ],
});
