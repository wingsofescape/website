import { defineField, defineType } from "sanity";

export const termsAndConditionsTypes = defineType({
    name: "termsandconditions",
    title: "Terms and Conditions",
    type: "document",
    fields: [
        defineField({
            name: "heading",
            title: 'Terms and Conditions Heading',
            type: "string",
        }),
        defineField({
            name: "termsAndConditionsContent",
            title: "Terms and Conditions Content",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "heading", title: "Heading", type: "string" },
                        { name: "text", title: "Paragraphs", type: "array", of: [{ type: "text" }] },
                    ]
                },
            ]
        }),
    ],
});
