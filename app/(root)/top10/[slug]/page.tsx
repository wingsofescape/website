import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { ITop10Content } from "@/app/_models/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return await sanityFetch(POST_QUERY.ourTop10List, SANITY_QUERY_OPTION);
}

export default async function Page({ params }: PageProps) {
  const res = await sanityFetch(
    POST_QUERY.getTop10(await params),
    SANITY_QUERY_OPTION
  );
  const data = res?.[0];

  if (!data) {
    return <div className={"text-theme-primary"}>Loading ...</div>;
  }
  const ContentSection = (top10Content: ITop10Content[]) => {
    return top10Content.map((content, index: number) => (
      <div key={index} className="mb-10 w-11/12">
        <div className="imageSection w-full md:relative ">
          <Image
            src={urlFor(content.image)?.url()}
            alt={content.imagesDescription || ""}
            className="object-cover h-[40vh] md:h-[50vh] mx-auto w-full md:w-1/3 float-left mb-5 md:mb-0"
            width={1080}
            height={1920}
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          />
          <div className="contentSection md:absolute md:left-[25%] w-full md:w-[70%] p-5 bg-white text-theme-primary-dark top-10 shadow">
            <h3 className="text-2xl font-semibold mb-6 text-theme-primary-dark mt-5 md:mt-2">
              {content.heading}
            </h3>
            {content.subHeading && (
              <h4 className="text-xl font-semibold mb-2 text-theme-primary-dark">
                {content.subHeading}
              </h4>
            )}
            <p className="mb-2 text-md z-10">{content.paragraph}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div
        className="top10HeroImage relative overflow-hidden"
        style={{
          height: "90vh",
        }}
      >
        <Image
          alt="Page Banner Image"
          src={urlFor(data.heroImage)?.url()}
          className="object-cover"
          fill
          style={{
            transition: "transform 0.1s linear",
            zIndex: 1,
          }}
        />
        <div className="overlay opacity-40 bg-white h-full absolute top-[53%] md:top-0 right-0 w-full md:w-2/5 z-10" />
        <div
          className="heading absolute bottom-25 right-0 w-full md:w-2/5 flex flex-col justify-center p-10 z-200 text-theme-primary-dark"
          style={{
            // transform: `translateY(${offsetY * 0.18}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-2 leading-snug">
            {data.title}
          </h2>
          <p className="mb-4 ">{data.subtitle}</p>
          <strong>{data.author}</strong>
          <strong>{data.date}</strong>
        </div>
      </div>

      <div className="py-12">
        <div className="bg-white overflow-hidden flex flex-col items-center">
          <div className="flex-1 flex flex-col items-center text-left w-11/12">
            {/* Content Section */}
            {ContentSection(data?.content)}
          </div>
        </div>
      </div>
    </div>
  );
}
