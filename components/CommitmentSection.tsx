"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function CommitmentSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      // Check if observer and current ref exist before disconnecting
      if (sectionRef.current && observer) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    // Responsive padding for the section
    <section ref={sectionRef} className="py-24 md:py-32 lg:pt-48 lg:pb-40 bg-black text-white overflow-hidden">
      <div className="w-full px-6 md:px-12 xl:px-24 max-w-[90rem] mx-auto">
        {/* Responsive flex direction and gap */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column */}
          <div className="w-full lg:max-w-[37.5rem] flex flex-col justify-start">
            <h2
              // Responsive font size, ending at the original desktop size
              className={`text-white/70 tracking-widest uppercase mb-6 transition-all duration-700 ease-out transform text-xl md:text-2xl font-light font-inter ${
                isVisible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-16"
              }`}
            >
              WHERE WE’RE HEADED
            </h2>

            <h3
              // Responsive font size, ending at the original desktop size
              className={`transition-all duration-700 ease-out transform text-3xl md:text-[2.1875rem] leading-tight md:leading-normal ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionDelay: "150ms",
                fontFamily: "Inter, sans-serif",
                // Original line-height preserved for desktop
                lineHeight: "1.5",
                fontWeight: 500,
              }}
            >
              Creating intelligent systems to elevate autonomy and empower unmatched performance on every front.
            </h3>
          </div>

          {/* Right Column */}
          {/* Responsive padding-top, ending at the original desktop value */}
          <div className="w-full lg:max-w-[31.25rem] space-y-4 text-white/90 flex flex-col justify-start lg:pt-[4.0625rem] font-extralight font-['Inter']">
            <p
              // Responsive font size, ending at the original desktop size
              className={`transition-all duration-700 ease-out transform text-base md:text-[0.9375rem] leading-relaxed ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              Security no longer waits for strategy. Our systems act in real time, where delay means defeat.
            </p>

            <p
              // Using translate-y-0 for mobile and translate-y-4 for desktop
              className={`transition-all duration-700 ease-out transform text-base md:text-[0.9375rem] leading-relaxed ${
                isVisible ? "opacity-100 translate-y-0 lg:translate-y-4" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: "450ms" }}
            >
              The future won't be won with legacy systems or slow thinking. We're creating platforms that operate beyond
              human limits that are autonomous, adaptive, and purpose-built for environments where others can't keep up.
              We don't follow tradition. We build what's necessary.
            </p>

            <Link
              href="/careers"
              // Responsive font size and vertical translation
              className={`group inline-flex items-center font-medium text-lg md:text-[1.25rem] text-gray-300 transition-all duration-700 ease-out transform mt-6 ${
                isVisible ? "opacity-100 translate-y-0 lg:translate-y-7" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: "600ms", fontFamily: "Chakra Petch, sans-serif" }}
            >
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[0.125rem] after:w-full after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:bg-gray-300 after:transition-transform after:duration-300">
                Understand What Drives Us Forward
              </span>
              <span className="ml-3 w-6 h-6 flex items-center justify-center rounded-full border border-white text-white group-hover:bg-white group-hover:text-black transition-all duration-200">
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
