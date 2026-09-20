import Link from "next/link";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { sanityFetch } from "@/sanity/lib/fetch";

type AdminItinerary = {
    _id: string;
    title?: string;
    itineraryName?: string;
    customerName?: string;
    guestCount?: number;
    slug?: { current?: string };
    itinerary?: { destination?: string }[];
};

export const metadata = {
    title: "All itineraries",
};

export default async function AdminItinerariesPage() {
    const itineraries = (await sanityFetch(
        POST_QUERY.adminItinerariesList,
        SANITY_QUERY_OPTION,
    )) as AdminItinerary[];

    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-12 text-[#12213a] md:px-10">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-theme-primary-light">
                        Admin only
                    </p>
                    <h1 className="text-3xl font-semibold">All itineraries</h1>
                </div>
                <span className="text-sm text-slate-500">{itineraries.length} total</span>
            </div>

            {itineraries.length === 0 ? (
                <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
                    No itineraries found.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full min-w-[700px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-4 font-semibold">Customer</th>
                                <th className="px-5 py-4 font-semibold">Itinerary</th>
                                <th className="px-5 py-4 font-semibold">Destinations</th>
                                <th className="px-5 py-4 font-semibold">Guests</th>
                                <th className="px-5 py-4 font-semibold">Open</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {itineraries.map((itinerary) => {
                                const slug = itinerary.slug?.current;
                                const destinations = itinerary.itinerary
                                    ?.map(({ destination }) => destination)
                                    .filter(Boolean)
                                    .join(", ");

                                return (
                                    <tr key={itinerary._id} className="align-top">
                                        <td className="px-5 py-4 font-medium">{itinerary.customerName || "Unnamed customer"}</td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {itinerary.itineraryName || itinerary.title || "Untitled itinerary"}
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">{destinations || "-"}</td>
                                        <td className="px-5 py-4 text-slate-600">{itinerary.guestCount ?? "-"}</td>
                                        <td className="px-5 py-4">
                                            {slug ? (
                                                <Link className="font-semibold text-theme-primary-light underline underline-offset-4" href={`/itinerary/${slug}`}>
                                                    View itinerary
                                                </Link>
                                            ) : (
                                                <span className="text-slate-400">Missing slug</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}