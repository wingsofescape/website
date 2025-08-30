import BookingProcess from "@/components/BookingProcess";
import { HeroBanner } from "@/components/landingPage/HeroBanner";
import PageSection from "@/components/shared/header/PageSection";
import Testimonials from "@/components/testimonials";
import WOEFeatures from "@/components/WOEFeatures";
import Background1 from "@/public/images/bg1.jpg";
import Background2 from "@/public/images/bg2.jpg";

export default function HomePage() {
  return (
    <>
      <main className="bg-beige p-0">
        <HeroBanner />
        <WOEFeatures />
        <section className="bg-[#f7f7f5] py-12 px-4 text-theme-primary-dark">
          <PageSection />
          <BookingProcess />
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        <section className="flex flex-col md:flex-row w-full md:h-[600px]">
          {/* Left Block */}
          <div
            className="flex-1 flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${Background1.src})`,
            }}
          >
            <div className="bg-theme-primary-dark/75 p-12 rounded-none md:rounded-sm max-w-xl w-full mx-8 text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Traveler&apos;s Clubs
              </h2>
              <p className="text-lg text-white mb-10">
                Dreaming of a holiday but not sure where to go? Look no further
                than our monthly travel guide.
              </p>
              <button className="bg-theme-primary-dark hover:bg-theme-primary text-white font-medium px-10 py-4 rounded transition-all duration-200 text-lg shadow-lg">
                READ MORE
              </button>
            </div>
          </div>
          {/* Right Block */}
          <div
            className="flex-1 flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${Background2.src})`,
            }}
          >
            <div className="bg-theme-primary-dark/75 p-12 rounded-none md:rounded-sm max-w-xl w-full mx-8 text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                When to Go Where
              </h2>
              <p className="text-lg text-white mb-10">
                Dreaming of a holiday but not sure where to go? Look no further
                than our monthly travel guide.
              </p>
              <button className="bg-theme-primary-dark hover:bg-theme-primary text-white font-medium px-10 py-4 rounded transition-all duration-200 text-lg shadow-lg">
                READ MORE
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
