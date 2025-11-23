import React from "react";
type IBookinProcessProps = {
  bookingSteps: { content: string; heading: string }[];
  heading: string;
};

const BookingProcess = ({ data }: { data: IBookinProcessProps }) => {
  // Alternative filled triangle version
  const FilledRightTriangle = () => (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="#1e293b">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  const icons = [
    <svg
      key={0}
      className="w-10 h-10 "
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 32 32"
    >
      <circle cx="15" cy="15" r="8" stroke="#ffffff" strokeWidth="2.5" />
      <line
        x1="22"
        y1="22"
        x2="28"
        y2="28"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>,
    <svg
      key={1}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-headphones w-10 h-10 text-white"
      viewBox="0 0 16 16"
      stroke="currentColor"
    >
      <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5" />
    </svg>,
    <svg
      key={2}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-envelope w-10 h-10 text-white"
      viewBox="0 0 16 16"
      stroke="currentColor"
    >
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
    </svg>,
    <svg
      key={3}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-airplane w-10 h-10 text-white"
      viewBox="0 0 16 16"
      stroke="currentColor"
    >
      <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1s-.458.158-.678.599" />
    </svg>,
  ];

  return (
    <div className="w-5/6 mx-auto mt-10 md:mt-20 text-theme-primary">
      <h3 className="text-3xl md:text-4xl font-bold mb-2 relative inline-block w-full mx-auto text-center">
        <span className="pl-2">{data.heading}</span>
      </h3>
      <hr className="w-20 h-1 bg-theme-primary-accent rounded-2xl mx-auto mt-4"></hr>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {data.bookingSteps.map(
          (step: { content: string; heading: string }, index: number) => (
            <React.Fragment key={index}>
              <div className="relative">
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-theme-primary">
                    {icons[index]}
                  </span>
                </div>
                <div className="text-md font-bold mb-2">
                  {index + 1}. {step.heading}
                </div>
                <div className="text-sm ">{step.content}</div>

                {/* Triangle separator - only show if not the last step */}
                {index < data.bookingSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-theme-primary">
                    <FilledRightTriangle />
                  </div>
                )}
              </div>
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
};

export default BookingProcess;
