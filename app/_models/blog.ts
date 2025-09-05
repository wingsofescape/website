import { Image } from "./destinations";
export type Blogs = IBlog[]

export interface IBlog {
    title: string
    subtitle: string
    author: string
    date: string
    blogContent: IBlogContent[]
    blogHeroImage: Image
    slug: { current: string }
    _createdAt: string
}

export interface IBlogContent {
    heading: string
    subHeading: string
    paragraph: string[]
    image: { asset: string }[]
    imagesDescription?: string
}
