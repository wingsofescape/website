import { useEffect, useState } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/lib/constants";

export const useFetchData = (
  POSTS_QUERY: (typeof POST_QUERY)["heroBanner"],
  options = {},
  defaultData: any
) => {
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    const getData = async () => {
      const data = await client.fetch<SanityDocument[]>(
        POSTS_QUERY.query,
        {},
        options
      );
      setData(JSON.parse(JSON.stringify(data[0])));
      console.log(`heroBanner content loaded from CMS ${POSTS_QUERY.name}`);
    };

    getData();
  }, []);

  return data;
};
