import React from "react";

export const Footer = () => {
  return (
    <footer>
      <div
        className="relative text-black pt-80 md:pt-94 pb-5 bg-cover bg-center text-xs"
        style={{ backgroundImage: "url('/images/footer.jpg')" }}
      >
        {/* Overlay for readability */}
        <div className="relative z-10 flex flex-col justify-center items-center flex-wrap">
          <div className="mx-auto px-6 text-center text-white">
            {/* Footer Links */}
            <div className="flex gap-8  mt-1 md:mt-0">
              <ul className="flex-1 space-y-2 text-left">
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Booking T &amp; C
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
              <ul className="flex-1 space-y-2 text-left">
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
          <div className="max-w-7xl mx-auto px-6 mt-2 pt-4 text-left">
            <span className="text-gray-300">
              Copyright © 2025 Wings Of Escape Ltd.
            </span>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-1 pt-1 text-left">
            <span className="text-gray-300">
              Version {process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"}
            </span>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
