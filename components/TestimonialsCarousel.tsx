"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  id: string
  text: string
  author: string
  role: string
  company: string
  logo: string
  image: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const handleProgressBarClick = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full items-center">
          {/* Left Side - Title, Description, and Progress Bar */}
          <div className="flex flex-col justify-center lg:col-span-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Latest <span style={{ color: '#5ce1e6' }}>News</span> & Updates
            </h2>
            <p className="text-lg text-gray-600 mb-12 font-light leading-relaxed">
              Stay informed with the latest announcements, partnerships, and innovations from Tsalla Aerospace. Discover groundbreaking developments in autonomous systems and advanced propulsion technology.
            </p>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.div
                  key={index}
                  className="h-1 bg-gray-300 cursor-pointer rounded-full transition-all flex-1"
                  style={{
                    backgroundColor: index <= currentIndex ? "#000" : "#e5e7eb",
                  }}
                  whileHover={{ opacity: 0.8 }}
                  onClick={() => handleProgressBarClick(index)}
                  animate={{
                    backgroundColor: index <= currentIndex ? "#000" : "#e5e7eb",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Testimonial Card - Larger */}
          <div className="relative h-[600px] flex items-center justify-center overflow-hidden lg:col-span-3">
            {/* Vertical accent bar */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-black hidden lg:block z-50" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`w-full h-full rounded-lg p-12 flex flex-col justify-between relative z-10 overflow-hidden ${
                  currentIndex % 2 === 0
                    ? "bg-[#0f1419] text-white"
                    : "bg-white border-2 text-gray-900"
                }`}
                style={{
                  borderColor: currentIndex % 2 === 0 ? undefined : '#5ce1e6',
                  backgroundImage: currentIndex % 2 === 0 ? `url('${currentTestimonial.image}')` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Background overlay for dark cards */}
                {currentIndex % 2 === 0 && (
                  <div className="absolute inset-0 bg-black/60 z-0" />
                )}

                {/* Content wrapper - moved up */}
                <div className="relative z-10 flex flex-col justify-start h-full">
                  {/* Testimonial Text */}
                  <blockquote className="mb-8 mt-0">
                    <p className={`text-lg lg:text-xl italic font-light leading-relaxed ${
                      currentIndex % 2 === 0 ? "text-gray-200" : "text-gray-700"
                    }`}>
                      &quot;{currentTestimonial.text}&quot;
                    </p>
                  </blockquote>

                  {/* Author Info */}
                  <div className={`${
                    currentIndex % 2 === 0 ? "border-gray-700" : "border-gray-300"
                  } border-t pt-6`}>
                    <p className={`text-lg font-semibold mb-1 ${
                      currentIndex % 2 === 0 ? "text-white" : "text-gray-900"
                    }`}>
                      {currentTestimonial.author}
                    </p>
                    <p className={`text-sm ${
                      currentIndex % 2 === 0 ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
