"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProfileCardProps {
  title: string
  imageUrl: string
  description: string
}

export default function FenixMissionProfiles(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(2)

  const allProfiles: ProfileCardProps[] = [
    {
      title: "Counter Terrorism",
      imageUrl: "/images/Fenix/CounterTerrorism.jpg",
      description:
        "Covertly monitor high-risk environments, track targets, and provide real-time intel to ground teams.",
    },
    {
      title: "Search & Rescue",
      imageUrl: "/images/Fenix/Search_Rescue.jpg",
      description: "Locate missing persons in challenging terrain and guide rescue teams to precise locations.",
    },
    {
      title: "Counter Inversion",
      imageUrl: "/images/Fenix/CounterInversion.webp",
      description:
        "Identify and neutralize inverted threats, providing a clear operational picture in complex aerial engagements.",
    },
    {
      title: "Pipeline & Ductwork Inspection",
      imageUrl: "/images/Fenix/PipelineDuctwork.webp",
      description:
        "Efficiently inspect vast networks, identifying potential leaks or damage with high-resolution visuals.",
    },
    {
      title: "Warehouse Management",
      imageUrl: "/images/Fenix/WarehouseManagement.jpeg",
      description:
        "Automate inventory checks, monitor stock levels, and identify misplaced items in large-scale warehouses.",
    },
    {
      title: "Ongoing Build Surveillance",
      imageUrl: "/images/Fenix/OngoingBuild.webp",
      description:
        "Provide continuous aerial surveillance of construction sites, tracking progress and ensuring security.",
    },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Navigation Handlers
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (activeIndex < allProfiles.length - 1) setActiveIndex(prev => prev + 1)
  }

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (activeIndex > 0) setActiveIndex(prev => prev - 1)
  }

  // Title Animation
  const titleOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0])
  const titleY = useTransform(smoothProgress, [0, 0.1], [0, -30])

  return (
    <>
      <style>{`
        @import url("https://fonts.cdnfonts.com/css/clash-grotesk");
        .font-clash-grotesk {
          font-family: "Clash Grotesk", sans-serif !important;
        }
      `}</style>

      <div ref={containerRef} className="relative h-[450vh] bg-black font-clash-grotesk overflow-clip">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">

          {/* Section Title */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute top-6 z-50 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tight drop-shadow-2xl" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
              Mission Profiles
            </h2>
            <div className="h-1 w-24 bg-cyan-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center gap-6 md:gap-10 px-8 md:px-12">
            {allProfiles.map((profile, index) => (
              <ProfileCard
                key={profile.title}
                profile={profile}
                index={index}
                activeIndex={activeIndex}
                smoothProgress={smoothProgress}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function ProfileCard({
  profile,
  index,
  activeIndex,
  smoothProgress,
  handleNext,
  handlePrev
}: {
  profile: ProfileCardProps
  index: number
  activeIndex: number
  smoothProgress: any
  handleNext: (e?: React.MouseEvent) => void
  handlePrev: (e?: React.MouseEvent) => void
}) {
  const isCenterCard = index === activeIndex
  const distanceFromCenter = index - activeIndex
  const isNextCard = index === activeIndex + 1
  const isPrevCard = index === activeIndex - 1

  // Card Width
  const widthCenter = useTransform(smoothProgress, [0, 0.4, 0.8], ["28vw", "55vw", "85vw"])
  const widthNeighbor = useTransform(smoothProgress, [0, 0.4, 0.8], ["16vw", "11vw", "7vw"])
  const widthFar = useTransform(smoothProgress, [0, 0.4, 0.8], ["9vw", "7vw", "4vw"])
  const width = isCenterCard ? widthCenter : (isPrevCard || isNextCard ? widthNeighbor : widthFar)

  // Card Height
  const heightCenter = useTransform(smoothProgress, [0, 0.4, 0.8], ["70vh", "75vh", "85vh"])
  const heightNeighbor = useTransform(smoothProgress, [0, 0.4, 0.8], ["45vh", "40vh", "30vh"])
  const heightFar = useTransform(smoothProgress, [0, 0.4, 0.8], ["25vh", "22vh", "20vh"])
  const height = isCenterCard ? heightCenter : (isPrevCard || isNextCard ? heightNeighbor : heightFar)

  // Card Opacity
  const opacityNeighbor = useTransform(smoothProgress, [0, 0.4, 0.8], [1, 1, 0.6])
  const opacityFar = useTransform(smoothProgress, [0, 0.4, 0.8], [0.8, 0.6, 0.4])
  const opacity = isCenterCard ? 1 : (isPrevCard || isNextCard ? opacityNeighbor : opacityFar)

  // Text Overlay Opacity
  const textOpacityVal = useTransform(smoothProgress, [0.2, 0.4], [0, 1])
  const textOpacity = isCenterCard ? textOpacityVal : 0

  // Navigation Arrow Opacity
  const arrowOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 1])

  // Gradient Overlay Opacity
  const gradientOpacityVal = useTransform(smoothProgress, [0.1, 0.4], [0, 0.75])
  const gradientOpacity = isCenterCard ? gradientOpacityVal : 0.5

  // Only render cards that are visible (farPrev, prev, center, next, farNext)
  const isVisible = Math.abs(distanceFromCenter) <= 2
  const finalOpacity = isVisible ? opacity : 0
  const pointerEvents = isVisible ? 'auto' : 'none'

  return (
    <motion.div
      layout
      layoutId={`card-${profile.title}`}
      style={{
        width,
        height,
        opacity: finalOpacity,
        zIndex: isCenterCard ? 40 : 10,
        pointerEvents: pointerEvents as any
      }}
      onClick={() => {
        if (isPrevCard) handlePrev()
        if (isNextCard) handleNext()
      }}
      transition={{
        layout: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.4 }
      }}
      className={`relative flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl border border-white/10 shadow-2xl bg-neutral-900 group ${!isCenterCard && (isPrevCard || isNextCard) ? 'cursor-pointer' : ''}`}
    >
      {/* Background Image */}
      <motion.img
        layoutId={`img-${profile.title}`}
        src={profile.imageUrl}
        alt={profile.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{
          scale: isCenterCard ? 1.1 : 1,
          filter: "grayscale(0%) blur(0px) brightness(1)",
        }}
        transition={{
          scale: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
          filter: { duration: 0.6, ease: "easeInOut" }
        }}
      />

      {/* Dark Gradient Overlay */}
      <motion.div
        style={{ opacity: gradientOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10"
      />

      {/* Navigation Icons for Side Cards */}
      {!isCenterCard && (isNextCard || isPrevCard) && (
        <motion.div
          style={{ opacity: arrowOpacity }}
          className="absolute inset-0 z-30 flex items-center justify-center"
        >
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-cyan-500/30 group-hover:border-cyan-500/60 transition-all duration-500 pointer-events-auto"
          >
            {isPrevCard && <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-white transition-colors" />}
            {isNextCard && <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-white transition-colors" />}
          </div>
        </motion.div>
      )}

      {/* Content for Center Card */}
      <div className="absolute inset-0 z-20 p-8 md:p-12 lg:p-16 flex flex-col justify-between pointer-events-none">
        <AnimatePresence mode="wait">
          {isCenterCard && (
            <>
              <motion.div
                key={`text-top-${profile.title}`}
                style={{ opacity: textOpacity }}
                className="text-left"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <p className="text-cyan-400 font-bold tracking-[0.2em] md:tracking-[0.25em] uppercase text-[9px] md:text-xs mb-2 md:mb-3 drop-shadow-lg">Operational Profile</p>
                <h3 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-none drop-shadow-2xl max-w-4xl" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                  {profile.title}
                </h3>
              </motion.div>

              <motion.div
                key={`text-bot-${profile.title}`}
                style={{ opacity: textOpacity }}
                className="max-w-2xl lg:max-w-3xl ml-auto text-right"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600">
                  {profile.description}
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
