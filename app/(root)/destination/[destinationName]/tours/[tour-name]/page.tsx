import React from "react";
import { notFound } from "next/navigation";
import TourBanner from "@/components/tourBanner";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { Itinerary, ITour } from "@/app/_models/tours";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PlanYourTrip from "@/components/landingPage/PlanYourTrip";
import { sanityFetch } from "@/sanity/lib/fetch";

type ParamTye = { destinationName: string; "tour-name": string };

async function getDestinationHeroBanner(destinationName: string) {
  return await sanityFetch(
    POST_QUERY.destinationHeroBannerData(destinationName),
    SANITY_QUERY_OPTION
  );
}

async function getToursData(name: string): Promise<ITour[]> {
  return await sanityFetch(POST_QUERY.singleTour(name), SANITY_QUERY_OPTION);
}


const TourDetailsPage = async ({
  params,
}: {
  params: Promise<ParamTye>;
}) => {
  const destinationName = (await params).destinationName;
  const res = await getDestinationHeroBanner(destinationName);
  const destinationBannerImage = res?.[0].destinationHeroBanner.heroImage;

  const response = await getToursData((await params)["tour-name"]);
  const tour = response?.[0];

  if (!tour) {
    notFound();
  }

  // FLEX-BASED ITINERARY DAY COMPONENT
  const UniqueDay = ({ day }: { day: Itinerary }) => {
    return (
      <div className="flex items-start relative group">
        {/* Timeline & Circle */}
        <div className="flex flex-col items-center mr-2 md:mr-6 min-w-[56px]">
          {/* Circle */}
          <div className="w-12 h-16 rounded-full bg-theme-primary-light flex items-center justify-center text-white font-bold text-xs z-10 border-3 border-gray-400 botder-opacity-20">
            <div className="text-center py-2">
              <span className="block text-[10px] font-normal">Day</span>
              <span className="block text-lg">{day.day}</span>
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="bg-background p-2 md:p-8 pt-4 mb-8 w-3/4">
          <h3 className="text-lg md:text-2xl font-semibold mb-2 text-theme-primary-dark">
            {day.title}
          </h3>
          <p className="text-sm text-gray-700 mb-1">{day.description}</p>

          {/* Images placeholder */}
          {day.image && day.image.length > 0 && (
            <div className="relative h-100 md:h-55 w-11/12 lg:w-3/4 overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col md:flex-row">
              {day.image.map((img, index) => (
                <Image
                  src={typeof img === "string" ? img : urlFor(img.asset)?.url()}
                  key={index}
                  alt={tour.title}
                  width={330}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  className="object-fit m-2 w-full md:w-1/2 min-h-42"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background">
      <TourBanner tour={tour} />

      {/* Main Content */}
      <div className="md:container mx-auto px-4 pt-12">
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
                  <UniqueDay key={day.title} day={day} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="p-0 bg-background mt-10">
        <PlanYourTrip page={'tour'} country={destinationName} image={destinationBannerImage} />
      </div>
    </div>
  );
}
export default TourDetailsPage;