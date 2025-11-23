import { defineField, defineType } from "sanity";

export const itineraryType = defineType({
    name: "itinerary",
    title: "Itinerary",
    type: "document",
    fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
        }),
        defineField({
            name: "pricing",
            title: "Trip Pricing",
            type: "number",
        }),
        defineField({
            name: "payButton",
            title: "Pay Button Link",
            type: "url",
        }),
        defineField({ name: "guestCount", title: "Number of guests", type: "number" }),
        defineField({
            name: "destinationName",
            title: "Destination Name",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
        }),
        defineField({ name: "itineraryName", title: "Itinerary Name", type: "string" }),
        defineField({
            name: "itinerary",
            title: "Itinerary",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({ name: "destination", title: "Destination", type: "string" }),
                        defineField({ name: "title", title: "Title", type: "string" }),
                        defineField({ name: "date", title: "Date", type: "string" }),
                        defineField({ name: "destinationImage", title: "Destination Image", type: "image" }),
                        defineField({
                            name: "destinationItinerary", title: "Destination Itinerary", type: "array",
                            of: [
                                {
                                    type: "object",
                                    fields: [
                                        defineField({ name: "day", title: "Day Date", type: "string" }),
                                        defineField({ name: "title", title: "Day Title", type: "string" }),
                                        defineField({ name: "description", title: "Description (optional)", type: "string" }),
                                        defineField({
                                            name: "stay", title: "Property Details", type: "document", fields: [
                                                defineField({ name: "stayName", title: "Name of the Property", type: "string" }),
                                                defineField({ name: "stayLink", title: "Stay Link", type: "url" }),
                                                defineField({ name: "checkInDate", title: "Check In Date", type: "string" }),
                                                defineField({ name: "checkoutDate", title: "Check out Date", type: "string" }),
                                                defineField({ name: "roomType", title: "Room Type", type: "string" }),
                                                defineField({ name: "roomCount", title: "Room Count", type: "number" }),
                                                defineField({ name: "roomChange", title: "Does a room change exist on this Day", type: "boolean" }),
                                                defineField({
                                                    name: "inclusions", title: "Inclusions", type: "array", of: [
                                                        {
                                                            type: "object",
                                                            fields: [
                                                                defineField({ name: "inclusionType", title: "Inclusion Type", type: "string" }),
                                                                defineField({ name: "inclusion", title: "Included of Not", type: "boolean" }),
                                                            ]
                                                        }
                                                    ]
                                                }),
                                                defineField({
                                                    name: "images",
                                                    title: "Stay Imagery",
                                                    type: "array",
                                                    of: [
                                                        {
                                                            name: "image",
                                                            title: "Staye Image",
                                                            type: "image",
                                                        },
                                                    ]
                                                }),
                                                defineField({
                                                    name: "transfers", title: "Private Transfers", type: "document", fields: [
                                                        defineField({ name: "transferType", title: "Name of the Transfer Vehicle", type: "string" }),
                                                        defineField({
                                                            name: "transferSteps", title: "From / To / Via", type: "document",
                                                            fields: [
                                                                defineField({ name: "from", title: "From", type: "string" }),
                                                                defineField({ name: "to", title: "To", type: "string" }),
                                                                defineField({ name: "via", title: "Via", type: "string" }),
                                                            ]
                                                        }),
                                                    ],
                                                }),
                                            ]
                                        }),

                                        defineField({
                                            name: "activities", title: "Activities", type: "array",
                                            of: [
                                                {
                                                    type: "object",
                                                    fields: [
                                                        defineField({
                                                            name: "activityType", title: "Name of the Activity", type: "string",
                                                        }),
                                                        defineField({
                                                            name: "images",
                                                            title: "Stay Imagery",
                                                            type: "array",
                                                            of: [
                                                                {
                                                                    name: "image",
                                                                    title: "Staye Image",
                                                                    type: "image",
                                                                },
                                                            ]
                                                        }),
                                                        defineField({
                                                            name: "transfers", title: "Private Transfers", type: "document", fields: [
                                                                defineField({ name: "transferType", title: "Name of the Transfer Vehicle", type: "string" }),
                                                                defineField({
                                                                    name: "transferSteps", title: "From / To / Via", type: "document",
                                                                    fields: [
                                                                        defineField({ name: "from", title: "From", type: "string" }),
                                                                        defineField({ name: "to", title: "To", type: "string" }),
                                                                        defineField({ name: "via", title: "Via", type: "string" }),
                                                                    ]
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }
                                            ]
                                        }),
                                    ],
                                },
                            ],
                        })
                    ],
                }
            ]
        })
    ]
})

