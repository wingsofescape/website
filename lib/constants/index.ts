export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Wings Of Escape";
export const APP_DESCRIPTION =
  "Discover extraordinary destinations with WingsOfEscape, your premier gateway to luxury travel and adventure.";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const POST_QUERY = {
  homePage: {
    name: "homePage",
    query: `*[
      _type == "homePage"
      ]{ _id, heroBannerHeading, heroBannerSubHeading, heroBannerButtons, heroBannerImage, features, tailorMadeSection , luxuryHolidaySection, bookingProcess, whereToGoSection, testemonialsSection, whyWOESection }`,
  },
  header: {
    name: "header",
    query: `*[_type == "destination"]{destinationHeading , slug}`,
  },
  destinationList: {
    name: 'Destination List',
    query: `*[_type == "destination" && defined(slug) ]{"destinationName": slug }`,
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
  blogs: {
    name: "blogs",
    query: `*[_type == "blog"] | order(date desc){_createdAt, blogHeroImage, author, slug, title, date}`,
  },
  getblog(blogSlug: { slug: string }) {
    return {
      name: `Blog - ${blogSlug}`,
      query: `*[_type == "blog" && slug.current == '${blogSlug.slug}']{blogContent, blogHeroImage, author, slug, title, date, subtitle}`,
    };
  },
  blogsList: {
    name: "blogsList",
    query: `*[_type == "blog" && defined(slug.current)]{"slug": slug.current}`,
  }
};

export const SANITY_QUERY_OPTION = { next: { revalidate: 60 }, useCdn: true };

export const totalDestinations = [
  { destinationHeading: "Sri Lanka", slug: "srilanka" },
  { destinationHeading: "Azerbaijan", slug: "azerbaijan" },
  { destinationHeading: "Thailand", slug: "thailand" },
  { destinationHeading: "Oman", slug: "oman" },
  { destinationHeading: "Hong kong", slug: "hongkong" },
  { destinationHeading: "Vietnam", slug: "vietnam" },
  { destinationHeading: "Indonesia", slug: "indonesia" },
  { destinationHeading: "Malaysia", slug: "malaysia" },
  { destinationHeading: "Maldives", slug: "maldives" },
  { destinationHeading: "Mauritius", slug: "mauritius" },
  { destinationHeading: "UAE", slug: "uae" },
  { destinationHeading: "Singapore", slug: "singapore" },
];
