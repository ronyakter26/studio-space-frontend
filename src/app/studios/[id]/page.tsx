
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import {
  MapPin,
  Star,
  ArrowLeft,
  CalendarCheck,
  Clock,
} from "lucide-react";

type Studio = {
  _id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category?: string;
  description?: string;
};

function StudioDetailsContent() {
  const params = useParams();
  const id = params.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/api/studios`);

        if (!response.ok) {
          throw new Error("Failed to fetch studio");
        }

        const data: Studio[] = await response.json();

        const selectedStudio = data.find(
          (item) => item._id === id
        );

        if (!selectedStudio) {
          setError("Studio not found!");
        } else {
          setStudio(selectedStudio);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudio();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-violet-600 font-semibold">
          Loading studio details...
        </p>
      </div>
    );
  }

  if (error || !studio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-gray-50 dark:bg-gray-950 px-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {error || "Studio not found!"}
        </h1>

        <Link
          href="/explore"
          className="bg-violet-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-5">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-violet-600 font-semibold mb-8 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Explore Studios
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">

          <div className="relative w-full h-64 md:h-[450px]">
            <Image
              src={studio.image}
              alt={studio.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <div className="p-6 md:p-10">

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">

              <div>
                {studio.category && (
                  <p className="text-violet-600 font-semibold mb-3">
                    {studio.category}
                  </p>
                )}

                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {studio.name}
                </h1>

                <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-4">
                  <MapPin size={19} />
                  {studio.location}
                </p>

                <p className="flex items-center gap-2 text-yellow-500 mt-3">
                  <Star size={19} fill="currentColor" />
                  <span className="font-semibold">
                    {studio.rating}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Studio Rating
                  </span>
                </p>
              </div>

              <div className="bg-violet-50 dark:bg-violet-950 rounded-xl p-5 min-w-48">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Price per hour
                </p>

                <p className="text-3xl font-bold text-violet-600 mt-2">
                  ৳{studio.price}
                </p>
              </div>

            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 my-8" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About This Studio
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-8">
              {studio.description ||
                `Discover ${studio.name}, located in ${studio.location}. This creative space is available for your next project. Explore the facilities and plan your creative session.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <Clock className="text-violet-600" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Flexible Booking
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose your preferred time
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <CalendarCheck className="text-violet-600" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Easy Reservation
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Simple booking process
                  </p>
                </div>
              </div>

            </div>

            <Link
              href="/login"
              className="inline-flex items-center justify-center mt-10 w-full md:w-auto px-10 py-4 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
            >
              Book This Studio
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}
export default function StudioDetailsPage() {
  return (
    <Suspense fallback={<div>Loading studio details...</div>}>
      <StudioDetailsContent />
    </Suspense>
  );
}
