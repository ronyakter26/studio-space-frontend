
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  CalendarDays,
  Clock,
  MapPin,
  X,
  AlertTriangle,
} from "lucide-react";

type Booking = {
  _id: string;
  studioName: string;
  studioImage?: string;
  location: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
  status: string;
};

export default function MyBookingsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch My Bookings
  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        if (!tokenData?.token) {
          throw new Error("Please login again.");
        }

        const response = await fetch(
          `${apiUrl}/api/my-bookings`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load bookings."
          );
        }

        setBookings(data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong.";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session, isPending, apiUrl]);

  // Cancel Booking
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      setCancelling(true);
      setError("");

      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(
        `${apiUrl}/api/bookings/${selectedBooking._id}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to cancel booking."
        );
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      setSelectedBooking(null);

      toast.success("Booking cancelled successfully!");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      setError(message);
      toast.error(message);
    } finally {
      setCancelling(false);
    }
  };

  if (isPending || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="font-semibold text-violet-600">
          Loading your bookings...
        </p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 dark:bg-gray-950">
        <h1 className="text-2xl font-bold">Please Login</h1>

        <p className="text-gray-500">
          Login to see your bookings.
        </p>

        <Link
          href="/login"
          className="rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and view all your studio bookings.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-950/30">
            {error}
          </div>
        )}

        {!error && bookings.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm dark:bg-gray-900">
            <CalendarDays
              size={48}
              className="mx-auto mb-4 text-violet-500"
            />

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No Bookings Yet
            </h2>

            <p className="mt-2 text-gray-500">
              You have not booked any studio yet.
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-block rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
            >
              Explore Studios
            </Link>
          </div>
        ) : !error ? (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900"
              >
                {booking.studioImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={booking.studioImage}
                      alt={booking.studioName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {booking.studioName}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400"
                          : booking.status === "confirmed"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                          : booking.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} />
                    {booking.location}
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} />
                      {booking.bookingDate}
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock size={17} />
                      {booking.startTime} - {booking.endTime}
                    </p>

                    <p>
                      Duration: {booking.duration} hour(s)
                    </p>
                  </div>

                  <div className="mt-5 border-t border-gray-200 pt-4 dark:border-gray-700">
                    <div className="flex justify-between font-bold">
                      <span>Total Price</span>

                      <span className="text-violet-600">
                        ৳{booking.totalPrice?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {booking.status === "pending" && (
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="mt-5 w-full rounded-lg border border-red-500 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Cancel Confirmation Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
            <button
              onClick={() => setSelectedBooking(null)}
              disabled={cancelling}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={20} />
            </button>

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40">
              <AlertTriangle size={28} />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Cancel Booking?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Are you sure you want to cancel your booking for{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedBooking.studioName}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedBooking(null)}
                disabled={cancelling}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Keep Booking
              </button>

              <button
                onClick={handleCancelBooking}
                disabled={cancelling}
                className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
