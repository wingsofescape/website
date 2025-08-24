export const APP_NAME = process.env.NEXT_PUBLIC_API_NAME || "WingsOfEscape";
export const APP_DESCRIPTION =
  "Discover extraordinary destinations with WingsOfEscape, your premier gateway to luxury travel and adventure.";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const POST_QUERY = {
  heroBanner: {
    name: "heroBanner",
    query: `*[
      _type == "heroBanner"
      ]{ _id, heroBannerHeading, heroBannerSubHeading, heroBannerButtons, heroBannerImage }`,
  },
  destination(dest: string) {
    return {
      name: `destination-${dest}`,
      query: `*[_type == "destination" && destinationHeading == '${dest}']{ _id, destinationHeading, destinationContent, destinationHeroBanner, destinationBreadcrumbs }`,
    };
  },
};

export const SANITY_QUERY_OPTION = { next: { revalidate: 30 } };
