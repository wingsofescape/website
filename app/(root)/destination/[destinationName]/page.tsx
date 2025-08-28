"use client";
import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { allDestination, allTours } from "@/data/countries";
import { TopTours } from "@/components/topTours";
import { IDestinationBreadcrumb } from "@/app/models/destinations";
import { useFetchData } from "@/hooks/useFetchData";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { urlFor } from "@/sanity/lib/image";
import HeroBanner from "@/components/heroBanner/HeroBanner";

const Destination = ({
  params,
}: {
  params: Promise<{ destinationName: string }>;
}) => {
  const { destinationName } = use<{ destinationName: string }>(params);
  console.log("destinatinName", destinationName);
  // const [activeTab, setActiveTab] = useState(0);
  const destination = useFetchData(
    POST_QUERY.destination(destinationName),
    SANITY_QUERY_OPTION,
    allDestination[destinationName as keyof typeof allDestination]
  );
  const tours = useFetchData(
    POST_QUERY.tours(destinationName),
    SANITY_QUERY_OPTION,
    allTours[`${destinationName}Tours` as keyof typeof allTours].tours
  );

  const image = urlFor(
    destination.destinationHeroBanner.heroImage.asset
  )?.url();

  //  const tours = allTours[`${destinationName}Tours` as keyof typeof allTours];

  // const getActiveTabContent = () => {
  //   return destination.tabbedSection[activeTab] || destination.tabbedSection[0];
  // };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Banner Section */}
      <section className="relative">
        {/* Mobile-First Design */}
        <div className="lg:hidden">
          {/* Mobile Breadcrumbs */}
          <nav className="bg-theme-primary-dark px-4 py-3">
            <div className="flex items-center space-x-2 text-sm">
              {destination.destinationBreadcrumbs.map(
                (crumb: IDestinationBreadcrumb, index: number) => (
                  <React.Fragment key={index}>
                    <Link
                      href={crumb.ref}
                      className="text-white hover:text-amber-300 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                    {index < destination.destinationBreadcrumbs.length - 1 && (
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
            <h1 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
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
        {/* <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap justify-center lg:justify-start border-b border-gray-200">
              {destination.tabbedSection.map((tab : ITabbedSection, index: number) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 text-sm md:text-base font-medium transition-all duration-300 border-b-2 ${
                    activeTab === index
                      ? "text-[#00332a] border-[#00332a] bg-white"
                      : "text-gray-600 border-transparent hover:text-[#00332a] hover:border-gray-300"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
            <div className="max-w-4xl">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00332a] font-serif mb-6">
                {getActiveTabContent().title}
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {getActiveTabContent().content.description}
                </p>
                {getActiveTabContent().content?.paragraphs &&
                  getActiveTabContent().content?.paragraphs.map(
                    (paragraph : string, index: number) => (
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
        </div> */}
      </section>

      {/* Rest of the destination page content would go here */}
      <TopTours tours={tours} />
    </div>
  );
};

export default Destination;
