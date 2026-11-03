
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="animate-pulse text-gray-600 dark:text-gray-300">
          Loading profile...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-gray-50 px-5 dark:bg-gray-950">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Please Login First
        </h1>
        <Link
          href="/login"
          className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your StudioSpace account.
          </p>
        </div>

        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col items-center gap-4 border-b border-gray-200 pb-8 dark:border-gray-700 sm:flex-row">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-4xl font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                {initial}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.name || "StudioSpace User"}
              </h2>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
              <p className="mt-2 text-sm font-medium text-green-600">
                ● Active Account
              </p>
            </div>
          </div>

          <div className="grid gap-4 py-8 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="mt-2 font-semibold text-gray-900 dark:text-white">
                {user.name || "Not provided"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email Address
              </p>
              <p className="mt-2 break-all font-semibold text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/my-listings"
              className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
            >
              My Listings
            </Link>

            <Link
              href="/my-bookings"
              className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              My Bookings
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-full border border-red-200 px-6 py-3 font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
            >
              Logout
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
