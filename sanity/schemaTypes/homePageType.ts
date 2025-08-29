import { defineField, defineType } from "sanity";

export const HomePageType = defineType({
  name: "homePage",
  title: "Home Page",
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
        {
          type: "object", // This indicates an object within the array
          name: "buttons", // A unique name for this object type
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "link",
              title: "Link",
              type: "url",
            },
            // Add more fields for your object as needed
          ],
        },
      ],
    }),
    defineField({
      name: "heroBannerImage",
      type: "image",
    }),
  ],
});
