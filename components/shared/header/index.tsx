"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import headerData from "@/data/header.json";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const router = useRouter();

  const data = useFetchData(
    POST_QUERY.header,
    SANITY_QUERY_OPTION,
    totalDestinations
  );
  // Set destinations to localStorage on client mount
  useEffect(() => {
    localStorage.setItem('destinations', JSON.stringify(data));
  }, [data]);

  const handleDestinationClick = (destinationLink: string) => {
    router.push(destinationLink);
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const RenderDropdown = ({
    data,
    openDropdown,
    setOpenDropdown,
  }: {
    data: { label: string; items: { href: string; name: string }[] };
    openDropdown: string | null;
    setOpenDropdown: (label: string | null) => void;
  }) => {
    const isOpen = openDropdown === data.label;
    return (
      <div className="relative group hidden lg:block">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : data.label)}
          className="hover:underline px-2 py-1 font-bold flex items-center"
        >
          {data.label}
          <svg
            className={`w-4 h-4 transition-transform ml-2 ${isOpen ? "rotate-180" : ""
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
        <div
          className={`absolute bg-slate-50 text-theme-primary-dark rounded z-20 w-[200px] h-fit top-10 ${isOpen ? "flex flex-col flex-wrap" : "hidden"}`}
        >
          {data.items.map(
            (item: { href: string; name: string }, index: number) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer text-xs font-semibold hover:underline"
                onClick={() => {
                  handleDestinationClick(item.href);
                }}
              >
                <p>{item.name}</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

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
    <header className="bg-background text-slate-800">
      {/* Top Banner - Hidden on mobile */}

      {/* Main Header */}
      <div className="flex justify-between items-center h-22 pl-4 lg:pl-8">
        {/* Logo */}
        <Link
          href={headerData.branding.logo.href}
          className="flex items-center flex-1"
        >
          <Image src={Logo2} alt="Logo" width={260} height={260} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex text-sm lg:text-base items-center space-x-4 flex-1">
          <RenderDropdown
            data={createDestinationList(data, "Destinations")}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <RenderDropdown
            data={headerData.navigation.inspiration}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <RenderDropdown
            data={headerData.navigation.contactUs}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          {/* {renderDropdown(headerData.navigation.contactUs)} */}

          {/* {renderDropdown(headerData.navigation.inspiration)}
          {renderDropdown(headerData.navigation.aboutUs)} */}
          {/* Search Bar */}
          {/* <form className="ml-2 hidden lg:block">
            <input
              type="text"
              placeholder={headerData.searchBar.placeholder}
              className="rounded-full px-4 py-2 border border-theme-primary-dark focus:outline-none focus:ring-2 focus:ring-theme-primary-light w-32 text-theme-primary"
            />
          </form> */}
        </nav>

        {/* Desktop CTA Button */}
        {!pathname.includes("enquireNow") && (
          <div
            className="hidden lg:flex ml-2 h-full items-center px-6 bg-theme-primary text-white font-semibold uppercase tracking-wide transition-colors duration-200 group cursor-pointer group"
            onClick={() => (window.location.href = headerData.cta.button.href)}
          >
            <button
              type="button"
              className="flex items-center focus:outline-none cursor-pointer group-hover:rounded-xl group-hover:ring hover:ring-2 px-3 py-2 antialiased transition-all duration-300 text-xs"
            >
              {headerData.cta.button.text}

              <svg
                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
        )}

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
            className={`fixed top-0 left-0 h-full w-80 max-w-sm bg-background z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="flex flex-col flex-1 justify-between">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-theme-primary-light rounded-md transition-colors text-theme-primary"
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
              {/* Navigation Items */}
              <div className="flex flex-col flex-1">
                <MobileDropdown
                  section={createDestinationList(data, "Destinations")}
                />
                <MobileDropdown section={headerData.navigation.inspiration} />
                <MobileDropdown section={headerData.navigation.contactUs} />

                {/* Mobile Search */}
                {/* <div className="p-4 border-b border-gray-200">
                  <form>
                    <input
                      type="text"
                      placeholder={headerData.searchBar.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary-light text-gray-800"
                    />
                  </form>
                </div> */}
              </div>

              {/* Mobile CTA Button */}
              <div className="p-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = headerData.cta.button.href;
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-theme-primary text-white font-semibold py-3 px-4 rounded-md hover:bg-[#3e6d65] transition-colors flex items-center justify-center"
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
