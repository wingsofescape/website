import React from "react";

const PageSection = ({ data }: { data: { heading: string; text: string } }) => {
  return (
    <div className="w-5/6 mx-auto mt-5 text-theme-primary">
      <h2 className="text-4xl md:text-4xl font-bold mb-6 ">{data.heading}</h2>
      <p className="text-sm md:text-lg mb-2">{data.text}</p>
    </div>
  );
};

export default PageSection;
