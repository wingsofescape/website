import Image from "next/image";
import React from "react";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ItineraryAccordion } from "./ItineraryAccordion";
import itineraryData from "@/data/itinerary.json";
type PageProps = {
    params: Promise<{ slug: string }>;
};


export default async function Itinerary({ params }: PageProps) {
    console.log(params);

    const blog = await sanityFetch(
        POST_QUERY.getBlog({ slug: 'exploring-the-world-anew-the-adventure-of-journeys-by-land-and-sea' }),
        SANITY_QUERY_OPTION
    );
    const itinerary = await sanityFetch(
        POST_QUERY.getItinerary({ slug: 'bali-itinerary-jaao-na' }),
        SANITY_QUERY_OPTION
    );

    console.log(itinerary[0]);

    if (!blog[0]) {
        return <div>Loading ...</div>;
    }
    // const ContentSection = (blogContent: IBlogContent[]) => {
    //     return blogContent.map((content, index) => (
    //         <div
    //             key={index}
    //             className="mb-1 flex flex-col align-center items-center text-left w-11/12 md:w-8/12"
    //         >
    //             <div className="contentSection my-5 ">
    //                 <h3 className="text-2xl font-semibold mb-6 mt-2 text-theme-primary-dark">
    //                     {content.heading}
    //                 </h3>
    //                 <h4 className="text-xl font-semibold mb-2 text-theme-primary-dark">
    //                     {content.subHeading}
    //                 </h4>
    //                 {content.paragraph.map((para, idx) => (
    //                     <p key={idx} className="mb-2 text-theme-primary-dark text-md">
    //                         {para}
    //                     </p>
    //                 ))}
    //             </div>

    //             {content.image && content.image.length > 0 && (
    //                 <div className="imageSection mb-1 p-1 md:p-4 w-full ">
    //                     {content.image.map((img, i) => (
    //                         <Image
    //                             key={i}
    //                             src={urlFor(img?.asset)?.url()}
    //                             alt={content.imagesDescription || ""}
    //                             className="object-cover h-[40vh] md:h-[65vh]  md:w-11/12 mx-auto"
    //                             width={1080}
    //                             height={1920}
    //                             placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
    //                         />
    //                     ))}
    //                 </div>
    //             )}
    //             <p className="text-gray-500 text-sm  text-center">
    //                 {content.imagesDescription}
    //             </p>
    //         </div>
    //     ));
    // };





    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col md:flex-row w-full">
                <div
                    className="blogHeroImage relative overflow-hidden w-full  h-[30vh] md:h-[70vh]">
                    <Image
                        alt="Page Banner Image"
                        src={urlFor(data.image.asset)?.url()}
                        className="object-cover h-full"
                        fill
                        style={{
                            transition: "transform 0.1s linear",
                            zIndex: 1,
                        }}
                    />
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white z-10">
                        <p className="text-5xl text-white font-serif text-nowrap">
                            {data.customerName}
                        </p>
                        <p className=" text-slate-400 font-light mt-2">
                            {data.destinationName} Itinerary
                        </p>
                    </div>
                </div>
                {/* <div
                    className="heading right-0 w-full md:w-2/5 flex flex-col justify-center px-2 py-10 md:p-10 z-200 text-theme-primary-dark mx-auto"
                    style={{
                        transition: "transform 0.1s linear",
                    }}
                >
                    <h2 className="text-xl font-semibold mb-2 leading-snug">
                        {data.destinationName} for {data.customerName}
                    </h2>
                    <div className="bg-slate-400 w-fit px-4 rounded-xl my-2">
                        6D/5N
                    </div>
                    {data.itinerary.map(content =>
                        <div className="flex justify-left items-center gap-4 bg-theme-primary-accent/30 m-2 rounded-md px-4 w-3/4">
                            <span className="w-3 h-3 rounded-full bg-theme-primary-accent flex z-10" />
                            <div className="text-center py-2 text-sm font-bold flex gap-3 justify-between items-center w-full">
                                <div className="flex flex-col text-left">
                                    <span>{content.destination.toUpperCase()}
                                    </span>
                                    <span className="text-sm text-slate-400 font-light">
                                        {content.destinationHotels.toUpperCase()}
                                    </span>
                                </div>
                                <span className="font-light text-slate-400">{content.destinationItinerary.length} D</span>
                            </div>
                        </div>
                    )}

                </div> */}
            </div>
            <section className="mx-auto w-full pt-4">
                <ItineraryAccordion itinerary={itineraryData.itinerary} />
            </section>
        </div>
    );
}
