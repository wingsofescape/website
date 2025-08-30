import React from "react";

const BookingProcess = () => {
  return (
    <div className="max-w-5xl mx-auto mt-20">
      <h3 className="text-4xl md:text-5xl font-bold mb-2 relative inline-block">
        <span className="pl-2 text-center underline decoration-[#004236] decoration-4 underline-offset-8">
          Our Booking Process
        </span>
      </h3>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {/* Step 1 */}
        <div>
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-theme-primary">
              {/* Magnifying glass icon */}
              <svg
                className="w-14 h-14 "
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 32 32"
              >
                <circle
                  cx="15"
                  cy="15"
                  r="8"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <line
                  x1="22"
                  y1="22"
                  x2="28"
                  y2="28"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-bold mb-2">
            1. Make an Enquiry
          </div>
          <div className="text-lg ">
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
            <span className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-theme-primary">
              {/* Headset icon */}
              <svg
                className="w-14 h-14 "
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 32 32"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <path
                  d="M8 20v2a4 4 0 004 4h0"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M24 20v2a4 4 0 01-4 4h0"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <rect
                  x="10"
                  y="14"
                  width="12"
                  height="6"
                  rx="3"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-bold   mb-2">
            2. Speak to an
            <br />
            Expert
          </div>
          <div className="text-lg ">
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
            <span className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-theme-primary">
              {/* Envelope icon */}
              <svg
                className="w-14 h-14 "
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
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <polyline
                  points="6,12 16,20 26,12"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-bold   mb-2">
            3. Receive a Quote
          </div>
          <div className="text-lg ">
            We craft your dream
            <br />
            holiday and send you a<br />
            quote
          </div>
        </div>
        {/* Step 4 */}
        <div>
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-theme-primary">
              {/* Passport/boarding pass icon */}
              <svg
                className="w-14 h-14 "
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
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <rect
                  x="13"
                  y="20"
                  width="6"
                  height="2"
                  rx="1"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <rect
                  x="13"
                  y="10"
                  width="6"
                  height="6"
                  rx="1"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <path
                  d="M16 13h0"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-bold   mb-2">
            4. Book Your Trip
          </div>
          <div className="text-lg ">
            Once every detail is just
            <br />
            right, we confirm your
            <br />
            booking
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;
