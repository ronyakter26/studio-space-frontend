
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSpace",
  description: "Find Your Space. Create Your Vision.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${josefinSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>

          {children}
        </Providers>
      </body>
    </html>
  );
}
