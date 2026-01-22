"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
  imageContainerClassName,
}: FeatureStepsProps & { imageContainerClassName?: string }) {
  const [currentFeature, setCurrentFeature] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [features.length, autoPlayInterval])

  // Get 3 items to display: current, next, and next+1
  const getVisibleItems = () => {
    return [
      features[currentFeature],
      features[(currentFeature + 1) % features.length],
      features[(currentFeature + 2) % features.length],
    ]
  }

  const visibleItems = getVisibleItems()

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Left side - Steps carousel */}
          <div className="order-2 md:order-1 -mt-20 md:-mt-32">
            <div className="relative h-[500px] md:h-[600px] overflow-hidden">
              {visibleItems.map((feature, index) => {
                const displayIndex = (currentFeature + index) % features.length
                return (
                  <motion.div
                    key={displayIndex}
                    className="absolute w-full"
                    animate={{ y: index * 200, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <motion.div
                      className={cn(
                        "flex items-center gap-6 md:gap-8 p-6 rounded-lg transition-all duration-300 mb-4",
                        index === 0
                          ? "bg-blue-50 border-2 border-blue-500 scale-100"
                          : "bg-gray-50 border-2 border-gray-200 scale-95 opacity-75"
                      )}
                    >
                      <motion.div
                        className={cn(
                          "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0",
                          index === 0
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "bg-gray-200 border-gray-300 text-gray-600"
                        )}
                      >
                        <span className="text-lg font-semibold">
                          {displayIndex + 1}
                        </span>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold truncate text-gray-900">
                          {feature.title || feature.step}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 line-clamp-2">
                          {feature.content}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right side - Image */}
          <div
            className={cn(
              "order-1 md:order-2 relative overflow-hidden rounded-lg",
              imageHeight,
              imageContainerClassName
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                className="absolute inset-0 rounded-lg overflow-hidden"
                initial={{ y: 100, opacity: 0, rotateX: -20 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -100, opacity: 0, rotateX: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src={features[currentFeature].image}
                  alt={features[currentFeature].step}
                  className="w-full h-full object-cover transition-transform transform"
                  width={1000}
                  height={500}
                />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
