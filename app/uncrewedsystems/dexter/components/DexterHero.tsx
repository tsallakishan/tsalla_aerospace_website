"use client"

import { useEffect } from "react"

export default function DexterHero() {
  // Load Clash Grotesk
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Clash+Grotesk:wght@400;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
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
        poster="https://pplx-res.cloudinary.com/image/private/user_uploads/81852386/12ccb371-9ea5-4f3d-8853-99db5ce28887/image.jpg"
      >
        <source
          src="https://cdn.sanity.io/files/z5s3oquj/production/2087133f8c19622b6ae4ae9205ef784a1cc7f158.mp4"
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
            DEXTER
          </h1>
          <p
            className="text-white text-base sm:text-lg md:text-xl font-normal tracking-wide text-balance"
            style={{ letterSpacing: "0.01em" }}
          >
            Multirole Single Solution
          </p>
        </div>

        {/* Right Side: Paragraph */}
        <div className="max-w-full lg:max-w-md text-left text-neutral-600 text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide text-balance lg:flex lg:flex-col lg:justify-end">
          Where cutting-edge AI meets seamless lift, missions become smarter, faster, and more reliable. This is aerial
          innovation that rewrites what's possible in any environment.
        </div>
      </div>
    </section>
  )
}
