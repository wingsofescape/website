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
    "Can't decide your next getaway? Explore our monthly travel guide - a handpicked selection of destinations our experts love, and the stories that make each one unforgettable.",
  heroImage: {
    asset: "image-c5b952b166ecbb9916330c13116475f4f38bf9fb-2048x1364-jpg",
  },
};
export default async function WhereToGoByMonth() {
  // const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const whereToGoData = await getWhereToGoByMonthData();

  if (!whereToGoData) return <p>Loading...</p>;

  return (
    <div className="whereToGoLandingPage">
      <HeroBannerNew data={headerData} />

      <div className="flex flex-col md:flex-row gap-3 flex-wrap text-center items-center justify-center my-10 w-full md:w-full mx-auto bg-white">
        {whereToGoData.map((data: PageDataType, index: number) => {
          return (
            <Link
              key={index}
              className="flex flex-col rounded-none ring-1 ring-slate-300 overflow-hidden w-11/12 md:w-1/4 text-left my-2 md:my-10"
              href={
                data.slug.current
                  ? `/where-to-go-by-month/${data.slug.current}`
                  : "#"
              }
            >
              <div className="relative flex w-full h-[400px]">
                <Image
                  src={urlFor(data.heroImage)?.url()}
                  alt={data.title}
                  width={1080}
                  height={400}
                  className="object-cover w-full h-full hover:scale-105  transition-transform duration-300"
                  priority={index < 3}
                />
                <div className="flex flex-col py-6 text-center px-2 absolute bottom-0 bg-theme-primary-dark w-full opacity-90 ">
                  <p className="block text-sm mb-3 leading-snug  transition-colors text-white">
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
