import { defineField, defineType } from "sanity";

export const tourType = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "countryName",
      title: "Country Name",
      type: "string",
    },
    { name: "title", title: "Title", type: "string" },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    { name: "itineraryName", title: "Itinerary Name", type: "string" },
    { name: "description", title: "Short Description", type: "text" },
    { name: "longDescription", title: "Long Description", type: "text" },
    { name: "duration", title: "Duration", type: "string" },
    { name: "price", title: "Price", type: "number" },
    {
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "recommended", title: "Recommended", type: "boolean" },
    { name: "isIdea", title: "Is this tour just an idea", type: "boolean" },
    {
      name: "recommendedContent",
      title: "Recommended Content",
      type: "object",
      fields: [
        { name: "id", title: "ID", type: "number" },
        { name: "title", title: "Title", type: "string" },
        { name: "nights", title: "Nights", type: "number" },
        { name: "price", title: "Price", type: "number" },
        defineField({
          name: "image",
          title: "Recommended Image",
          type: "image",
        }),
        { name: "slug", title: "Slug", type: "string" },
      ],
    },
    {
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", title: "Day", type: "number" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            {
              name: "image",
              title: "Day Images",
              type: "array",
              of: [
                {
                  type: "image",
                  name: "Image Name ( would also be used as alt text )",
                },
              ],
              validation: (Rule) => Rule.max(2).min(0),
            },
            { name: "firstDay", title: "First Day", type: "string" },
            { name: "lastDay", title: "Last Day", type: "string" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "countryName",
      isIdea: "isIdea",
    },
    prepare(selection: { title: string, subtitle: string, isIdea: boolean }) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle
      };
    },
  },
});
