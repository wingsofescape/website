"use client";
import React from "react";
import Link from "next/link";
import HeroCarousal2 from "@/public/images/HeroCarousal.jpg";
import landingPageData from "@/data/landingPage/index.json";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY } from "@/lib/constants";
import { useFetchData } from "@/hooks/useFetchData";
import { IHeroBannerButton } from "@/app/models/heroBanner";

export const HeroBanner = () => {
  const options = { next: { revalidate: 30 } };

  const data = useFetchData(
    POST_QUERY.landingPage,
    options,
    landingPageData.heroBanner
  );
  const image = data.heroBannerImage
    ? urlFor(data.heroBannerImage.asset)?.url()
    : HeroCarousal2.src;

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
              {data.heroBannerHeading}
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
              {data.heroBannerSubHeading}
            </p>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
              {data?.heroBannerButtons &&
                data?.heroBannerButtons.map(
                  (button: IHeroBannerButton, index: number) => (
                    <Link
                      href={`${button.link}`}
                      key={button?.title + index}
                      className="group inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-gray-800 font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-amber-300 text-sm md:text-base"
                    >
                      {button.title}
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
                  )
                )}
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
            {data.heroBannerHeading}
          </h2>
          <p className="text-2xl lg:text-3xl text-white font-semibold mb-8 drop-shadow">
            {data.heroBannerSubHeading}
          </p>
          <div className="flex flex-wrap gap-6">
            {data?.heroBannerButtons &&
              data?.heroBannerButtons.map(
                (button: IHeroBannerButton, index: number) => (
                  <Link
                    key={button?.title + index}
                    className="bg-theme-primary-dark hover:bg-theme-primary text-white font-medium px-10 py-4 rounded shadow-lg transition-all duration-200"
                    href={button.link}
                  >
                    {button.title}
                  </Link>
                )
              )}
          </div>
        </div>
      </section>
    </>
  );
};
