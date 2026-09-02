"use client";
import { useEffect, useState } from "react";
import defaultItineraryData from "@/data/itinerary.json";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Ephesis } from "next/font/google";
const imageUrl = (image: { asset: unknown }) => urlFor(image).width(900).url();

type ItineraryActivity = {
    activityType: string;
    images?: { asset: { _ref: string; _type: string } }[];
    activityDescription?: string;
    transfers?: {
        transferType?: string;
        transferSteps?: { from?: string; to?: string; via?: string };
    };
};

type ItineraryImage = { asset: { _ref: string; _type: string } };

type ItineraryStay = {
    stayName?: string;
    roomType?: string;
    stayLink?: string;
    checkInDate?: string;
    checkoutDate?: string;
    roomCount?: number;
    roomChange?: boolean;
    images?: ItineraryImage[];
    inclusions?: { inclusion?: boolean; inclusionType: string }[];
    transfers?: {
        transferType?: string;
        transferSteps?: { from?: string; to?: string; via?: string };
    };
};

type ItineraryDay = {
    title: string;
    day: string;
    description?: string;
    activities?: ItineraryActivity[];
    stay?: ItineraryStay;
};

type ItineraryData = typeof defaultItineraryData;
type ItineraryDestination = ItineraryData["itinerary"][number];

const dayKey = (destination: ItineraryDestination, day: ItineraryDay, index: number) =>
    `${destination.destination}-${day.title}-${index}`;

const resolveStay = (
    days: ItineraryDay[],
    dayIndex: number,
): ItineraryStay | undefined => {
    const currentStay = days[dayIndex]?.stay;
    const previousStay = dayIndex > 0 ? resolveStay(days, dayIndex - 1) : undefined;

    if (!currentStay && !previousStay) return undefined;

    return {
        ...previousStay,
        ...currentStay,
        images: currentStay?.images?.length
            ? currentStay.images
            : previousStay?.images,
        inclusions: currentStay?.inclusions?.length
            ? currentStay.inclusions
            : previousStay?.inclusions,
        transfers: currentStay?.transfers || previousStay?.transfers,
    };
};
const ephesis = Ephesis({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-serif",
});

export default function Itinerary({
    itineraryData = defaultItineraryData,
}: {
    itineraryData?: ItineraryData;
}) {
    const totalNights = itineraryData.itinerary.reduce(
        (total, destination) => total + destination.destinationItinerary.length,
        0,
    );

    const whatsapp = "/logos/whatsapp.png";
    const [activeStay, setActiveStay] = useState<{
        name: string;
        images: ItineraryImage[];
    } | null>(null);
    const [activeStayImageIndex, setActiveStayImageIndex] = useState(0);

    const openStayGallery = (stay: ItineraryStay) => {
        if (!stay.images?.length) return;
        setActiveStay({
            name: stay.stayName || "Stay",
            images: stay.images,
        });
        setActiveStayImageIndex(0);
    };

    const closeStayGallery = () => setActiveStay(null);

    const showPreviousStayImage = () => {
        if (!activeStay) return;
        setActiveStayImageIndex((currentIndex) =>
            currentIndex === 0 ? activeStay.images.length - 1 : currentIndex - 1,
        );
    };

    const showNextStayImage = () => {
        if (!activeStay) return;
        setActiveStayImageIndex((currentIndex) =>
            currentIndex === activeStay.images.length - 1 ? 0 : currentIndex + 1,
        );
    };

    useEffect(() => {
        if (!activeStay) return;

        const handleGalleryKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeStayGallery();
            if (event.key === "ArrowLeft") {
                setActiveStayImageIndex((currentIndex) =>
                    currentIndex === 0 ? activeStay.images.length - 1 : currentIndex - 1,
                );
            }
            if (event.key === "ArrowRight") {
                setActiveStayImageIndex((currentIndex) =>
                    currentIndex === activeStay.images.length - 1 ? 0 : currentIndex + 1,
                );
            }
        };

        document.addEventListener("keydown", handleGalleryKeyDown);
        return () => document.removeEventListener("keydown", handleGalleryKeyDown);
    }, [activeStay]);

    const firstDestination = itineraryData.itinerary[0];
    const firstDayKeys = firstDestination
        ? firstDestination.destinationItinerary.map(
            (day, index) => dayKey(firstDestination, day, index),
        )
        : [];
    const [openDayKeys, setOpenDayKeys] = useState<Set<string>>(
        () => new Set(firstDayKeys),
    );
    const toggleDay = (dayKey: string) => {
        setOpenDayKeys((currentKeys) => {
            const nextKeys = new Set(currentKeys);
            if (nextKeys.has(dayKey)) {
                nextKeys.delete(dayKey);
            } else {
                nextKeys.add(dayKey);
            }
            return nextKeys;
        });
    };

    const firstDay = itineraryData.itinerary[0]?.destinationItinerary[0];
    const lastDay = itineraryData.itinerary.at(-1)?.destinationItinerary.at(-1);
    const dateRange =
        firstDay && lastDay
            ? `${firstDay.day} - ${lastDay.day}`
            : "Your journey dates";
    const allDays = itineraryData.itinerary.flatMap((destination) => {
        const days = destination.destinationItinerary as ItineraryDay[];
        return days.map((day, dayIndex) => ({
            ...day,
            stay: resolveStay(days, dayIndex),
            destination: destination.destination,
        }));
    });
    const inclusions = Array.from(
        new Set(
            allDays.flatMap(
                (day) =>
                    day.stay?.inclusions
                        ?.filter((item) => item.inclusion)
                        .map((item) => item.inclusionType) || [],
            ),
        ),
    );
    // const activities = Array.from(
    //     new Set(
    //         allDays.flatMap(
    //             (day) => day.activities?.map((activity) => activity.activityType) || [],
    //         ),
    //     ),
    // );
    const total = itineraryData.pricing.toLocaleString("en-IN");

    return (
        <div className="bg-white  pb-24 font-sans text-[#12213a]">
            <div className="hidden lg:block">
                <div className="relative">
                    <div className="inset-0 flex">
                        <div className="bg-theme-primary-dark text-white flex flex-col items-left pl-10 pr-25 py-5 w-1/2">
                            <div className="w-full max-w-2xl mx-auto my-15 text-white absolute top-1/3 -translate-y-1/2">
                                {/* <h2 className={`text-xl md:text-5xl font-light leading-snug text-white italics`}>
                                    <span className={`text-sm mr-2`}> custom curation for </span>
                                </h2> */}
                                <span className={`${ephesis.className} font-bold`} style={{ fontSize: '5.5rem' }}> {itineraryData.customerName}  </span>

                                {/* <h2 className="text-xl md:text-3xl font-semibold mb-2 leading-snug text-white">
                                    {itineraryData.itineraryName}
                                </h2> */}

                                <div className="flex flex-col md:flex-row gap-10 my-4 align-bottom">
                                    <span className="text-xl md:text-sm mb-4 leading-snug text-white">
                                        {itineraryData.guestCount} adults
                                    </span>
                                    <span className="text-xl md:text-sm mb-4 leading-snug text-white">
                                        {dateRange}
                                    </span>
                                </div>

                                {itineraryData.itinerary?.length && (
                                    <div className="pills flex gap-6">
                                        {itineraryData.itinerary.map((destination) => (
                                            <div
                                                className="bg-theme-primary-light text-white rounded-4xl px-7 py-2 text-xs opacity-90 pointer-events-none"
                                                key={destination.destination}
                                            >
                                                {destination.destination} ·{" "}
                                                {destination.destinationItinerary.length}N
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative overflow-hidden flex-1 w-1/2 group h-[75vh]">
                            <Image
                                alt="Page Banner Image"
                                src={urlFor(itineraryData.image.asset)?.url()}
                                className="object-cover"
                                fill
                                style={{
                                    transition: "transform 0.1s linear",
                                    zIndex: 1,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto grid max-w-[1180px] items-start gap-10 pt-8 md:grid-cols-[minmax(0,1fr)_340px] md:pt-11">
                <div className="min-w-0">
                    <section className="mb-12">
                        {itineraryData.itinerary.map((destination, index) => (
                            <div key={destination.destination}>
                                <div
                                    className={`flex items-center justify-between rounded-t-[10px] bg-theme-primary-dark px-10 py-9 text-white md:px-12 md:py-4 ${index === 0 ? '' : 'mt-10'}`}

                                >
                                    <span className="text-lg">{destination.destination}</span>
                                    <small className="font-sans text-xs tracking-wide text-[#c9d3e2]">
                                        {destination.destinationItinerary.length}  {destination.destinationItinerary.length === 1 ? "NIGHT" : "NIGHTS"}
                                    </small>
                                </div>
                                {/* Destination image */}
                                <div
                                    className="flex items-center justify-between bg-theme-primary-dark px-[22px] py-9 text-white md:mb-[14px] md:px-[30px] md:py-[22px]"
                                    style={{ backgroundImage: `url(${imageUrl(destination.destinationImage)})`, backgroundSize: "cover", backgroundPosition: "center", height: "200px", color: "white", borderRadius: "0 0 10px 10px", borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}
                                >

                                </div>
                                {/* //Destination days itinerary start here  Day 1 , Day 2 etc. */}
                                {(destination.destinationItinerary as ItineraryDay[]).map(
                                    (day, index, days) => {
                                        const stay = resolveStay(days, index);
                                        return (
                                            <article
                                                className="pb-2"
                                                key={`${day.title}-${day.title}-${index}`}
                                            >
                                                <div
                                                    className="mt-2 flex cursor-pointer items-baseline justify-between gap-3 border-[#e6e8ec] py-2"
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-expanded={openDayKeys.has(dayKey(destination, day, index))}
                                                    onClick={() => toggleDay(dayKey(destination, day, index))}
                                                    onKeyDown={(event) => {
                                                        if (event.key === "Enter" || event.key === " ") {
                                                            event.preventDefault();
                                                            toggleDay(dayKey(destination, day, index));
                                                        }
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3 align-between" >
                                                        <span
                                                            className="grid h-[26px] w-[26px] place-items-center rounded-[7px] bg-white"

                                                        >
                                                            ✦
                                                        </span>
                                                        <span
                                                            className="text-[19px] font-medium"
                                                        >
                                                            {day.title}
                                                        </span>
                                                        <small className="text-xs" >
                                                            {day.day}
                                                        </small>
                                                    </div>

                                                    <svg
                                                        className={`ml-2 h-4 w-4 transition-transform ${openDayKeys.has(dayKey(destination, day, index)) ? "rotate-180" : ""
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                                {openDayKeys.has(dayKey(destination, day, index)) && (
                                                    <div className="ml-10">
                                                        <p
                                                            className="my-3.5 max-w-[650px] text-sm leading-[1.7]"
                                                        >
                                                            {day.description ||
                                                                `Explore the highlights of ${destination.destination} at your own pace.`}
                                                        </p>
                                                        <div className="mb-3.5 flex gap-2.5 overflow-hidden">
                                                            {day.activities?.flatMap((activity) => activity.images || []).map((image, imageIndex) =>
                                                                <img
                                                                    className="h-[100px] w-[calc(50%-5px)] rounded-[10px] object-cover md:h-28 md:w-[170px]"
                                                                    src={imageUrl(image)}
                                                                    alt={`${destination.destination} activity ${imageIndex + 1}`}
                                                                    key={`${day.title}-activity-image-${imageIndex}`}
                                                                />
                                                            )}

                                                        </div>
                                                        {stay && (
                                                            <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-slate-100 px-4 py-2 text-sm">
                                                                <span
                                                                    className="grid h-8 w-8 place-items-center rounded-[7px]  "

                                                                >
                                                                    🏨
                                                                </span>
                                                                Stay at — {stay.stayName || "Selected property"}
                                                                <small
                                                                    className="ml-auto text-xs"
                                                                >
                                                                    {stay.roomType || "Selected room"}
                                                                </small>
                                                            </div>
                                                        )}
                                                        {day.activities?.map((activity) => (
                                                            <div
                                                                className="mt-2 mb-10 flex items-center gap-2 rounded-[10px] bg-slate-100 px-4 py-2 text-[13px]"
                                                                key={activity.activityType}
                                                            >
                                                                <span
                                                                    className="grid h-8 w-[26px] place-items-center rounded-[7px]  "

                                                                >
                                                                    ✦
                                                                </span>
                                                                {activity.activityType}
                                                                {activity.activityDescription && (
                                                                    <span className="text-xs text-slate-400" >
                                                                        {activity.activityDescription}
                                                                    </span>
                                                                )}
                                                                {activity.transfers?.transferType && (
                                                                    <small
                                                                        className="ml-auto text-xs"

                                                                    >
                                                                        {activity.transfers.transferType}
                                                                    </small>
                                                                )}
                                                            </div>
                                                        ))}

                                                    </div>
                                                )}
                                            </article>
                                        );
                                    },
                                )}
                            </div>
                        ))}
                    </section>

                    <section className="mb-12">
                        <h2 className="mb-3.5 text-[26px]" >
                            Stays
                        </h2>
                        {itineraryData.itinerary.map((destination) => {
                            const days = destination.destinationItinerary as ItineraryDay[];
                            const stay = days
                                .map((_, dayIndex) => resolveStay(days, dayIndex))
                                .find(Boolean);
                            if (!stay) return null;
                            return (
                                <div
                                    className="mb-5 rounded-xl p-3.5"

                                    key={`${destination.destination}-stay`}
                                >
                                    <div className="mb-3 flex gap-4">
                                        <div>
                                            <h3 className="mt-1 flex items-center gap-2 text-base">
                                                {stay.stayName || "Selected property"}
                                                {stay.stayLink && (
                                                    <a
                                                        className="text-[#12213a] transition-opacity hover:opacity-60"
                                                        href={stay.stayLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        aria-label={`Open ${stay.stayName || "property"} website`}
                                                        title="Open property website"
                                                    >
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.8"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M14 4h6v6" />
                                                            <path d="M10 14 20 4" />
                                                            <path d="M20 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </h3>
                                            <p className="text-[12.5px]" >
                                                {stay.roomType || "Selected room"} ·{" "}
                                                {inclusions.join(", ") || "Breakfast included"}
                                            </p>
                                        </div>
                                    </div>
                                    {stay.images && stay.images.length > 0 && (
                                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
                                            {stay.images.map((image, imageIndex) => (
                                                <button
                                                    className="group relative overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12213a]"
                                                    type="button"
                                                    onClick={() => openStayGallery(stay)}
                                                    aria-label={`Open ${stay.stayName || "stay"} image ${imageIndex + 1}`}
                                                    key={`${destination.destination}-stay-image-${imageIndex}`}
                                                >
                                                    <img
                                                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        src={imageUrl(image)}
                                                        alt={`${stay.stayName || "Stay"} image ${imageIndex + 1}`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </section>
                    <section className="mb-12">
                        <h2 className="mb-3.5 text-[26px]" >
                            What&apos;s Included
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3
                                    className="mb-2.5 text-[13px] uppercase tracking-wide"
                                >
                                    Inclusions
                                </h3>
                                <ul
                                    className="m-0 grid list-none gap-2 p-0 text-[13.5px]"
                                >
                                    {[
                                        `${totalNights} nights' accommodation as listed`,
                                        ...inclusions,
                                        "Private inter-hotel transfers",
                                    ].map((item) => (
                                        <li className="flex gap-2 leading-6" key={item}>
                                            <b className="text-[#2f7a4f]">✓</b>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3
                                    className="mb-2.5 text-[13px] uppercase tracking-wide"
                                >
                                    Exclusions
                                </h3>
                                <ul
                                    className="m-0 grid list-none gap-2 p-0 text-[13.5px]"
                                >
                                    <li className="flex gap-2 leading-6">
                                        <b className="text-[#b5545a]">×</b>International flights
                                    </li>
                                    <li className="flex gap-2 leading-6">
                                        <b className="text-[#b5545a]">×</b>Visa fees
                                    </li>
                                    <li className="flex gap-2 leading-6">
                                        <b className="text-[#b5545a]">×</b>Personal expenses &amp;
                                        tips
                                    </li>
                                    <li className="flex gap-2 leading-6">
                                        <b className="text-[#b5545a]">×</b>Travel insurance
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                </div>

                <aside
                    className="sticky top-10 rounded-[14px] border bg-white p-6 shadow-[0_10px_30px_rgba(18,33,58,0.08)] max-md:hidden"
                >
                    <h2 className="mb-4 text-xl" >
                        Fare Breakdown
                    </h2>
                    <div
                        className="flex justify-between py-2 text-sm text-theme-primary-light"
                    >
                        <span>{itineraryData.guestCount} Adults</span>
                        <span>
                            ₹{" "}
                            {Math.round(itineraryData.pricing * 0.94).toLocaleString("en-IN")}
                        </span>
                    </div>
                    <div
                        className="flex justify-between py-2 text-sm text-theme-primary-light"
                    >
                        <span>Taxes &amp; fees</span>
                        <span>
                            ₹{" "}
                            {Math.round(itineraryData.pricing * 0.06).toLocaleString("en-IN")}
                        </span>
                    </div>
                    <div
                        className="mt-1 flex justify-between align-middle border-t border-slate-300 pt-3.5 text-base"
                    >
                        <span>Total</span>
                        <span className="font-[700] text-2xl">₹ {total}</span>
                    </div>
                    <button
                        className="mt-6 w-full rounded-[10px] px-3 py-[13px] text-md text-white flex items-center justify-center gap-6 transition-transform duration-300 hover:translate-y-[-2px] bg-theme-primary-dark"
                    >
                        <span>
                            Accept &amp; Book
                        </span>
                        <svg
                            className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                    <button
                        className="mt-2.5 w-4/5 bg-white px-3 py-5 text-xs flex justify-center mx-auto"
                    >
                        <span className="mr-2"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                        </span>
                        <span>

                            Request Changes
                        </span>
                    </button>
                    <div
                        className="text-center text-xs leading-tight flex items-center justify-center gap-2 w-4/5 mx-auto"
                    >

                        <Image
                            src={whatsapp}
                            alt="WhatsApp"
                            width={100}
                            height={100}
                            className="inline-block mr-1 !h-10 !w-10 md:!h-8 md:!w-12"
                        />
                        <span className="text-xs font-ultralight leading-tight text-left text-slate-400">
                            Our team will be in touch on WhatsApp within a few hours.
                        </span>
                    </div>
                </aside>
            </div>

            {activeStay && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-10"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${activeStay.name} gallery`}
                    onClick={closeStayGallery}
                >
                    <div
                        className="relative flex h-full w-full max-w-5xl items-center justify-center"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            className="max-h-[82vh] max-w-full rounded-lg object-contain"
                            src={imageUrl(activeStay.images[activeStayImageIndex])}
                            alt={`${activeStay.name} image ${activeStayImageIndex + 1}`}
                        />
                        <button
                            className="absolute right-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-2xl text-[#12213a] shadow-lg"
                            type="button"
                            onClick={closeStayGallery}
                            aria-label="Close gallery"
                        >
                            ×
                        </button>
                        {activeStay.images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-0 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-3xl text-[#12213a] shadow-lg transition-transform hover:scale-105"
                                    type="button"
                                    onClick={showPreviousStayImage}
                                    aria-label="Previous stay image"
                                >
                                    ‹
                                </button>
                                <button
                                    className="absolute right-0 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-3xl text-[#12213a] shadow-lg transition-transform hover:scale-105"
                                    type="button"
                                    onClick={showNextStayImage}
                                    aria-label="Next stay image"
                                >
                                    ›
                                </button>
                            </>
                        )}
                        <p className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                            {activeStayImageIndex + 1} / {activeStay.images.length}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
