"use client"

import type React from "react"
import { useRef, useEffect } from "react"

// Props interface for a single full-screen mission profile card
interface ProfileCardProps {
  title: string
  imageUrl: string
  description: string
  hasHighlight?: boolean
}

// Reusable component for a full-screen profile slide
const ProfileCard: React.FC<ProfileCardProps> = ({ title, imageUrl, description, hasHighlight = false }) => (
  <div className={`w-screen h-screen flex-shrink-0 relative ${hasHighlight ? "ring-4 ring-blue-500 ring-inset" : ""}`}>
    {/* Background Image */}
    <img
      src={imageUrl || "/placeholder.svg"}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.onerror = null // prevent infinite loop
        target.src = `https://placehold.co/1920x1080/1a1a1a/ffffff?text=Image+Not+Found`
      }}
    />
    {/* Dark Overlay for text readability */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* Centered Content container with 25% spacing on all sides */}
    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex flex-col items-center justify-center text-center z-10">
      <div className="relative z-10 max-w-3xl">
        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">{title}</h2>
        <p className="text-lg md:text-xl text-white/80 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
)

export default function FenixMissionProfiles(): React.JSX.Element {
  // Data for all profiles
  const allProfiles: ProfileCardProps[] = [
    {
      title: "Counter Terrorism",
      imageUrl: "https://images.unsplash.com/photo-1578318283363-239497654810?q=80&w=2070&auto=format&fit=crop",
      description:
        "Covertly monitor high-risk environments, track targets, and provide real-time intel to ground teams.",
    },
    {
      title: "Search & Rescue",
      imageUrl: "https://images.unsplash.com/photo-1561473889-113c34515b1e?q=80&w=1974&auto=format&fit=crop",
      description: "Locate missing persons in challenging terrain and guide rescue teams to precise locations.",
    },
    {
      title: "Counter Inversion",
      imageUrl: "https://images.unsplash.com/photo-1618063322581-3a45167f597c?q=80&w=2070&auto=format&fit=crop",
      description:
        "Identify and neutralize inverted threats, providing a clear operational picture in complex aerial engagements.",
    },
    {
      title: "Pipeline & Ductwork Inspection",
      imageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1974&auto=format&fit=crop",
      description:
        "Efficiently inspect vast networks, identifying potential leaks or damage with high-resolution visuals.",
    },
    {
      title: "Warehouse Management",
      imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb122c294?q=80&w=2070&auto=format&fit=crop",
      description:
        "Automate inventory checks, monitor stock levels, and identify misplaced items in large-scale warehouses.",
    },
    {
      title: "Ongoing Build Surveillance",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
      description:
        "Provide continuous aerial surveillance of construction sites, tracking progress and ensuring security.",
      hasHighlight: true,
    },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const horizontalTrackRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    const horizontalTrack = horizontalTrackRef.current

    if (!scrollContainer || !horizontalTrack) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const containerTop = scrollContainer.offsetTop
      const containerHeight = scrollContainer.offsetHeight
      const viewportHeight = window.innerHeight

      // Check if the user is scrolling within the horizontal section
      if (scrollY >= containerTop && scrollY <= containerTop + containerHeight - viewportHeight) {
        const scrollableHeight = containerHeight - viewportHeight
        const scrollProgress = (scrollY - containerTop) / scrollableHeight

        const maxHorizontalScroll = horizontalTrack.scrollWidth - viewportHeight
        const horizontalScrollValue = scrollProgress * maxHorizontalScroll

        horizontalTrack.style.transform = `translateX(-${horizontalScrollValue}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <style>{`
        @import url("https://fonts.cdnfonts.com/css/clash-grotesk");
        .font-clash-grotesk {
          font-family: "Clash Grotesk", sans-serif !important;
        }
        body {
          background-color: #000; /* Ensure body background is black */
        }
      `}</style>

      {/* This container provides the vertical scroll height to drive the animation. */}
      <div ref={scrollContainerRef} style={{ height: `${(allProfiles.length + 1) * 100}vh` }} className="relative">
        {/* This sticky container holds the horizontal track in place while scrolling. */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <main
            ref={horizontalTrackRef}
            className="font-clash-grotesk text-white h-full flex relative"
            style={{ width: `${(allProfiles.length + 1) * 100}vw` }}
          >
            {/* Introductory Slide */}
            <div className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center text-center p-8">
              <h1 className="text-6xl font-medium tracking-tight">Mission Profiles</h1>
              <p className="text-lg text-gray-400 mt-3">Engineered for reliability in critical scenarios.</p>
              <p className="mt-20 text-gray-500 animate-pulse text-sm">Scroll Down to Explore</p>
            </div>

            {/* Map through all profiles to create a slide for each */}
            {allProfiles.map((profile) => (
              <ProfileCard key={profile.title} {...profile} />
            ))}
          </main>
        </div>
      </div>

      {/* This is the next section that appears after the horizontal scroll is complete. */}
     
    </>
  )
}
