
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  PlusCircle,
  MapPin,
  Pencil,
  Trash2,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Studio {
  _id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
}

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchMyStudios = async () => {
      try {
        const { data: tokenData, error: tokenError } =
          await authClient.token();

        if (tokenError || !tokenData?.token) {
          throw new Error("Please login to view your listings.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/api/my-studios`, {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load listings.");
        }

        setStudios(result);
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudios();
  }, []);

  const handleDelete = async () => {
    if (!selectedStudio) return;

    setDeleting(true);
    setMessage("");

    try {
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Please login first.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(
        `${apiUrl}/api/studios/${selectedStudio._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete studio.");
      }

      setStudios((previous) =>
        previous.filter((studio) => studio._id !== selectedStudio._id)
      );

toast.success("Studio deleted successfully!");
      setSelectedStudio(null);
    } catch (error) {
      toast.error(
  error instanceof Error
    ? error.message
    : "Something went wrong!"
);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-violet-600" size={40} />
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Loading your studios...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              My Listings
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage the studios you have added.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            <PlusCircle size={20} />
            Add New Studio
          </Link>
        </div>

        {message && (
          <div className="mb-5 rounded-xl bg-red-50 p-4 text-red-600 dark:bg-red-950 dark:text-red-300">
            {message}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 rounded-xl bg-green-50 p-4 text-green-700 dark:bg-green-950 dark:text-green-300">
            {successMessage}
          </div>
        )}

        {!message && studios.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900">
            <PlusCircle className="mx-auto text-violet-600" size={48} />
            <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              No Studios Added Yet
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Start sharing your creative space with others.
            </p>
            <Link
              href="/add-studio"
              className="mt-6 inline-block rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
            >
              Add Your First Studio
            </Link>
          </div>
        )}

        {!message && studios.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={studio.image}
                    alt={studio.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                    {studio.category}
                  </span>

                  <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                    {studio.name}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} />
                    {studio.location}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {studio.description}
                  </p>

                  <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">
                    <p className="font-bold text-violet-600">
                      ৳{studio.price}
                      <span className="text-sm font-normal text-gray-500">
                        /hour
                      </span>
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        href={`/studios/${studio._id}`}
                        className="flex-1 rounded-full border border-violet-600 px-3 py-2 text-center text-sm font-semibold text-violet-600 transition hover:bg-violet-600 hover:text-white"
                      >
                        View Details
                      </Link>

                      <Link
                        href={`/update-studio/${studio._id}`}
                        className="inline-flex items-center justify-center gap-1 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-300"
                      >
                        <Pencil size={15} />
                        Edit
                      </Link>

                      <button
                        onClick={() => setSelectedStudio(studio)}
                        className="inline-flex items-center justify-center gap-1 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200 dark:bg-red-950 dark:text-red-300"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {selectedStudio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-100 p-3 dark:bg-red-950">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Delete Studio?
                </h2>
              </div>

              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close confirmation"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedStudio.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="flex-1 rounded-full border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-red-600 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
