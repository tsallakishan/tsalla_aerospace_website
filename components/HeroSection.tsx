"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection(rogg: any) {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden text-white">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://cdn.sanity.io/files/z5s3oquj/production/958ffbdcaafa889bad0744af57731fae11db69a8.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better readability on smaller screens, reduced on desktop */}
      <div className="absolute inset-0 bg-black bg-opacity-40 lg:bg-opacity-20 z-10"></div>

      {/* Content block with corrected alignment */}
      <div
        className="
          absolute z-20 w-full h-full
          flex flex-col
          
          /* --- MOBILE & TABLET STYLES (Defaults) --- */
          /* Vertically centers the content block, text is left-aligned */
          justify-center items-start text-left
          px-4 sm:px-6 md:px-8

          /* --- DESKTOP STYLES (Overrides at lg breakpoint: 1024px) --- */
          /* Reverts to your original desktop layout with fixed positioning */
          lg:justify-start
          lg:h-auto lg:top-[12.5rem] lg:left-[2.8125rem]
          lg:max-w-[73.875rem]
        "
      >
        {/* Added a container to control width on mobile, as in your example */}
        <div className="w-full max-w-4xl">
          {/* MAIN LINE */}
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-[4.375rem] leading-[1.1] mb-5 font-farro tracking-tight">
            UNMANNED.<br />
            UNMATCHED.<br />
            UNCOMPROMISED.
          </h1>

          {/* SECOND LINE */}
          <p className="text-base md:text-lg lg:text-xl mb-6 font-pontano text-white max-w-full sm:max-w-[90%] md:max-w-[80%]">
            We Don’t Build Drones. We Build Unfair Advantages.
          </p>

          {/* THIRD LINE / BUTTON */}
          <Link
            href="/about"
            className="
    inline-block bg-transparent border border-white text-white
    hover:bg-white hover:text-black
    px-4 py-2 mt-3 transition-colors duration-200
    font-sans text-sm md:text-base
  "
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

