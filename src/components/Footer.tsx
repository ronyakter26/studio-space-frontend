
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  Aperture,
  MapPin,
  Send,
  X,
  ExternalLink,
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

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/roniakter/",
    icon: Aperture,

  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/ayeshaakter.ayeshaakter.731135",
    icon: Aperture,


  },
  {
    name: "GitHub",
    href: "https://github.com/ronyakter26",
    icon:Aperture,
  },
];

type PolicyType = "terms" | "privacy" | null;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Newsletter signup is coming soon!");
    setEmail("");
  };

  return (
    <>
      <footer className="mt-auto bg-gray-950 text-gray-300">
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>
              <Link
                href="/"
                className="mb-5 inline-flex items-center gap-2"
              >
                <Aperture size={30} className="text-violet-500" />

                <span className="text-2xl font-bold text-white">
                  Studio
                  <span className="text-violet-500">Space</span>
                </span>
              </Link>

              <p className="max-w-xs text-sm leading-7 text-gray-400">
                Find your perfect creative space and bring your
                vision to life. Connect with studio owners and
                discover spaces made for creativity.
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

            {/* Popular Categories */}
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

            {/* Newsletter and Social Links */}
            <div>
              <h3 className="mb-5 text-lg font-bold text-white">
                Stay Connected
              </h3>

              <p className="mb-4 text-sm leading-6 text-gray-400">
                Get updates about creative spaces and new studio
                listings. Stay connected with StudioSpace.
              </p>

              {/* Newsletter */}
              <form onSubmit={handleSubscribe}>
                <div className="flex overflow-hidden rounded-lg border border-gray-700 bg-gray-900 focus-within:border-violet-500">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    required
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                  />

                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="flex items-center justify-center bg-violet-600 px-4 text-white transition hover:bg-violet-700"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>

              {message && (
                <p
                  role="status"
                  className="mt-3 text-xs text-violet-300"
                >
                  {message}
                </p>
              )}

              {/* Social Links */}
              <div className="mt-7">
                <h4 className="mb-4 text-sm font-semibold text-white">
                  Follow Us
                </h4>

                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        title={social.name}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm transition hover:border-violet-500 hover:bg-violet-600 hover:text-white"
                      >
                        <Icon size={17} />
                        <span>{social.name}</span>
                      </a>
                    );
                  })}

                  <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    title="X"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm transition hover:border-violet-500 hover:bg-violet-600 hover:text-white"
                  >
                    <span className="font-bold">𝕏</span>
                    <span>X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 StudioSpace. All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setActivePolicy("terms")}
                className="transition hover:text-violet-400"
              >
                Terms & Conditions
              </button>

              <span className="text-gray-700">|</span>

              <button
                type="button"
                onClick={() => setActivePolicy("privacy")}
                className="transition hover:text-violet-400"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Terms and Privacy Modal */}
      {activePolicy && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActivePolicy(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-title"
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 text-gray-800 shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2
                id="policy-title"
                className="text-xl font-bold"
              >
                {activePolicy === "terms"
                  ? "Terms & Conditions"
                  : "Privacy Policy"}
              </h2>

              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                aria-label="Close policy"
                className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {activePolicy === "terms" ? (
              <div className="space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                <p>
                  Welcome to StudioSpace. By using this platform,
                  you agree to follow these terms and conditions.
                </p>

                <p>
                  <strong>Bookings:</strong> Users are responsible
                  for providing accurate booking information and
                  following the studio&apos;s rules.
                </p>

                <p>
                  <strong>Studio Owners:</strong> Studio owners
                  should provide accurate listing details,
                  availability, and pricing.
                </p>

                <p>
                  <strong>Account Responsibility:</strong> Keep
                  your account information secure and do not
                  misuse the platform.
                </p>

                <p>
                  <strong>Platform Use:</strong> Users must not
                  use StudioSpace for unlawful activities or
                  harmful purposes.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                <p>
                  StudioSpace respects your privacy. This section
                  explains how your information may be used on
                  the platform.
                </p>

                <p>
                  <strong>Information:</strong> We may collect
                  account details and information you provide
                  when using StudioSpace.
                </p>

                <p>
                  <strong>Usage:</strong> Information may be used
                  to manage accounts, bookings, and platform
                  features.
                </p>

                <p>
                  <strong>Security:</strong> We take reasonable
                  steps to protect user information.
                </p>

                <p>
                  <strong>Contact:</strong> Contact the
                  StudioSpace team if you have questions about
                  privacy or your information.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setActivePolicy(null)}
              className="mt-6 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
