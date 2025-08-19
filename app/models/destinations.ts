export interface IDestination {
  heroBanner: HeroBanner;
  tabbedSection: TabbedSection[];
  breadcrumbs: Breadcrumb[];
}

export interface HeroBanner {
  name: string;
  title: string;
  slug: string;
  description: string;
  heroImage: string;
}

export interface Breadcrumb {
  label: string;
  href: string;
}

export interface TabbedSection {
  id: string;
  title: string;
  content: Content;
}

export interface Content {
  description: string;
  paragraphs?: string[];
  recommendedTours?: RecommendedTours;
  tours?: Tour[];
}

export interface RecommendedTours {
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  title: string;
  duration: string;
  itineraryName: string;
  description: string;
  image: string;
  href: string;
  recommended?: boolean;
  recommendedContent?: RecommendedContent;
}

export interface RecommendedContent {
  id: string;
  title: string;
  duration: string;
  image: string;
  href: string;
}
