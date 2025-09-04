"use client";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import { IBlog, IBlogContent } from "@/app/models/blog";
import { urlFor } from "@/sanity/lib/image";

function Blogs({ params }: { params: Promise<{ slug: string }>; }) {
  const { slug } = use<{ slug: string }>(params);
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  const blog = blogs.filter((b: IBlog) => b.slug.current === slug)[0];
  const [offsetY, setOffsetY] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ContentSection = (blogContent: IBlogContent[]) => {
    return blogContent.map((content, index) => (
      <div
        key={index}
        className="mb-1 flex flex-col align-center items-center text-left w-11/12 md:w-8/12"
      >
        <div className="contentSection my-5 ">
          <h3 className="text-2xl font-semibold mb-6 mt-2 text-theme-primary-dark">
            {content.heading}
          </h3>
          <h4 className="text-xl font-semibold mb-2 text-theme-primary-dark">
            {content.subHeading}
          </h4>
          {content.paragraph.map((para, idx) => (
            <p key={idx} className="mb-2 text-theme-primary-dark text-md">
              {para}
            </p>
          ))}
        </div>

        {content.image &&
          content.image.length > 0 &&
          <div className="imageSection mb-1 p-1 md:p-4 w-full ">
            {content.image.map((img, i) => (
              <Image
                key={i}
                src={urlFor(img?.asset)?.url()}
                alt={content.imagesDescription || ""}
                className="object-cover h-[40vh] md:h-[65vh]  md:w-11/12 mx-auto"
                width={1000}
                height={1000}
              />
            ))}
          </div>
        }
        <p className="text-gray-500 text-sm  text-center">
          {content.imagesDescription}
        </p>
      </div>
    ));
  };
  if (!blog) {
    return <div>Loadung ...</div>;
  }
  return (
    <div>
      {/* <div className="blogHeroImage relative">
        <Image
          alt="Page Banner Image"
          src={HeroBannerImage}
          className="object-cover h-[90vh]"
        />
        <div className="overlay opacity-40 bg-white h-full absolute top-0 right-0 w-full md:w-2/5 " />
        <div className="heading absolute top-5 right-0 w-full md:w-2/5 flex flex-col justify-center p-10">
          <h2 className="text-xl md:text-5xl lg:text-6xl font-semibold mb-2 leading-snug">{blog.title}</h2>
          <p className="text-gray-600 mb-4">{blog.subtitle}</p>
          <strong>{blog.author}</strong>
          <strong>{blog.date}</strong>
        </div>
      </div> */}

      <div
        ref={bannerRef}
        className="blogHeroImage relative overflow-hidden"
        style={{
          height: "90vh",
        }}
      >
        <Image
          alt="Page Banner Image"
          src={urlFor(blog.blogHeroImage)?.url()}
          className="object-cover"
          fill
          style={{
            transform: `translateY(${offsetY * 0.5}px) scale(1.08)`,
            transition: "transform 0.1s linear",
            zIndex: 1,
          }}
        />
        <div className="overlay opacity-40 bg-white h-full absolute top-0 right-0 w-full md:w-2/5 z-10" />
        <div
          className="heading absolute bottom-25 right-0 w-full md:w-2/5 flex flex-col justify-center p-10 z-200 text-theme-primary-dark"
          style={{
            transform: `translateY(${offsetY * 0.18}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <h2 className="text-xl md:text-3xl font-semibold mb-2 leading-snug">
            {blog.title}
          </h2>
          <p className="mb-4 ">
            {blog.subtitle}
          </p>
          <strong>{blog.author}</strong>
          <strong >{blog.date}</strong>
        </div>
      </div>

      <div className="mx-auto py-12">
        <div
          className="bg-white overflow-hidden flex flex-col items-center"
        >
          <div className="flex-1 flex flex-col items-center text-left">
            {/* Content Section */}
            {ContentSection(blog.blogContent)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
