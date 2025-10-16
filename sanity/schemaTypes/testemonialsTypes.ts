import { defineField, defineType } from "sanity";

export const TestemonialsTypes = defineField({
    name: "testemonialsSection",
    title: "Testemonials Section",
    type: "document",
    fields: [
        defineField({
            name: "heading",
            title: 'Testemonial Page Heading',
            type: "string",
        }),
        defineField({
            name: "content",
            title: 'Paragraphs about Testemonials',
            type: "array",
            of: [{ type: "text" }]
        }),
        defineField({
            name: "heroBannerHeading",
            title: 'Hero Banner Heading',
            type: "document",
            fields: [

                { name: 'heading', title: 'Testimonial Heading', type: 'string' },
                {
                    name: 'testemonials', title: 'All Testemonials', type: 'array',
                    of: [
                        {
                            type: "object",
                            fields: [
                                { name: 'guestReview', title: 'Guest Review', type: 'text' },
                                { name: 'guestName', title: 'Guest Name', type: 'string' },
                                { name: 'destinationVisited', title: 'Destination Visited by the Guest', type: 'string' },
                                { name: 'guestLocation', title: 'Guest Location', type: 'string' },
                                { name: 'guestImage', title: 'Guest Image', type: 'image' }
                            ]
                        }
                    ]
                }
            ]
        }),
    ]
});