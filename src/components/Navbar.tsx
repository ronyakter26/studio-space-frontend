
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Aperture,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/90">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Aperture
            size={27}
            className="text-violet-600"
          />

<span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Studio<span className="text-violet-600">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-violet-600 ${
                  active
                    ? "text-violet-600"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Theme Toggle */}
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="rounded-full border border-gray-200 p-2.5 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-yellow-400 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* Login */}
          <Link
            href="/login"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:text-violet-600 dark:text-gray-200"
          >
            Login
          </Link>

          {/* Register */}
          <Link
            href="/register"
            className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Register
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">

          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="rounded-full border border-gray-200 p-2 dark:border-gray-700"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={19} className="text-yellow-400" />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 text-gray-800 dark:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenu ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-gray-950 md:hidden">

          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className={`font-semibold ${
                  pathname === link.href
                    ? "text-violet-600"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
              <Link
                href="/login"
                onClick={() => setMobileMenu(false)}
                className="flex-1 rounded-full border border-violet-600 py-2.5 text-center font-semibold text-violet-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenu(false)}
                className="flex-1 rounded-full bg-violet-600 py-2.5 text-center font-semibold text-white"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
