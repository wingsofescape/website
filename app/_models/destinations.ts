export type Image = { asset: string } | string;

export interface IDestination {
  destinationHeroBanner: DestinationHeroBanner;
  destinationContent: DestinationContent;
  destinationTabs: string[];
  slug: string;
}

export interface IDestinationBreadcrumb {
  label: string;
  ref: string;
}

export interface DestinationHeroBanner {
  name: string;
  title: string;
  description: string;
  heroImage: { asset: string };
  keywords: string[] | undefined;
}

export interface DestinationContent {
  holidaysOverview: HolidaysOverview;
  tourIdeas: TourIdeas;
}

export interface HolidaysOverview {
  id: string;
  title: string;
  content: Content;
}

export interface Content {
  description: string;
  paragraphs: string[];
}

export interface TourIdeas {
  id: string;
  title: string;
  content: Content2;
}

export interface Content2 {
  description: string;
  paragraphs: string[];
  toursSection: ToursSection;
}

export interface ToursSection {
  recommendedToursContent: IRecommendedToursContent;
  tours: ITour[];
}

export interface IRecommendedToursContent {
  title: string;
  description: string;
}

export interface ITour {
  id: string;
  title: string;
  duration: string;
  itineraryName: string;
  description: string;
  image: Image;
  href: string;
  recommended: boolean;
  recommendedContent?: IRecommendedContent;
  countryName: string;
}

export interface IRecommendedContent {
  id: number;
  title: string;
  nights: number;
  price: number;
  image: Image;
  slug: { current: string };
}
