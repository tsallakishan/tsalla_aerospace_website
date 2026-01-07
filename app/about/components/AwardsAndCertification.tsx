"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ContentWrapper from "@/components/ContentWrapper"

export default function AwardsAndCertification() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen flex items-center justify-start overflow-hidden transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-100"
      }`}
    >
      {/* Background Image */}
      <Image
        src="/images/design-mode/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png"
        alt="Drone Silhouette Hero"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content Block */}
      <ContentWrapper>
        <div className="relative z-10 text-left max-w-2xl mt-16">
          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-clash font-semibold mb-6">
            OUR STORY IS STILL BEING WRITTEN...
          </h1>
          <Link
            href="/careers"
            className="
              inline-block bg-transparent border-2 border-white text-white
              hover:bg-white hover:text-black
              px-4 py-2 mt-2
              transition-all duration-300
              font-clash text-xs sm:text-sm md:text-base
            "
          >
            Join Us
          </Link>
        </div>
      </ContentWrapper>
    </section>
  )
}
