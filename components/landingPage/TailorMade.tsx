import React from "react";
import { urlFor } from "@/sanity/lib/image";
import { Image } from "@/app/_models/tours";

type ITailorMadeSection = {
    buttonLink: string;
    buttonText: string;
    content: string;
    heading: string;
    images: ImageCard[]
}
type ImageCard = {
    image: Image,
    imageText: string
}

export async function TailorMade(prop: { data: ITailorMadeSection }) {
    const { data } = prop;
    return (
        <section className="flex flex-col-reverse lg:flex-row gap-2 px-4 py-10 bg-transparent justify-center">
            {/* Left Side */}
            <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto lg:mx-0">
                <h1 className="hidden md:block text-1xl md:text-3xl font-bold text-theme-primary-dark mb-4 leading-tight">
                    {data.heading}
                </h1>
                <p className="text-base md:text-lg text-theme-primary-dark mb-8">
                    {data.content}
                </p>
                <button className="border-2 border-theme-primary-dark text-theme-primary-dark px-6 py-3 rounded-none font-semibold text-base hover:bg-theme-primary-dark hover:text-white transition mb-8 w-full md:w-fit">
                    {data.buttonText}
                </button>
                {/* Badges would go here */}
            </div>
            {/* Right Side */}
            <div className="flex-2 flex flex-wrap gap-1 md:gap-4 justify-center items-center content-start">
                <h1 className="md:hidden text-2xl font-bold text-theme-primary-dark mb-4 leading-tight">
                    {data.heading}
                </h1>
                {data.images.map((card: ImageCard, idx) => (
                    <div
                        key={idx}
                        className="relative w-full sm:w-[48%] lg:w-[32%] h-56 md:h-64 rounded-none overflow-hidden flex items-end mb-4"
                        style={{ background: "#fff" }}
                    >
                        <img
                            src={urlFor(card.image.asset).url()}
                            alt={card.imageText}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-10 w-full text-center pb-6 px-2">
                            <span className="text-white text-lg md:text-lg">
                                {card.imageText}
                            </span>
                        </div>
                        <div className="absolute inset-0 bg-black/30" />
                    </div>
                ))}
            </div>
        </section>
    );
}