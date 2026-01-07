"use client"
import type React from "react"
import ContentWrapper from "../../../components/ContentWrapper"

const features = [
  {
    title: "Autonomous Exploration",
    description: "Navigate uncharted zones without external signals.",
  },
  {
    title: "Resilient Path Planning",
    description: "Adapt routes dynamically in signal-denied zones.",
  },
  {
    title: "Low-Profile Operations",
    description: "Move covertly through contested environments.",
  },
]

export default function GpsDeniedPage(): React.JSX.Element {
  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>

      <section className="font-clash-grotesk relative w-full min-h-screen bg-black text-white overflow-hidden">
        {/* Background Video */}
        <video
          src="https://cdn.sanity.io/files/e2g21cdj/production/31a4d038749f5cf5f32c9c7b81cb821caab0112f.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-10" />

        {/* Main Heading Content */}
        <div className="relative z-20 pt-24">
          <ContentWrapper>
            <div className="w-full">
              <h1 className="text-center sm:text-left text-balance text-3xl sm:text-5xl lg:text-7xl font-medium leading-tight tracking-tight">
                Stay on Course, Off the Grid
              </h1>
              <p className="mt-4 text-center sm:text-left text-base sm:text-lg lg:text-xl text-neutral-100 font-thin max-w-2xl">
                Signal independence for missions that demand trust.
              </p>
            </div>
          </ContentWrapper>
        </div>

        {/* Features Row (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-24">
          <ContentWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-12">
              {features.map((feature) => (
                <div key={feature.title}>
                  <h3 className="text-xl sm:text-2xl font-medium text-white">{feature.title}</h3>
                  <p className="mt-2 text-base sm:text-lg text-neutral-300 font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </ContentWrapper>
        </div>
      </section>
    </>
  )
}
