export interface IDestination {
  heroBanner: IHeroBanner;
  tabbedSection: ITabbedSection[];
  breadcrumbs: IBreadcrumb[];
}

export interface IHeroBanner {
  name: string;
  title: string;
  slug: string;
  description: string;
  heroImage: string;
}

export interface IBreadcrumb {
  label: string;
  ref: string;
}

export interface ITabbedSection {
  id: string;
  title: string;
  content: IContent;
}

export interface IContent {
  description: string;
  paragraphs?: string[];
  toursSection?: ITourSection;
}
export interface ITourSection {
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
  duration?: string;
  itineraryName: string;
  description: string;
  image: string;
  href?: string;
  recommended: boolean;
  recommendedContent?: IRecommendedContent;
}

export interface IRecommendedContent {
  id: number;
  title: string;
  duration?: string;
  image: string;
  href?: string;
  nights : number;
  price: number;
  slug: string;
}
