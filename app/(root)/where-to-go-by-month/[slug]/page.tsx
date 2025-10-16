import Image from "next/image";
import React from "react";
import { IWhereToGoBycontent } from "@/app/_models/blog";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { sanityFetch } from "@/sanity/lib/fetch";
import { shimmer, toBase64 } from "@/utils/shimmer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return await sanityFetch(POST_QUERY.whereToGoByList, SANITY_QUERY_OPTION);
}

export default async function Page({ params }: PageProps) {
  const data = await sanityFetch(
    POST_QUERY.getWhereToGoBy(await params),
    SANITY_QUERY_OPTION
  );

  if (!data[0]) {
    return <div className={"text-theme-primary"}>Loading ...</div>;
  }
  const ContentSection = (whereToGoContent: IWhereToGoBycontent[]) => {
    return whereToGoContent.map((content, index) => (
      <div key={index} className="mb-10 w-11/12">
        <div className="imageSection w-full relative">
          <Image
            src={urlFor(content.image)?.url()}
            alt={content.imagesDescription || ""}
            className="object-cover h-[40vh] md:h-[50vh] mx-auto w-1/3 float-left"
            width={1080}
            height={1920}
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          />
          <div className="contentSection absolute left-[25%] w-[70%] p-5 bg-white text-theme-primary-dark top-10 shadow">
            <h3 className="text-2xl font-semibold mb-6 mt-2 text-theme-primary-dark">
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
        className="blogHeroImage relative overflow-hidden"
        style={{
          height: "90vh",
        }}
      >
        <Image
          alt="Page Banner Image"
          src={urlFor(data[0].heroImage)?.url()}
          className="object-cover"
          fill
          style={{
            // transform: `translateY(${offsetY * 0.5}px) scale(1.08)`,
            transition: "transform 0.1s linear",
            zIndex: 1,
          }}
        />
        <div className="overlay opacity-40 bg-white h-full absolute top-[53%]  md:top-0 right-0 w-full md:w-2/5 z-10" />
        <div
          className="heading absolute bottom-25 right-0 w-full md:w-2/5 flex flex-col justify-center p-10 z-200 text-theme-primary-dark"
          style={{
            // transform: `translateY(${offsetY * 0.18}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <h2 className="text-2xl md:text-5xl font-semibold mb-2 leading-snug">
            The Best Places to Visit in {data[0].title}
          </h2>
          <strong>{data[0]._createdAt}</strong>
        </div>
      </div>

      <div className="py-12">
        <div className="bg-white overflow-hidden flex flex-col items-center">
          <div className="flex-1 flex flex-col items-center text-left w-11/12">
            {/* Content Section */}
            {ContentSection(data[0]?.content)}
          </div>
        </div>
      </div>
    </div>
  );
}
