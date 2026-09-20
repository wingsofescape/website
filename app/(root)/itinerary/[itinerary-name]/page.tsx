import { notFound } from "next/navigation";
import Itinerary from "../page";
import { POST_QUERY } from "@/lib/constants";
import { sanityFetch } from "@/sanity/lib/fetch";

type PageProps = {
    params: Promise<{ "itinerary-name": string }>;
};

export const dynamic = "force-dynamic";

export default async function CuratedItinerary({ params }: PageProps) {
    const { "itinerary-name": slug } = await params;
    const itinerary = await sanityFetch(
        POST_QUERY.getCuratedItinerary({ slug }),
        { cache: "no-store" },
    );

    if (!itinerary[0]) notFound();

    return <Itinerary itineraryData={itinerary[0]} />;
}
