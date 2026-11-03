
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

type Studio = {
  _id: string;
  name: string;
  location: string;
  price: number;
  image?: string;
  imageUrl?: string;
};

function BookingContent() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: session, isPending } = authClient.useSession();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace(`/login?callbackURL=${encodeURIComponent(`/book-studio/${id}`)}`);
      return;
    }

    const fetchStudio = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/studios`);
        if (!response.ok) throw new Error("Failed to load studio");

        const data = await response.json();
        const selectedStudio = data.find(
          (item: Studio) => item._id === id
        );

        if (!selectedStudio) {
          setError("Studio not found.");
        } else {
          setStudio(selectedStudio);
        }
      } catch {
        setError("Could not load studio details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [id, session, isPending, router, apiUrl]);

  const hours =
    startTime && endTime
      ? (new Date(`2000-01-01T${endTime}`).getTime() -
          new Date(`2000-01-01T${startTime}`).getTime()) /
        (1000 * 60 * 60)
      : 0;

  const totalPrice =
    studio && hours > 0 ? studio.price * hours : 0;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!studio || !bookingDate || !startTime || !endTime) {
      setError("Please complete all booking fields.");
      return;
    }

    if (hours <= 0) {
      setError("End time must be later than start time.");
      return;
    }

    try {
      setSubmitting(true);

      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${apiUrl}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          studioId: id,
          bookingDate,
          startTime,
          endTime,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed.");
      }

      router.push("/my-bookings");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="font-semibold text-violet-600">Loading...</p>
      </main>
    );
  }

  if (!studio) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || "Studio not found."}</p>
        <Link href="/explore" className="text-violet-600 underline">
          Explore Studios
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href={`/studios/${id}`}
            className="text-sm font-medium text-violet-600 hover:underline"
          >
            ← Back to Studio Details
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Book Your Studio
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Choose your preferred date and time.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900">
            <div className="relative h-64 w-full bg-gray-200 dark:bg-gray-800">
              {studio.image || studio.imageUrl ? (
                <Image
                  src={studio.image || studio.imageUrl || ""}
                  alt={studio.name}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {studio.name}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {studio.location}
              </p>
              <p className="mt-4 text-2xl font-bold text-violet-600">
                ৳{studio.price}
                <span className="text-sm font-normal text-gray-500">
                  {" "} / hour
                </span>
              </p>
            </div>
          </div>

          <form
            onSubmit={handleBooking}
            className="space-y-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Booking Information
            </h2>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Booking Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent p-3 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent p-3 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent p-3 outline-none focus:border-violet-500"
              />
            </div>

            <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-950/30">
              <div className="flex justify-between text-sm">
                <span>Duration</span>
                <span>{hours > 0 ? `${hours} hour(s)` : "—"}</span>
              </div>
              <div className="mt-3 flex justify-between font-bold">
                <span>Total Price</span>
                <span className="text-violet-600">
                  ৳{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-violet-600">Loading booking page...</p>
        </main>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
