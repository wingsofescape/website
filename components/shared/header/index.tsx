"use client";

import Link from "next/link";
import { useState } from "react";
import headerData from "@/data/header.json";
import { getConfig } from "@/config/featureFlags";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isCountrySelectorVisible = getConfig("showCountrySelector");
  const isCurrencySelectorVisible = getConfig("showCurrencySelector");

  const renderDropdown = (section: {
    label: string;
    items: { name: string; href: string }[];
  }) => (
    <div className="relative group">
      <button className="hover:underline px-2 py-1">{section.label}</button>
      <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
        {section.items.map((item) => (
          <li
            key={item.name}
            className="px-4 py-2 hover:bg-amber-100 hover:rounded cursor-pointer text-xs font-semibold"
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const MobileDropdown = ({
    section,
  }: {
    section: { label: string; items: { name: string; href: string }[] };
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-gray-200">
        <button
          className="w-full text-left px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {section.label}
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="bg-gray-50">
            {section.items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="bg-amber-700 text-white">
      {/* Top Banner - Hidden on mobile */}
      <div
        className="hidden md:flex top-0 left-0 w-full bg-amber-900 text-white text-sm justify-between items-center px-6 py-1 z-10"
        id="banner"
      >
        <div
          className={`flex items-center ${
            isCountrySelectorVisible || isCurrencySelectorVisible
              ? "space-x-4"
              : ""
          }`}
        >
          {isCountrySelectorVisible && (
            <label>
              {headerData.topBanner.countrySelector.label}
              <select className="ml-2 bg-amber-900 rounded px-2 py-1 text-white">
                {headerData.topBanner.countrySelector.options.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
          )}
          {isCurrencySelectorVisible && (
            <label>
              {headerData.topBanner.currencySelector.label}
              <select className="ml-2 bg-amber-900 rounded px-2 py-1 text-white">
                {headerData.topBanner.currencySelector.options.map(
                  (currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  )
                )}
              </select>
            </label>
          )}
        </div>
        <div className="hidden lg:block">
          {headerData.topBanner.contactInfo.text}{" "}
          <span className="font-semibold">
            {headerData.topBanner.contactInfo.phone}
          </span>{" "}
          |{" "}
          <span className="underline">
            {headerData.topBanner.contactInfo.email}
          </span>
        </div>
      </div>
      {/* Main Header */}
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 h-16 md:h-20">
        {/* Logo */}
        <Link href={headerData.branding.logo.href}>
          <h1 className="text-2xl md:text-4xl font-bold font-serif bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent drop-shadow-lg tracking-wide">
            {headerData.branding.logo.text}
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex text-sm items-center space-x-4">
          {renderDropdown(headerData.navigation.destinations)}
          {renderDropdown(headerData.navigation.holidayIdeas)}
          {renderDropdown(headerData.navigation.inspiration)}
          {renderDropdown(headerData.navigation.kidsClub)}
          {renderDropdown(headerData.navigation.adventurePrivate)}
          {renderDropdown(headerData.navigation.aboutUs)}
          {/* Search Bar */}
          <form className="ml-2">
            <input
              type="text"
              placeholder={headerData.searchBar.placeholder}
              className="rounded-full px-4 py-2 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-30 text-gray-800"
            />
          </form>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex ml-2 h-full items-center px-6 bg-[#004236] text-white font-semibold uppercase tracking-wide transition-colors duration-200 hover:bg-[#3e6d65] border-none rounded-none group">
          <button
            type="button"
            onClick={() => (window.location.href = headerData.cta.button.href)}
            className="flex items-center focus:outline-none"
          >
            {headerData.cta.button.text}
            <svg
              className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-amber-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Sheet Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sheet Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-80 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-amber-700 text-white">
              <h2 className="text-xl font-bold font-serif bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent drop-shadow-lg tracking-wide">
                {headerData.branding.logo.text}
              </h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-amber-600 rounded-md transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex flex-col h-full overflow-y-auto">
              {/* Navigation Items */}
              <div className="flex-1">
                <MobileDropdown section={headerData.navigation.destinations} />
                <MobileDropdown section={headerData.navigation.holidayIdeas} />
                <MobileDropdown section={headerData.navigation.inspiration} />
                <MobileDropdown section={headerData.navigation.kidsClub} />
                <MobileDropdown
                  section={headerData.navigation.adventurePrivate}
                />
                <MobileDropdown section={headerData.navigation.aboutUs} />

                {/* Mobile Search */}
                <div className="p-4 border-b border-gray-200">
                  <form>
                    <input
                      type="text"
                      placeholder={headerData.searchBar.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800"
                    />
                  </form>
                </div>

                {/* Mobile Selectors (if enabled) */}
                {(isCountrySelectorVisible || isCurrencySelectorVisible) && (
                  <div className="p-4 border-b border-gray-200 space-y-3">
                    {isCountrySelectorVisible && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {headerData.topBanner.countrySelector.label}
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800">
                          {headerData.topBanner.countrySelector.options.map(
                            (country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    )}
                    {isCurrencySelectorVisible && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {headerData.topBanner.currencySelector.label}
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800">
                          {headerData.topBanner.currencySelector.options.map(
                            (currency) => (
                              <option key={currency} value={currency}>
                                {currency}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile CTA Button */}
              <div className="p-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = headerData.cta.button.href;
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#004236] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#3e6d65] transition-colors flex items-center justify-center"
                >
                  {headerData.cta.button.text}
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Contact Info */}
                <div className="mt-4 text-center text-sm text-gray-600">
                  <div className="font-semibold">
                    {headerData.topBanner.contactInfo.phone}
                  </div>
                  <div className="text-xs">
                    {headerData.topBanner.contactInfo.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
