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
  return (
    <section className="md:w-4/5 py-12 px-4 bg-white flex flex-col text-theme-primary mx-auto">
      <h3 className="text-3xl md:text-5xl font-bold mb-2 text-theme-primary text-center">
        <span className="relative inline-block pb-2">{data.heading}</span>
      </h3>
      <h1 className="text-sx font-normal mb-2 text-theme-primary text-center">
        <span className="relative inline-block pb-2">{data.subHeading}</span>
      </h1>
      {/* Top Cards */}
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-theme-primary pt-8 px-1 mx-auto w-5/6 md:w-1/3"
          >
            {/* Heading */}
            <div className="text-white text-xl font-semibold mb-2 text-center">
              {image.heading}
            </div>
            {/* Image */}
            <div className="w-full mb-2 flex items-center justify-center">
              <Image
                src={urlFor(image.image.asset).url()}
                alt={image.heading + " icon"}
                fill
                className="object-cover !static"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              />
            </div>
            <div className="flex flex-col md:gap-8 justify-center mt-2">
              <p className="text-white text-sm mb-1 px-4 text-left">
                {image.paragraph}
              </p>
              {image.content.map((content, index) => (
                <span
                  key={index}
                  className="text-white text-sm base px-4 text-left leading-0"
                >
                  * {content}
                </span>
              ))}
              <Link
                href={image.link || "#"}
                className="bg-theme-primary-light hover:bg-theme-primary-dark text-white font-medium p-4 mt-4 rounded transition-all duration-200 text-center"
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
