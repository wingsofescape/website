import React from "react";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import Image from "next/image";
import { IBlog } from "@/app/_models/blog";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Blogs as BlogsType } from "@/app/_models/blog";
import HeroBannerNew from "@/components/heroBanner/HeroBannerNew";

async function ourTop10(): Promise<BlogsType> {
  return await sanityFetch(POST_QUERY.ourTop10List, SANITY_QUERY_OPTION);
}

export async function generateStaticParams() {
  return ["top10"];
}

const data = {
  title: "Where and when to go?",
  subTitle: "",
  description:
    "Dreaming of a holiday but not sure where to go? Look no further than our monthly travel guide. Our travel experts know a thing or two about their destinations and they've put together their favourite destinations by month and explained what makes them so special.",
  heroImage: {
    asset: "image-c2c7716e6c7e2e10d2603667c981f2c3dc87fd26-2521x2520-jpg",
  },
};

export default async function Blogs() {
  const top10Data = await ourTop10();
  console.log("top10Data", top10Data);

  if (!top10Data) return <p>Loading...</p>;

  return (
    <div className="blogsLandingPage">
      <HeroBannerNew data={data} />

      <div className="blogsList flex flex-col md:flex-row gap-3 flex-wrap text-center items-center justify-center my-10 w-full md:w-full mx-auto bg-white">
        {top10Data.map((blog: IBlog, index: number) => {
          return (
            <Link
              key={index}
              className="blogCard flex flex-col rounded-none overflow-hidden h-[90vh] w-11/12 md:w-1/4 text-left my-2 md:my-10"
              href={blog.slug.current ? `/blogs/${blog.slug.current}` : "#"}
            >
              {/* Blog Image */}
              <div className="relative flex flex-1 h-full w-full">
                <Image
                  src={urlFor(blog.blogHeroImage)?.url()}
                  alt={blog.title}
                  width={1080}
                  height={1260}
                  className="object-cover w-full h-full"
                  priority={index < 3}
                />
              </div>
              {/* Blog Content */}
              <div className="flex flex-col py-6 text-left">
                <strong className="text-xs tracking-widest text-gray-500 mb-2 uppercase">
                  {blog?.date}
                </strong>

                <strong className="text-xs tracking-widest text-gray-500 mb-2 uppercase">
                  {blog?.author}
                </strong>

                <p className="block text-md  font-semibold text-theme-primary-dark mb-3 leading-snug hover:text-theme-primary-light transition-colors">
                  {blog.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
