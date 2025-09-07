
export interface HeroBanner {
    heroBannerButtons : IHeroBannerButton[];
    heroBannerHeading :string;
    heroBannerImage : Image;
    heroBannerSubHeading :string;
}   

export interface IHeroBannerButton {
    link: string;
    title: string;
}
type Image = { asset: string } | string;