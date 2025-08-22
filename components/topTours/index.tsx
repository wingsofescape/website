"use client";

import React from "react";
import Link from "next/link";
import {  IRecommendedToursContent, ITour } from "@/app/models/destinations";
import { usePathname } from "next/navigation";

export const TopTours = (props : { tours : { tours: ITour[]; recommendedToursContent: IRecommendedToursContent }}) => {
  const { tours, recommendedToursContent } = props.tours;
  if(tours.length === 0) return null;
  const recommendedTours  = tours.filter((tour : ITour) => tour.recommended);
  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Flex Layout */}
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left Content Area - Mobile: Full width, Desktop: 5/12 width */}
          <div className="w-full lg:w-5/12 mb-8 lg:mb-0 flex-shrink-0">
            <div className="bg-white p-6 -lg shadow-sm h-full flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#00332a] mb-4 font-serif">
                {recommendedToursContent.title}
              </h2>
              <div className="w-12 h-1 bg-orange-400 mb-6"></div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {recommendedToursContent?.description}
              </p>

              <button className="w-full sm:w-auto border-2 border-[#00332a] text-[#00332a] px-6 py-3 hover:bg-theme-primary-dark hover:text-white transition-all duration-300 font-medium">
                VIEW ALL TOURS
              </button>
            </div>
          </div>

          {/* Right Tours Flex - Mobile: Full width, Desktop: 7/12 width */}
          <div className="w-full lg:w-7/12">
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {recommendedTours.length && recommendedTours.map((tour) => (
                <div className="w-full sm:w-[calc(50%-0.5rem)] flex-grow" key={tour.id}>
                  <TourCard  tour={tour.recommendedContent} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Tour Card Component
const TourCard = ({ tour } : { tour: ITour }) => {
  const destinationName  = usePathname().split("/")[2];
  return (
    <div className="bg-white -lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Tour Image */}
      <div
        className={`relative h-60 overflow-hidden bg-cover bg-center bg-no-repeat hover:scale-101 flex flex-col`}
      >
        {/* Tour Image with fallback */}
        <img
          src={tour.image}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.preventDefault();
            e.currentTarget.onerror = null;
            e.currentTarget.src = `/images/destinations/${destinationName}/fallbackRecommendedTour.jpg`; // Replace with your fallback image path
          }}
        />

        {/* Nights Badge */}
        <div className="absolute top-4 left-0 bg-theme-primary-light text-white p-2 text-sm font-bold rounded-tr-sm rounded-br-sm flex flex-col items-center">
          <div className="text-xl leading-none">{tour.nights}</div>
          <div className="text-xs uppercase">NIGHTS</div>
        </div>

        {/* Tour Content */}
        <div className="absolute top-[50%] left-[50%] p-0 flex flex-col bg-transparent translate-y-[-50%] opacity-90">
          {/* Black Header */}
          <div className="bg-[#090909] text-white p-4 flex flex-col">
        <h3 className="font-bold text-xs leading-tight mb-3">
          {tour.title}
        </h3>
        <div className="text-sm flex flex-col">
          <span className="opacity-80">from</span>
          <div className="text-xl font-bold">
            {tour.price.toLocaleString()}{" "}
            <span className="text-base font-normal opacity-80">inr.</span>
          </div>
        </div>
          </div>

          {/* ThemeDark CTA Button */}
          <div className="bg-theme-primary p-4 text-center text-white flex items-center justify-center">
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
