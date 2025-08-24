
export interface HeroBanner {
    heroBannerButtons : IHeroBannerButton[];
    heroBannerHeading :string;
    heroBannerImage : {asset : string};
    heroBannerSubHeading :string;
}   

export interface IHeroBannerButton {
    link: string;
    title: string;
}
