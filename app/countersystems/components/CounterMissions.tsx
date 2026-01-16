"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

interface MissionProfile {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  features: string[]
  capabilities?: Array<{
    title: string
    description: string
  }>
}

const missionProfiles: MissionProfile[] = [
  {
    id: "border-surveillance",
    title: "Border Surveillance",
    description:
      "Provides continuous situational awareness for persistent monitoring and threat detection. Advanced sensor systems ensure 24/7 operational readiness in challenging environments.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800",
    imageAlt: "Border surveillance equipment in desert terrain",
    features: ["24/7 Monitoring", "Threat Detection", "All-Weather"],
  },
  {
    id: "disaster-response",
    title: "Disaster Response",
    description:
      "Rapidly deliver support for real-time situational awareness and coordination in disaster relief operations. Enables immediate deployment and effective resource allocation during critical emergencies.",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800",
    imageAlt: "Aerial view of disaster response infrastructure",
    features: ["Rapid Deployment", "Real-time Coordination", "Emergency Response"],
    capabilities: [
      { title: "Instant situational assessment", description: "Quick evaluation of crisis situations" },
      { title: "Multi-agency coordination", description: "Seamless inter-agency collaboration" },
      { title: "Resource optimization", description: "Efficient allocation of resources" },
    ],
  },
  {
    id: "isr-missions",
    title: "ISR Missions",
    description:
      "Delivers high-resolution intelligence and real-time situational awareness for critical ISR missions. Advanced reconnaissance capabilities provide tactical advantages in complex operational environments.",
    image:
      "https://pixabay.com/get/g80b6f85c4c45090ef7a50679544cd2c50b36d9a75d2a63b161bbf38103f70f4a4bcd042133de181317940ebce1aa09f2e3ca6e53131f0d6c163202403fd387f1_1280.jpg",
    imageAlt: "Military ISR operations with tactical vehicles",
    features: [],
    capabilities: [
      { title: "Intelligence Gathering", description: "High-resolution data collection and analysis" },
      { title: "Surveillance", description: "Continuous monitoring and tracking" },
      { title: "Reconnaissance", description: "Strategic area assessment and mapping" },
      { title: "Real-time Analysis", description: "Immediate data processing and insights" },
    ],
  },
]

export default function MissionProfiles() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isComponentActive, setIsComponentActive] = useState(false)
  const [visibilityPercentage, setVisibilityPercentage] = useState(0)
  const [canNavigateReverse, setCanNavigateReverse] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const totalSections = missionProfiles.length

  const updateSection = useCallback(
    (newSection: number) => {
      if (newSection < 0 || newSection >= totalSections) return
      setCurrentSection(newSection)
    },
    [totalSections],
  )

  // Intersection Observer to track component visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visiblePercentage = Math.round(entry.intersectionRatio * 100)
          setVisibilityPercentage(visiblePercentage)

          // Activate horizontal scrolling when 95% or more is visible
          const isActive = visiblePercentage >= 95
          setIsComponentActive(isActive)
          setCanNavigateReverse(isActive)
        })
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0% to 100% in 1% increments
        rootMargin: "0px",
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!isComponentActive || isScrolling) return

      const deltaY = event.deltaY

      // Forward navigation (scroll down to next section)
      if (deltaY > 0) {
        if (currentSection === totalSections - 1) {
          return
        }
        event.preventDefault()
        event.stopPropagation()
        setIsScrolling(true)
        updateSection(currentSection + 1)
      }
      // Reverse navigation (scroll up to previous section)
      else if (deltaY < 0) {
        if (!canNavigateReverse || currentSection === 0) {
          return
        }
        event.preventDefault()
        event.stopPropagation()
        setIsScrolling(true)
        updateSection(currentSection - 1)
      }

      setTimeout(() => {
        setIsScrolling(false)
      }, 1000) // MODIFIED: Increased timeout to match new transition duration
    },
    [currentSection, totalSections, updateSection, isScrolling, isComponentActive, canNavigateReverse],
  )

  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      if (!isComponentActive) return

      if (event.key === "ArrowRight" && currentSection < totalSections - 1) {
        event.preventDefault()
        updateSection(currentSection + 1)
      } else if (event.key === "ArrowLeft" && canNavigateReverse && currentSection > 0) {
        event.preventDefault()
        updateSection(currentSection - 1)
      }
    },
    [currentSection, totalSections, updateSection, isComponentActive, canNavigateReverse],
  )

  const handleTouch = useCallback(() => {
    let startY = 0
    let endY = 0
    let startX = 0
    let endX = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (!isComponentActive || !containerRef.current?.contains(e.target as Node)) return
      startY = e.touches[0].clientY
      startX = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isComponentActive || !containerRef.current?.contains(e.target as Node)) return

      const currentY = e.touches[0].clientY
      const currentX = e.touches[0].clientX
      const deltaY = Math.abs(currentY - startY)
      const deltaX = Math.abs(currentX - startX)

      if (deltaX > deltaY) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isComponentActive || !containerRef.current?.contains(e.target as Node)) return

      endY = e.changedTouches[0].clientY
      endX = e.changedTouches[0].clientX
      const deltaY = startY - endY
      const deltaX = startX - endX

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentSection < totalSections - 1) {
          updateSection(currentSection + 1)
        } else if (deltaX < 0 && canNavigateReverse && currentSection > 0) {
          updateSection(currentSection - 1)
        }
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSection, totalSections, updateSection, isComponentActive, canNavigateReverse])

  useEffect(() => {
    document.addEventListener("wheel", handleWheel, { passive: false })
    document.addEventListener("keydown", handleKeyboard)
    const touchCleanup = handleTouch()

    return () => {
      document.removeEventListener("wheel", handleWheel)
      document.removeEventListener("keydown", handleKeyboard)
      touchCleanup()
    }
  }, [handleWheel, handleKeyboard, handleTouch])

  const progress = ((currentSection + 1) / totalSections) * 100

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black text-white overflow-hidden relative transition-all duration-300"
      data-testid="mission-profiles-page"
      style={{
        opacity: visibilityPercentage < 20 ? 0.3 : 1,
        transform: `scale(${0.95 + (visibilityPercentage / 100) * 0.05})`,
      }}
    >
      {/* UI Indicators (unchanged) */}
      {visibilityPercentage > 0 && visibilityPercentage < 95 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">
                Scroll to activate horizontal navigation ({visibilityPercentage}% / 95% needed)
              </span>
            </div>
          </div>
        </div>
      )}
      {isComponentActive && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-blue-600 bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm text-white font-medium">
                Horizontal Navigation Active ({visibilityPercentage}%)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Indicators (unchanged) */}
      <div
        className={`absolute top-8 right-8 z-50 flex space-x-3 transition-opacity duration-300 ${
          isComponentActive ? "opacity-100" : "opacity-30"
        }`}
        data-testid="navigation-dots"
      >
        {missionProfiles.map((_, index) => (
          <div
            key={index}
            className={`nav-dot w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
              index === currentSection ? "bg-white transform scale-125" : "bg-gray-600 hover:bg-gray-500"
            } ${!isComponentActive ? "pointer-events-none" : ""} ${
              index < currentSection && !canNavigateReverse ? "opacity-50" : ""
            }`}
            onClick={() => {
              if (!isComponentActive) return
              if (index < currentSection && !canNavigateReverse) return
              updateSection(index)
            }}
            data-testid={`nav-dot-${index}`}
          />
        ))}
      </div>

      {/* Horizontal Scroll Container */}
      <div className="h-full">
        <div
          className="flex h-full transition-transform duration-1000 ease-out" // MODIFIED: Changed duration-700 to duration-1000
          style={{
            width: `${totalSections * 100}vw`,
            transform: `translateX(-${currentSection * 100}vw)`,
          }}
          data-testid="scroll-content"
        >
          {missionProfiles.map((profile, index) => (
            <section
              key={`${profile.id}-${index}`}
              className="w-screen h-full flex items-center justify-center"
              data-testid={`mission-section-${index}`}
            >
              <ContentWrapper>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content (unchanged) */}
                  <div className={`space-y-8 ${index === 1 ? "order-1 lg:order-2" : ""}`}>
                    {index === 0 && (
                      <div className="animate-fade-in">
                        <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tight" data-testid="main-title">
                          Mission Profiles
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-300 font-light" data-testid="main-subtitle">
                          Engineered for reliability in critical scenarios.
                        </p>
                      </div>
                    )}
                    <div className="space-y-6">
                      <h2 className="text-3xl lg:text-4xl font-semibold text-white" data-testid={`title-${profile.id}`} style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                        {profile.title}
                      </h2>
                      <p
                        className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 max-w-2xl"
                        data-testid={`description-${profile.id}`}
                      >
                        {profile.description}
                      </p>
                      {profile.features.length > 0 && (
                        <div className="flex flex-wrap gap-4 pt-4" data-testid={`features-${profile.id}`}>
                          {profile.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
                              data-testid={`feature-${profile.id}-${featureIndex}`}
                            >
                              <span className="text-sm font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {profile.capabilities && (
                        <div className="space-y-4" data-testid={`capabilities-${profile.id}`}>
                          <h3 className="text-xl font-semibold">
                            {index === 1 ? "Key Capabilities" : "Mission-Critical Features"}
                          </h3>
                          {index === 1 ? (
                            <ul className="space-y-2 text-gray-300">
                              {profile.capabilities.map((capability, capIndex) => (
                                <li
                                  key={capIndex}
                                  className="flex items-center"
                                  data-testid={`capability-${profile.id}-${capIndex}`}
                                >
                                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                  {capability.title}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {profile.capabilities.map((capability, capIndex) => (
                                <div
                                  key={capIndex}
                                  className="p-4 bg-gray-900 rounded-lg border border-gray-700"
                                  data-testid={`capability-card-${profile.id}-${capIndex}`}
                                >
                                  <h4 className="font-semibold mb-2" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>{capability.title}</h4>
                                  <p className="text-base text-neutral-600 font-light">{capability.description}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Image (unchanged) */}
                  <div
                    className={`mission-card transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-2xl ${index === 1 ? "order-2 lg:order-1" : ""}`}
                  >
                    <img
                      src={profile.image || "/placeholder.svg"}
                      alt={profile.imageAlt}
                      className="rounded-2xl shadow-2xl w-full h-auto max-h-96 object-cover border border-gray-800"
                      data-testid={`image-${profile.id}`}
                    />
                  </div>
                </div>
              </ContentWrapper>
            </section>
          ))}
        </div>
      </div>

      {/* Scroll Progress Indicator (unchanged) */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
          isComponentActive ? "opacity-100" : "opacity-30"
        }`}
        data-testid="scroll-indicator"
      >
        <div className="flex items-center space-x-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700">
          <span className="text-sm text-gray-400">
            {isComponentActive ? "Navigate horizontally" : "Scroll to explore"}
          </span>
          <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
              data-testid="progress-bar"
            />
          </div>
        </div>
      </div>
       
      {/* Scroll Hint for End of Component (unchanged) */}
      {isComponentActive && currentSection === totalSections - 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300">Scroll down to continue</span>
              <div className="w-4 h-4 border-r-2 border-b-2 border-gray-400 transform rotate-45 animate-bounce"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
