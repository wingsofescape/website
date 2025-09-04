import React from "react";

const WOEFeatures = () => {
  return (
    <section className="bg-white py-10 flex flex-nowrap text-theme-primary-dark">
      <div className="mx-auto px-8 grid md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center text-center ">
          <h3 className="text-2xl font-bold mb-2 tracking-tight underline underline-offset-10 ">
            Tailored Experiences
          </h3>
          <p className="text-gray-700 text-sm mt-5">
            Our experts craft every trip to match your interests, style, and
            pace for a truly bespoke adventure.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold mb-2 tracking-tight underline underline-offset-10 ">
            Expert Knowledge
          </h3>
          <p className="text-gray-700 text-sm mt-5">
            Benefit from our deep destination expertise and insider access to
            the world’s finest experiences.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold mb-2 tracking-tight underline underline-offset-10 ">
            24/7 Support
          </h3>
          <p className="text-gray-700 text-sm mt-5">
            Travel with confidence knowing our team is available around the
            clock to assist you at every step.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold mb-2 tracking-tight underline  underline-offset-10 ">
            Curated Destinations
          </h3>
          <p className="text-gray-700 text-sm mt-5">
            Travel with confidence knowing our team is available around the
            clock to assist you at every step.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WOEFeatures;
