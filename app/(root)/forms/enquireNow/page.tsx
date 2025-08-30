"use client";
import EnquireNow from "@/components/forms/enquireForm";
import React from "react";

const EnquireNowPage = () => {
  return (
    <>
      <section
        className="relative w-full h-48 flex items-center"
        style={{
          backgroundColor: "#0d3c2e",
          backgroundImage: "url('/images/banner-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-theme-primary" />
        <div className="relative z-10 max-w-6xl mx-auto w-full px-8 pb-8">
          <nav className="text-white text-sm mb-2">
            <span className="opacity-80">Home</span>
            <span className="mx-2">/</span>
            <span className="font-semibold">Plan Your Trip</span>
          </nav>
          <h1 className="text-5xl font-bold text-white">Plan Your Trip</h1>
        </div>
      </section>
      <div className="w-max flex justify-center mx-auto mt-8">
        <EnquireNow />
      </div>
    </>
  );
};

export default EnquireNowPage;
