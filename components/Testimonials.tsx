"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface TestimonialBlockProps {
  backgroundImage: string
  logoImage: string
  title: string
  description: string
  readMoreLink: string
  isLast?: boolean
}

const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  backgroundImage,
  logoImage,
  title,
  description,
  readMoreLink,
  isLast = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // These styles are for the DESKTOP hover effect only
  const imageStyle = {
    opacity: isHovered ? 0 : 1,
    transition: "opacity 0.5s ease-out",
  }

  const contentContainerStyle = {
    backgroundColor: "#eaeaea",
    opacity: isHovered ? 1 : 0,
    visibility: isHovered ? "visible" : "hidden",
    transition: "opacity 0.5s ease-out, visibility 0.5s ease-out",
  }

  return (
    <li
      // Added responsive width and margin for tablet view
      className={`relative w-full overflow-hidden border-t border-b border-t-[#505051] border-b-[#505051]
        md:w-[48%] lg:w-[32.9%] ${!isLast ? "lg:border-r border-r-[#505051]" : ""} lg:border-t-0 lg:border-b-0
        lg:aspect-square mb-8 md:mb-12 lg:mb-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={readMoreLink} className="block text-black no-underline h-full">
        {/* --- MOBILE & TABLET VIEW --- */}
        {/* This block is now self-contained and always visible on smaller screens. */}
        <div className="block lg:hidden">
          <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg">
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt={title}
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-start items-start text-left pt-4 px-1 pb-6">
            <Image
              className="mb-4 h-12 sm:h-16 object-contain object-left"
              src={logoImage || "/placeholder.svg"}
              alt={`${title} Logo`}
              width={200}
              height={80}
            />
            <p className="text-base leading-relaxed text-black mb-4" style={{ fontFamily: "Pontano Sans, sans-serif" }}>
              {description}
            </p>
            <span
              className="arrow-link arrow-link--black block text-xs uppercase tracking-wider leading-none relative transition-colors duration-250 ease-in-out hover:text-blue-600"
              style={{ fontFamily: "Pontano Sans, sans-serif" }}
            >
              Read More
            </span>
          </div>
        </div>

        {/* --- DESKTOP VIEW --- */}
        {/* This section is hidden on mobile/tablet and preserves your original desktop hover effect. */}
        <div className="hidden lg:block">
          {/* Desktop background image (fades out on hover) */}
          <div className="absolute inset-0">
            <Image
              className="w-full h-full object-cover p-0 z-0"
              src={backgroundImage || "/placeholder.svg"}
              alt={title}
              width={800}
              height={600}
              style={imageStyle}
              priority
            />
          </div>
          {/* Desktop content (fades in on hover) */}
          <div
            className="flex flex-col justify-start items-center text-center lg:text-left lg:items-start relative z-[2]
            pt-10 pb-14 lg:py-28 px-6 lg:px-10"
            style={contentContainerStyle}
          >
            <Image
              className="mb-6 lg:mb-4 lg:min-h-[5rem] lg:object-scale-down lg:object-left mx-auto lg:mx-0"
              src={logoImage || "/placeholder.svg"}
              alt={`${title} Logo`}
              width={200}
              height={80}
            />
            <p className="text-base leading-relaxed text-black" style={{ fontFamily: "Pontano Sans, sans-serif" }}>
              {description}
            </p>
            <span
              className="arrow-link arrow-link--black block mt-10 text-xs uppercase tracking-wider leading-none relative transition-colors duration-250 ease-in-out hover:text-blue-600 mx-auto lg:mx-0"
              style={{ fontFamily: "Pontano Sans, sans-serif" }}
            >
              Read More
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

const Testimonials: React.FC = () => {
  return (
    // Added responsive padding to the section
    <section className="bg-[#eaeaea] text-black border-t border-b border-black py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Header */}
      <div className="w-full px-6 md:px-12 xl:px-24 max-w-[90rem] mx-auto mb-12">
        <h2
          className="text-black mb-2 font-sans text-2xl"
          style={{
            fontWeight: "350",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          TECH. TOOLS. SOLUTIONS.
        </h2>
        <p
          className="text-black leading-snug"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "34px",
            lineHeight: "1.5",
            fontWeight: "500",
          }}
        >
          Our integrated suite of software, hardware, and services empowers businesses to operate smarter and grow
          faster.
        </p>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 lg:px-4">
        {/* Added responsive gaps between items */}
        <ul className="flex flex-wrap justify-between gap-y-8 md:gap-x-4 lg:gap-x-0" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <TestimonialBlock
            backgroundImage="https://shield.ai/wp-content/uploads/2025/03/company-1b.jpg"
            logoImage="https://shield.ai/wp-content/uploads/2025/03/darpa.svg"
            title="DARPA Partnership"
            description="Shield AI enabled the X-62 VISTA to autonomously fly and perform tactical maneuvers against human pilots."
            readMoreLink="https://shield.ai/inside-the-ai-enabled-pilot-that-flew-air-force-secretary-kendall-through-a-dogfight/"
          />
          <TestimonialBlock
            backgroundImage="https://shield.ai/wp-content/uploads/2025/03/company-2.jpg"
            logoImage="https://shield.ai/wp-content/uploads/2025/03/general-atomics-2.svg"
            title="General Atomics Partnership"
            description="Hivemind successfully flew a MQ-20 Avenger, leveraging some Autonomy Government Reference Architecture (A-GRA)-compliant interfaces."
            readMoreLink="https://shield.ai/shield-ais-hivemind-flies-mq-20-avenger-autonomously-at-orange-flag/"
          />
          <TestimonialBlock
            backgroundImage="https://shield.ai/wp-content/uploads/2025/03/company-3b.jpg"
            logoImage="https://shield.ai/wp-content/uploads/2025/03/kratos.svg"
            title="Kratos Partnership"
            description="Shield AI conducted dual-ship autonomy tests using Kratos' MQM-178 Firejet drones."
            readMoreLink="https://shield.ai/autonomy-for-the-world-mqm-178-firejet/"
            isLast={true}
          />
        </ul>
      </div>
    </section>
  )
}

export default Testimonials
