import React from "react";
const features = [
  { heading: "Tailored Experiences", text: "Our experts craft every trip to match your interests, style, and pace for a truly bespoke adventure." },
  { heading: "Expert Knowledge", text: "Benefit from our deep destination expertise and insider access to the world’s finest experiences." },
  { heading: "24/7 Support", text: "Travel with confidence knowing our team is available around the clock to assist you at every step." },
  { heading: "Curated Destinations", text: "We meticulously select each destination to ensure it meets our high standards of quality and authenticity." },
]
const WOEFeatures = () => {
  return (
    <section className="bg-transparent mt-10 mb-5 flex flex-nowrap text-theme-primary-dark">
      <div className="mx-auto px-8 grid md:grid-cols-4 gap-4">
        {features.map((feature, index) =>
          <div className="flex flex-col items-center text-center" key={index}>
            <h3 className="text-2xl font-bold mb-2 tracking-tight underline underline-offset-10 ">
              {feature.heading}
            </h3>
            <p className="text-gray-700 text-sm mt-5">
              {feature.text}
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default WOEFeatures;
