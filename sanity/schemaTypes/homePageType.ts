import { defineField, defineType } from "sanity";

export const HomePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroBannerHeading",
      title: 'Hero Banner Heading',
      type: "string",
    }),
    defineField({
      name: "heroBannerSubHeading",
      title: 'Hero Banner Sub Heading',
      type: "string",
    }),
    defineField({
      name: "heroBannerButtons",
      title: 'Buttons in banner',
      type: "array",
      of: [
        {
          type: "object",
          name: "buttons",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "link",
              title: "Where Should this button redirect to ?",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "heroBannerImage",
      title: "Hero Banner Image",
      type: "image",
      hidden: true,
    }),
    // defineField({
    //   name: "features",
    //   title: "Features",
    //   type: "array",
    //   of: [{
    //     type: "object",
    //     fields: [{
    //       name: "featureHeading",
    //       title: "Feature Heading",
    //       type: "string"
    //     }, {
    //       name: "featureContent",
    //       type: "string",
    //       title: "Feature Content"
    //     }]
    //   }]
    // }),
    defineField({
      name: 'whatsHotSection',
      title: 'What\'s Hot Section',
      type: 'document',
      fields: [
        defineField({
          name: "heading",
          type: "string",
          title: "Heading"
        }),
        defineField({
          name: "subHeading",
          type: "string",
          title: "Subheading"
        }),
        defineField({
          name: "images",
          title: 'Images',
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "heading", title: "Heading", type: "string" },
                { name: "paragraph", title: "Paragraph", type: "text" },

                { name: "content", title: "Content", type: "array", of: [{ type: "string" }] },
                { name: "image", title: "Image", type: "image" },
                { name: "buttonText", title: "Button Text", type: "string" },
                { name: "link", title: "Link", type: "string" }
              ]
            }
          ]
        }),
      ],
    }),
    defineField({
      name: "luxuryHolidaySection",
      title: "Luxury Holidays Section",
      type: "object",
      fields: [{
        name: "heading",
        title: "Heading",
        type: "string"
      }, {
        name: "text",
        title: "Content",
        type: "text"
      }]
    }),
    defineField({
      name: "bookingProcess",
      title: "Booking Process Section",
      type: "document",
      fields: [
        { name: 'heading', title: 'Booking Process Heading', type: 'string' },
        {
          name: 'bookingSteps', title: 'Booking Steps', type: 'array',
          of: [
            {
              type: "object",
              fields: [
                { name: 'heading', title: 'Booking Step Heading', type: 'string' },
                { name: 'content', title: 'Booking Step Content', type: 'string' },
                { name: 'image', title: 'Booking Step Icon ', type: 'image' }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: "whereToGoSection",
      title: "Where To Go Section",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "imageText", title: "Where to go Text (to be shown over the image )", type: "string" },
            { name: "image", title: "Image", type: "image" },
            { name: 'slug', title: 'Slug', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: "whyWOESection",
      title: "Why Wings Of Escape Section",
      type: "document",
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'reasons', title: 'All Reasons', type: 'array',
          of: [
            {
              type: "object",
              fields: [
                { name: 'whyWOEHeading', title: 'Why WOE Heading', type: 'string' },
                { name: 'whyWOEIcon', title: 'Why WOE Icon', type: 'image' },
                { name: 'whyWOEPointers', title: 'Why WOE Text', type: 'text' },
                { name: 'whyWOEImage', title: 'Why WOE Image', type: 'image' }
              ]
            }
          ]
        }
      ]
    }),
  ],
});
