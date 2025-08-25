import Link from "next/link";

interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  destination: string;
  destinationSlug: string;
  image: string;
  highlights: string[];
}

// This would typically come from your Sanity CMS or database
const allTours: Tour[] = [
  {
    id: "1",
    slug: "ancient-cities-adventure",
    title: "Ancient Cities Adventure",
    description:
      "Explore the ancient cities of Anuradhapura and Polonnaruwa, discovering centuries-old temples and ruins.",
    duration: "7 days",
    price: "From $1,200",
    destination: "Sri Lanka",
    destinationSlug: "sri-lanka",
    image: "/images/ancient-cities.jpg",
    highlights: ["Ancient temples", "Historical ruins", "Cultural experiences"],
  },
  {
    id: "2",
    slug: "tea-country-escape",
    title: "Tea Country Escape",
    description:
      "Journey through the lush tea plantations of Nuwara Eliya and experience the hill country's natural beauty.",
    duration: "5 days",
    price: "From $950",
    destination: "Sri Lanka",
    destinationSlug: "sri-lanka",
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
    destination: "Sri Lanka",
    destinationSlug: "sri-lanka",
    image: "/images/wildlife-safari.jpg",
    highlights: ["Safari adventures", "Wildlife photography", "National parks"],
  },
  // Add more tours for other destinations here
];

export default function AllToursPage() {
  // Group tours by destination
  const toursByDestination = allTours.reduce(
    (acc, tour) => {
      if (!acc[tour.destination]) {
        acc[tour.destination] = [];
      }
      acc[tour.destination].push(tour);
      return acc;
    },
    {} as Record<string, Tour[]>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 opacity-80">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>All Tours</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Tours & Experiences
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Discover amazing tours and experiences across all our destinations.
            From cultural adventures to wildlife safaris, find your perfect
            journey.
          </p>
        </div>
      </section>

      {/* Tours by Destination */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {Object.entries(toursByDestination).map(([destination, tours]) => (
            <div key={destination} className="mb-16 last:mb-0">
              {/* Destination Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">{destination} Tours</h2>
                <Link
                  href={`/destination/${tours[0].destinationSlug}/tours`}
                  className="text-slate-800 hover:underline font-semibold"
                >
                  View All {destination} Tours →
                </Link>
              </div>

              {/* Tours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.map((tour) => (
                  <Link
                    key={tour.id}
                    href={`/destination/${tour.destinationSlug}/tours/${tour.slug}`}
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
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold group-hover:text-slate-700 transition-colors">
                            {tour.title}
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {tour.destination}
                          </span>
                        </div>

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
                        <div className="flex flex-wrap gap-2">
                          {tour.highlights
                            .slice(0, 3)
                            .map((highlight, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                              >
                                {highlight}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Call to Action */}
          <div className="mt-16 text-center bg-white rounded-lg p-12 shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let us create a custom tour just for you. Our travel experts will
              design the perfect itinerary based on your interests, budget, and
              travel style.
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
export async function generateMetadata() {
  return {
    title: "All Tours & Experiences | Wings of Escape",
    description:
      "Discover amazing tours and experiences across all destinations. From cultural adventures to wildlife safaris, find your perfect journey.",
  };
}
