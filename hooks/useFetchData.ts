import { useEffect, useState } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { POST_QUERY as GROQ_QUERY } from "@/lib/constants";

export const useFetchData = (
  POST_QUERY: (typeof GROQ_QUERY)["landingPage"],
  options = {},
  defaultData?: any
) => {
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    const getData = async () => {
      const data = await client
        .fetch<SanityDocument[]>(POST_QUERY.query, {}, options)
        .catch((error) => {
          console.error(`Error fetching ${POST_QUERY.name}:`, error);
          return [];
        });
      if (data.length === 0) {
        console.warn(`No data found for ${POST_QUERY.name}`);
        return;
      }
      // Deep clone the data to avoid potential issues with reactivity
      setData(data.length > 1 ? JSON.parse(JSON.stringify(data)) : JSON.parse(JSON.stringify(data[0])));
      console.log(`content loaded from CMS ${POST_QUERY.name}`, data);
    };

    getData();
  }, []);

  return data;
};
