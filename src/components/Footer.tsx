import Link from "next/link";
import {
  Aperture,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/explore" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
  { name: "My Bookings", href: "/my-bookings" },
];

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-2">
              <Aperture size={30} className="text-violet-500" />
              <span className="text-2xl font-bold text-white">
                Studio<span className="text-violet-500">Space</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Find your perfect creative space and bring your vision to life.
              Connect with studio owners and discover spaces made for creativity.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={17} className="text-violet-500" />
              <span>Made for creators everywhere</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition hover:text-violet-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Popular Categories
            </h3>

            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href="/explore"
                    className="text-sm transition hover:text-violet-400"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Stay Connected
            </h3>

            <p className="mb-4 text-sm leading-6 text-gray-400">
              Get updates about creative spaces and new studio listings.
            </p>

            <form
              className="flex overflow-hidden rounded-lg border border-gray-700 bg-gray-900"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                title="Newsletter subscription is coming soon"
                className="bg-violet-600 px-4 text-white transition hover:bg-violet-700"
              >
                <ArrowRight size={19} />
              </button>
            </form>
            <p className="mt-2 text-xs text-gray-500">
              Newsletter subscription coming soon.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition hover:text-violet-400"
              >
                <Instagram size={20} />
              </Link>

              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition hover:text-violet-400"
              >
                <Linkedin size={20} />
              </Link>

              <Link
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition hover:text-violet-400"
              >
                <Youtube size={21} />
              </Link>

              <Link
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-500 text-sm font-bold transition hover:border-violet-400 hover:text-violet-400"
              >
                X
              </Link>

              <Link
                href="mailto:hello@studiospace.com"
                aria-label="Email"
                className="transition hover:text-violet-400"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/terms" className="transition hover:text-violet-400">
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="transition hover:text-violet-400"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}