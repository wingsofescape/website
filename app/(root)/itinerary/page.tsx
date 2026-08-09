import itineraryData from "@/data/itinerary.json";
import { urlFor } from "@/sanity/lib/image";

const imageUrl = (image: { asset: unknown }) => urlFor(image).width(900).url();
const navy = "#12213a";
const body = "#5c6675";
const soft = "#8991a0";
const line = "#e6e8ec";
const sand = "#f6f1e8";
const sandLine = "#e9dfc9";
const serif = "Georgia, serif";

type ItineraryActivity = {
    activityType: string;
    transfers?: { transferType?: string };
};

type ItineraryStay = {
    stayName: string;
    roomType?: string;
    inclusions?: { inclusion?: boolean; inclusionType: string }[];
};

type ItineraryDay = {
    title: string;
    day: string;
    description?: string;
    activities?: ItineraryActivity[];
    stay?: ItineraryStay;
};

const totalNights = itineraryData.itinerary.reduce(
    (total, destination) => total + destination.destinationItinerary.length,
    0,
);

export default function Itinerary() {
    const firstDay = itineraryData.itinerary[0]?.destinationItinerary[0];
    const lastDay = itineraryData.itinerary.at(-1)?.destinationItinerary.at(-1);
    const dateRange = firstDay && lastDay ? `${firstDay.day} - ${lastDay.day}` : "Your journey dates";
    const allDays = itineraryData.itinerary.flatMap((destination) =>
        (destination.destinationItinerary as ItineraryDay[]).map((day) => ({ ...day, destination: destination.destination })),
    );
    const inclusions = Array.from(new Set(allDays.flatMap((day) => day.stay?.inclusions?.filter((item) => item.inclusion).map((item) => item.inclusionType) || [])));
    const activities = Array.from(new Set(allDays.flatMap((day) => day.activities?.map((activity) => activity.activityType) || [])));
    const total = itineraryData.pricing.toLocaleString("en-IN");

    return (
        <main className="bg-white px-5 pb-24 pt-6 font-sans text-[#12213a] md:px-12 md:pt-10">
            <section className="mx-auto max-w-[1180px]">
                <div className="max-w-[820px] rounded-[14px] bg-gradient-to-br from-[#12213a] to-[#1b3358] px-6 py-7 text-white md:px-12 md:pb-10 md:pt-11">
                    <p className="mb-[22px] text-[11px] text-[#a9b6c9] md:text-[12.5px]">Home <span className="mx-1.5 opacity-60">›</span> {itineraryData.destinationName} <span className="mx-1.5 opacity-60">›</span> Private Itinerary</p>
                    <p className="mb-[18px] inline-block rounded-full border border-white/25 px-3.5 py-1 text-[10px] uppercase tracking-[1px] text-[#c9d3e2] md:text-xs md:tracking-[1.5px]">Prepared for {itineraryData.customerName}</p>
                    <h1 className="mb-5 max-w-[560px] text-[27px] leading-tight md:text-4xl" style={{ fontFamily: serif }}>{itineraryData.itineraryName}: Art, Craft &amp; Celebration</h1>
                    <div className="mb-[18px] flex flex-wrap gap-2.5">{itineraryData.itinerary.map((destination) => <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] text-[#eef1f6]" key={destination.title}>{destination.destination} · {destination.destinationItinerary.length}N</span>)}<span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] text-[#eef1f6]">◷ {dateRange}</span><span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] text-[#eef1f6]">{itineraryData.guestCount} Adults</span></div>
                    <p className="text-[13.5px] text-[#c9d3e2]">Total for this trip <strong className="ml-1 text-[21px] text-white" style={{ fontFamily: serif }}>₹ {total}</strong></p>
                </div>
            </section>

            <div className="mx-auto grid max-w-[1180px] items-start gap-10 pt-8 md:grid-cols-[minmax(0,1fr)_340px] md:pt-11">
                <div className="min-w-0">
                    <section className="mb-12"><h2 className="mb-3.5 text-[26px]" style={{ fontFamily: serif }}>Itinerary</h2>{itineraryData.itinerary.map((destination) => <div key={destination.title}>
                        <div className="my-[18px] flex items-center justify-between rounded-[10px] bg-[#12213a] px-[22px] py-9 text-white md:my-[34px] md:px-[30px] md:py-[52px]" style={{ fontFamily: serif }}><span className="text-[17px]">{destination.destination}</span><small className="font-sans text-xs tracking-wide text-[#c9d3e2]">{destination.destinationItinerary.length} NIGHTS</small></div>
                        {(destination.destinationItinerary as ItineraryDay[]).map((day, index) => <article className="border-b px-1 pb-[26px] pt-[18px]" style={{ borderColor: line }} key={`${destination.title}-${day.title}-${index}`}>
                            <div className="mb-2 flex items-baseline gap-3"><span className="rounded-full border px-3 py-[3px] text-[12.5px]" style={{ borderColor: sandLine, backgroundColor: sand, fontFamily: serif }}>Day {index + 1}</span><small className="text-xs" style={{ color: soft }}>{day.day}</small></div>
                            <h3 className="mb-2 text-[19px]" style={{ fontFamily: serif }}>{day.title}</h3><p className="mb-3.5 max-w-[650px] text-sm leading-[1.7]" style={{ color: body }}>{day.description || `Explore the highlights of ${destination.destination} at your own pace.`}</p>
                            <div className="mb-3.5 flex gap-2.5 overflow-hidden"><img className="h-[100px] w-[calc(50%-5px)] rounded-[10px] object-cover md:h-28 md:w-[170px]" src={imageUrl(destination.destinationImage)} alt={`${destination.destination} landscape`} /><img className="h-[100px] w-[calc(50%-5px)] rounded-[10px] object-cover md:h-28 md:w-[170px]" src={imageUrl(destination.destinationImage)} alt={`${destination.destination} travel experience`} /></div>
                            {day.activities?.map((activity) => <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-[#f5f6f8] px-4 py-3 text-[13px]" key={activity.activityType}><span className="grid h-[26px] w-[26px] place-items-center rounded-[7px] border bg-white" style={{ borderColor: line }}>✦</span>{activity.activityType}{activity.transfers?.transferType && <small className="ml-auto text-xs" style={{ color: soft }}>{activity.transfers.transferType}</small>}</div>)}
                            {day.stay && <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-[#f5f6f8] px-4 py-3 text-[13px]"><span className="grid h-[26px] w-[26px] place-items-center rounded-[7px] border bg-white" style={{ borderColor: line }}>⌂</span>Stay at — {day.stay.stayName}<small className="ml-auto text-xs" style={{ color: soft }}>{day.stay.roomType || "Selected room"}</small></div>}
                        </article>)}
                    </div>)}</section>

                    <section className="mb-12"><h2 className="mb-3.5 text-[26px]" style={{ fontFamily: serif }}>Stays</h2>{itineraryData.itinerary.map((destination) => { const stay = (destination.destinationItinerary as ItineraryDay[]).find((day) => day.stay)?.stay; if (!stay) return null; return <div className="mb-2.5 flex gap-4 rounded-xl border p-3.5" style={{ borderColor: line }} key={`${destination.title}-stay`}><img className="h-[76px] w-[100px] shrink-0 rounded-lg object-cover" src={imageUrl(destination.destinationImage)} alt={stay.stayName} /><div><h3 className="mt-1 text-base" style={{ fontFamily: serif }}>{stay.stayName}</h3><p className="text-[12.5px]" style={{ color: soft }}>{stay.roomType || "Selected room"} · {inclusions.join(", ") || "Breakfast included"}</p></div></div>; })}</section>
                    <section className="mb-12"><h2 className="mb-3.5 text-[26px]" style={{ fontFamily: serif }}>Trip Highlights</h2><div className="grid gap-4 md:grid-cols-3">{activities.slice(0, 3).map((activity, index) => <div className="rounded-xl bg-[#f5f6f8] p-[18px]" key={activity}><span className="mb-2.5 grid h-[38px] w-[38px] place-items-center rounded-[10px] bg-[#12213a] text-white">{["⛰", "◌", "✦"][index]}</span><h3 className="mb-1 text-[15px]" style={{ fontFamily: serif }}>{activity}</h3><p className="text-[12.5px]" style={{ color: soft }}>Curated for your {itineraryData.destinationName} journey</p></div>)}</div></section>
                    <section className="mb-12"><h2 className="mb-3.5 text-[26px]" style={{ fontFamily: serif }}>Essential Details</h2><div className="rounded-xl border px-6 py-[22px]" style={{ borderColor: sandLine, backgroundColor: sand }}><h3 className="mb-3 text-base" style={{ fontFamily: serif }}>▣ Advisory</h3><ul className="m-0 list-disc space-y-1.5 pl-5 text-[13.5px] leading-7" style={{ color: body }}><li>Booking requests are subject to availability and final confirmation.</li><li>Breakfast is included where specified in your stay details.</li><li>Valid passport with 6+ months validity is required for all travellers.</li></ul></div></section>
                    <section className="mb-12"><h2 className="mb-3.5 text-[26px]" style={{ fontFamily: serif }}>What&apos;s Included</h2><div className="grid gap-6 md:grid-cols-2"><div><h3 className="mb-2.5 text-[13px] uppercase tracking-wide" style={{ color: soft, fontFamily: serif }}>Inclusions</h3><ul className="m-0 grid list-none gap-2 p-0 text-[13.5px]" style={{ color: body }}>{[`${totalNights} nights' accommodation as listed`, ...inclusions, "Private inter-hotel transfers"].map((item) => <li className="flex gap-2 leading-6" key={item}><b className="text-[#2f7a4f]">✓</b>{item}</li>)}</ul></div><div><h3 className="mb-2.5 text-[13px] uppercase tracking-wide" style={{ color: soft, fontFamily: serif }}>Exclusions</h3><ul className="m-0 grid list-none gap-2 p-0 text-[13.5px]" style={{ color: body }}><li className="flex gap-2 leading-6"><b className="text-[#b5545a]">×</b>International flights</li><li className="flex gap-2 leading-6"><b className="text-[#b5545a]">×</b>Visa fees</li><li className="flex gap-2 leading-6"><b className="text-[#b5545a]">×</b>Personal expenses &amp; tips</li><li className="flex gap-2 leading-6"><b className="text-[#b5545a]">×</b>Travel insurance</li></ul></div></div></section>
                </div>

                <aside className="sticky top-6 rounded-[14px] border bg-white p-6 shadow-[0_10px_30px_rgba(18,33,58,0.08)] max-md:hidden" style={{ borderColor: line }}><h2 className="mb-4 text-[17px]" style={{ fontFamily: serif }}>Fare Breakdown</h2><div className="flex justify-between border-b py-2 text-[13.5px]" style={{ borderColor: line, color: body }}><span>{itineraryData.guestCount} Adults</span><span>₹ {Math.round(itineraryData.pricing * 0.94).toLocaleString("en-IN")}</span></div><div className="flex justify-between border-b py-2 text-[13.5px]" style={{ borderColor: line, color: body }}><span>Taxes &amp; fees</span><span>₹ {Math.round(itineraryData.pricing * 0.06).toLocaleString("en-IN")}</span></div><div className="mt-1 flex justify-between border-t pt-3.5 text-base" style={{ borderColor: navy, fontFamily: serif }}><span>Total</span><span>₹ {total}</span></div><button className="mt-[18px] w-full rounded-[10px] px-3 py-[13px] text-[15px] text-white" style={{ backgroundColor: navy, fontFamily: serif }}>Accept &amp; Book</button><button className="mt-2.5 w-full rounded-[10px] border-[1.5px] bg-white px-3 py-[13px] text-[15px]" style={{ borderColor: navy, color: navy, fontFamily: serif }}>Request Changes</button><p className="mt-3 text-center text-[11.5px] leading-normal" style={{ color: soft }}>Our team will be in touch on WhatsApp within a few hours.</p></aside>
            </div>
            <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t bg-white px-5 py-3 shadow-[0_-6px_20px_rgba(18,33,58,0.06)] md:hidden" style={{ borderColor: line }}><strong className="text-base" style={{ fontFamily: serif }}>₹ {total}<small className="mt-0.5 block font-sans text-[11px] font-normal" style={{ color: soft }}>Total for {itineraryData.guestCount} adults</small></strong><button className="rounded-[10px] px-4 py-2.5 text-[15px] text-white" style={{ backgroundColor: navy, fontFamily: serif }}>Accept &amp; Book</button></div>
        </main >
    );
}
