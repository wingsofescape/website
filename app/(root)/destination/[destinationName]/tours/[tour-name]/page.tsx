import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";

interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  price: string;
  image: string;
  gallery: string[];
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  includes: string[];
  excludes: string[];
}

// This would typically come from your Sanity CMS or database
const mockTours: Record<string, Record<string, Tour>> = {
  srilanka: {
    "ancient-cities-adventure": {
      id: "1",
      slug: "ancient-cities-adventure",
      title: "Ancient Cities Adventure",
      description:
        "Explore the ancient cities of Anuradhapura and Polonnaruwa, discovering centuries-old temples and ruins.",
      longDescription:
        "Embark on a journey through time as you explore Sri Lanka's ancient capitals. This comprehensive tour takes you through the UNESCO World Heritage sites of Anuradhapura and Polonnaruwa, where you'll discover magnificent temples, ancient stupas, and intricate stone carvings that tell the story of a civilization that flourished over 2,000 years ago.",
      duration: "7 days",
      price: "From $1,200",
      image: "/images/ancient-cities.jpg",
      gallery: [
        "/images/gallery1.jpg",
        "/images/gallery2.jpg",
        "/images/gallery3.jpg",
      ],
      highlights: [
        "Visit UNESCO World Heritage sites",
        "Explore ancient temples and stupas",
        "Discover intricate stone carvings",
        "Learn about Buddhist history",
        "Photography opportunities",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Colombo",
          description:
            "Arrive at Bandaranaike International Airport and transfer to your hotel in Colombo. Evening briefing about the tour.",
        },
        {
          day: 2,
          title: "Colombo to Anuradhapura",
          description:
            "Travel to Anuradhapura, the first ancient capital of Sri Lanka. Begin exploring the sacred city with visits to key temples.",
        },
        {
          day: 3,
          title: "Full Day Anuradhapura",
          description:
            "Complete exploration of Anuradhapura including Ruwanwelisaya, Thuparamaya, and the Sacred Bo Tree.",
        },
      ],
      includes: [
        "Accommodation in selected hotels",
        "Professional English-speaking guide",
        "All entrance fees",
        "Transportation in air-conditioned vehicle",
        "Daily breakfast",
      ],
      excludes: [
        "International flights",
        "Lunch and dinner (unless specified)",
        "Personal expenses",
        "Travel insurance",
        "Tips and gratuities",
      ],
    },
  },
};

export default function TourDetailsPage({
  params,
}: {
  params: Promise<{ destinationName: string; "tour-name": string }>;
}) {
  const { destinationName, "tour-name": tourSlug } = use<{
    destinationName: string;
    "tour-name": string;
  }>(params);

  const tour = mockTours[destinationName]?.[tourSlug];

  if (!tour) {
    notFound();
  }

  const destinationTitle = destinationName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
          <span className="text-white text-lg">Tour Hero Image</span>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          {/* Breadcrumb */}
          <nav className="text-sm mb-4 text-white opacity-80">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/destination/${destinationName}`}
              className="hover:underline"
            >
              {destinationTitle}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/destination/${destinationName}/tours`}
              className="hover:underline"
            >
              Tours
            </Link>
            <span className="mx-2">/</span>
            <span>{tour.title}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {tour.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-white">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">
              {tour.duration}
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">
              {tour.price}
            </span>
          </div>
        </div>
      </section>

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
                {tour.highlights.map((highlight, index) => (
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
              <h2 className="text-3xl font-bold mb-6">Detailed Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="border-l-4 border-slate-800 pl-6"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      Day {day.day}: {day.title}
                    </h3>
                    <p className="text-gray-700">{day.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Includes/Excludes */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-600">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-red-600">
                    What&apos;s Not Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.excludes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
