
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Aperture,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  UserCircle,
  PlusCircle,
  List,
  CalendarDays,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const { data: session, isPending } = authClient.useSession();

  const [mounted, setMounted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/explore" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about" },
  ];

  const accountLinks = [
    { name: "Add Studio", href: "/add-studio", icon: PlusCircle },
    { name: "My Listings", href: "/my-listings", icon: List },
    { name: "My Bookings", href: "/my-bookings", icon: CalendarDays },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error);
        return;
      }

      setMobileMenu(false);
      setProfileDropdown(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Aperture size={27} className="text-violet-600" />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Studio<span className="text-violet-600">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-violet-600 ${
                pathname === link.href
                  ? "text-violet-600"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
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

          {/* Authentication */}
          {!isPending && (
            session?.user ? (
              <div className="relative">

                {/* Profile Dropdown Button */}
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-violet-500 hover:text-violet-600 dark:border-gray-700 dark:text-gray-200"
                >
                  <UserCircle size={19} />
                  <span>My Account</span>
                  <ChevronDown
                    size={17}
                    className={`transition-transform ${
                      profileDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">

                    <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {session.user.name || "My Account"}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                        {session.user.email}
                      </p>
                    </div>

                    {accountLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setProfileDropdown(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-gray-800 ${
                            pathname === link.href
                              ? "text-violet-600"
                              : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          <Icon size={18} />
                          {link.name}
                        </Link>
                      );
                    })}

                    <div className="mt-1 border-t border-gray-100 pt-1 dark:border-gray-800">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:text-violet-600 dark:text-gray-200"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Register
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile Right Side */}
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
            {mobileMenu ? <X size={25} /> : <Menu size={25} />}
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

            {!isPending && (
              <div className="border-t border-gray-200 pt-4 dark:border-gray-800">

                {session?.user ? (
                  <>
                    <div className="mb-4">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {session.user.name || "My Account"}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {accountLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenu(false)}
                            className="flex items-center gap-3 font-semibold text-gray-700 transition hover:text-violet-600 dark:text-gray-200"
                          >
                            <Icon size={19} />
                            {link.name}
                          </Link>
                        );
                      })}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 font-semibold text-red-600"
                      >
                        <LogOut size={19} />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-3">
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
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
