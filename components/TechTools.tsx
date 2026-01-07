"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function TechTools() {
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
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    // Use min-height for mobile to prevent overflow, and fixed h-screen for desktop
    <section ref={sectionRef} className="relative w-full min-h-screen lg:h-screen text-white flex items-center justify-center py-20 lg:py-0">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/design-mode/759cf3b1631ac09f8787809500212d9914788964-4064x2286.jpg"
          alt="Tech background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 md:bg-opacity-30" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl w-full px-6">
        {/* Changed grid breakpoint to `lg` for better tablet layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - No text alignment changes */}
          <div className="flex flex-col">
            <h2
              // Responsive font size that matches original desktop size
              className={`text-white/60 mb-4 uppercase tracking-widest transition-all duration-700 transform font-sans text-xl md:text-2xl font-light ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: "0ms" }}
            >
              OUR TECHNOLOGY
            </h2>
            <h3
              // Using responsive classes that end at the original desktop font size
              className={`text-white/100 mb-3 transition-all duration-700 transform font-mono text-3xl lg:text-[2.1875rem] font-medium leading-tight lg:leading-normal ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              } `}
              style={{
                transitionDelay: "150ms",
                fontFamily: "Inter, sans-serif",
                // The original line-height is preserved for desktop
                lineHeight: "1.5",
              }}
            >
              Empowering innovation with cutting-edge tools and platforms for unmatched performance.
            </h3>
          </div>

          {/* Right Column - No text alignment changes */}
          <div className="max-w-[31.25rem] space-y-4 text-white/80 flex flex-col justify-start lg:pt-[7.625rem] font-['Inter']">
            <p
              // Responsive font size that matches original desktop size
              className={`transition-all duration-700 transform text-base lg:text-[0.9375rem] font-extralight leading-relaxed ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              Our pursuit of innovation is fueled by a robust ecosystem of advanced tools, proprietary software, and
              state-of-the-art hardware. We select and develop technologies that push boundaries, ensuring agility and
              precision in every project.
            </p>
            <p
              className={`transition-all duration-700 transform text-base lg:text-[0.9375rem] font-extralight leading-relaxed ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionDelay: "450ms",
                paddingTop: "4px",
              }}
            >
              We believe in building from the ground up, leveraging modern frameworks and custom solutions to tackle
              complex challenges. Our integrated approach ensures that every tool in our arsenal contributes to creating a
              decisive advantage.
            </p>

            <Link
              href="/hardware"
              className={`inline-flex items-center group transition-all duration-700 transform mt-6 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <span className="relative font-medium text-base md:text-lg mr-2" style={{ fontFamily: "Chakra Petch, sans-serif" }}>
                <span className="relative z-10">Explore Our Tech Stack</span>
                <span className="absolute left-0 bottom-0 w-full h-[0.125rem] bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <span className="w-6 h-6 border border-white rounded-full flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black ml-2">
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
