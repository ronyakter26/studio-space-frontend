"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";

export default function Hero() {
  return (
<section className="relative mx-auto max-w-7xl overflow-hidden px-5 pt-4 pb-10 lg:px-8 lg:pt-6 lg:pb-12">
          <div className="relative min-h-[520px] overflow-hidden rounded-3xl">
        {/* Background Image */}
        <Image
          src="/hero-studio.jpg"
          alt="Creative photography studio"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[520px] flex-col justify-center px-7 py-16 sm:px-12 lg:px-20">
          <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
            <Camera size={17} />
            <span>Creative Spaces for Creators</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
            Find Your Space.
            <br />
            <span className="text-violet-400">
              Create Your Vision.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 sm:text-lg">
            Discover amazing photography, music, podcast and creative
            studios. Book the perfect space and bring your ideas to life.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/studios"
              className="flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3.5 font-semibold text-white transition hover:bg-violet-700"
            >
              Explore Studios
              <ArrowRight size={19} />
            </Link>

            <Link
              href="/register"
              className="rounded-full border border-white px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-gray-900"
            >
              Host Your Space
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}