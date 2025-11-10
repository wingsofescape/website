'use client';
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const PlanYourTrip = (props: { page: 'landing' | 'tour', image?: { asset: string }, country?: string }) => {
    const content = <div className={`w-11/12 md:w-1/3 bg-theme-primary-dark text-white py-15 opacity-85 px-5 md:px-15 lg:px-20 ${props.country ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'static'} `}>
        <h3 className="text-2xl md:text-4xl font-bold mb-2 text-whit text-center mt-5">
            <span className="relative inline-block pb-2">{props.country ? `${props.country.charAt(0).toUpperCase() + props.country.slice(1)} Escapes` : 'Plan Your Escape'}</span>
        </h3>
        <hr className="w-20 h-1 bg-[#edb84c] rounded-2xl mx-auto mt-2"></hr>
        <p className="p-4 text-center text-base">{props.page === 'landing' ? 'Craving a slow and meaningful vacation ? Our team of travel specialists are waiting to help you plan your tailor-made trip, so get in touch with us today' : `We design each itinerary around you, so this suggested itinerary is a starting point that we can tweak or transform into something completely customised for you.

                Start planning your holiday with us now!`}</p>
        <button className="bg-theme-primary-light hover:bg-theme-primary-dark text-white text-sm p-4 mt-5 rounded transition-all duration-200 mx-auto block px-8" onClick={() => (window.location.href = '/forms/enquireNow')}>
            Start Planning
        </button>
    </div>
    return (
        props.image ?
            <div
                className="text-black relative h-[800px]">
                <Image
                    src={urlFor(props.image.asset).url()
                    }
                    alt='background image'
                    fill
                    className="object-cover !static rounded-[0%]"

                />
                {content}
            </div> :
            <div
                className="text-black pb-5 bg-center bg-cover text-xs h-full flex justify-center items-center"
                style={{ backgroundImage: "url('/images/planyourtrip.jpg')", height: '800px' }}
            >
                {content}

            </div>
    );
};

export default PlanYourTrip;
