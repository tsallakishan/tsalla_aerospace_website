"use client"

import { ContentWrapper } from "@/components/ContentWrapper"
import type React from "react"
import Image from "next/image"

// Dynamically load Clash Grotesk font (for local development only; otherwise, load globally)
export default function StormCapabilities(): React.JSX.Element {
  return (
    <>
      {/*
        The link to the "Clash Grotesk" font is included here.
        This ensures the font is available for the component to use.
        In a real-world application, this would typically be placed in the <head> of your main HTML file.
      */}
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>

      <section className="font-clash-grotesk flex flex-col md:flex-row items-center justify-center bg-black text-white w-full min-h-screen py-12 md:py-20">
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24">
            {/* Left Column: Image */}
            <div className="w-full md:w-5/12 flex justify-center">
              <div className="relative w-full max-w-md aspect-[1075/1433]">
                <Image
                  src="/images/design-mode/5a0c9583711b45a93c29fd9e143682b9ea4a72f6-898x898.png"
                  alt="DEXTER Drone"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="w-full md:w-7/12 flex flex-col justify-center text-left max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-none tracking-tight mb-8" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                <span className="whitespace-nowrap">Resilient Offshore</span>
                <br />
                Autonomy
              </h1>
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600">
                Compact yet enduring, STORM combines smart flight, robust mesh teamwork, and adaptive delivery — keeping
                offshore operations supplied and secure in any conditions.
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
