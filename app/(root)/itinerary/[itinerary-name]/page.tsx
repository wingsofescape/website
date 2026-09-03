import { notFound } from "next/navigation";
import Itinerary from "../page";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { sanityFetch } from "@/sanity/lib/fetch";

type PageProps = {
    params: Promise<{ "itinerary-name": string }>;
};

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
    const itineraries = await sanityFetch(
        POST_QUERY.itinerariesList,
        SANITY_QUERY_OPTION,
    );
    return itineraries.map(({ slug }: { slug: string }) => ({
        "itinerary-name": slug,
    }));
}

export default async function CuratedItinerary({ params }: PageProps) {
    const { "itinerary-name": slug } = await params;
    const itinerary = await sanityFetch(
        POST_QUERY.getCuratedItinerary({ slug }),
        SANITY_QUERY_OPTION,
    );

    if (!itinerary[0]) notFound();

    return <Itinerary itineraryData={itinerary[0]} />;
}
