"use client";

import { FormEvent, useState } from "react";

type GooglePlacePhoto = {
  name: string;
  address: string;
  url: string;
};

export default function PlacePhotosPage() {
  const [query, setQuery] = useState("Bali Hotel");
  const [photos, setPhotos] = useState<GooglePlacePhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      setError("Please enter a place name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/place-photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load place photos.");
      }

      setPhotos(data.photos || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Search Photos by Place Name
        </p>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Photos Finder
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mb-10 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter a place or hotel name"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-400"
        >
          {loading ? "Loading..." : "Search photos"}
        </button>
      </form>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {photos.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {photos.map((photo, index) => (
            <div
              key={`${photo.name}-${index}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-slate-800">{photo.name}</h2>
                {photo.address && (
                  <p className="mt-2 text-sm text-slate-600">{photo.address}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
            Search for a hotel, resort, attraction, or destination to display photos.
          </div>
        )
      )}
    </main>
  );
}
