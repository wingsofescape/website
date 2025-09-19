import React from "react";
import { Image as ImageInterface } from "@/app/_models/tours";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
type IWhyWoe = { reasons: { whyWOEPointers: string, whyWOEHeading: string, whyWOEIcon: ImageInterface, whyWOEImage: ImageInterface }[], heading: string };

const WhyWOE = ({ data }: { data: IWhyWoe }) => {
    return (

        <section className="w-full py-12 px-4 bg-transparent flex flex-col text-theme-primary">
            <h3 className="text-3xl md:text-5xl font-bold mb-2 text-center">
                <span className="relative inline-block pb-2">
                    {data.heading}
                </span>
            </h3>
            {/* Top Cards */}
            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mt-12 mb-8">
                {data.reasons.map((reason, index) => (
                    <div
                        key={index}
                        className="flex-1 flex flex-col items-center bg-white rounded-none shadow-lg pt-8 px-1 mx-auto w-5/6 md:w-1/4"
                    >
                        {/* Icon in circle */}
                        <div className="flex flex-col items-center -mt-14 mb-2">
                            <div className="w-16 h-16 rounded-full bg-[#f7cfcf] flex items-center justify-center shadow-lg mb-2">
                                <Image
                                    src={urlFor(reason.whyWOEIcon.asset).url()}
                                    alt={reason.whyWOEHeading + " icon"}
                                    className="w-8 h-8 object-contain"
                                    height={800}
                                    width={800}
                                />
                            </div>
                        </div>
                        {/* Heading */}
                        <div className="text-theme-primary-light text-xl font-semibold mb-2 text-center">
                            {reason.whyWOEHeading}
                        </div>
                        {/* Image */}
                        <div className="w-full h-52 md:h-36 mb-2 rounded-none overflow-hidden flex items-center justify-center">
                            <Image
                                src={urlFor(reason.whyWOEImage.asset).url()}
                                alt={reason.whyWOEHeading + " icon"}
                                fill
                                className="object-cover !static"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                            />
                        </div>
                    </div>
                ))}
            </div>
            {/* Bottom pointers */}
            <div className="flex flex-col md:flex-row gap-8 justify-center mt-2 items-stretch">
                {data.reasons.map((reason, index) => (
                    <div
                        key={index}
                        className="flex-1 bg-theme-primary-light text-white rounded-none p-6 text-left"
                    >
                        <ul className="list-disc lg:pl-4 space-y-2 text-xs lg:text-base">
                            {reason.whyWOEPointers.split("\n").map((point, i) => (
                                <li key={i}>{point.trim()}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyWOE;
