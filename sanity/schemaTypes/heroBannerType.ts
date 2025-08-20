import { defineField, defineType } from "sanity";

export const heroBannerType = defineType({
  name: "heroBanner",
  title: "Hero Banner",
  type: "document",
  fields: [
    defineField({
      name: "heroBannerHeading",
      type: "string",
    }),
    defineField({
      name: "heroBannerSubHeading",
      type: "string",
    }),
    defineField({
      name: "heroBannerButtons",
      type: "array",
      of: [
        defineField({
          name: "heroBannerButton",
          type: "object",
          fields: [
            defineField({
              name: "link",
              type: "url",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "heroBannerImage",
      type: "image",
    }),
  ],
});
