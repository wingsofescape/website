import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Image as ImageInterface } from "@/app/_models/tours";
import Link from "next/link";

type IWhatsHot = {
  images: {
    heading: string;
    content: string[];
    paragraph: string;
    image: ImageInterface;
    buttonText: string;
    link: string;
  }[];
  heading: string;
  subHeading: string;
};

const WhatsHot = ({ data }: { data: IWhatsHot }) => {
  const WhatsHotHeading = (
    <>
      <h3 className="text-2xl md:text-4xl font-bold mb-2 text-theme-primary textleft md:text-center mt-12">
        <span className="relative inline-block pb-2">{data.heading}</span>
      </h3>
      <hr className="w-20 h-1 bg-theme-primary-accent rounded-2xl mx-auto mt-2"></hr>
      <h1 className="text-md md:text-md font-normal my-4 text-theme-primary text-left md:text-center">
        <span className="relative inline-block pb-2">{data.subHeading}</span>
      </h1>
    </>
  );
  return (
    <section className="lg:w-4/5 py-2 bg-background flex flex-col text-theme-primary mx-auto h-full">
      {WhatsHotHeading}
      {/* Top Cards */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-full md:w-1/3 relative"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={urlFor(image.image.asset).url()}
                alt={image.heading + " icon"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                priority={index < 3}
              />
            </div>
            <div
              className="w-full lg:w-4/5 items-left justify-around bg-theme-primary
            md:-translate-y-1/5 shadow-lg flex flex-col md:gap-1 md:mt-2 px-2 py-2 md:h-3/5 pt-3"
            >
              <div className="text-white text-md lg:text-xl font-sans mb-5 text-center">
                {image.heading}
              </div>
              <p className="text-white text-xs mb-4 md:mb-1 px-2 text-center">
                {image.paragraph}
              </p>
              <Link
                href={image.link || "#"}
                className="flex items-center justify-center bg-transparent text-white hover:ring-2 text-xs p-4 mt-4 rounded transition-all duration-200 text-center"
              >
                {image.buttonText}
                <svg
                  className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatsHot;
