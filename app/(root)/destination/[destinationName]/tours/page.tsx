"use client";
import Link from "next/link";
import { use } from "react";
import { allDestination, allTours } from "@/data/countries";
import HeroBanner from "@/components/heroBanner/HeroBanner";
import { useFetchData } from "@/hooks/useFetchData";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import Image from "next/image";
import { ITour } from "@/app/models/tours";
import { urlFor } from "@/sanity/lib/image";

export default function DestinationToursPage({
  params,
}: {
  params: Promise<{ destinationName: string }>;
}) {
  const { destinationName } = use<{ destinationName: string }>(params);
  const tourDescription =
    allTours[`${destinationName}Tours` as keyof typeof allTours].description;

  const destination = useFetchData(
    POST_QUERY.destination(destinationName),
    SANITY_QUERY_OPTION,
    allDestination[destinationName as keyof typeof allDestination]
  );
  const tours = useFetchData(
    POST_QUERY.tours(destinationName),
    SANITY_QUERY_OPTION,
    allTours[`${destinationName}Tours` as keyof typeof allTours]
  );
  console.log(tours[0].image.asset);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroBanner destination={destination} />

      <div className="bg-white rounded-lg shadow-sm p-8 lg:p-6 flex justify-center">
        <div className="max-w-4xl">
          <h2 className="text-2xl lg:text-3xl mb-6 font-bold">
            {destination.destinationHeroBanner.name} Tours
          </h2>

          <div className="prose prose-lg max-w-none">{tourDescription}</div>
        </div>
      </div>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="tour-count flex justify-end">
            <span className="text-gray-600 mb-6 font-semibold text-lg">
              {" "}
              Showing 1 - {tours.length} of {tours.length} tours{" "}
            </span>
          </div>

          <div className="flex flex-col gap-8">
            {tours.map((tour: ITour) => (
              <Link
                key={tour.id}
                href={`/destination/${destinationName}/tours/${tour.slug.current}`}
                className="group"
              >
                <div className="bg-white  shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row">
                  {/* Tour Image & Badge */}
                  <div className="relative h-75 w-full md:w-2/5">
                    <Image
                      src={urlFor(tour.image.asset)?.url()}
                      alt={tour.title}
                      className="object-cover w-full h-full"
                      width={500}
                      height={0}
                    />
                    {/* Nights Badge */}
                    <div className="absolute bottom-0 left-0 bg-theme-primary text-white px-4 py-2 font-bold text-center shadow-lg opacity-60">
                      {/* Extract number of nights from duration string */}
                      <div className="text-lg leading-none">
                        {tour.duration.split(" ")[0]}
                      </div>
                      <div className="text-xs uppercase">NIGHTS</div>
                    </div>
                  </div>

                  {/* Tour Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-[#00332a] group-hover:text-green-900 transition-colors">
                        {tour.title}
                      </h3>
                      {/* Location/Itinerary */}
                      <div className="text-sm text-gray-700 font-semibold mb-2">
                        {/* You can add a location or itinerary field here if available */}
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-3 font-sans">
                        {tour.description}
                      </p>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <div>
                        <span className="text-gray-600 text-sm">From</span>
                        <div className="text-2xl font-bold text-green-900">
                          £{tour.price}{" "}
                          <span className="text-base font-normal text-gray-600">
                            pp
                          </span>
                        </div>
                      </div>
                      <div className="bg-green-900 text-white px-6 py-2 font-semibold hover:bg-green-800 transition-colors">
                        VIEW TOUR
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-gray-600 mb-6">
              Let us create a custom tour just for you. Contact our travel
              experts today.
            </p>
            <Link
              href="/forms/enquireNow"
              className="inline-block bg-slate-800 text-white px-8 py-3 rounded-md hover:bg-slate-700 transition-colors font-semibold"
            >
              Plan My Custom Tour
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate metadata for SEO
// export async function generateMetadata({ params }: PageProps) {
//   const destinationTitle = params.destinationName
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");

//   return {
//     title: `${destinationTitle} Tours | Wings of Escape`,
//     description: `Discover amazing tours and experiences in ${destinationTitle}. Book your perfect adventure today.`,
//   };
// }
