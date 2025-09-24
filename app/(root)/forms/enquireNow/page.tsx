"use client";
import EnquireNow from "@/components/forms/enquireForm";
import Link from "next/link";
import React from "react";

const EnquireNowPage = () => {
  return (
    <>
      <section
        className="relative w-full h-48 flex items-center bg-theme-primary"
      >
        <div className="absolute inset-0 bg-theme-primary" />
        <div className="relative z-10 max-w-6xl mx-auto w-full px-8 pb-8 min-h-[20vh] flex flex-col justify-center">
          <nav className="text-white text-sm mb-2">
            <Link href={"/"}>Home</Link>
            <span> › </span>
            <span>Plan Your Trip</span>
          </nav>
          <h1 className="text-5xl font-bold text-white">Plan Your Trip</h1>
        </div>
      </section>
      <div className="w-full flex justify-center mx-auto mt-0">
        <EnquireNow />
      </div>
    </>
  );
};

export default EnquireNowPage;
