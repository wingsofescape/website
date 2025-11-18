import Link from "next/link";
import HeroBanner from "@/components/heroBanner/HeroBanner";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import Image from "next/image";
import { ITour } from "@/app/_models/tours";
import { urlFor } from "@/sanity/lib/image";
import { formatPrice } from "@/utils/priceFormatter";
import { sanityFetch } from "@/sanity/lib/fetch";
import { IDestination } from "@/app/_models/destinations";

async function getDestinationData(name: string): Promise<IDestination[]> {
  return await sanityFetch(POST_QUERY.destination(name), SANITY_QUERY_OPTION);
}

async function getToursData(name: string): Promise<ITour[]> {
  return await sanityFetch(POST_QUERY.tours(name), SANITY_QUERY_OPTION);
}

export default async function DestinationToursPage({
  params,
}: {
  params: Promise<{ destinationName: string }>;
}) {
  const res = await getDestinationData((await params).destinationName);
  const destination = res?.[0];
  const data = await getToursData((await params).destinationName);
  const tours = data.sort((a, b) => {
    if (a.isIdea === b.isIdea) return 0;
    return a.isIdea ? 1 : -1;
  });
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <HeroBanner destination={destination} />

      <div className="bg-background rounded-lg p-8 lg:p-6 flex justify-center">
        <div className="max-w-4xl">
          <h2 className="text-2xl lg:text-3xl mb-2 font-bold text-theme-primary-dark">
            {destination.destinationHeroBanner.name} Tours
          </h2>
        </div>
      </div>

      {/* Tours Grid */}
      <section className="py-8">
        <div className="mx-auto px-4 w-11/12">
          <div className="tour-count flex justify-end">
            <span className="text-gray-600 mb-6 font-semibold text-sm">
              {" "}
              Showing 1 - {tours.length} of {tours.length} tours{" "}
            </span>
          </div>

          <div className="flex flex-col gap-8">
            {tours.map(async (tour: ITour) => (
              <Link
                key={tour.id}
                href={
                  tour.isIdea
                    ? "/forms/enquireNow"
                    : `/destination/${(await params).destinationName}/tours/${tour.slug.current}`
                }
              >
                <div className="bg-background shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row group">
                  {/* Tour Image & Badge */}
                  <div className="relative h-75 w-full md:w-2/5">
                    <Image
                      src={
                        typeof tour.image === "string"
                          ? tour.image
                          : urlFor(tour.image.asset)?.url()
                      }
                      alt={tour.title}
                      className="object-cover w-full h-full"
                      width={500}
                      height={0}
                    />
                    {/* Nights Badge */}
                    <div className="absolute bottom-0 left-0 bg-theme-primary text-white px-4 py-2 font-bold text-center shadow-lg opacity-80">
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
                      <h3 className="text-md md:text-2xl font-bold mb-2 text-theme-primary">
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
                    <div className="flex items-end justify-between mt-4 gap-2 md:gap-0">
                      <div>
                        <span className="text-gray-600 text-sm">From</span>
                        <div className="text-lg md:text-2xl font-light md:font-bol text-theme-primary">
                          {formatPrice(tour.price)}{" "}
                          <span className="text-base font-normal text-gray-600">
                            pp
                          </span>
                        </div>
                      </div>
                      <div className="bg-theme-primary text-white px-6 py-2 font-semibold group-hover:bg-theme-primary-light transition-colors text-xs md:text-base">
                        {tour.isIdea ? "ENQUIRE NOW" : "VIEW TOUR "}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4 text-theme-primary-dark">
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
