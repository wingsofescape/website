"use client";
import React from "react";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
      <p className="text-gray-600">
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
    </div>
  );
};

export default NotFound;
