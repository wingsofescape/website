import React from "react";
import { Image as ImageInterface } from "@/app/_models/tours";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
type IWhyWoe = {
  reasons: {
    whyWOEPointers: string;
    whyWOEHeading: string;
    whyWOEIcon: ImageInterface;
    whyWOEImage: ImageInterface;
  }[];
  heading: string;
};

const WhyWOE = ({ data }: { data: IWhyWoe }) => {
  return (
    <section className="py-12 pt-15 flex flex-col text-theme-primary mx-auto bg-gradient-to-b from-theme-primary-dark to-white" >
      <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white text-center">
        <span className="relative inline-block pb-2">{data.heading}</span>
      </h3>
      <hr className="w-20 h-1 bg-[#edb84c] rounded-2xl mx-auto mt-4"></hr>
      {/* <div className="md:px-40 lg:px-70 py-10 flex flex-col lg:flex-row gap-8 justify-center ">
        {data.reasons.map((reason, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center rounded-2xl shadow-2xl bg-white py-10 pt-5 px-1 mx-auto w-5/6 md:w-1/3 hover:scale-105 transition-transform duration-300"
          >
            <div className="text-theme-primary-dark font-bold text-md mb-4 text-center">
              {reason.whyWOEHeading}
            </div>
            <div className="relative w-36 h-36 flex items-center justify-center mb-5">
              <Image
                src={urlFor(reason.whyWOEImage.asset).url()}
                alt={reason.whyWOEHeading + " icon"}
                fill
                className="object-cover !static rounded-[100%]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              />
            </div>
            <div className="px-8 md:px-2">
              <ul className="list-disc lg:pl-4 space-y-2 text-sm">
                {reason.whyWOEPointers.split("\n").map((point, i) => (
                  <li key={i}>{point.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div> */}
      {/* Stacked style */}
      <div className="py-10 flex flex-col md:flex-row gap-4 md:gap-8 justify-center px-5 md:px-20">
        {data.reasons.map((reason, index) => (
          <div
            key={index}
            className="flex items-stretch shadow-2xl bg-white mx-auto w-full md:w-[25%] hover:scale-105 transition-transform duration-300 h-[250px] md:h-[275px]"
          >
            <div className="w-1/3 h-full">
              <Image
                src={urlFor(reason.whyWOEImage.asset).url()}
                alt={reason.whyWOEHeading + " icon"}
                fill
                className="object-cover !static"
              />
            </div>
            <div className="px-4 flex flex-col justify-between py-5 h-full w-3/4">
              <div className="text-theme-primary-dark font-bold text-md mb-3 text-left flex align-middle ">
                {reason.whyWOEHeading}
              </div>
              <div className="pl-8 md:pl-2">
                <ul className="list-disc lg:pl-4 space-y-2 text-xs">
                  {reason.whyWOEPointers.split("\n").map((point, i) => (
                    <li key={i}>{point.trim()}</li>
                  ))}
                </ul>
              </div>
              <hr className="w-20 h-1 bg-[#edb84c] rounded-2xl mx-auto mt-4"></hr>
            </div>
          </div>
        ))}
        {/* {data.reasons.map((reason, index) => (
          <div
            key={index}
            className="flex-1 bg-white shadow text-theme-primary rounded-none p-6 text-left"
          >
            <ul className="list-disc lg:pl-4 space-y-2 text-sm">
              {reason.whyWOEPointers.split("\n").map((point, i) => (
                <li key={i}>{point.trim()}</li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </section>
  );
};

export default WhyWOE;
