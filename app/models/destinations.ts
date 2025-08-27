export interface IDestination {
  destinationBreadcrumbs: IDestinationBreadcrumb[]
  destinationHeroBanner: DestinationHeroBanner
  destinationContent: DestinationContent
  destinationTabs: string[]
}

export interface IDestinationBreadcrumb {
  label: string
  ref: string
}

export interface DestinationHeroBanner {
  name: string
  title: string
  slug: string
  description: string
  heroImage: HeroImage
}

export interface HeroImage {
  asset: string
}

export interface DestinationContent {
  holidaysOverview: HolidaysOverview
  tourIdeas: TourIdeas
}

export interface HolidaysOverview {
  id: string
  title: string
  content: Content
}

export interface Content {
  description: string
  paragraphs: string[]
}

export interface TourIdeas {
  id: string
  title: string
  content: Content2
}

export interface Content2 {
  description: string
  paragraphs: string[]
  toursSection: ToursSection
}

export interface ToursSection {
  recommendedToursContent: RecommendedToursContent
  tours: Tour[]
}

export interface RecommendedToursContent {
  title: string
  description: string
}

export interface Tour {
  id: string
  title: string
  duration: string
  itineraryName: string
  description: string
  image: string
  href: string
  recommended: boolean
  recommendedContent?: RecommendedContent
}

export interface RecommendedContent {
  id: number
  title: string
  nights: number
  price: number
  image: string
  slug: string
}
