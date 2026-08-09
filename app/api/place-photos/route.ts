import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Please enter a place name or location." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_PLACES_API_KEY is missing. Add it in your Vercel environment variables." },
        { status: 500 }
      );
    }

    const searchUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/textsearch/json"
    );
    searchUrl.searchParams.set("query", query.trim());
    searchUrl.searchParams.set("key", apiKey);

    const searchResponse = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!searchResponse.ok) {
      return NextResponse.json(
        { error: "Google Places search request failed." },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();

    if (searchData.status !== "OK" || !Array.isArray(searchData.results)) {
      return NextResponse.json(
        {
          error:
            searchData.error_message ||
            "No results found for this place. Try a more specific search.",
        },
        { status: 400 }
      );
    }

    const photoResults = searchData.results
      .flatMap((place: any) => {
        const photos = Array.isArray(place.photos) ? place.photos : [];

        return photos.slice(0, 4).map((photo: any) => ({
          name: place.name || "Place image",
          address: place.formatted_address || "",
          photoReference: photo.photo_reference,
          url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${encodeURIComponent(
            photo.photo_reference
          )}&key=${apiKey}`,
        }));
      })
      .slice(0, 12);

    return NextResponse.json({
      photos: photoResults,
      totalFound: photoResults.length,
      query,
    });
  } catch (error) {
    console.error("Google Places photo lookup failed:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching place photos." },
      { status: 500 }
    );
  }
}
