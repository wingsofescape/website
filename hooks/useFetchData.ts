import { useEffect, useState } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/lib/constants";

export const useFetchData = (
  POSTS_QUERY: (typeof POST_QUERY)["landingPage"],
  options = {},
  defaultData: any
) => {
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    const getData = async () => {
      const data = await client
        .fetch<SanityDocument[]>(POSTS_QUERY.query, {}, options)
        .catch((error) => {
          console.error(`Error fetching ${POSTS_QUERY.name}:`, error);
          return [];
        });
      if (data.length === 0) {
        console.warn(`No data found for ${POSTS_QUERY.name}`);
        return;
      }
      // Deep clone the data to avoid potential issues with reactivity
      setData(JSON.parse(JSON.stringify(data[0])));
      console.log(`heroBanner content loaded from CMS ${POSTS_QUERY.name}`);
    };

    getData();
  }, []);

  return data;
};
