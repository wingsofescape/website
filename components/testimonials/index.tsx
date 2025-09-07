import React from "react";

type ITestimonialSection = {
  heading: string;
  testemonials: Testemonials[];
}

type Testemonials = {
  guestReview: string;
  guestName: string;
  destinationVisited: string
}
const TestimonialCard: React.FC<{ testimonial: Testemonials }> = ({
  testimonial,
}) => {
  return (
    <div className="bg-slate-800 text-white p-6  h-full flex flex-col">
      {/* Quote content */}
      <div className="flex-grow mb-6">
        <p className="text-xs md:text-xs leading-relaxed">
          &ldquo;{testimonial.guestReview}&rdquo;
        </p>
      </div>

      {/* Author details */}
      <div className="text-center">
        <p className="font-semibold text-lg mb-1">
          {testimonial.guestName} -
        </p>
        <p className="text-sm opacity-90">{testimonial.destinationVisited}</p>
      </div>
    </div>
  );
};

const Testimonials = (props: { data: ITestimonialSection }) => {
  const { heading, testemonials } = props.data
  return (
    <section className="py-4 bg-transparent">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            {heading}
          </h2>
          <div className="w-16 h-1 bg-coral-500 mx-auto rounded-full"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testemonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
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
