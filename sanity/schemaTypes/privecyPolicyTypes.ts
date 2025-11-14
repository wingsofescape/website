import { defineField, defineType } from "sanity";

export const privacyPolicyTypes = defineType({
    name: "privacyPolicy",
    title: "Privacy Policy",
    type: "document",
    fields: [
        defineField({
            name: "heading",
            title: 'Privacy Policy Heading',
            type: "string",
        }),
        defineField({
            name: "privacyPolicyContent",
            title: "Privacy Policy Content",
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
