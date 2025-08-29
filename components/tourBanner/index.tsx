"use client";
import React from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createBreadcrumbs } from "@/utils/createBreadcrumbs";
import Link from "next/link";
import { ITour } from "@/app/models/tours";
import { formatPrice } from "@/utils/priceFormatter";

const TourBanner = (tour: { tour: ITour }) => {
  const pathname = usePathname();
  const breadCrumbs = createBreadcrumbs(pathname);

  return (
    <div className="hidden lg:block">
      <div className="relative">
        <div className="inset-0 flex">
          <div className="bg-theme-primary-dark text-white flex flex-col items-left px-30 py-5 w-1/2">
            <nav className="bg-theme-primary-dark pt-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center space-x-3 text-xs">
                  {breadCrumbs.map((crumb, index: number) => (
                    <React.Fragment key={index}>
                      <Link
                        href={crumb.ref}
                        className="text-white hover:text-amber-300 transition-colors duration-200"
                      >
                        {crumb.label}
                      </Link>
                      {index < breadCrumbs.length - 1 && (
                        <span className="text-gray-300 text-lg">›</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </nav>
            <div className="w-full max-w-2xl mx-auto mt-15">
              <h1 className="text-xl xl:text-4xl font-bold mb-6 font-serif leading-tight ">
                {tour.tour.title}
              </h1>
              <p className="text-gray-200 mb-12 text-md leading-relaxed">
                {tour.tour.longDescription}
              </p>
              <p className="text-gray-200 mb-2 text-sm leading-relaxed">
                🌆 {tour.tour.itineraryName}
              </p>

              <p className="text-gray-200 mb-8 text-sm leading-relaxed">
                🕙 {tour.tour.duration} tour for {formatPrice(tour.tour.price)}  {" "}
                <span className="text-xs">per person</span>
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden flex-1 w-1/2">
            <Image
              src={
                typeof tour.tour.image === "string"
                  ? tour.tour.image
                  : urlFor(tour.tour.image.asset)?.url()
              }
              alt={tour.tour.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absoluteobject-cover object-bottom hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Optional overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourBanner;
