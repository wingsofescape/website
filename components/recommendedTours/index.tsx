"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Slug } from "@/app/(root)/top10/page";
import { Image as IImage } from "@/app/_models/tours";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatPrice } from "@/utils/priceFormatter";

export interface IRecommendedTour {
  _id: string;
  title: string;
  countryName: string;
  duration: string;
  price: number;
  image: IImage;
  slug: Slug;
}

const RecommendedToursSlider = ({
  recommendedToursContent,
}: {
  recommendedToursContent: IRecommendedTour[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [isLastCardVisible, setIsLastCardVisible] = useState(false);

  // Ref for the last tour card
  const lastCardRef = React.useRef<HTMLDivElement>(null);

  // Calculate maxIndex dynamically based on slidesToShow
  const maxIndex = Math.max(0, recommendedToursContent.length - slidesToShow);

  // Responsive breakpoints
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
        setIsMobile(true);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
        setIsMobile(false);
      } else {
        setSlidesToShow(4);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for the last card
  React.useEffect(() => {
    const lastCard = lastCardRef.current;
    if (!lastCard) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Card is considered visible when at least 50% is in view
        setIsLastCardVisible(
          entry.isIntersecting && entry.intersectionRatio >= 0.5
        );
      },
      {
        threshold: 0.5, // Trigger when 50% of the card is visible
        rootMargin: "-10px", // Add some margin to ensure it's properly visible
      }
    );

    observer.observe(lastCard);

    return () => {
      observer.unobserve(lastCard);
      observer.disconnect();
    };
  }, [recommendedToursContent.length]); // Re-run when content changes

  // Calculate transform based on screen size
  const getTransformValue = () => {
    if (isMobile) {
      // Mobile: Move by full card width (100% per slide)
      return currentIndex * 100;
    } else {
      // Desktop: Move by percentage based on cards visible
      return currentIndex * (100 / slidesToShow);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex > maxIndex ? 0 : newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? maxIndex : newIndex;
    });
  };

  const leftButton = (
    <button
      onClick={prevSlide}
      className="absolute left-5 top-[40%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 -ml-6"
      disabled={currentIndex === 0}
    >
      <svg
        className="w-6 h-6 text-slate-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );

  const rightButton = (
    <button
      onClick={nextSlide}
      className={`absolute right-5 top-[40%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center transition-all duration-200 -mr-6 group ${
        isLastCardVisible
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-200 cursor-pointer"
      }`}
      disabled={isLastCardVisible}
    >
      <svg
        className="w-6 h-6 text-slate-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );

  return (
    <section className="bg-white relative pt-10 w-full">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Recommended Tours
          </h2>
          <hr className="w-20 h-1 bg-[#edb84c] rounded-2xl mx-auto mt-4"></hr>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Discover our handpicked selection of the most popular destinations
            and experiences.
          </p>
          {/* Debug info - remove this later */}
          {/* {process.env.NODE_ENV === "development" && (
            <div className="text-xs text-gray-500 mt-2">
              Last card visible: {isLastCardVisible ? "✅ Yes" : "❌ No"} |
              Right button disabled: {isLastCardVisible ? "✅ Yes" : "❌ No"}
            </div>
          )} */}
        </div>

        {/* Slider Container */}
        <div className="relative mx-auto pt-10">
          {/* Left Arrow - Extreme Left */}
          {leftButton}
          {/* Right Arrow - Extreme Right */}
          {rightButton}

          {/* Tours Container */}
          <div className="overflow-hidden rounded-2xl pb-20">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${getTransformValue()}%)`,
              }}
            >
              {recommendedToursContent.map(
                (tour: IRecommendedTour, index: number) => {
                  const isLastCard =
                    index === recommendedToursContent.length - 1;

                  return (
                    <div
                      key={tour.title}
                      ref={isLastCard ? lastCardRef : null}
                      className={`flex-shrink-0 px-2 ${
                        isMobile
                          ? "w-1/2"
                          : slidesToShow === 2
                            ? "w-1/2"
                            : slidesToShow === 3
                              ? "w-1/3"
                              : "w-1/5"
                      }`}
                    >
                      <Link
                        href={`/destination/${tour.countryName}/tours/${tour.slug.current}`}
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                          <div className="relative h-64 overflow-hidden">
                            <Image
                              src={
                                typeof tour.image === "string"
                                  ? tour.image
                                  : urlFor(tour.image.asset)?.url()
                              }
                              alt={tour.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="absolute inset-0 object-cover group-hover:scale-105  transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {/* Tour Title Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-sm font-bold mb-1 leading-tight">
                                {tour.title}
                              </h3>
                              <p className="text-xs opacity-90 tracking-wide">
                                {tour.countryName.charAt(0).toUpperCase() +
                                  tour.countryName.slice(1)}
                              </p>
                            </div>
                          </div>
                          <div className=" text-black p-4 bg-transparent">
                            <p className="text-xs font-medium mb-2">
                              {tour.duration}
                            </p>
                            <p className="text-xs font-medium mb-2 text-slate-500">
                              Starting from
                            </p>
                            <div className="text-sm">
                              {formatPrice(tour.price)}
                              <span className="text-xs font-normal ml-1">
                                per person
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedToursSlider;
