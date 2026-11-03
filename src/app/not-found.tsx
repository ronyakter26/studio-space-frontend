
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-5 py-16 dark:bg-gray-950">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="text-7xl font-extrabold text-violet-600">404</p>

        <h1 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found!
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Sorry, the page you are looking for does not exist
          or has been moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Back to Home
          </Link>

          <Link
            href="/explore"
            className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
          >
            Explore Studios
          </Link>
        </div>
      </div>
    </main>
  );
}
