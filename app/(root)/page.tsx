import BookingProcess from "@/components/landingPage/BookingProcess";
import { HeroBanner } from "@/components/landingPage/HeroBanner";
import PageSection from "@/components/shared/header/PageSection";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { sanityFetch } from "@/sanity/lib/fetch";
import { IHeroBannerButton } from "../_models/heroBanner";
import { SanityDocument } from "next-sanity";
import WhatsHot from "@/components/landingPage/WhatsHot";
import RecommendedToursSlider, {
  IRecommendedTour,
} from "@/components/recommendedTours";
import PlanYourTrip from "@/components/landingPage/PlanYourTrip";

async function getHomePageContent(): Promise<SanityDocument[]> {
  return await sanityFetch(POST_QUERY.homePage, SANITY_QUERY_OPTION);
}

async function getRecommendedTours(): Promise<IRecommendedTour[]> {
  return await sanityFetch(POST_QUERY.getRecommendedTours, SANITY_QUERY_OPTION);
}
export default async function HomePage() {
  const res = await getHomePageContent();
  const data = res?.[0];
  const heroBannerData = {
    heroBannerHeading: data.heroBannerHeading,
    heroBannerSubHeading: data.heroBannerSubHeading,
    heroBannerButtons: data.heroBannerButtons as IHeroBannerButton[],
    image: data.heroBannerImage,
  };
  const res1 = await getRecommendedTours();
  console.log(res1, data);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <div className="p-0">
        <HeroBanner data={heroBannerData} />
        <div className="flex flex-col items-center w-full md:w-11/12 mx-auto bg-transparent"></div>
      </div>
      <div className="p-0">
        <div className="flex flex-col items-center w-full mx-auto bg-transparent">
          <RecommendedToursSlider
            recommendedToursContent={res1 as IRecommendedTour[]}
          />
        </div>
      </div>
      <div className="p-0">
        <div className="flex flex-col items-center w-full md:w-11/12 mx-auto bg-transparent">
          {/* Recommended Tours Slider */}
          <PageSection data={data?.luxuryHolidaySection} />
          <BookingProcess data={data.bookingProcess} />
        </div>
      </div>

      <div className="p-0 bg-white mt-10">
        <div className="flex flex-col items-center w-full md:w-11/12 mx-auto bg-transparent">
          <WhatsHot data={data?.whatsHotSection} />
          {/* <WhereToGoSection data={data?.whereToGoSection} /> */}
          {/* <Testimonials data={data.testemonialsSection} /> */}
        </div>
        <PlanYourTrip page="landing" />

      </div>

    </>
  );
}
