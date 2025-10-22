import React from "react";
import WhyWOE from "../landingPage/WhyWOE";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { env } from "process";

async function getFooterContent(): Promise<SanityDocument[]> {
  return await sanityFetch(POST_QUERY.footer, SANITY_QUERY_OPTION);
}

export const Footer = async () => {
  const res = await getFooterContent();
  const data = res?.[0];

  return (
    <footer className="bg-white">
      <WhyWOE data={data.whyWOESection} />
      <div
        className="relative text-black pt-80 pb-5 bg-cover bg-center text-xs"
        style={{ backgroundImage: "url('/images/footer.jpg')" }}
      >
        {/* Overlay for readability */}

        <div className="relative z-10 flex flex-col justify-center items-center flex-wrap">
          {/* Footer Links */}
          <div className="flex flex-wrap flex-1 space-y-2 text-left gap-4 px-6 text-white justify-center leading-1.5">
            <a href="#" className="hover:underline">
              Contact Us
            </a>
            <a href="#" className="hover:underline">
              Booking T &amp; C
            </a>
            <a href="#" className="hover:underline">
              Website Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-2 pt-4 text-left">
            <span className="text-gray-300">
              Copyright © 2025 Wings Of Escape Ltd.
            </span>
          </div>
          {process.env.NODE_ENV === "production" && (
            <span className="text-gray-300">
              Version {process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
