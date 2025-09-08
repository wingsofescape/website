import BookingProcess from "@/components/landingPage/BookingProcess";
import { HeroBanner } from "@/components/landingPage/HeroBanner";
import { TailorMade } from "@/components/landingPage/TailorMade";
import PageSection from "@/components/shared/header/PageSection";
import Testimonials from "@/components/testimonials";
import WOEFeatures from "@/components/WOEFeatures";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import Background1 from "@/public/images/bg1.jpg";
import Background2 from "@/public/images/bg2.jpg";
import { sanityFetch } from "@/sanity/lib/fetch";
import { IHeroBannerButton } from "../_models/heroBanner";
import { SanityDocument } from "next-sanity";
import WhyWOE from "@/components/landingPage/WhyWOE";

async function getHomePageContent(): Promise<SanityDocument[]> {
  return await sanityFetch(POST_QUERY.homePage, SANITY_QUERY_OPTION);
}

export default async function HomePage() {
  const res = await getHomePageContent();
  const data = res?.[0];
  console.log(data);
  const heroBannerData = {
    heroBannerHeading: data.heroBannerHeading,
    heroBannerSubHeading: data.heroBannerSubHeading,
    heroBannerButtons: data.heroBannerButtons as IHeroBannerButton[],
    image: data.heroBannerImage,
  };

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <div className="p-0 bg-slate-200">
        <HeroBanner data={heroBannerData} />
        <div className="flex flex-col items-center w-full md:w-4/5 mx-auto bg-transparent">
          <WOEFeatures data={data.features} />
          <TailorMade data={data.tailorMadeSection} />
        </div>
      </div>
      <div className="p-0 mt-10">
        <div className="flex flex-col items-center w-full md:w-4/5 mx-auto bg-transparent">
          <PageSection data={data?.luxuryHolidaySection} />
          <BookingProcess data={data.bookingProcess} />

          {/* Testimonials Section */}
        </div>
      </div>
      <div className="p-0 bg-white mt-10">
        <div className="flex flex-col items-center w-full md:w-4/5 mx-auto bg-transparent">
          <Testimonials data={data.testemonialsSection} />
          <section className="flex flex-col md:flex-row w-full md:h-[600px]">
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
                  Dreaming of a holiday but not sure where to go? Look no
                  further than our monthly travel guide.
                </p>
                <button className="bg-theme-primary-dark hover:bg-theme-primary text-white font-medium px-10 py-4 rounded transition-all duration-200 text-lg shadow-lg">
                  READ MORE
                </button>
              </div>
            </div>
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
                  Dreaming of a holiday but not sure where to go? Look no
                  further than our monthly travel guide.
                </p>
                <button className="bg-theme-primary-dark hover:bg-theme-primary text-white font-medium px-10 py-4 rounded transition-all duration-200 text-lg shadow-lg">
                  READ MORE
                </button>
              </div>
            </div>
          </section>
          <WhyWOE data={data.whyWOESection} />
        </div>
      </div>

    </>
  );
}
