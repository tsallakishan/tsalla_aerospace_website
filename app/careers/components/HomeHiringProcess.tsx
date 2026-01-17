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

// --- Card Component with Pixel Transition ---
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
  const pixelGridRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef<HTMLDivElement | null>(null)
  const delayedCallRef = useRef<gsap.core.Tween | null>(null)
  const [isActive, setIsActive] = useState(false)

  const gridSize = 10
  const pixelColor = "#5ce1e6"
  const animationStepDuration = 0.4

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current
    if (!pixelGridEl) return

    pixelGridEl.innerHTML = ""

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div")
        pixel.style.position = "absolute"
        pixel.style.backgroundColor = pixelColor
        pixel.style.display = "none"

        const size = 100 / gridSize
        pixel.style.width = `${size}%`
        pixel.style.height = `${size}%`
        pixel.style.left = `${col * size}%`
        pixel.style.top = `${row * size}%`
        pixelGridEl.appendChild(pixel)
      }
    }
  }, [gridSize, pixelColor])

  const animatePixels = (activate: boolean): void => {
    setIsActive(activate)

    const pixelGridEl = pixelGridRef.current
    const activeEl = activeRef.current
    if (!pixelGridEl || !activeEl) return

    const pixels = Array.from(pixelGridEl.children) as HTMLDivElement[]
    if (!pixels.length) return

    gsap.killTweensOf(pixels)
    if (delayedCallRef.current) {
      delayedCallRef.current.kill()
    }

    gsap.set(pixels, { display: "none" })

    const totalPixels = pixels.length
    const staggerDuration = animationStepDuration / totalPixels

    gsap.to(pixels, {
      display: "block",
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    })

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? "block" : "none"
      activeEl.style.pointerEvents = activate ? "none" : ""
    })

    gsap.to(pixels, {
      display: "none",
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    })
  }

  return (
    <li
      className={cn(
        "relative w-full overflow-hidden border-t border-b border-neutral-300",
        "lg:w-1/3 lg:border-t-0 lg:border-b-0 lg:border-l lg:border-neutral-300",
        isLast && "lg:border-r",
      )}
      onMouseEnter={() => animatePixels(true)}
      onMouseLeave={() => animatePixels(false)}
    >
      <div className="relative block text-black no-underline h-full aspect-square bg-gray-100">
        {/* Content (Visible by default) */}
        <div
          className="relative z-10 flex flex-col justify-center items-center text-center h-full p-8"
          style={{ visibility: isActive ? "hidden" : "visible" }}
        >
          <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
            {title}
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600" style={{ fontFamily: "sans-serif" }}>
            {description}
          </p>
        </div>

        {/* Image (Visible on active) */}
        <div
          ref={activeRef}
          className="absolute inset-0 bg-cover bg-center z-20"
          style={{
            backgroundImage: `url(${imageUrl})`,
            display: "none",
          }}
        ></div>

        {/* Pixel Grid */}
        <div
          ref={pixelGridRef}
          className="absolute inset-0 z-30 pointer-events-none"
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
