
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Studio {
  _id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  price: number;
  image: string;
}

export default function UpdateStudioPage() {
  const router = useRouter();
  const params = useParams();
  const studioId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    price: "",
    image: "",
  });

  // Load existing studio data
  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const { data: tokenData, error: tokenError } =
          await authClient.token();

        if (tokenError || !tokenData?.token) {
          throw new Error("Please login again.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/api/my-studios`, {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load studio.");
        }

        const studio: Studio | undefined = result.find(
          (item: Studio) => item._id === studioId
        );

        if (!studio) {
          throw new Error("Studio not found.");
        }

        setFormData({
          name: studio.name,
          category: studio.category,
          location: studio.location,
          description: studio.description,
          price: String(studio.price),
          image: studio.image,
        });
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Something went wrong!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [studioId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update studio
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");

    try {
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Please login again.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(
        `${apiUrl}/api/studios/${studioId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update studio.");
      }

      setMessage("Studio updated successfully!");

      setTimeout(() => {
        router.push("/my-listings");
      }, 1200);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-lg font-semibold text-violet-600">
          Loading studio...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <Pencil size={42} className="text-violet-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Update Your Studio
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Update your studio information and details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8"
        >
          <div>
            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-200">
              Studio Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter studio name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-200">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600 dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">Select category</option>
              <option value="Photography">Photography</option>
              <option value="Podcast">Podcast</option>
              <option value="Music Production">Music Production</option>
              <option value="Video Production">Video Production</option>
              <option value="Fashion">Fashion</option>
              <option value="Dance & Rehearsal">Dance & Rehearsal</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-200">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter studio location"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe your studio"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-200">
              Price Per Hour (৳)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter hourly price"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-200">
              Studio Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="Paste image URL"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          {message && (
            <p className="rounded-lg bg-violet-50 p-3 text-sm text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={updating}
            className="w-full rounded-full bg-violet-600 py-3.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updating ? "Updating Studio..." : "Update Studio"}
          </button>
        </form>
      </div>
    </main>
  );
}
