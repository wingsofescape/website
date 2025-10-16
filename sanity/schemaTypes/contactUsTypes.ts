import { defineField, defineType } from "sanity";

export const ContactUs = defineType({
  name: "contactUs",
  title: "Contact Us",
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
      name: "title2",
      title: "Title 2 (Quick Support)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactUsOptions",
      title: "Contact Us Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title (Call us, Whatsapp us, Email us)",
              type: "string",
            },
            { name: "content", title: "PhoneNumber / Email", type: "string" },
            { name: "icon", title: "Icon", type: "image" },
          ],
        },
      ],
    }),
  ],
});
