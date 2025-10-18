import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import React from "react";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";



async function getAboutUsContent(): Promise<SanityDocument[]> {
  return await sanityFetch(POST_QUERY.aboutUsContent, SANITY_QUERY_OPTION);
}
const AboutUs = async () => {
  const aboutUsData = await getAboutUsContent();
  console.log(aboutUsData);
  const data = aboutUsData?.[0];
  return (
    <div className="flex flex-col md:justify-end items-center mx-auto w-full flex-wrap py-5 md:pb-10 text-theme-primary-dark">
      <h1 className="text-4xl md:text-7xl font-bold my-5 md:my-40 flex px-2">{data.title}</h1>
      <div className="relative text-sx bg-theme-primary-light/10 p-4 md:p-35 leading-7 md:w-2/3 md:self-end">
        <Image
          alt="About US Image"
          src={urlFor(data?.aboutUsImage)?.url()}
          className="object-fit md:absolute md:-top-40 md:-left-40 "
          width={400}
          height={300}

        />
        {data.aboutUsContent.map((content: string, index: number) => (
          <p key={index} className="block mb-4">
            {content}
          </p>
        ))}
        <p className="block mb-4">
          {data.author}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
