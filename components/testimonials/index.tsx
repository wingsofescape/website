"use client";

import React from "react";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  date: string;
  destination: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "This was probably our best holiday ever. Sri Lanka is a wonderful country with history, culture, wildlife, cuisine, scenery and lovely people. Itinerary ideal, hotels all superb. What made our holiday so special was the attention of our driver/guide.",
    author: "HB",
    date: "March 2025",
    destination: "Travelled to Sri Lanka",
  },
  {
    id: 2,
    content:
      "Ella really listened to the brief (which was very specific) and delivered on every detail. The hotels were perfect for our family and the whole trip was completely stress free.",
    author: "LM",
    date: "March 2025",
    destination: "Travelled to Sri Lanka",
  },
  {
    id: 3,
    content:
      "Overall the excursions were amazing. The tour of Galle fort, the tea factory, the kayaking, the snorkelling at pigeon island, the temple of the tooth, bicycling around Anurhadapura, the scenic sunset trip - all were very special.",
    author: "HPJ",
    date: "September 2024",
    destination: "Travelled to Sri Lanka",
  },
  {
    id: 4,
    content:
      "This was one of the best family holidays we have ever had. Sri Lanka is absolutely stunning. It was an adventure where we all bonded and absolutely loved every hotel and every experience.",
    author: "RS",
    date: "August 2024",
    destination: "Travelled to Sri Lanka",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="bg-slate-800 text-white p-6  h-full flex flex-col">
      {/* Quote content */}
      <div className="flex-grow mb-6">
        <p className="text-xs md:text-xs leading-relaxed">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      {/* Author details */}
      <div className="text-center">
        <p className="font-semibold text-lg mb-1">
          {testimonial.author} - {testimonial.date}
        </p>
        <p className="text-sm opacity-90">{testimonial.destination}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            What Our Guests Have Said
          </h2>
          <div className="w-16 h-1 bg-coral-500 mx-auto rounded-full"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            type="button"
            className="bg-theme-primary-dark hover:bg-theme-primary-light text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200 uppercase tracking-wide text-sm md:text-base"
          >
            VIEW ALL TESTIMONIALS
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
