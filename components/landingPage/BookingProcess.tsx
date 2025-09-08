import React from "react";
type IBookinProcessProps = { bookingSteps: { content: string, heading: string }[], heading: string };

const BookingProcess = ({ data }: { data: IBookinProcessProps }) => {
  return (
    <div className="w-5/6 mx-auto mt-20">
      <h3 className="text-4xl md:text-5xl font-bold mb-2 relative inline-block">
        <span className="pl-2 text-center decoration-4 underline-offset-8">
          {data.heading}
        </span>
      </h3>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {data.bookingSteps.map((step: { content: string, heading: string }, index: number) =>
          <div key={index}>
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
              {index + 1}. {step.heading}
            </div>
            <div className="text-lg ">
              {step.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingProcess;
