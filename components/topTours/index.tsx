"use client";

import React from "react";
import Link from "next/link";

// Tour type definition
interface Tour {
  id: number;
  title: string;
  nights: number;
  price: number;
  image: string;
  slug: string;
}

// Sample tour data - this would come from Sanity later
const sampleTours = [
  {
    id: 1,
    title: "The Best of Sri Lanka: Culture, Wildlife & Coast",
    nights: 14,
    price: 7800,
    image: "/images/destinations/sriLanka/recommendedTour1.jpg",
    slug: "best-of-sri-lanka",
  },
  {
    id: 2,
    title: "Treasures of the Tropics: Sri Lanka and the Maldives",
    nights: 14,
    price: 9600,
    image: "/images/destinations/sriLanka/recommendedTour2.jpg",
    slug: "treasures-tropics",
  },
  {
    id: 3,
    title: "Sri Lanka with Teenagers: Wildlife & Surfing",
    nights: 13,
    price: 5200,
    image: "/images/destinations/sriLanka/recommendedTour3.jpg",
    slug: "sri-lanka-teenagers",
  },
  {
    id: 4,
    title: "Sri Lanka: Cultural and Coastal Bliss",
    nights: 13,
    price: 5200,
    image: "/images/destinations/sriLanka/recommendedTour5.jpg",
    slug: "sri-lanka-cultural",
  },
];

export const TopTours = () => {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Mobile-First Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Content Area - Mobile: Full width, Desktop: 4 columns */}
          <div className="lg:col-span-5 mb-8 lg:mb-0">
            <div className="bg-white p-6 -lg shadow-sm h-full flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#00332a] mb-4 font-serif">
                Top Tours in Sri Lanka
              </h2>
              <div className="w-12 h-1 bg-orange-400 mb-6"></div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Ready to get to know Sri Lanka&apos;s{" "}
                <Link
                  href="/destinations/hill-country"
                  className="text-[#00332a] underline hover:test-white"
                >
                  Hill Country
                </Link>{" "}
                or discover the Cultural Triangle&apos;s top highlights? Whether
                you want to spend your time visiting the tea plantations of{" "}
                <Link
                  href="/destinations/nuwara-eliya"
                  className="text-[#00332a] underline hover:test-white"
                >
                  Nuwara Eliya
                </Link>{" "}
                or riding through{" "}
                <Link
                  href="/destinations/colombo"
                  className="text-[#00332a] underline hover:test-white"
                >
                  Colombo
                </Link>{" "}
                on a tuk-tuk, our destination experts will plan a bespoke tour
                to help make your luxury Sri Lanka holiday truly memorable.
              </p>

              <button className="w-full sm:w-auto border-2 border-[#00332a] text-[#00332a] px-6 py-3 hover:bg-theme-primary-dark hover:text-white transition-all duration-300 font-medium">
                VIEW ALL TOURS
              </button>
            </div>
          </div>

          {/* Right Tours Grid - Mobile: Full width, Desktop: 8 columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sampleTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Tour Card Component
const TourCard = ({ tour }: { tour: Tour }) => {
  // Placeholder for when images aren't available
  const PlaceholderImage = ({ title }: { title: string }) => (
    <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-teal-500 to-blue-500 flex items-center justify-center">
      <div className="text-center text-white p-4">
        <div className="text-4xl mb-2">🏝️</div>
        <div className="text-sm font-medium">{title.split(":")[0]}</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white -lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Tour Image */}
      <div
        className={`relative h-60 overflow-hidden bg-cover bg-center bg-no-repeat hover:scale-101`}
        style={{
          backgroundImage: `url(${tour.image})`,
        }}
      >
        {/* <PlaceholderImage title={tour.title} /> */}

        {/* Nights Badge */}
        <div className="absolute top-4 left-0 bg-theme-primary-light text-white p-2 text-sm font-bold rounded-tr-sm rounded-br-sm">
          <div className="text-xl leading-none">{tour.nights}</div>
          <div className="text-xs uppercase">NIGHTS</div>
        </div>

        {/* Tour Content */}
        <div className="absolute top-[50%] left-[50%] p-0 flex flex-col bg-transparent translate-y-[-50%] opacity-90">
          {/* Black Header */}
          <div className="bg-[#090909] text-white p-4">
            <h3 className="font-bold text-xs leading-tight mb-3">
              {tour.title}
            </h3>
            <div className="text-sm">
              <span className="opacity-80">from</span>
              <div className="text-xl font-bold">
                {tour.price.toLocaleString()}{" "}
                <span className="text-base font-normal opacity-80">inr.</span>
              </div>
            </div>
          </div>

          {/* ThemeDark CTA Button */}
          <div className="bg-theme-primary p-4 text-center text-white">
            <Link
              href={`/tours/${tour.slug}`}
              className="font-bold text-lg hover:test-white transition-colors"
            >
              View Tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
