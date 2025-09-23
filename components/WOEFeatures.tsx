import React from "react";
type IFeature = { featureHeading: string, featureContent: string }

const WOEFeatures = ({ data }: { data: IFeature[] }) => {
  return (
    <section className="bg-transparent mt-4 md:mt-10 mb-5 flex flex-nowrap text-theme-primary-dark">
      <div className="mx-auto px-8 flex flex-col md:flex-row gap-4">
        {data.map((feature: IFeature, index: number) =>
          <div className="flex flex-col items-left md:items-center text-left md:text-center" key={index}>
            <h3 className="text-md md:text-xl font-bold mb-2 tracking-tight underline underline-offset-10 ">
              {feature.featureHeading}
            </h3>
            <p className="text-gray-700 text-xs md:text-sm mt-2 md:mt-5">
              {feature.featureContent}
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default WOEFeatures;
