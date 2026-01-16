"use client"

import Image from "next/image"
import ContentWrapper from "@/components/ContentWrapper"

export default function WhatWeDo() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center py-16 md:py-24 font-clash">
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full">
          {/* Left: Text */}
          <div className="w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-10" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>What We Do</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 tracking-wide max-w-xl">
              When disasters strike or borders need protection, our UAVs rise to the challenge. Engineered for both
              civil missions and combat-ready roles, they carry more than technology — they carry trust. Through vision
              and design excellence, we're helping India own its place in the skies.
            </p>
          </div>

          {/* Right: Image */}
          <div className="w-full">
            <div className="relative w-full aspect-square md:h-[31.25rem] md:aspect-auto overflow-hidden">
              <Image
                src="/images/design-mode/d5dfc9aed08fa1fb86bf74438b26d2821d9b5e3d-1080x1235.png"
                alt="City Aerial"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}
