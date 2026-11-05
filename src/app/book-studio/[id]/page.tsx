
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type Studio = {
  _id: string;
  name: string;
  location: string;
  price: number;
  image?: string;
  imageUrl?: string;
};

function getLocalDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTimeInMinutes(time: string) {
  if (!time) return 0;

  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

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

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace(
        `/login?callbackURL=${encodeURIComponent(`/book-studio/${id}`)}`
      );
      return;
    }

    const fetchStudio = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/studios`);

        if (!response.ok) {
          throw new Error("Failed to load studio.");
        }

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

  // Calculate duration using minutes
  const startMinutes = getTimeInMinutes(startTime);
  const endMinutes = getTimeInMinutes(endTime);

  const durationMinutes =
    startTime && endTime && endMinutes > startMinutes
      ? endMinutes - startMinutes
      : 0;

  const hours = durationMinutes / 60;

  const totalPrice =
    studio && durationMinutes > 0
      ? Math.round(studio.price * hours)
      : 0;

  const handleBooking = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (!studio || !bookingDate || !startTime || !endTime) {
      toast.error("Please complete all booking fields.");
      return;
    }

    // Prevent past dates using Bangladesh/local date
    if (bookingDate < getLocalDate()) {
      toast.error("Please select today or a future date.");
      return;
    }

    if (durationMinutes <= 0) {
      toast.error("End time must be later than start time.");
      return;
    }

    try {
      setSubmitting(true);

      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        toast.error("Please login to continue.");
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

      toast.success("Booking successful!");

      setTimeout(() => {
        router.push("/my-bookings");
      }, 1000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";

      setError(message);
      toast.error(message);
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
        <p className="text-red-500">
          {error || "Studio not found."}
        </p>

        <Link href="/studios" className="text-violet-600 underline">
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
          {/* Studio Information */}
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
                ৳{studio.price.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">
                  {" "}/ hour
                </span>
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <form
            onSubmit={handleBooking}
            className="space-y-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Booking Information
            </h2>

            {/* Booking Date */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Booking Date
              </label>

              <input
                type="date"
                min={getLocalDate()}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent p-3 outline-none focus:border-violet-500"
              />
            </div>

            {/* Start Time */}
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

            {/* End Time */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                End Time
              </label>

              <input
                type="time"
                min={startTime || undefined}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent p-3 outline-none focus:border-violet-500"
              />
            </div>

            {/* Price Calculation */}
            <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-950/30">
              <div className="flex justify-between text-sm">
                <span>Duration</span>
                <span>
                  {durationMinutes > 0
                    ? `${hours} hour(s)`
                    : "—"}
                </span>
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
