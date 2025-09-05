import React from "react";

const cards = [
    {
        title: "Travel That Takes You further and deeper",
        image: "/images/tailorMade1.jpg",
    },
    {
        title: "Hotel Offers",
        image: "/images/tailorMade2.jpg",
    },
    {
        title: "Best Places for Winter Sun",
        image: "/images/tailorMade3.jpg",
    },
    {
        title: "Luxury Ski Holidays",
        image: "/images/tailorMade5.jpg",
    },
    {
        title: "Wildlife Holidays",
        image: "/images/tailorMade4.jpg",
    },
    {
        title: "October Half Term",
        image: "/images/tailorMade6.jpg",
    },
];

export async function TailorMade() {
    return (
        <section className="flex flex-col-reverse lg:flex-row gap-8 px-4 py-10 bg-transparent justify-center">
            {/* Left Side */}
            <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto lg:mx-0">
                <h1 className="text-3xl md:text-4xl font-bold text-theme-primary-dark mb-4 leading-tight">
                    Tailor-Made Luxury Holidays with Wings of Escape
                </h1>
                <div className="w-12 h-1 bg--theme-primary-light mb-6" />
                <p className="text-base md:text-lg text-theme-primary-dark mb-8">
                    Since 1986, we have worked tirelessly to become the award-winning{" "}
                    <a
                        href="#"
                        className="underline text-theme-primary-dark hover:text--theme-primary-light transition"
                    >
                        luxury travel agency
                    </a>{" "}
                    that we are today. With our seamless service, insider insight and carefully curated collection, we create bespoke luxury holidays that deliver one-of-a-kind experiences. Delve deep into destinations on privately guided tours, enjoy exclusive access to the world’s most sought-after sites and embark on journeys that are truly out of the ordinary, each one designed uniquely for you.
                    <br />
                    Using our meticulously vetted selection of accommodation, experiences and guides, we ensure the highest level of luxury travel for our guests.
                </p>
                <button className="border-2 border-theme-primary-dark text-theme-primary-dark px-6 py-3 rounded-none font-semibold text-base hover:bg-theme-primary-dark hover:text-white transition mb-8 w-full md:w-fit">
                    DISCOVER OUR LUXURY HOLIDAYS
                </button>
                {/* Badges would go here */}
            </div>
            {/* Right Side */}
            <div className="flex-1 flex flex-wrap gap-6 justify-center items-center">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="relative w-full sm:w-[48%] lg:w-[31%] h-56 md:h-64 rounded-none overflow-hidden flex items-end mb-4"
                        style={{ background: "#fff" }}
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-10 w-full text-center pb-6 px-2">
                            <span className="text-white text-lg md:text-lg">
                                {card.title}
                            </span>
                        </div>
                        <div className="absolute inset-0 bg-black/30" />
                    </div>
                ))}
            </div>
        </section>
    );
}