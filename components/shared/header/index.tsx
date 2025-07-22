"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-amber-700 text-white">
      <div
        className="top-0 left-0 w-full bg-amber-900 text-white text-sm flex justify-between items-center px-6 py-1 z-10"
        id="banner"
      >
        <div className="flex items-center space-x-4">
          <label>
            Country:
            <select className="ml-2 bg-amber-900  rounded px-2 py-1 text-white">
              <option>USA</option>
              <option>Canada</option>
              <option>UK</option>
              <option>Australia</option>
            </select>
          </label>
          <label>
            Currency:
            <select className="ml-2 bg-amber-900  rounded px-2 py-1 text-white">
              <option>USD</option>
              <option>CAD</option>
              <option>GBP</option>
              <option>AUD</option>
            </select>
          </label>
        </div>
        <div>
          Travel questions? Speak to an expert 24/7:{" "}
          <span className="font-semibold">+1 (800) 123-4567</span> |{" "}
          <span className="underline">info@tourcompany.com</span>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center pl-6 h-20 ">
        <Link href={"/"}>
          <h1 className="text-4xl font-bold">Explores</h1>
        </Link>
        <nav className="text-sm flex items-center space-x-4">
          {/* Dropdown Menus */}
          <div className="relative group">
            <button className="hover:underline px-2 py-1">Destinations</button>
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Europe
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Asia
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Africa
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Americas
              </li>
            </ul>
          </div>
          <div className="relative group">
            <button className="hover:underline px-2 py-1">Holiday Ideas</button>
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Beach Holidays
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Adventure
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Family Trips
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Luxury Escapes
              </li>
            </ul>
          </div>
          <div className="relative group">
            <button className="hover:underline px-2 py-1">Inspiration</button>
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Travel Guides
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Blog
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Stories
              </li>
            </ul>
          </div>
          <div className="relative group">
            <button className="hover:underline px-2 py-1">
              Explore Kids Club
            </button>
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Activities
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Family Offers
              </li>
            </ul>
          </div>
          <div className="relative group">
            <button className="hover:underline px-2 py-1">
              Explorer Private
            </button>
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Private Tours
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Exclusive Deals
              </li>
            </ul>
          </div>
          <div className="relative group">
            <button className="hover:underline px-2 py-1">About Us</button>
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Our Story
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Contact
              </li>
              <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                Careers
              </li>
            </ul>
          </div>
          {/* Search Bar */}
          <form className="ml-2">
            <input
              type="text"
              placeholder="Search"
              className="rounded-full px-4 py-2 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-30"
            />
          </form>
        </nav>
        {/* Enquire Now Button */}
        <div className="ml-2 h-full flex items-center px-6 bg-[#004236] text-white font-semibold uppercase tracking-wide transition-colors duration-200 hover:bg-[#3e6d65] border-none rounded-none group">
          <button
            type="button"
            onClick={() => (window.location.href = "/forms/enquireNow")}
            className="flex items-center focus:outline-none"
          >
            Enquire Now
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
      </div>
    </header>
  );
};

export default Header;
