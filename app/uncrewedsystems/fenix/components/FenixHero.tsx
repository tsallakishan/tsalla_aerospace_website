"use client"
import { useEffect } from "react"
import type { JSX } from "react/jsx-runtime"

export default function FenixHero(): JSX.Element {
  // Dynamically load the Clash Grotesk font
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Clash+Grotesk:wght@400;500;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <section
      className="relative h-screen w-full text-white overflow-hidden"
      style={{ fontFamily: "'Clash Grotesk', Arial, sans-serif" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
      >
        <source
          src="https://cdn.sanity.io/files/z5s3oquj/production/f3cab16e70d9afbe1c7a4cef3e496ef06e3dd497.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-[26%] sm:pb-[20%] md:pb-[22%] lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-[12%]">
        {/* Left Side: Title & Subtitle */}
        <div className="max-w-full lg:max-w-2xl text-left mb-8 lg:mb-0 lg:flex lg:flex-col lg:justify-end">
          <h1
            className="text-white font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            FENIx
          </h1>
          <p
            className="text-white text-base sm:text-lg md:text-xl font-normal tracking-wide text-balance"
            style={{ letterSpacing: "0.01em" }}
          >
            Fast Entry Navigational Intrusion eXplorer
          </p>
        </div>

        {/* Right Side: Paragraph */}
        <div className="max-w-full lg:max-w-md text-left text-lg md:text-xl font-light leading-relaxed text-neutral-600 text-balance lg:flex lg:flex-col lg:justify-end">
          When intelligence fits in the palm of your hand, missions expand far beyond their footprint — agile, discreet,
          and ready on demand.
        </div>
      </div>
    </section>
  )
}
