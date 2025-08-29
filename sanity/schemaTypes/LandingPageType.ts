import { defineField, defineType } from "sanity";

export const LandingPageType = defineType({
  name: "landingPage",
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
        {
          type: "object", // This indicates an object within the array
          name: "buttnos", // A unique name for this object type
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
