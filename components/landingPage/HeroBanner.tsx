"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeroCarousal2 from "@/public/images/HeroCarousal.jpg";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const data = {
  "_id": "66065ac2-cdc3-45a3-adbf-ffaf90b5cbbe",
  "heroBannerButtons": [{
    "link": "https://www.wingsofescape.com/",
    "title": "For Families"
  }],
  "heroBannerHeading": "Let us help you plan your next luxury trip",
  "heroBannerImage": {
    "_type": "image",
    "asset": {
      "_ref": "image-1d76dc844c9df7e064439417602c4491dd2e017f-6000x4000-jpg",
      "_type": "reference"
    }
  },
  "heroBannerSubHeading": "Wherever you want to go, our Travel Specialists can design a perfect holiday for you"
}

const POSTS_QUERY = `*[
  _type == "heroBanner"
]{ _id, heroBannerHeading, heroBannerSubHeading, heroBannerButtons, heroBannerImage }`;
const { projectId, dataset } = client.config();
const options = { next: { revalidate: 30000 } };

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export const HeroBanner = () => {
  const [content, setContent] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)
      setContent(JSON.parse(JSON.stringify(data[0])));
    }
  fetchData();
  }, []);
  
  const image = content.heroBannerImage ? urlFor(content.heroBannerImage.asset)?.url() : HeroCarousal2.src;
  return (
    <>
      {/* Mobile Version - New responsive design with CSS blobs */}
      <section className="lg:hidden relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100">
        {/* CSS Blob Background */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-53 h-52 md:w-48 md:h-48 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-20 blob-animation"></div>
          
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-left space-y-6 md:space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight font-serif">
              Let us help you plan
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-serif italic">
                your luxury trip
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Wherever you want to go, our Travel Specialists can design your
              perfect holiday with personalized experiences tailored just for
              you.
            </p>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
              <Link
                href="/families"
                className="group inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-gray-800 font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-amber-300 text-sm md:text-base"
              >
                FOR FAMILIES
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="/couples"
                className="group inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-gray-800 font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-amber-300 text-sm md:text-base"
              >
                FOR COUPLES
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="/how-we-work"
                className="group inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-gray-800 font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-amber-300 text-sm md:text-base"
              >
                HOW WE WORK
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="/unique-trips"
                className="group inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm md:text-base"
              >
                UNIQUE TRIPS
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* CSS for blob animations */}
        <style jsx>{`
          .blob-animation {
            animation: blob 7s infinite;
          }

          .blob-animation-delay {
            animation: blob 7s infinite;
            animation-delay: -2s;
          }

          .blob-animation-slow {
            animation: blob 9s infinite;
            animation-delay: -4s;
          }

          .blob-animation-reverse {
            animation: blob-reverse 8s infinite;
            animation-delay: -1s;
          }

          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
              border-radius: 70% 30% 50% 50% / 50% 60% 40% 60%;
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
              border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            }
            100% {
              transform: translate(0px, 0px) scale(1);
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
          }

          @keyframes blob-reverse {
            0% {
              transform: translate(0px, 0px) scale(1);
              border-radius: 30% 70% 40% 60% / 70% 40% 60% 30%;
            }
            33% {
              transform: translate(-30px, 50px) scale(1.1);
              border-radius: 50% 50% 30% 70% / 60% 40% 50% 60%;
            }
            66% {
              transform: translate(20px, -20px) scale(0.9);
              border-radius: 70% 30% 60% 40% / 50% 60% 40% 50%;
            }
            100% {
              transform: translate(0px, 0px) scale(1);
              border-radius: 30% 70% 40% 60% / 70% 40% 60% 30%;
            }
          }
        `}</style>
      </section>

      {/* Desktop Version - Original design with background image */}
      
      <section
        className="hidden lg:flex relative h-[600px] items-center"
        style={{
          backgroundImage: `url(${image?.toString()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg font-serif">
            {content?.heroBannerHeading}
          </h2>
          <p className="text-2xl lg:text-3xl text-white font-semibold mb-8 drop-shadow">
             {content?.heroBannerSubHeading}
             </p>
          <div className="flex flex-wrap gap-6">
            {content?.heroBannerButtons && content?.heroBannerButtons.map((button) => (
              <Link key={button?.title} className="bg-theme-primary-dark hover:bg-theme-primary text-white font-medium px-10 py-4 rounded shadow-lg transition-all duration-200" href={button.link}>
                {button?.title}
              </Link>
            ))}
            
            
          </div>
        </div>
      </section>
    </>
  );
};
