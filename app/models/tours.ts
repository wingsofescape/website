type Image = { asset: string } | string;

export interface IDestinationTours {
  description: string[];
  tours: ITour[];
  recommendedToursContent: IRecommendedToursContent;
}

export interface IRecommendedToursContent {
  title: string;
  description: string;
}

export interface ITour {
  id: string;
  slug: { current: string };
  title: string;
  duration: string;
  itineraryName: string;
  price: number;
  image: Image;
  description: string;
  longDescription: string;
  highlights: string[];
  recommended: boolean;
  recommendedContent: RecommendedContent;
  itinerary: Itinerary[];
}

export interface RecommendedContent {
  id: number;
  title: string;
  nights: number;
  price: number;
  image: Image;
  slug: string;
}

export interface Itinerary {
  day: number;
  title: string;
  description: string;
  image: Image[]
}
