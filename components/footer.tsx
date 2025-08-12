import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#00332a] text-white pt-14 pb-7">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Newsletter */}
        <div>
          <h2 className="text-3xl font-bold mb-4 font-sans">Newsletter</h2>
          <p className="text-lg mb-8">
            Sign up below to receive travel inspiration, news, offers and expert
            tips.
          </p>
          <form className="mb-6">
            <div className="flex items-center bg-white rounded w-full h-14 px-6 mb-6">
              <svg
                className="w-5 h-5 text-gray-400 mr-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect
                  width="20"
                  height="14"
                  x="2"
                  y="5"
                  rx="2"
                  stroke="currentColor"
                />
                <path stroke="currentColor" d="M22 7.5 12 15 2 7.5" />
              </svg>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-full bg-transparent outline-none text-base text-gray-800"
                required
              />
            </div>
            <button
              type="submit"
              className="w-1/2 bg-[#FFB6A3] hover:bg-[#ff9e85] text-black font-medium py-3 rounded transition-all duration-200 text-base"
            >
              SIGN UP
            </button>
          </form>
          <p className="text-sm text-white mt-8">
            I consent to receive promotional emails from WingsOfEscape and
            understand that the personal data I provide will be used for this
            purpose in accordance with the{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            . You can unsubscribe from marketing emails at any time.
          </p>
          {/* Logos */}
          {/* <div className="flex flex-wrap items-center gap-6 mt-10">
            <img src="/logo1.png" alt="Award" className="h-12" />
            <img src="/logo2.png" alt="Protected" className="h-12" />
            <img src="/logo3.png" alt="IATA" className="h-12" />
            <img src="/logo4.png" alt="ABTOT" className="h-12" />
            <img src="/logo5.png" alt="Conscious Travel" className="h-12" />
            <img src="/logo6.png" alt="British Airways" className="h-12" />
          </div> */}
        </div>
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 text-sm mt-8 md:mt-0">
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Modern Slavery Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Travel Aware
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Legalities
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Booking Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Website Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Travel Restrictions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Why WingsOfEscape
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Meet the Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Photo Credits
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our Partners
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Responsible Travel
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Press Centre
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our Blog
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Continue Exploring */}
      <div className="max-w-7xl mx-auto px-6 mt-12 border-t border-[#1a4d43] pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
        <span className="text-xl font-semibold">Continue exploring:</span>
        <a href="#" className="ml-2 hover:underline text-base">
          Luxury Thailand Holidays 2025/2026
        </a>
        <a href="#" className="ml-2 hover:underline text-base">
          Luxury Japan Holidays 2025/2026
        </a>
        <a href="#" className="ml-2 hover:underline text-base">
          Luxury Italy Holidays 2025/2026
        </a>
      </div>
      {/* Accessibility Icon */}
      {/* <button
        className="fixed left-6 bottom-6 bg-[#FFB6A3] w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50"
        aria-label="Accessibility"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="19" r="2" />
          <path
            d="M12 17v-6m0 0c-2.5 0-5-1-5-3m5 3c2.5 0 5-1 5-3m-5 3V7m0-2a2 2 0 100-4 2 2 0 000 4z"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button> */}
    </footer>
  );
};

export default Footer;
