import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Image as ImageInterface } from "@/app/_models/tours";

type IWhereToGo = {
    image: ImageInterface;
    imageText: string;
    slug: string;
}[];


const WhereToGoSection = ({ data }: { data: IWhereToGo }) => {
    const WhereToGoHeading =
        <>
            <h3 className="text-3xl md:text-5xl font-bold text-theme-primary textleft md:text-center mb-8">
                <span className="relative inline-block pb-2">Where to in the world</span>
            </h3>
        </>;
    return (
        <section className="lg:w-4/5 py-2 px-4 bg-white flex flex-col text-theme-primary mx-auto lg:h-[90vh]">
            {WhereToGoHeading}
            {/* Top Cards */}
            <div className="flex flex-col md:flex-row gap-1 md:gap-8 justify-center">
                {data.map((el, index) => (
                    <div className="text-center" key={index}>
                        <Image
                            src={urlFor(el.image.asset).url()}
                            alt={el.imageText + " icon"}
                            className="object-cover !static"
                            height={200}
                            width={200}
                        />
                        <p>

                            {el.imageText}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhereToGoSection;
