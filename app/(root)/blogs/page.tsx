'use client';
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeroBannerImage from "@/public/images/blogs/blogsHeroBanner.jpg";
import blogsData from "@/data/blogs/index.json";
import { IBlog, IBlogContent } from "@/app/models/blog";

function Blogs() {
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
    return (
      blogContent.map((content, index) => (
        <div key={index} className="mb-1 flex flex-col align-center items-center text-left" >
          <div className="contentSection my-10 w-3/4">
            <h3 className="text-5xl font-semibold mb-6 mt-2">{content.heading}</h3>
            <h4 className="text-xl font-semibold mb-2">{content.subHeading}</h4>
            {content.paragraphs.map((para, idx) => (
              <p key={idx} className="text-gray-700 mb-2">{para}</p>
            ))}
          </div>

          {content.images && content.images.length > 0 && (
            content.images.length > 1 ? (
              <div className="imageSection mb-3 flex">
                {
                  content.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={content.imagesDescription || ''}
                      className="w-1/2"
                      width={1200}
                      height={800}
                      style={{ height: "90vh", width: "800px" }} />
                  ))
                }
              </div>
            ) : (
              <div className="imageSection mb-3">
                {
                  content.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={content.imagesDescription || ''}
                      className="w-full object-cover"
                      width={1000}
                      height={1000}
                      style={{ height: "100vh", width: "100vw" }} />
                  ))
                }
              </div>
            )
          )}
          <p className="text-gray-500 text-sm  text-center">{content.imagesDescription}</p>
        </div>
      ))
    )
  };

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
          <h2 className="text-xl md:text-5xl lg:text-6xl font-semibold mb-2 leading-snug">{blogsData[0].title}</h2>
          <p className="text-gray-600 mb-4">{blogsData[0].subtitle}</p>
          <strong>{blogsData[0].author}</strong>
          <strong>{blogsData[0].date}</strong>
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
          src={HeroBannerImage}
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
          className="heading absolute bottom-25 right-0 w-full md:w-2/5 flex flex-col justify-center p-10 z-200"
          style={{
            transform: `translateY(${offsetY * 0.18}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <h2 className="text-xl md:text-5xl lg:text-6xl font-semibold mb-2 leading-snug">
            {blogsData[0].title}
          </h2>
          <p className="text-gray-600 mb-4">{blogsData[0].subtitle}</p>
          <strong>{blogsData[0].author}</strong>
          <strong>{blogsData[0].date}</strong>
        </div>
      </div>


      <div className="mx-auto py-12">
        {blogsData.map((blog: IBlog, idx: number) => (
          <div
            key={idx}
            className="bg-white overflow-hidden flex flex-col items-center"
          >
            <div className="flex-1 flex flex-col items-center text-left">

              {/* Content Section */}
              {ContentSection(blog.blogContent)}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
