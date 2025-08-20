import { defineField, defineType } from "sanity";

export const headerType = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
  ],
});
