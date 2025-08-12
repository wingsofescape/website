import Footer from "@/components/footer";
import { HeroBanner } from "@/components/landingPage/HeroBanner";
import Header from "@/components/shared/header";

import Background1 from "@/public/images/bg1.jpg";
import Background2 from "@/public/images/bg2.jpg";
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-beige p-0">
        <HeroBanner />
        <section className="bg-white py-10 flex flex-nowrap">
          <div className="mx-auto px-8 grid md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center ">
              <h3 className="text-2xl font-bold mb-2 font-serif tracking-tight underline decoration-amber-700 underline-offset-10 text-[#004236]">
                Tailored Experiences
              </h3>
              <p className="text-gray-700 text-sm mt-5">
                Our experts craft every trip to match your interests, style, and
                pace for a truly bespoke adventure.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-2 font-serif tracking-tight underline decoration-amber-700 underline-offset-10 text-[#004236]">
                Expert Knowledge
              </h3>
              <p className="text-gray-700 text-sm mt-5">
                Benefit from our deep destination expertise and insider access
                to the world’s finest experiences.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-2 font-serif tracking-tight underline decoration-amber-700 underline-offset-10 text-[#004236]">
                24/7 Support
              </h3>
              <p className="text-gray-700 text-sm mt-5">
                Travel with confidence knowing our team is available around the
                clock to assist you at every step.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-2 font-serif tracking-tight underline decoration-amber-700 underline-offset-10 text-[#004236]">
                Curated Destinations
              </h3>
              <p className="text-gray-700 text-sm mt-5">
                Travel with confidence knowing our team is available around the
                clock to assist you at every step.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-[#f7f7f5] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#004236] mb-6 font-serif">
              Your Luxury Holiday Starts Here…
            </h2>
            <p className="text-lg md:text-xl text-[#004236] mb-2">
              It’s time to elevate luxury travel out of the ordinary. Our
              experts have travelled to the farthest reaches of the world,
              exploring everything from the biggest cities to the smallest
              villages, from vast rainforests to tiny desert islands. We use our
              inside knowledge to craft trips that push the boundaries of your
              imagination. From enchanting honeymoons and inspiring family
              holidays to monumental milestone adventures, our global team of
              travel specialists are available to you 24/7 – ready to expertly
              craft your{" "}
              <a href="#" className="underline">
                tailor-made luxury holiday
              </a>{" "}
              to your tastes.
            </p>
          </div>
          <div className="max-w-5xl mx-auto mt-20">
            <h3 className="text-4xl md:text-5xl font-bold text-[#004236] font-serif mb-2 relative inline-block">
              <span className="pl-2 text-center underline decoration-[#004236] decoration-4 underline-offset-8">
                Our Booking Process
              </span>
            </h3>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {/* Step 1 */}
              <div>
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-[#FFDBDB]">
                    {/* Magnifying glass icon */}
                    <svg
                      className="w-14 h-14 text-[#004236]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 32 32"
                    >
                      <circle
                        cx="15"
                        cy="15"
                        r="8"
                        stroke="#004236"
                        strokeWidth="2.5"
                      />
                      <line
                        x1="22"
                        y1="22"
                        x2="28"
                        y2="28"
                        stroke="#004236"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#004236] font-serif mb-2">
                  1. Make an Enquiry
                </div>
                <div className="text-lg text-[#004236]">
                  Submit a holiday{" "}
                  <a href="#" className="underline">
                    enquiry
                  </a>
                  <br />
                  online or by phone
                </div>
              </div>
              {/* Step 2 */}
              <div>
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-[#FFDBDB]">
                    {/* Headset icon */}
                    <svg
                      className="w-14 h-14 text-[#004236]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 32 32"
                    >
                      <circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="#004236"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M8 20v2a4 4 0 004 4h0"
                        stroke="#004236"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M24 20v2a4 4 0 01-4 4h0"
                        stroke="#004236"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <rect
                        x="10"
                        y="14"
                        width="12"
                        height="6"
                        rx="3"
                        stroke="#004236"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#004236] font-serif mb-2">
                  2. Speak to an
                  <br />
                  Expert
                </div>
                <div className="text-lg text-[#004236]">
                  Discuss your travel plans
                  <br />
                  with your own dedicated
                  <br />
                  Travel Specialist
                </div>
              </div>
              {/* Step 3 */}
              <div>
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-[#FFDBDB]">
                    {/* Envelope icon */}
                    <svg
                      className="w-14 h-14 text-[#004236]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 32 32"
                    >
                      <rect
                        x="6"
                        y="10"
                        width="20"
                        height="14"
                        rx="3"
                        stroke="#004236"
                        strokeWidth="2.5"
                      />
                      <polyline
                        points="6,12 16,20 26,12"
                        stroke="#004236"
                        strokeWidth="2.5"
                        fill="none"
                      />
                    </svg>
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#004236] font-serif mb-2">
                  3. Receive a Quote
                </div>
                <div className="text-lg text-[#004236]">
                  We craft your dream
                  <br />
                  holiday and send you a<br />
                  quote
                </div>
              </div>
              {/* Step 4 */}
              <div>
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-[#FFDBDB]">
                    {/* Passport/boarding pass icon */}
                    <svg
                      className="w-14 h-14 text-[#004236]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 32 32"
                    >
                      <rect
                        x="10"
                        y="8"
                        width="12"
                        height="16"
                        rx="2"
                        stroke="#004236"
                        strokeWidth="2.5"
                      />
                      <rect
                        x="13"
                        y="20"
                        width="6"
                        height="2"
                        rx="1"
                        stroke="#004236"
                        strokeWidth="2"
                      />
                      <rect
                        x="13"
                        y="10"
                        width="6"
                        height="6"
                        rx="1"
                        stroke="#004236"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 13h0"
                        stroke="#004236"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#004236] font-serif mb-2">
                  4. Book Your Trip
                </div>
                <div className="text-lg text-[#004236]">
                  Once every detail is just
                  <br />
                  right, we confirm your
                  <br />
                  booking
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col md:flex-row w-full h-[600px]">
          {/* Left Block */}
          <div
            className="flex-1 flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${Background1.src})`,
            }}
          >
            <div className="bg-[#00332a]/75 p-12 rounded-none md:rounded-sm max-w-xl w-full mx-8 text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-sans mb-8">
                Traveler&apos;s Clubs
              </h2>
              <p className="text-lg text-white mb-10">
                Dreaming of a holiday but not sure where to go? Look no further
                than our monthly travel guide.
              </p>
              <button className="bg-[#FFB6A3] hover:bg-[#ff9e85] text-black font-medium px-10 py-4 rounded transition-all duration-200 text-lg shadow-lg">
                READ MORE
              </button>
            </div>
          </div>
          {/* Right Block */}
          <div
            className="flex-1 flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${Background2.src})`,
            }}
          >
            <div className="bg-[#00332a]/75 p-12 rounded-none md:rounded-sm max-w-xl w-full mx-8 text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-sans mb-8">
                When to Go Where
              </h2>
              <p className="text-lg text-white mb-10">
                Dreaming of a holiday but not sure where to go? Look no further
                than our monthly travel guide.
              </p>
              <button className="bg-[#FFB6A3] hover:bg-[#ff9e85] text-black font-medium px-10 py-4 rounded transition-all duration-200 text-lg shadow-lg">
                READ MORE
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
