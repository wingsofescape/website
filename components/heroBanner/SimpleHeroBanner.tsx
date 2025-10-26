"use client";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Image as ImageType } from "@/app/_models/tours";

type IHeroBannerProps = {
  title: string;
  subTitle: string;
  description: string;
  heroImage: ImageType;
  keywords?: string[];
};
const SimpleHeroBanner = ({ data }: { data: IHeroBannerProps }) => {
  return (
    <div className="hidden lg:block">
      <div className="relative">
        <div className="inset-0 flex">
          <div className="bg-theme-primary-dark text-white flex flex-col items-left px-25 py-5 w-1/2">
            <div className="w-full max-w-2xl mx-auto my-15">
              <h1 className="text-xl xl:text-4xl font-bold mb-6 leading-tight ">
                {data.title}
              </h1>
              <p className="text-white mb-8 text-xs leading-relaxed font-extralight">
                {data.description}
              </p>
              {data.keywords?.length && (
                <div className="pills flex gap-6">
                  {data.keywords.map((keyword) => (
                    <div
                      className="bg-theme-primary-light text-white rounded-4xl px-10 py-2 text-xs opacity-70 pointer-events-none"
                      key={keyword}
                    >
                      {keyword}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden flex-1 w-1/2">
            <Image
              src={urlFor(data.heroImage.asset)?.url()}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-bottom hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Optional overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeroBanner;
