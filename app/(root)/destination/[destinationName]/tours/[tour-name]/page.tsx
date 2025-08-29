"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import TourBanner from "@/components/tourBanner";
import allTours from "@/data/countries/SriLanka/tours.json";
import { useFetchData } from "@/hooks/useFetchData";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { Itinerary } from "@/app/models/tours";

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
    allTours.find((t) => t.slug.current === tourSlug)
  );
  // const tour  = allTours.find((t) => t.slug.current === tourSlug)

  if (!tour) {
    notFound();
  }

  const destinationTitle = destinationName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const UniqueDay = ({ day }: { day: Itinerary }) => {
    return (
      <div key={day.day} className="pl-6 unique-day">
        <span>Day {day.day}</span>
        <h3 className="text-xl font-semibold mb-2">{day.title}</h3>
        <p className="text-gray-700">{day.description}</p>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-white">
      <TourBanner tour={tour} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Tour Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {tour.longDescription}
              </p>

              {/* Highlights */}
              <h3 className="text-xl font-semibold mb-4">Tour Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights &&
                  tour.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Itinerary</h2>
              <div className="space-y-6 relative">
                {tour.itinerary.map((day: Itinerary, index: number) => (
                  <UniqueDay key={day.day} day={day} index={index} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
              <h3 className="text-2xl font-bold mb-4">{tour.price}</h3>
              <p className="text-gray-600 mb-6">per person</p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{tour.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Size:</span>
                  <span className="font-semibold">2-12 people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-semibold">Easy</span>
                </div>
              </div>

              <Link
                href="/forms/enquireNow"
                className="w-full bg-slate-800 text-white py-3 px-6 rounded-md hover:bg-slate-700 transition-colors font-semibold text-center block mb-4"
              >
                Book This Tour
              </Link>

              <Link
                href="/forms/enquireNow"
                className="w-full border-2 border-slate-800 text-slate-800 py-3 px-6 rounded-md hover:bg-slate-800 hover:text-white transition-colors font-semibold text-center block"
              >
                Customize This Tour
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      <section className="bg-gray-50 py-16">
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

// Generate metadata for SEO
// export async function generateMetadata({ params }: PageProps) {
//   const { destinationName } = use<{ destinationName: string }>(params);
//   const tourSlug = params["tour-name"];

//   const tour = mockTours[destinationName]?.[tourSlug];

//   if (!tour) {
//     return {
//       title: "Tour Not Found | Wings of Escape",
//     };
//   }

//   return {
//     title: `${tour.title} | Wings of Escape`,
//     description: tour.description,
//   };
// }
