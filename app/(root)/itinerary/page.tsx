import Image from "next/image";
import React from "react";
import { IBlogContent } from "@/app/_models/blog";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY, SANITY_QUERY_OPTION } from "@/lib/constants";
import { sanityFetch } from "@/sanity/lib/fetch";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { ItineraryAccordion } from "./ItineraryAccordion";

type PageProps = {
    params: Promise<{ slug: string }>;
};



export default async function Itinerary({ params }: PageProps) {
    const blog = await sanityFetch(
        POST_QUERY.getBlog({ slug: 'exploring-the-world-anew-the-adventure-of-journeys-by-land-and-sea' }),
        SANITY_QUERY_OPTION
    );
    const itinerary = await sanityFetch(
        POST_QUERY.getItinerary({ slug: 'bali-itinerary-jaao-na' }),
        SANITY_QUERY_OPTION
    );

    console.log(itinerary[0]);

    if (!blog[0]) {
        return <div>Loading ...</div>;
    }
    const ContentSection = (blogContent: IBlogContent[]) => {
        return blogContent.map((content, index) => (
            <div
                key={index}
                className="mb-1 flex flex-col align-center items-center text-left w-11/12 md:w-8/12"
            >
                <div className="contentSection my-5 ">
                    <h3 className="text-2xl font-semibold mb-6 mt-2 text-theme-primary-dark">
                        {content.heading}
                    </h3>
                    <h4 className="text-xl font-semibold mb-2 text-theme-primary-dark">
                        {content.subHeading}
                    </h4>
                    {content.paragraph.map((para, idx) => (
                        <p key={idx} className="mb-2 text-theme-primary-dark text-md">
                            {para}
                        </p>
                    ))}
                </div>

                {content.image && content.image.length > 0 && (
                    <div className="imageSection mb-1 p-1 md:p-4 w-full ">
                        {content.image.map((img, i) => (
                            <Image
                                key={i}
                                src={urlFor(img?.asset)?.url()}
                                alt={content.imagesDescription || ""}
                                className="object-cover h-[40vh] md:h-[65vh]  md:w-11/12 mx-auto"
                                width={1080}
                                height={1920}
                                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                            />
                        ))}
                    </div>
                )}
                <p className="text-gray-500 text-sm  text-center">
                    {content.imagesDescription}
                </p>
            </div>
        ));
    };

    const data = {
        "customerName": "Aabhas Vincent",
        "destinationName": "Bali",
        "guestCount": 2,
        "image": {
            "_type": "image",
            "asset": {
                "_ref": "image-7819ab2d7532b76bce754109d8cc9473a960e7a5-2048x1536-jpg",
                "_type": "reference"
            }
        },
        "itinerary": [
            {
                "destinationHotels": "Marriot Huts",
                "destination": "Ubud",
                "destinationItinerary": [
                    {
                        "activities": [
                            {
                                "activityType": "Bali Swing",
                                "transfers": {
                                    "transferSteps": {
                                        "from": "Hotel",
                                        "to": "Bali Swing"
                                    },
                                    "transferType": "Private SUV"
                                }
                            }
                        ],
                        "day": "26-Jan-2026",
                        "stay": {
                            "checkInDate": "26-Jan-2026",
                            "checkoutDate": "29-Jan-2026",
                            "inclusions": [
                                {
                                    "inclusion": true,
                                    "inclusionType": "Breakfast"
                                },
                                {
                                    "inclusionType": "Lunch"
                                },
                                {
                                    "inclusionType": "Dinner"
                                }
                            ],
                            "roomType": "2 Deluxe | 1 Superior",
                            "stayLink": "https://www.Hotel-1.com",
                            "stayName": "Luxe Huts Marriott",
                            "transfers": {
                                "transferSteps": {
                                    "_type": "document",
                                    "from": "Airport",
                                    "to": "Hotel"
                                },
                                "transferType": "Private SUV"
                            }
                        },
                        "title": "Day 1 - Arrival in Ubud"
                    },
                    {
                        "activities": [
                            {
                                "activityType": "Rice Terrace",
                                "transfers": {
                                    "transferSteps": {
                                        "from": "Hotel",
                                        "to": "Bali Swing"
                                    },
                                    "transferType": "Private SUV"
                                }
                            }
                        ],
                        "day": "26-Jan-2026",
                        "stay": {
                            "checkInDate": "26-Jan-2026",
                            "checkoutDate": "29-Jan-2026",
                            "guestCount": 2,
                            "inclusions": [
                                {
                                    "inclusion": true,
                                    "inclusionType": "Breakfast"
                                },
                                {
                                    "inclusionType": "Lunch"
                                },
                                {
                                    "inclusionType": "Dinner"
                                }
                            ],
                            "roomType": "Delux",
                            "stayLink": "https://www.Hotel-1.com",
                            "stayName": "Luxe Huts Marriott",
                            "transfers": {
                                "_type": "document",
                                "transferSteps": {
                                    "_type": "document",
                                    "from": "Airport",
                                    "to": "Hotel"
                                },
                                "transferType": "Private SUV"
                            }
                        },
                        "title": "Day 2 - Rice Terrace"
                    }
                ],
                "title": "Ubud",
                "destinationImage": {
                    "_type": "image",
                    "asset": {
                        "_ref": "image-a788318f9c6477ff76a5e40276e4386ac7ffd327-2048x1365-jpg",
                        "_type": "reference"
                    }
                }
            },
            {
                "destinationHotels": "Marriot Suites",
                "_key": "70120a71b73adcf04d94189f3a267e05",
                "date": "29-Jan-2026",
                "destination": "Semniyk",
                "destinationItinerary": [
                    {
                        "_key": "3ada46b9d951",
                        "day": "26-Jan-2026",
                        "description": "Welcome to Bali! Upon your arrival at the Denpasar airport, you'll be transferred to your hotel in Ubud. After check-in, relax for a while. You will spend the rest of the day at leisure, exploring the iconic landmarks of Ubud. You can visit Goa Gajah, the ancient Elephant Cave, or relax at the beautiful Ubud Water Palace. Stroll through the Ubud Art Market or explore the historic Ubud Royal Palace, soaking in the vibrant local atmosphere. Later, return to the hotel for overnight stay.",
                        "stay": {
                            "_type": "document",
                            "checkInDate": "26-Jan-2026",
                            "checkoutDate": "29-Jan-2026",
                            "inclusions": [
                                {
                                    "_key": "427b7defd517",
                                    "inclusion": true,
                                    "inclusionType": "Breakfast"
                                },
                                {
                                    "_key": "036ce5ae49ff",
                                    "inclusionType": "Lunch"
                                },
                                {
                                    "_key": "b52e65dbefd5",
                                    "inclusionType": "Dinner"
                                }
                            ],
                            "stayLink": "https://www.Hotel-1.com",
                            "stayName": "Hotel 2"
                        },
                        "title": "Day 3 - Arrival in Ubud"
                    }
                ],
                "title": "Semniyk",
                "destinationImage": {
                    "_type": "image",
                    "asset": {
                        "_ref": "image-31f10b4514ada9416cb47b354bec59a0113982f7-1600x1069-jpg",
                        "_type": "reference"
                    }
                }
            },
            {
                "destinationHotels": "Sun and Sky Villas",
                "_key": "006f6b91e3f7cd1b8fa832e1f73f8552",
                "destination": "Danpesar",
                "destinationItinerary": [
                    {
                        "_key": "3ada46b9d951",
                        "day": "26-Jan-2026",
                        "description": "Welcome to Bali! Upon your arrival at the Denpasar airport, you'll be transferred to your hotel in Ubud. After check-in, relax for a while. You will spend the rest of the day at leisure, exploring the iconic landmarks of Ubud. You can visit Goa Gajah, the ancient Elephant Cave, or relax at the beautiful Ubud Water Palace. Stroll through the Ubud Art Market or explore the historic Ubud Royal Palace, soaking in the vibrant local atmosphere. Later, return to the hotel for overnight stay.",
                        "stay": {
                            "_type": "document",
                            "checkInDate": "26-Jan-2026",
                            "checkoutDate": "29-Jan-2026",
                            "inclusions": [
                                {
                                    "_key": "427b7defd517",
                                    "inclusion": true,
                                    "inclusionType": "Breakfast"
                                },
                                {
                                    "_key": "036ce5ae49ff",
                                    "inclusionType": "Lunch"
                                },
                                {
                                    "_key": "b52e65dbefd5",
                                    "inclusionType": "Dinner"
                                }
                            ],
                            "stayLink": "https://www.Hotel-1.com",
                            "stayName": "Hotel 3"
                        },
                        "title": "Day 4 - Arrival in Ubud"
                    }
                ],
                "title": "Nusa Penida",
                "destinationImage": {
                    "_type": "image",
                    "asset": {
                        "_ref": "image-1f1b5b25101d76653e24bb006b376453e2fece28-2048x1534-jpg",
                        "_type": "reference"
                    }
                }
            }
        ],
        "itineraryName": "Bali Bliss",
        "pricing": 15000,
        "slug": {
            "_type": "slug",
            "current": "bali-itinerary-jaao-na"
        },
        "title": "BALI ITINERARY PARENT"
    }



    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col md:flex-row w-full">
                <div
                    className="blogHeroImage relative overflow-hidden w-full  h-[30vh] md:h-[70vh]">
                    <Image
                        alt="Page Banner Image"
                        src={urlFor(data.image.asset)?.url()}
                        className="object-cover h-full"
                        fill
                        style={{
                            transition: "transform 0.1s linear",
                            zIndex: 1,
                        }}
                    />
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white z-10">
                        <p className="text-5xl text-white font-serif text-nowrap">
                            {data.customerName}
                        </p>
                        <p className=" text-slate-400 font-light mt-2">
                            {data.destinationName} Itinerary
                        </p>
                    </div>
                </div>
                {/* <div
                    className="heading right-0 w-full md:w-2/5 flex flex-col justify-center px-2 py-10 md:p-10 z-200 text-theme-primary-dark mx-auto"
                    style={{
                        transition: "transform 0.1s linear",
                    }}
                >
                    <h2 className="text-xl font-semibold mb-2 leading-snug">
                        {data.destinationName} for {data.customerName}
                    </h2>
                    <div className="bg-slate-400 w-fit px-4 rounded-xl my-2">
                        6D/5N
                    </div>
                    {data.itinerary.map(content =>
                        <div className="flex justify-left items-center gap-4 bg-theme-primary-accent/30 m-2 rounded-md px-4 w-3/4">
                            <span className="w-3 h-3 rounded-full bg-theme-primary-accent flex z-10" />
                            <div className="text-center py-2 text-sm font-bold flex gap-3 justify-between items-center w-full">
                                <div className="flex flex-col text-left">
                                    <span>{content.destination.toUpperCase()}
                                    </span>
                                    <span className="text-sm text-slate-400 font-light">
                                        {content.destinationHotels.toUpperCase()}
                                    </span>
                                </div>
                                <span className="font-light text-slate-400">{content.destinationItinerary.length} D</span>
                            </div>
                        </div>
                    )}

                </div> */}
            </div>
            <section className="mx-auto w-full pt-4">
                <ItineraryAccordion itinerary={data.itinerary} />
            </section>
        </div>
    );
}
