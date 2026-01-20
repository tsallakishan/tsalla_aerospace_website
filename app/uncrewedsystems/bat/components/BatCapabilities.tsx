"use client"
import type React from "react"
import Image from "next/image"
import { ContentWrapper } from "@/components/ContentWrapper"

export default function BatCapabilities(): React.JSX.Element {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>

      <section className="font-clash-grotesk flex flex-col md:flex-row items-center justify-center bg-white text-black w-full min-h-screen py-12 md:py-20">
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24">
            {/* Left Column: Image */}
            <div className="w-full md:w-5/12 flex justify-center">
              <div className="relative w-full max-w-md aspect-[1075/1433]">
                <Image
                  src="/images/Bat/Bat.png"
                  alt="BAT Drone"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="w-full md:w-7/12 flex flex-col justify-center text-left max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-none tracking-tight mb-8 text-black" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                <span className="whitespace-nowrap">Battlefield Tactical</span>
                <br />
                <span style={{ color: '#5ce1e6' }}>Precision</span>
              </h1>
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600">
                Optimized for rapid deployment and versatile reconnaissance, BAT delivers high-fidelity situational awareness
                to the front lines, ensuring mission success in the most demanding environments.
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
