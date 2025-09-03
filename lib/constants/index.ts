export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Wings Of Escape";
export const APP_DESCRIPTION =
  "Discover extraordinary destinations with WingsOfEscape, your premier gateway to luxury travel and adventure.";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const POST_QUERY = {
  landingPage: {
    name: "landingPage",
    query: `*[
      _type == "landingPage"
      ]{ _id, heroBannerHeading, heroBannerSubHeading, heroBannerButtons, heroBannerImage }`,
  },
  header: {
    name: "header",
    query: `*[_type == "destination"]{destinationHeading , slug}`,
  },
  destination(destSlug: string) {
    return {
      name: `destination-${destSlug}`,
      query: `*[_type == "destination" && slug == '${destSlug}']{ _id, destinationHeading, destinationContent, destinationHeroBanner, recommendedToursContent}`,
    };
  },
  tours(destSlug: string) {
    return {
      name: `${destSlug} - tours`,
      query: `*[_type == "tour" && countryName == '${destSlug}']`,
    };
  },
  singleTour(tourSlug: string) {
    return {
      name: `Tour - ${tourSlug}`,
      query: `*[_type == "tour" && slug.current == '${tourSlug}']`,
    };
  },
};

export const SANITY_QUERY_OPTION = { next: { revalidate: 30 } };

export const totalDestinations = [
  { name: "Bali", href: "/destination/bali" },
  { name: "Sri Lanka", href: "/destination/srilanka" },
];
