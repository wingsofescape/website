import React from "react";
import { TopTours } from "@/components/topTours";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import HeroBanner from "@/components/heroBanner/HeroBanner";
// import { createBreadcrumbs } from "@/utils/createBreadcrumbs";
import { sanityFetch } from "@/sanity/lib/fetch";

type PageProps = {
  params: Promise<{ destinationName: string }>;
};

export async function generateStaticParams() {
  return await sanityFetch(POST_QUERY.destinationList, SANITY_QUERY_OPTION);
}

export async function getDestination(destinationName: string) {
  return await sanityFetch(
    POST_QUERY.destination(destinationName),
    SANITY_QUERY_OPTION
  );
}
const Destination = async ({ params }: PageProps) => {
  const res = await getDestination((await params).destinationName);
  const destination = res?.[0];
  console.log(destination);

  const tours = await sanityFetch(
    POST_QUERY.tours((await params).destinationName),
    SANITY_QUERY_OPTION
  );

  const getActiveTabContent = (destinationContentType: string) => {
    return destination.destinationContent[destinationContentType];
  };

  return (
    <div className="bg-white flex flex-col">
      {/* Hero Banner Section */}
      <section className="relative">
        {/* Desktop Design - Half and Half Layout */}
        <HeroBanner destination={destination} />
      </section>

      <section className="py-8 px-4 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* <div className="mb-8">
            <div className="flex flex-wrap justify-center lg:justify-start border-b border-gray-200 text-theme-primary-dark">
              {destination.destinationContent["holidaysOverview"].title}
              {/* {destination.destinationContent["tourIdeas"].title}
            </div>
          </div> */}

          <div className="bg-white  shadow-sm  p-6">
            <div className="max-w-full">
              <h2 className="text-2xl lg:text-3xl font-bold text-theme-primary-dark  mb-6">
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
