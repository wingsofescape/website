export type Blogs = IBlog[]

export interface IBlog {
    title: string
    subtitle: string
    author: string
    date: string
    blogContent: IBlogContent[]
}

export interface IBlogContent {
    heading: string
    subHeading: string
    paragraphs: string[]
    images: string[]
    imagesDescription?: string
}
