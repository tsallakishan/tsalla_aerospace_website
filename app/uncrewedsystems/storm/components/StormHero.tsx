"use client"
import { useEffect } from "react"
import type { JSX } from "react/jsx-runtime"

export default function StormHero(): JSX.Element {
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
    
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
      >
        <source src="https://shield.ai/wp-content/uploads/2025/03/avenger-3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-[26%] sm:pb-[20%] md:pb-[22%] lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-[12%]">
      
        <div className="max-w-full lg:max-w-2xl text-left mb-8 lg:mb-0 lg:flex lg:flex-col lg:justify-end">
          <h1
            className="text-white font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            STORM
          </h1>
          <p
            className="text-white text-base sm:text-lg md:text-xl font-normal tracking-wide text-balance"
            style={{ letterSpacing: "0.01em" }}
          >
            Smart Transport Operations for Rugged Missions
          </p>
        </div>

      
        <div className="max-w-full lg:max-w-md text-left text-neutral-600 text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide text-balance lg:flex lg:flex-col lg:justify-end">
          Where intelligent flight meets relentless endurance, offshore operations stay connected, supplied, and secure
          — even when the weather turns against you. This is aerial logistics, redefined for the world's toughest
          environments.
        </div>
      </div>
    </section>
  )
}
