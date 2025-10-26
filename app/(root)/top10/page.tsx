import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import SimpleHeroBanner from "@/components/heroBanner/SimpleHeroBanner";

export interface PageDataType {
  _createdAt: string;
  description?: string;
  heroImage: HeroImage;
  keywords?: string[];
  slug: Slug;
  subtitle: string;
  title: string;
}

export interface HeroImage {
  _type: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Slug {
  _type: string;
  current: string;
}

async function ourTop10(): Promise<PageDataType[]> {
  return await sanityFetch(POST_QUERY.top10, SANITY_QUERY_OPTION);
}

export async function generateStaticParams() {
  return ["top10"];
}

const data = {
  title: "Our Top 10 Picks?",
  subTitle: "",
  description:
    "Who doesn't love a top ten? We've rounded up our latest travel crushes into one easy, irresistible list. From private pools that redefine luxury to dreamy al fresco dining and jaw-dropping beachfronts — these properties all have that something special. So take a moment, dream a little, and explore our favourite stays, spa escapes, dive reefs, and rooms with a view.",
  heroImage: {
    asset: "image-b0b415b35dc80fa674993eda3a932f6435536ef6-1600x901-jpg",
  },
};

export default async function Top10() {
  const top10Data = await ourTop10();

  if (!top10Data) return <p>Loading...</p>;

  return (
    <div className="top10ContentPage">
      <SimpleHeroBanner data={data} />

      <div className="flex flex-col md:flex-row gap-3 flex-wrap text-center items-center justify-center my-10 w-full md:w-full mx-auto bg-white">
        {top10Data.map((data: PageDataType, index: number) => {
          return (
            <Link
              key={index}
              className="flex flex-col rounded-none overflow-hidden w-11/12 md:w-1/4 text-left my-2 md:my-10"
              href={data.slug.current ? `/top10/${data.slug.current}` : "#"}
            >
              <div className="relative flex w-full h-[400px]">
                <Image
                  src={urlFor(data.heroImage)?.url()}
                  alt={data.title}
                  width={1080}
                  height={1260}
                  className="object-cover w-full h-full hover:scale-105  transition-transform duration-300"
                  priority={index < 3}
                />
                <div className="flex flex-col py-6 text-center px-2 absolute bottom-0 bg-theme-primary-dark w-full opacity-90 ">
                  <p className="block text-sm mb-3 transition-colors text-white">
                    {data.title}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
