import { Image } from "./destinations";
export type Blogs = IBlog[];

export interface IBlog {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  blogContent: IBlogContent[];
  blogHeroImage: Image;
  slug: { current: string };
  _createdAt: string;
}

export interface IBlogContent {
  heading: string;
  subHeading: string;
  paragraph: string[];
  image: { asset: string }[];
  imagesDescription?: string;
}

export interface IWhereToGoByType {
  title: string;
  subtitle: string;
  description: string;
  herImage: Image;
  isPromoted: boolean;
  slug: string;
  content: IWhereToGoBycontent;
}

export interface IWhereToGoBycontent {
  heading: string;
  button?: string;
  href?: string;
  subHeading?: string;
  paragraph: string;
  image: Image;
  imagesDescription?: string;
}
