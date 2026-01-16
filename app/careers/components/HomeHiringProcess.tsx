"use client"

import { useState } from "react"
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
    title: "INTERVIEW",
    description: "An Initial Round To Assess Your Background, Communication, And Problem-Solving Approach.",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "TOOL TEST",
    description:
      "A practical assessment for technical roles to evaluate your skills with relevant tools and technologies.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "HR INTERVIEW",
    description: "A final conversation to discuss culture fit, career goals, and the future of your role with us.",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop",
  },
]

// --- Card Component with text first and image on hover ---
const HiringProcessCard = ({
  title,
  description,
  imageUrl,
  isLast = false,
}: {
  title: string
  description: string
  imageUrl: string
  isLast?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li
      className={cn(
        "relative w-full overflow-hidden border-t border-b border-neutral-300",
        "lg:w-1/3 lg:border-t-0 lg:border-b-0 lg:border-l lg:border-neutral-300",
        isLast && "lg:border-r",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="#" className="block text-black no-underline h-full aspect-square">
        {/* Text content (visible by default) */}
        <div
          className="relative z-10 flex flex-col justify-center items-center text-center h-full p-8 bg-gray-100 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0 : 1,
            visibility: isHovered ? "hidden" : "visible",
          }}
        >
          <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>{title}</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600">{description}</p>
        </div>

        {/* Image (only visible on hover) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 z-0"
          style={{
            backgroundImage: `url(${imageUrl})`,
            opacity: isHovered ? 1 : 0,
          }}
        ></div>
      </a>
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            OUR HIRING
            <br />
            PROCESS
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
