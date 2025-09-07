"use client";
import Link from "next/link";
import { useState } from "react";
import headerData from "@/data/header.json";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo2 from "@/public/logos/logo_2.png";
import { useFetchData } from "@/hooks/useFetchData";
import {
  POST_QUERY,
  SANITY_QUERY_OPTION,
  totalDestinations,
} from "@/lib/constants";
import { createDestinationList } from "@/utils/createDestinations";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const data = useFetchData(
    POST_QUERY.header,
    SANITY_QUERY_OPTION,
    totalDestinations
  );

  const handleDestinationClick = (destinationLink: string) => {
    router.push(destinationLink);
  };

  const renderDropdown = (section: {
    label: string;
    items: { name: string; href: string }[];
  }) => (
    <div className="relative group">
      <button className="hover:underline px-2 py-1 font-bold">
        {section.label}
      </button>
      <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
        {section.items.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:rounded cursor-pointer text-xs font-semibold"
            onClick={() => {
              handleDestinationClick(item.href);
            }}
          >
            <p>{item.name}</p>
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
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
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
    <header className="bg-white text-slate-800">
      {/* Top Banner - Hidden on mobile */}

      {/* Main Header */}
      <div className="flex justify-between  items-center h-22 pl-4 lg:pl-8">
        {/* Logo */}

        <Link
          href={headerData.branding.logo.href}
          className="flex items-center"
        >
          <Image
            src={Logo2}
            alt="Logo"
            width={225}
            height={225}
            style={{ width: "auto" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex text-sm lg:text-base items-center space-x-4">
          {renderDropdown(createDestinationList(data, "Destinations"))}
          {renderDropdown(headerData.navigation.inspiration)}
          {/* {renderDropdown(headerData.navigation.contactUs)}
          {renderDropdown(headerData.navigation.aboutUs)} */}
          {/* Search Bar */}
          <form className="ml-2">
            <input
              type="text"
              placeholder={headerData.searchBar.placeholder}
              className="rounded-full px-4 py-2 border border-theme-primary-dark focus:outline-none focus:ring-2 focus:ring-theme-primary-light w-32 text-theme-primary"
            />
          </form>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex ml-2 h-full items-center px-6 bg-theme-primary text-white font-semibold uppercase tracking-wide transition-colors duration-200 hover:bg-theme-primary-light border-none rounded-none group">
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
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-theme-primary-light transition-colors"
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
            className={`fixed top-0 left-0 h-full w-80 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-theme-primary-light text-white">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-theme-primary-light rounded-md transition-colors text-white"
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
                <MobileDropdown
                  section={createDestinationList(data, "Destinations")}
                />
                <MobileDropdown section={headerData.navigation.inspiration} />

                {/* Mobile Search */}
                <div className="p-4 border-b border-gray-200">
                  <form>
                    <input
                      type="text"
                      placeholder={headerData.searchBar.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary-light text-gray-800"
                    />
                  </form>
                </div>
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
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
