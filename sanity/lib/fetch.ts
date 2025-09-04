import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { POST_QUERY as GROQ_QUERY } from "@/lib/constants";

export async function sanityFetch(
  POST_QUERY: (typeof GROQ_QUERY)["blogs"],
  options = {}
) {
  return client
    .fetch<SanityDocument[]>(POST_QUERY.query, {}, options)
    .catch((error) => {
      console.error(`Error fetching ${POST_QUERY.name}:`, error);
      return [];
    });
}
