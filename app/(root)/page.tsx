import BookingProcess from "@/components/BookingProcess";
import { HeroBanner } from "@/components/landingPage/HeroBanner";
import { TailorMade } from "@/components/landingPage/TailorMade";
import PageSection from "@/components/shared/header/PageSection";
import Testimonials from "@/components/testimonials";
import WOEFeatures from "@/components/WOEFeatures";
import Background1 from "@/public/images/bg1.jpg";
import Background2 from "@/public/images/bg2.jpg";

export default function HomePage() {
  return (
    <>
      <div className="p-0 bg-slate-200">
        <HeroBanner />
        <div className="flex flex-col items-center w-full md:w-4/5 mx-auto bg-transparent">
          <WOEFeatures />
          <TailorMade />
        </div>
      </div>
      <div className="p-0 bg-amber-50 mt-10">
        <div className="flex flex-col items-center w-full md:w-4/5 mx-auto bg-transparent">

          <PageSection />
          <BookingProcess />

          {/* Testimonials Section */}

        </div>
      </div>
      <div className="p-0 bg-slate-200 mt-10">
        <div className="flex flex-col items-center w-full md:w-4/5 mx-auto bg-transparent">
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
        </div>
      </div>
    </>
  );
}
