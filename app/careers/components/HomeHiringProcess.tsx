"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"
import { ContentWrapper } from "@/components/ContentWrapper"

// Utility function to merge Tailwind CSS classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Data for the hiring process cards ---
const hiringSteps = [
  {
    title: "TECH ROUND",
    description: "An Initial Round To Assess Your Background, Communication, And Problem-Solving Approach.",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "MISSION LAB",
    description:
      "A practical assessment for technical roles to evaluate your skills with relevant tools and technologies.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "CULTURE QUEST",
    description: "A final conversation to discuss culture fit, career goals, and the future of your role with us.",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop",
  },
]

const HiringProcessCard = ({
  title,
  description,
  imageUrl, // Kept for interface consistency, but unused if we are removing the image reveal
  isLast = false,
}: {
  title: string
  description: string
  imageUrl: string
  isLast?: boolean
}) => {
  return (
    <li
      className={cn(
        "group relative w-full overflow-hidden border-t border-b border-neutral-300 transition-colors duration-300 hover:bg-neutral-50",
        "lg:w-1/3 lg:border-t-0 lg:border-b-0 lg:border-l lg:border-neutral-300",
        isLast && "lg:border-r",
      )}
    >
      <div className="relative block text-black no-underline h-full aspect-square md:aspect-auto md:h-auto md:py-24 bg-gray-100/50 hover:bg-gray-100 transition-colors duration-300">
        {/* Content (Fades out on hover) */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full p-8 transition-opacity duration-500 group-hover:opacity-0">
          <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wide" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
            {title}
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 max-w-sm mx-auto" style={{ fontFamily: "sans-serif" }}>
            {description}
          </p>
        </div>

        {/* Image (Fades in on hover) */}
        <div
          className="absolute inset-0 bg-cover bg-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
    </li>
  )
}

// --- The Main Page Component ---
const HiringProcessPage = () => {
  return (
    <div className="min-h-screen w-full bg-white font-sans text-black py-16 sm:py-24">
      <ContentWrapper>
        {/* Main page heading */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
            OUR HIRING PROCESS
          </h1>
        </div>

        {/* Flex container for the cards */}
        <ul className="flex flex-col lg:flex-row list-none p-0 m-0 border-t-0 lg:border-b-0">
          {hiringSteps.map((step, index) => (
            <HiringProcessCard
              key={index}
              title={step.title}
              description={step.description}
              imageUrl={step.imageUrl}
              isLast={index === hiringSteps.length - 1}
            />
          ))}
        </ul>
      </ContentWrapper>
    </div>
  )
}

export default HiringProcessPage
