import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import {allTours} from "@/data/countries";
import HeroBanner from "@/components/heroBanner/HeroBanner";
interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  highlights: string[];
}

// This would typically come from your Sanity CMS or database
const mockTours: Record<string, Tour[]> = {
  srilanka: [
    {
      id: "1",
      slug: "ancient-cities-adventure",
      title: "Ancient Cities Adventure",
      description:
        "Explore the ancient cities of Anuradhapura and Polonnaruwa, discovering centuries-old temples and ruins.",
      duration: "7 days",
      price: "From $1,200",
      image: "/images/ancient-cities.jpg",
      highlights: [
        "Ancient temples",
        "Historical ruins",
        "Cultural experiences",
      ],
    },
    {
      id: "2",
      slug: "tea-country-escape",
      title: "Tea Country Escape",
      description:
        "Journey through the lush tea plantations of Nuwara Eliya and experience the hill country's natural beauty.",
      duration: "5 days",
      price: "From $950",
      image: "/images/tea-country.jpg",
      highlights: [
        "Tea plantation tours",
        "Scenic train rides",
        "Mountain views",
      ],
    },
    {
      id: "3",
      slug: "wildlife-safari-experience",
      title: "Wildlife Safari Experience",
      description:
        "Encounter elephants, leopards, and exotic birds in Yala and Udawalawe National Parks.",
      duration: "6 days",
      price: "From $1,100",
      image: "/images/wildlife-safari.jpg",
      highlights: [
        "Safari adventures",
        "Wildlife photography",
        "National parks",
      ],
    },
  ],
};

export default function DestinationToursPage({
  params,
}: {
  params: Promise<{ destinationName: string }>;
}) {

  const { destinationName } = use<{ destinationName: string }>(params);
  const tours = allTours[`${destinationName}Tours` as keyof typeof allTours].tours;
  // const tours = mockTours[destinationName];


  const destinationTitle = destinationName;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroBanner destination={destinationTitle} />

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Link
                key={tour.id}
                href={`/destination/${destinationName}/tours/${tour.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Tour Image */}
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <div className="w-full h-48 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                      <span className="text-white text-sm">Tour Image</span>
                    </div>
                  </div>

                  {/* Tour Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-slate-700 transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {tour.description}
                    </p>

                    {/* Tour Details */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">
                        {tour.duration}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {tour.price}
                      </span>
                    </div>

                    {/* Highlights */}
                    {/* <div className="flex flex-wrap gap-2">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div> */}
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
