"use client";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import TourBanner from "@/components/tourBanner";
import { allTours } from "@/data/countries";
import { useFetchData } from "@/hooks/useFetchData";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { Itinerary } from "@/app/models/tours";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";


type ParamTye = { destinationName: string; "tour-name": string };

export default function TourDetailsPage({
  params,
}: {
  params: Promise<ParamTye>;
}) {
  const { destinationName, "tour-name": tourSlug } = use<ParamTye>(params);
  const tour = useFetchData(
    POST_QUERY.singleTour(tourSlug),
    SANITY_QUERY_OPTION,
    allTours[`${destinationName}Tours` as keyof typeof allTours]?.[0] ||
    allTours["srilankaTours"][0]
  );

  if (!tour) {
    notFound();
  }

  const destinationTitle = destinationName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // FLEX-BASED ITINERARY DAY COMPONENT
  const UniqueDay = ({ day }: { day: Itinerary }) => {
    return (
      <div className="flex items-start relative group">
        {/* Timeline & Circle */}
        <div className="flex flex-col items-center mr-2 md:mr-6 min-w-[56px]">
          {/* Circle */}
          <div className="w-12 h-16 rounded-full bg-theme-primary-light flex items-center justify-center text-white font-bold text-xs shadow-lg z-10 border-3 border-gray-400 botder-opacity-20">
            <div className="text-center py-2">
              <span className="block text-[10px] font-normal">Day</span>
              <span className="block text-lg">{day.day}</span>
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="bg-white shadow-md p-2 md:p-8 pt-4 mb-8 w-3/4">
          <h3 className="text-lg md:text-2xl font-semibold mb-2 text-theme-primary-dark">{day.title}</h3>
          <p className="text-sm text-gray-700 mb-1">{day.description}</p>
          <span>
            <strong>
              Accommodation: <a href="#" title="Uga Ulagalla">{day.title}</a>
            </strong>
          </span>
          {/* Images placeholder */}
          {day.image && day.image.length > 0 && (
            <div className="relative h-100 md:h-55 w-11/12 lg:w-3/4 overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col md:flex-row">
              {day.image.map((img, index) => (
                <Image src={typeof img === "string"
                  ? img
                  : urlFor(img.asset)?.url()}
                  key={index}
                  alt={tour.title}
                  width={330}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  className="object-fit m-2 w-full md:w-1/2 min-h-42" />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <TourBanner tour={tour} />

      {/* Main Content */}
      <div className="md:container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {/* Overview */}
            <section className="mb-12 text-theme-primary-dark">
              <h2 className="text-3xl font-bold mb-6">Tour Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {tour.longDescription}
              </p>


            </section>

            {/* Itinerary */}
            <section className="mb-2 text-theme-primary-dark">
              <h2 className="text-3xl font-bold mb-6">Itinerary</h2>
              <div className="space-y-8 relative">
                {/* Timeline vertical line for the whole itinerary */}
                <div className="absolute left-6.5 top-0 bottom-0 w-1 z-0 pointer-events-none itinerary-line" />
                {tour.itinerary.map((day: Itinerary) => (
                  <UniqueDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      <section className="bg-gray-50 pt-3">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Other {destinationTitle} Tours
          </h2>
          <div className="text-center">
            <Link
              href={`/destination/${destinationName}/tours`}
              className="inline-block bg-slate-800 text-white px-8 py-3 rounded-md hover:bg-slate-700 transition-colors font-semibold"
            >
              View All {destinationTitle} Tours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}