"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutUsVideoPage() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden text-white">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://player.vimeo.com/progressive_redirect/playback/889008535/rendition/1080p/file.mp4?loc=external&signature=8a912138a2014f2a2454300b4cd0605d97c26167bdc3d6dc09d07286c5490b66"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 lg:bg-opacity-20 z-10" />

      {/* Text Block - Responsive Positioning */}
      <div
        className="
          absolute z-20 w-full h-full
          flex flex-col
          
          justify-center items-start text-left
          px-4 sm:px-6 md:px-8

          lg:justify-start
          lg:h-auto lg:top-[12.5rem] lg:left-[2.8125rem]
          lg:max-w-[73.875rem]
        "
      >
        <div className="w-full max-w-4xl">
          {/* Heading */}
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-[4.375rem] leading-[1.1] mb-5 font-clash tracking-tight">
            ABOUT US
          </h1>

          {/* Paragraph */}
          <p className="text-base md:text-lg lg:text-xl mb-6 font-clash text-white max-w-full sm:max-w-[90%] md:max-w-[80%]">
            Discover who we are, what drives us, and the vision that guides our journey beyond the horizon.
          </p>

          {/* CTA Button */}
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
