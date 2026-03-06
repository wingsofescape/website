'use client';
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { itineraryData } from "./page";

interface ItineraryAccordionProps {
    itinerary: typeof itineraryData.itinerary;
}
export const ItineraryAccordion = ({ itinerary }: ItineraryAccordionProps) => {
    const [expandedDays, setExpandedDays] = useState<string[]>([]);

    const [expandedLocation, setExpandedLocation] = useState<string[]>([]);


    const toggleDay = (dayKey: string) => {
        setExpandedDays(prev =>
            prev.includes(dayKey)
                ? prev.filter(key => key !== dayKey)
                : [...prev, dayKey]
        );
    };
    const toggleLocation = (locationKey: string) => {
        setExpandedLocation(prev =>
            prev.includes(locationKey)
                ? prev.filter(key => key !== locationKey)
                : [...prev, locationKey]
        );
    };

    return (
        <div className="w-full md:w-[50vw] mx-auto px-0 md:px-0">
            {itinerary.map((destination, destIndex: number) => {
                const isLocationExpanded = expandedLocation.includes(destIndex.toString());
                return (
                    <div key={destIndex} className="mb-4 w-full">
                        <button
                            onClick={() => toggleLocation(destIndex.toString())}
                            className="w-full md:w-[50vw] flex items-center justify-between text-white px-4 py-3 md:px-6 md:py-4 bg-gradient-to-b
                            from-theme-primary-dark to-theme-primary-light hover:bg-theme-primary-light transition-colors relative"
                        >
                            <h3 className="text-lg md:text-xl font-light">
                                {destination.title}
                            </h3>
                            {/* <p>
                                {destination.destinationItinerary.length} Days
                            </p> */}
                            <svg
                                className={`absolute right-5 md:right-10 w-5 h-5 md:w-6 md:h-6 text-gray-600 transition-transform flex-shrink-0 duration-400 ${isLocationExpanded ? 'rotate-270' : 'rotate-90'
                                    }`}
                                fill="none"
                                stroke="white"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 5v14l11-7z"
                                />
                            </svg>
                        </button>


                        {/* Accordion Content */}
                        {isLocationExpanded && (
                            <>
                                <div
                                    className="blogHeroImage relative overflow-hidden w-full h-[20vh] md:h-[30vh]">
                                    <Image
                                        alt="Page Banner Image"
                                        src={urlFor(destination.destinationImage.asset)?.url()}
                                        className="object-cover h-full"
                                        fill
                                        style={{
                                            transition: "transform 0.1s linear",
                                            zIndex: 1,
                                        }}
                                    />
                                </div>
                                <div className="w-full overflow-hidden shadow-2xl">
                                    {destination.destinationItinerary.map((day, dayIndex: number) => {
                                        const dayKey = `${destIndex}-${dayIndex}`;
                                        const isExpanded = expandedDays.includes(dayKey);

                                        return (
                                            <div
                                                key={dayKey}
                                                className=" overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                {/* Accordion Header */}
                                                <button
                                                    onClick={() => toggleDay(dayKey)}
                                                    className="w-full md:w-[50vw] flex items-center justify-between text-theme-primary py-3 px-4 md:py-4 transition-colors relative"
                                                >
                                                    <div className="flex items-center gap-5 text-left  w-full">
                                                        <div className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-white text-xs flex-shrink-0 bg-theme-primary-light text-pri
                                                    mary font-light">
                                                            {dayIndex + 1}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm md:text-base truncate font-bold">
                                                                {day.title}
                                                            </h4>
                                                            <p className="text-xs md:text-sm mt-1">
                                                                {day.day}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <svg
                                                        className={`absolute right-5 md:right-10 w-5 h-5 md:w-6 md:h-6 text-gray-600 transition-transform flex-shrink-0 duration-400 ${isExpanded ? 'rotate-270' : 'rotate-90'
                                                            }`}
                                                        fill="none"
                                                        stroke="black"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 5v14l11-7z"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Accordion Content */}
                                                {isExpanded && (
                                                    <div
                                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                                            }`}>
                                                        <div className={`bg-gray-50 px-4 py-4 md:px-6 md:py-5 border-t border-gray-300`}>
                                                            {/* Description */}
                                                            {/* {day?.description && (
                                                            <div className="mb-4">
                                                                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                                                    {day.description}
                                                                </p>
                                                            </div>
                                                        )} */}

                                                            {/* Activities */}
                                                            {day.activities && day.activities.length > 0 && (
                                                                <div className="mb-4">
                                                                    <h5 className="font-semibold text-theme-primary-dark text-sm md:text-base mb-2">
                                                                        Activities
                                                                    </h5>
                                                                    <ul className="space-y-2">
                                                                        {day.activities.map((activity, actIdx) => (
                                                                            <li key={actIdx} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
                                                                                <span>{activity.activityType}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Stay Details */}
                                                            {day.stay && (
                                                                <div className="mb-4 bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                                                                    <h5 className="font-semibold text-theme-primary-dark text-sm md:text-base mb-2">
                                                                        Stay Details
                                                                    </h5>
                                                                    <div className="space-y-2 text-sm md:text-base text-gray-700">
                                                                        <p>
                                                                            <span className="font-semibold">Hotel:</span> {day.stay.stayName}
                                                                        </p>
                                                                        <p>
                                                                            <span className="font-semibold">Room Type:</span> {day.stay.roomType}
                                                                        </p>
                                                                        <p>
                                                                            <span className="font-semibold">Check-in:</span> {day.stay.checkInDate}
                                                                        </p>
                                                                        <p>
                                                                            <span className="font-semibold">Check-out:</span> {day.stay.checkoutDate}
                                                                        </p>

                                                                        {/* Inclusions */}
                                                                        {day.stay.inclusions && day.stay.inclusions.length > 0 && (
                                                                            <div className="mt-2">
                                                                                <p className="font-semibold mb-1">Inclusions:</p>
                                                                                <ul className="flex flex-wrap gap-2">
                                                                                    {day.stay.inclusions.map((inclusion, incIdx) => (
                                                                                        <li
                                                                                            key={incIdx}
                                                                                            className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs md:text-sm"
                                                                                        >
                                                                                            {inclusion.inclusionType}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })};
                                </div>
                            </>
                        )}
                    </div >
                )
            })};
        </div >
    );
};