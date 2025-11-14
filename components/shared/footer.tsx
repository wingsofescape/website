import React from "react";
import WhyWOE from "../landingPage/WhyWOE";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

async function getFooterContent(): Promise<SanityDocument[]> {
  return await sanityFetch(POST_QUERY.footer, SANITY_QUERY_OPTION);
}

export const Footer = async () => {
  const whatsapp = "/logos/whatsapp.png";

  const facebook = "/logos/facebook.png";

  const instagram = "/logos/instagram.png";

  const res = await getFooterContent();
  const data = res?.[0];

  return (
    <footer className="bg-white">
      <WhyWOE data={data.whyWOESection} />
      <div
        className="relative text-black pt-60 pb-5 bg-cover bg-center text-xs md:text-sm"
        style={{ backgroundImage: "url('/images/footer.jpg')" }}
      >
        {/* Overlay for readability */}
        {/* <div className="overlay opacity-30 bg-slate-300 h-full absolute top-0 right-0 w-full z-10" /> */}
        <div className="relative z-10 flex flex-col justify-center items-center flex-wrap pt-5 px-10">
          {/* Footer Links */}
          <div className="flex flex-row md:flex-col flex-wrap flex-1 space-y-2 text-right gap-5 px-6 text-white justify-center leading-1.5 w-full">
            <a href="/contact-us" className="hover:underline">
              Contact Us
            </a>
            <a href="/testimonials" className="hover:underline">
              Testimonials
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Booking T &amp; Cs
            </a>
            <a href="#" className="hover:underline">
              Website Terms of Use
            </a>
          </div>

          <div className=" mx-auto px-0 md:px-6 mt-5 md:mt-9  w-full text-center flex flex-col  items-center justify-center md:flex-row-reverse">
            <div className="w-full md:w-2/5 text-right flex mb-5 md:mt-0 justify-center md:justify-end items-center">
              <Link href="https://wa.me/7700984599" target="_blank" rel="noopener noreferrer">
                <Image src={whatsapp} alt="WhatsApp" width={100} height={100} className="inline-block mr-6 !h-7 !w-7 md:!h-10 md:!w-10" />
              </Link>
              <Link href="https://www.instagram.com/wingsofescape_?igsh=eDgwOXRoeWc0ODh4&utm_source=qr
" target="_blank" rel="noopener noreferrer">
                <Image src={instagram} alt="WhatsApp" width={100} height={100} className="inline-block mr-4 !h-7 !w-7 md:!h-10 md:!w-10" />
              </Link>
              <Link href="https://www.facebook.com/share/1HQKFt8EjE/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                <Image src={facebook} alt="WhatsApp" width={100} height={100} className="inline-block !h-7 !w-10 md:!h-10 md:!w-13" />
              </Link>
            </div>
            <span className="text-white w-full md:w-3/5 text-center md:text-right ">
              Copyright © 2025 Wings Of Escape Ltd.
            </span>

          </div>

          {process.env.NODE_ENV === "production" && (
            <span className="text-white">
              Version {process.env.NEXT_PUBLIC_APP_VERSION || "1.0.1"}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
