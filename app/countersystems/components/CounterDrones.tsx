"use client"

import type React from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

export default function CounterDrones(): React.JSX.Element {
  return (
    <>
      {/* Global font import for Clash Grotesk for a consistent look */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>

      <section className="font-clash-grotesk bg-black w-full min-h-screen flex items-center justify-center py-20">
        <ContentWrapper>
          {/* Main container with a responsive two-column layout */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            {/* Left Column: Text Content */}
            <div className="w-full md:w-1/2 text-left">
              <h1 className="text-6xl sm:text-7xl font-medium text-white leading-tight" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                Autonomous Counter-Drone Interceptor
              </h1>
              <p className="mt-6 text-lg md:text-xl font-light leading-relaxed text-neutral-600 max-w-lg">
                Before human response is possible, this interceptor is already en route. It is your automated first
                responder against drone-borne threats, reacting within moments, navigating with intelligence, and
                confirming success with live visual data. It's not just a machine - it's a decision made at the speed of
                threat.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="w-full md:w-1/2">
              <img
                src="/images/design-mode/83f98b9ad65c714770e4625d0fba18d997e1a451-1016x1018.png"
                alt="Autonomous Counter-Drone Interceptor"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src = "https://placehold.co/600x600/1a1a1a/ffffff?text=Image+Not+Found"
                }}
              />
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
