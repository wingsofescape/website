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
  const WhatsHotHeading =
    <>
      <h3 className="text-2xl md:text-4xl font-bold mb-2 text-theme-primary textleft md:text-center mt-12">
        <span className="relative inline-block pb-2">{data.heading}</span>
      </h3>
      <hr className="w-20 h-1 bg-theme-primary-accent rounded-2xl mx-auto mt-2"></hr>
      <h1 className="text-md md:text-md font-normal my-4 text-theme-primary text-left md:text-center">
        <span className="relative inline-block pb-2">{data.subHeading}</span>
      </h1>
    </>;
  return (
    <section className="lg:w-4/5 py-2 px-4 bg-background flex flex-col text-theme-primary mx-auto lg:h-[80vh]">
      {WhatsHotHeading}
      {/* Top Cards */}
      <div className="flex flex-col md:flex-row gap-1 md:gap-8 justify-center">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-full md:w-1/3 relative"
          >
            <Image
              src={urlFor(image.image.asset).url()}
              alt={image.heading + " icon"}
              fill
              className="object-cover !static"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            />
            <div className="w-11/12 lg:w-4/5 items-left justify-center bg-theme-primary
            -translate-y-1/5 shadow-lg flex flex-col md:gap-2 mt-2 px-2 pt-4 h-5/6">
              <div className="text-white text-sm lg:text-xl font-sans mb-2 text-center">
                {image.heading}
              </div>
              <p className="text-white text-xs lg:text-sm mb-4 md:mb-1 px-2 text-center">
                {image.paragraph}
              </p>
              <Link
                href={image.link || "#"}
                className="bg-theme-primary-light hover:bg-theme-primary-dark text-white text-xs p-4 mt-4 rounded transition-all duration-200 text-center"
              >
                {image.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatsHot;
