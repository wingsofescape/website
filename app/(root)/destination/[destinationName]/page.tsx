"use client";
import React, { use } from "react";
import Image from "next/image";
import { allDestination, allTours } from "@/data/countries";
import { TopTours } from "@/components/topTours";
import { useFetchData } from "@/hooks/useFetchData";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { urlFor } from "@/sanity/lib/image";
import HeroBanner from "@/components/heroBanner/HeroBanner";
import { createBreadcrumbs } from "@/utils/createBreadcrumbs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Destination = ({
  params,
}: {
  params: Promise<{ destinationName: string }>;
}) => {
  const { destinationName } = use<{ destinationName: string }>(params);
  // const [activeTab, setActiveTab] = useState('holidaysOverview');
  const pathname = usePathname();
  const breadCrumbs = createBreadcrumbs(pathname);
  const destination = useFetchData(
    POST_QUERY.destination(destinationName),
    SANITY_QUERY_OPTION,
    allDestination[destinationName as keyof typeof allDestination] ||
      allDestination["srilanka"]
  );
  const tours = useFetchData(
    POST_QUERY.tours(destinationName),
    SANITY_QUERY_OPTION,
    allTours[`${destinationName}Tours` as keyof typeof allTours] ||
      allTours["srilankaTours"]
  );

  const image =
    typeof destination.destinationHeroBanner.heroImage === "string"
      ? destination.destinationHeroBanner.heroImage
      : urlFor(destination.destinationHeroBanner.heroImage.asset)?.url();

  const getActiveTabContent = (destinationContentType: string) => {
    return destination.destinationContent[destinationContentType];
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Banner Section */}
      <section className="relative">
        {/* Mobile-First Design */}
        <div className="lg:hidden">
          {/* Mobile Breadcrumbs */}
          <nav className="bg-theme-primary-dark px-4 py-3">
            <div className="flex items-center space-x-2 text-sm">
              {breadCrumbs.map(
                (crumb: { label: string; ref: string }, index: number) => (
                  <React.Fragment key={crumb.ref}>
                    <Link
                      href={crumb.ref}
                      className="text-white hover:text-amber-300 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                    {index < breadCrumbs.length - 1 && (
                      <span className="text-gray-300">›</span>
                    )}
                  </React.Fragment>
                )
              )}
            </div>
          </nav>

          {/* Mobile Hero Image */}
          <div className="relative h-64 md:h-80">
            <Image
              src={image}
              alt={destination.destinationHeroBanner.title}
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Mobile Content */}
          <div className="bg-theme-primary-dark text-white px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 ">
              {destination.destinationHeroBanner.title}
            </h1>
            <p className="text-gray-200 mb-6 leading-relaxed">
              {destination.destinationHeroBanner.description}
            </p>
          </div>
        </div>

        {/* Desktop Design - Half and Half Layout */}
        <HeroBanner destination={destination} />
      </section>

      <section className="py-8 px-4 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap justify-center lg:justify-start border-b border-gray-200">
              {destination.destinationContent["holidaysOverview"].title}
              {/* {destination.destinationContent["tourIdeas"].title} */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm ">
            <div className="max-w-full">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00332a]  mb-6">
                {getActiveTabContent("holidaysOverview").title}
              </h2>

              <div className="prose prose-lg max-w-none">
                {getActiveTabContent("holidaysOverview").content?.paragraph &&
                  getActiveTabContent(
                    "holidaysOverview"
                  ).content?.paragraph.map(
                    (paragraph: string, index: number) => (
                      <p
                        key={index}
                        className="text-gray-700 leading-relaxed mb-6"
                      >
                        {paragraph}
                      </p>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the destination page content would go here */}
      <TopTours
        tours={tours}
        recommendedTourContent={destination.recommendedToursContent}
      />
    </div>
  );
};

export default Destination;
