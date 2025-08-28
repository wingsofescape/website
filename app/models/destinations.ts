export interface IDestination {
  destinationBreadcrumbs: IDestinationBreadcrumb[];
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
  heroImage: HeroImage;
}

export interface HeroImage {
  asset: string;
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
  image: string;
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
  image: { asset: string };
  slug: string;
}
