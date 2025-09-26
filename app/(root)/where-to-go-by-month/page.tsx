import React from "react";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import HeroBannerNew from "@/components/heroBanner/HeroBannerNew";

export interface PageDataType {
  _createdAt: string;
  description: string;
  heroImage: HeroImage;
  keywords: string[];
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

async function getWhereToGoByMonthData(): Promise<PageDataType[]> {
  return await sanityFetch(POST_QUERY.whereToGo, SANITY_QUERY_OPTION);
}

export async function generateStaticParams() {
  return ["where-to-go-by-month"];
}

const headerData = {
  title: "Where and when to go?",
  subTitle: "",
  description:
    "Dreaming of a holiday but not sure where to go? Look no further than our monthly travel guide. Our travel experts know a thing or two about their destinations and they've put together their favourite destinations by month and explained what makes them so special.",
  heroImage: {
    asset: "image-c2c7716e6c7e2e10d2603667c981f2c3dc87fd26-2521x2520-jpg",
  },
};
export default async function WhereToGoByMonth() {
  const whereToGoData = await getWhereToGoByMonthData();

  console.log("whereToGoData", whereToGoData);
  if (!whereToGoData) return <p>Loading...</p>;

  return (
    <div className="whereToGoLandingPage">
      <HeroBannerNew data={headerData} />

      <div className="flex flex-col md:flex-row gap-3 flex-wrap text-center items-center justify-center my-10 w-full md:w-full mx-auto bg-white">
        {whereToGoData.map((data: PageDataType, index: number) => {
          return (
            <Link
              key={index}
              className="blogCard flex flex-col rounded-none overflow-hidden h-[90vh] w-11/12 md:w-1/4 text-left my-2 md:my-10"
              href={
                data.slug.current
                  ? `/where-to-go-by-month/${data.slug.current}`
                  : "#"
              }
            >
              {/* Blog Image */}
              <div className="relative flex flex-1 h-full w-full">
                <Image
                  src={urlFor(data.heroImage)?.url()}
                  alt={data.title}
                  width={1080}
                  height={1260}
                  className="object-cover w-full h-full"
                  priority={index < 3}
                />
              </div>
              {/* Blog Content */}
              <div className="flex flex-col py-6 text-left">
                <strong className="text-xs tracking-widest text-gray-500 mb-2 uppercase">
                  {data?._createdAt}
                </strong>

                <p className="block text-md  font-semibold text-theme-primary-dark mb-3 leading-snug hover:text-theme-primary-light transition-colors">
                  {data.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
