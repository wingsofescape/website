"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  IDestinationBreadcrumb,
  IDestination,
} from "@/app/models/destinations";
import { usePathname } from "next/navigation";
import { createBreadcrumbs } from "@/utils/createBreadcrumbs";

const HeroBanner = ({ destination }: { destination: IDestination }) => {
  const image =
    typeof destination.destinationHeroBanner.heroImage === "string"
      ? destination.destinationHeroBanner.heroImage
      : urlFor(destination.destinationHeroBanner.heroImage.asset)?.url();

  const pathname = usePathname();
  const breadCrumbs = createBreadcrumbs(pathname);

  return (
    <div className="hidden lg:block">
      <div className="relative">
        <div className="inset-0 flex">
          <div className="bg-theme-primary-dark text-white flex flex-col items-left px-25 py-5 w-1/2">
            <nav className="bg-theme-primary-dark pt-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center space-x-3 text-xs">
                  {breadCrumbs.map(
                    (crumb: IDestinationBreadcrumb, index: number) => (
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
                    )
                  )}
                </div>
              </div>
            </nav>
            <div className="w-full max-w-2xl mx-auto  my-15">
              <h1 className="text-xl xl:text-4xl font-bold mb-6 leading-tight ">
                {destination.destinationHeroBanner.title}
              </h1>
              <p className="text-white mb-8 text-xs leading-relaxed font-extralight">
                {destination.destinationHeroBanner.description}
              </p>
              <div className="pills flex gap-10">
                <div className="bg-theme-primary-light text-white rounded-4xl px-10 py-2 text-xs opacity-70 pointer-events-none">
                  Luxury
                </div>

                <div className="bg-theme-primary-light text-white rounded-4xl px-10 py-2 text-xs opacity-70 pointer-events-none">
                  Escape
                </div>
                <div className="bg-theme-primary-light text-white rounded-4xl px-10 py-2 text-xs opacity-70 pointer-events-none">
                  Historic
                </div>

              </div>
            </div>
          </div>

          <div className="relative overflow-hidden flex-1 w-1/2">
            <Image
              src={image}
              alt={destination.destinationHeroBanner.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-bottom hover:scale-105   transition-transform duration-700"
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

export default HeroBanner;
