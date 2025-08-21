"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sriLanka from "@/data/countries/SriLanka/sriLanka.json"; // Adjust the import based on your data structure
import { TopTours } from "@/components/topTours";

const Destination = () => {
  // This would typi
  // cally come from your CMS or API
  const [activeTab, setActiveTab] = useState(0);
  const destination = sriLanka;

  const getActiveTabContent = () => {
    return destination.tabbedSection[activeTab] || destination.tabbedSection[0];
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
              {destination.breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <Link
                    href={crumb.href}
                    className="text-white hover:text-amber-300 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                  {index < destination.breadcrumbs.length - 1 && (
                    <span className="text-gray-300">›</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>

          {/* Mobile Hero Image */}
          <div className="relative h-64 md:h-80">
            <Image
              src={destination.heroBanner.heroImage}
              alt={destination.heroBanner.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Mobile Content */}
          <div className="bg-theme-primary-dark text-white px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
              {destination.heroBanner.title}
            </h1>
            <p className="text-gray-200 mb-6 leading-relaxed">
              {destination.heroBanner.description}
            </p>
          </div>
        </div>

        {/* Desktop Design - Half and Half Layout */}
        <div className="hidden lg:block">
          {/* Desktop Hero Section - Half and Half */}
          <div className="relative ">
            <div className="inset-0 grid grid-cols-2">
              {/* Left Half - Content */}
              <div className="bg-theme-primary-dark text-white flex flex-col items-left px-30 py-5">
                {/* Desktop Breadcrumbs */}
                <nav className="bg-theme-primary-dark pt-4">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex items-center space-x-3 text-xs">
                      {destination.breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                          <Link
                            href={crumb.href}
                            className="text-white hover:text-amber-300 transition-colors duration-200"
                          >
                            {crumb.label}
                          </Link>
                          {index < destination.breadcrumbs.length - 1 && (
                            <span className="text-gray-300 text-lg">›</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </nav>
                <div className="w-full max-w-2xl mx-auto  mt-5">
                  <h1 className="text-xl xl:text-4xl font-bold mb-6 font-serif leading-tight ">
                    {destination.heroBanner.title}
                  </h1>
                  <p className="text-gray-200 mb-8 text-lg leading-relaxed">
                    {destination.heroBanner.description}
                  </p>
                </div>
              </div>

              {/* Right Half - Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={destination.heroBanner.heroImage}
                  alt={destination.heroBanner.title}
                  fill
                  className="object-cover object-bottom hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Optional overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the destination page content would go here */}

      <section className="py-8 px-4 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center lg:justify-start border-b border-gray-200">
              {destination.tabbedSection.map((tab, index) => (
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

          {/* Tab Content */}
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
                    (paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-700 leading-relaxed mb-6"
                      >
                        {paragraph}
                      </p>
                    )
                  )}
              </div>

              {/* Call-to-Action */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/enquire"
                    className="inline-flex items-center justify-center px-6 py-3 bg-theme-primary-dark text-white font-semibold rounded-lg hover:bg-[#004236] transition-colors duration-300"
                  >
                    Plan Your Journey
                    <svg
                      className="ml-2 w-5 h-5"
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
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#00332a] text-[#00332a] font-semibold rounded-lg hover:bg-theme-primary-dark hover:text-white transition-all duration-300"
                  >
                    Speak to an Expert
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the destination page content would go here */}
      <TopTours />
    </div>
  );
};

export default Destination;
