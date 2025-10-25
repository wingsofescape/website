import React from "react";
import Link from "next/link";
import { IHeroBannerButton } from "@/app/_models/heroBanner";
import { Image } from "@/app/_models/tours";

type HeroBannerProps = {
  heroBannerHeading: string;
  heroBannerSubHeading: string;
  heroBannerButtons: IHeroBannerButton[];
  image: Image;
};

export const HeroBanner = ({ data }: { data: HeroBannerProps }) => {
  const heroBannerVideo = "/videos/heroBannerVideo1.mp4";
  return (
    <>
      {/* Mobile Version - New responsive design with CSS blobs */}
      <section className="lg:hidden relative h-[50vh]  flex items-center overflow-hidden">
        <video
          preload="auto"
          autoPlay
          loop
          muted
          className="absolute h-full inset-0 w-full object-cover"
        >
          <source src={heroBannerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-left space-y-2">
            <h1 className="text-md font-bold text-white leading-tight ">
              {data.heroBannerHeading}
            </h1>

            <p className="text-xs text-white leading-relaxed max-w-2xl">
              {data.heroBannerSubHeading}
            </p>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-2 md:gap-4 pt-2">
              {data?.heroBannerButtons &&
                data?.heroBannerButtons.map(
                  (button: IHeroBannerButton, index: number) => (
                    <Link
                      href={`${button.link}`}
                      key={button?.title + index}
                      className="group inline-flex items-center gap-2 bg-theme-primary text-white font-medium px-4 py-2 rounded-2xl text-xs"
                    >
                      {button.title}
                      {/* <svg
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
                      </svg> */}
                    </Link>
                  )
                )}
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Version - Original design with background image */}

      <section className="hidden lg:flex relative h-[600px] items-center">
        <video
          preload="auto"
          autoPlay
          loop
          muted
          className="absolute h-full inset-0 w-full object-cover"
        >
          <source src={heroBannerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <div className="absolute inset-0 bg-black/30" /> */}
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg ">
            {data.heroBannerHeading}
          </h2>
          <p className="text-xl text-white font-semibold mb-8 drop-shadow">
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
