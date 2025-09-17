import React from "react";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import Image from "next/image";
import { IBlog } from "@/app/_models/blog";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Blogs as BlogsType } from "@/app/_models/blog";

async function getBlogs(): Promise<BlogsType> {
  return await sanityFetch(POST_QUERY.blogs, SANITY_QUERY_OPTION);
}

export default async function Blogs() {
  const blogsData = await getBlogs();

  if (!blogsData) return <p>Loading...</p>;

  return (
    <div className="blogsLandingPage">
      <div
        className="blogHeroImage relative overflow-hidden mb-10"
        style={{
          height: "90vh",
        }}
      >
        <Image
          alt="Page Banner Image"
          src={urlFor(blogsData[0]?.blogHeroImage)?.url()}
          className="object-cover"
          fill
          style={{
            transition: "transform 0.1s linear",
            zIndex: 1,
          }}
        />
        <div className="overlay opacity-40 bg-white h-full absolute top-0 right-0 w-full md:w-2/5 z-10" />
        <div
          className="heading absolute bottom-25 right-0 w-full md:w-2/5 flex flex-col justify-center p-10 z-10"
          style={{
            transition: "transform 0.1s linear",
          }}
        >
          <h2 className="text-xl md:text-3xl font-semibold mb-2 leading-snug text-theme-primary-dark">
            {blogsData[0].title}
          </h2>
          <p className="mb-4 text-theme-primary-dark">
            {blogsData[0].subtitle}
          </p>
          <strong className="text-theme-primary-dark">
            - {blogsData[0].author}
          </strong>
          <strong className="text-theme-primary-dark">
            {blogsData[0].date}
          </strong>
        </div>
      </div>

      <div className="blogsList flex flex-col md:flex-row gap-3 flex-wrap text-center items-center justify-center my-10 w-full md:w-full mx-auto bg-white">
        {blogsData.map((blog: IBlog, index: number) => {
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
