
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star } from "lucide-react";

type Studio = {
  _id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description?: string;
};

const categories = [
  "All",
  "Photography",
  "Podcast",
  "Music Production",
  "Video Production",
  "Fashion",
  "Dance & Rehearsal",
];

export default function ExplorePage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/studios`);

        if (!response.ok) {
          throw new Error("Failed to fetch studios");
        }

        const data = await response.json();
        setStudios(data);
      } catch (error) {
        console.error("Error loading studios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  const filteredStudios = studios.filter((studio) => {
    const matchesSearch =
      studio.name?.toLowerCase().includes(search.toLowerCase()) ||
      studio.location?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      studio.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-violet-600 font-semibold mb-2">
            EXPLORE CREATIVE SPACES
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Explore Studios
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Discover the perfect creative space for your next project.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by studio name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-violet-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading studios...
          </div>
        ) : filteredStudios.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              No Studios Found
            </h2>
            <p className="text-gray-500 mt-3">
              Try another search or category.
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Showing {filteredStudios.length} studios
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudios.map((studio) => (
                <div
                  key={studio._id}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition"
                >
                  <div className="relative h-56">
                    <Image
                      src={studio.image}
                      alt={studio.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start gap-3">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {studio.name}
                      </h2>

                      <span className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        {studio.rating}
                      </span>
                    </div>

                    <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-3">
                      <MapPin size={16} />
                      {studio.location}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                      <p className="font-bold text-violet-600">
                        ৳{studio.price}
                        <span className="text-xs text-gray-500 font-normal">
                          {" "} / hour
                        </span>
                      </p>

                      <Link
                        href={`/studios/${studio._id}`}
                        className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
