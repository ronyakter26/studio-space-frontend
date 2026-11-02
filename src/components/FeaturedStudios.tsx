
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Camera,
  Star,
  Clock,
} from "lucide-react";

interface Studio {
  _id: string;
  name: string;
  image: string;
  location: string;
  category: string;
  price: number;
  rating?: number;
}

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const response = await fetch(
          `${apiUrl}/api/studios?featured=true&limit=6`
        );

        if (!response.ok) {
          throw new Error("Failed to load studios");
        }

        const result = await response.json();

        const studioData = Array.isArray(result)
          ? result
          : result.studios || result.data || [];

        setStudios(studioData.slice(0, 6));
      } catch (err) {
        console.error(err);
        setError("Studios could not be loaded. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  return (
    <section className="bg-white px-5 py-16 dark:bg-gray-950 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              Explore Our Spaces
            </span>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Featured Studios
            </h2>

            <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-400">
              Discover inspiring creative spaces and find the perfect
              studio for your next project.
            </p>
          </div>

          <Link
            href="/studios"
            className="flex w-fit items-center gap-2 font-semibold text-violet-600 transition hover:gap-3"
          >
            Explore All Studios
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800"
              >
                <div className="h-56 bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-12 text-center dark:border-red-900 dark:bg-red-950/30">
            <p className="font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && studios.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center dark:border-gray-700">
            <Camera
              size={42}
              className="mx-auto mb-4 text-violet-500"
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No Studios Available Yet
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Be the first to list your creative space!
            </p>
            <Link
              href="/register"
              className="mt-5 inline-flex rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Become a Host
            </Link>
          </div>
        )}

        {/* Studio Cards */}
        {!loading && !error && studios.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Studio Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {studio.image ? (
                    <img
                      src={studio.image}
                      alt={studio.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Camera size={45} className="text-gray-400" />
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-violet-700 shadow">
                    {studio.category}
                  </span>
                </div>

                {/* Studio Information */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-violet-600 dark:text-white">
                      {studio.name}
                    </h3>

                    {studio.rating !== undefined && (
                      <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        {studio.rating}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="text-violet-500" />
                    {studio.location}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                    <div>
                      <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock size={14} />
                        Hourly rate
                      </p>
                      <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                        ৳{studio.price}
                        <span className="text-sm font-normal text-gray-500">
                          /hr
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
