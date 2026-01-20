"use client"

import type React from "react"
import { useState } from "react"
import { ContentWrapper } from "@/components/ContentWrapper"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define the props interface for the reusable ProfileCard component for type safety.
interface ProfileCardProps {
  title: string
  description: string
  imageUrl: string
  hoverTitle?: string
  hoverDescription?: string
  hoverImageUrl?: string
}

// A reusable card component to display each mission profile.
// The layout is updated to show the image above the text content.
const ProfileCard: React.FC<ProfileCardProps & { index: number }> = ({
  title,
  description,
  imageUrl,
  hoverTitle,
  hoverDescription,
  hoverImageUrl,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Determine which content to show
  const displayTitle = isHovered && hoverTitle ? hoverTitle : title
  const displayDescription = isHovered && hoverDescription ? hoverDescription : description
  const displayImageUrl = isHovered && hoverImageUrl ? hoverImageUrl : imageUrl

  return (
    <motion.div
      className="flex flex-col cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The aspect ratio is changed from [40/39] to [100/117] to increase height by another 20% */}
      <div className="aspect-[100/117] w-full overflow-hidden relative">
        <AnimatePresence>
          <motion.img
            key={displayImageUrl}
            src={displayImageUrl || "/placeholder.svg"}
            alt={displayTitle}
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            // Provides a fallback image if the primary URL fails to load.
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null // prevent infinite loop
              target.src = `https://placehold.co/600x450/1a1a1a/ffffff?text=Image+Unavailable`
            }}
          />
        </AnimatePresence>
      </div>
      <div className="pt-5">
        <AnimatePresence mode="wait">
          <motion.h3
            key={displayTitle}
            className="text-xl font-medium tracking-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {displayTitle}
          </motion.h3>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={displayDescription}
            className="text-base text-neutral-600 mt-2 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {displayDescription}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// The main component for the "Mission Profiles" section.
export default function Dexter1(): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 1 for next, -1 for previous

  // Data for the mission profile cards, updated with the new images and descriptions.
  const profiles: ProfileCardProps[] = [
    {
      title: "Border Surveillance",
      description: "Provides continuous situational awareness for persistent monitoring and threat detection.",
      imageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/641de74487cf8d3c116abd5924ab673367516bb2-2000x2500.jpg?auto=format&fit=max&w=1920&q=90",
      hoverTitle: "Maritime Surveillance",
      hoverDescription: "Advanced coastal and maritime monitoring with long-range detection capabilities for naval security operations.",
      hoverImageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/9ac1a07d3b84827ba687a8a9281ed48b31458e49-1920x1080.png?auto=format&fit=max&w=1920&q=90",
    },
    {
      title: "Disaster Response",
      description:
        "Rapidly deliver support for real-time situational awareness and coordination in disaster relief operations.",
      imageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/9ac1a07d3b84827ba687a8a9281ed48b31458e49-1920x1080.png?auto=format&fit=max&w=1920&q=90",
      hoverTitle: "Damage Assessment",
      hoverDescription: "Comprehensive post-disaster damage evaluation and infrastructure assessment for rapid recovery planning.",
      hoverImageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/8801921308d204efa9bf03a05503df326916b847-3642x2049.png?auto=format&fit=max&w=1920&q=90",
    },
    {
      title: "ISR Missions",
      description:
        "Delivers high-resolution intelligence and real-time situational awareness for critical ISR missions.",
      imageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/8801921308d204efa9bf03a05503df326916b847-3642x2049.png?auto=format&fit=max&w=1920&q=90",
      hoverTitle: "Wildfire ISR",
      hoverDescription: "Specialized wildfire monitoring and intelligence gathering with thermal imaging for firefighting coordination.",
      hoverImageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/641de74487cf8d3c116abd5924ab673367516bb2-2000x2500.jpg?auto=format&fit=max&w=1920&q=90",
    },
    {
      title: "Survey & Mapping",
      description:
        "High-precision aerial surveying and mapping capabilities for infrastructure planning and terrain analysis.",
      imageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/641de74487cf8d3c116abd5924ab673367516bb2-2000x2500.jpg?auto=format&fit=max&w=1920&q=90",
    },
    {
      title: "Critical Infrastructure Security",
      description:
        "Advanced monitoring and protection of critical infrastructure assets with real-time threat assessment.",
      imageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/9ac1a07d3b84827ba687a8a9281ed48b31458e49-1920x1080.png?auto=format&fit=max&w=1920&q=90",
    },
  ]

  // Calculate how many cards to show at once
  const cardsPerView = 3

  // Navigate to previous set of cards
  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => Math.max(0, prev - cardsPerView))
  }

  // Navigate to next set of cards
  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => Math.min(profiles.length - cardsPerView, prev + cardsPerView))
  }

  // Check if navigation buttons should be disabled
  const isPrevDisabled = currentIndex === 0
  const isNextDisabled = currentIndex >= profiles.length - cardsPerView

  // Get visible cards
  const visibleProfiles = profiles.slice(currentIndex, currentIndex + cardsPerView)

  return (
    <>
      {/*
        The link to the "Clash Grotesk" font is included here.
        This ensures the font is available for the component to use.
      */}
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>
      <section className="font-clash-grotesk bg-black text-white w-full min-h-screen flex items-center justify-center py-20">
        <ContentWrapper>
          <div className="text-left mb-16">
            <h1 className="text-7xl font-medium tracking-tight" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>Mission Profiles</h1>
            <p className="text-xl text-neutral-600 mt-4">Engineered for reliability in critical scenarios.</p>
          </div>

          {/* Carousel Container with Side Navigation */}
          <div className="relative flex items-center gap-8">
            {/* Left Navigation Button */}
            <button
              onClick={handlePrevious}
              disabled={isPrevDisabled}
              className={`w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isPrevDisabled
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white hover:text-black hover:border-white"
                }`}
              aria-label="Previous cards"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Profiles Grid Section */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{
                    x: direction > 0 ? 300 : -300,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    x: direction > 0 ? -300 : 300,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {visibleProfiles.map((profile, index) => (
                    <ProfileCard
                      key={profile.title}
                      title={profile.title}
                      description={profile.description}
                      imageUrl={profile.imageUrl}
                      hoverTitle={profile.hoverTitle}
                      hoverDescription={profile.hoverDescription}
                      hoverImageUrl={profile.hoverImageUrl}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isNextDisabled
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white hover:text-black hover:border-white"
                }`}
              aria-label="Next cards"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
