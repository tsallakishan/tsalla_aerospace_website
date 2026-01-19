"use client"

import { ContentWrapper } from "@/components/ContentWrapper"
import { motion } from "framer-motion"
import { ZoomParallax } from "@/components/ui/zoom-parallax"
import React from 'react'
const FounderNotePage = () => {
  const images = [
    {
      src: "/images/design-mode/hero-2-2.jpg",
      alt: "Founder team photo",
    },
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1280&h=720&fit=crop&q=80",
      alt: "Cutting-edge technology lab",
    },
    {
      src: "/images/design-mode/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg",
      alt: "Tsalla Aerospace Innovation",
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1280&h=720&fit=crop&q=80",
      alt: "Collaborative workspace",
    },
    {
      src: "/images/design-mode/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png",
      alt: "Advanced drone systems",
    },
    {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop&q=80",
      alt: "Global connectivity and AI",
    },
    {
      src: "/images/design-mode/759cf3b1631ac09f8787809500212d9914788964-4064x2286.jpg",
      alt: "Tsalla Mission Control",
    },
  ]

  return (
    <div className="bg-white text-black font-clash min-h-screen py-16">
      <ContentWrapper>
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
          >
            A <span className="text-[#5ce1e6]">NOTE</span> FROM OUR
            <br />
            FOUNDER
          </motion.h1>
        </div>
      </ContentWrapper>

      {/* Animation Section */}
      <div className="w-full">
        <ZoomParallax images={images} />
      </div>

      {/* Content Section below the animation */}
      <div className="py-24 sm:py-32">
        <ContentWrapper>
          <div className="max-w-4xl mx-auto space-y-8 text-xl md:text-2xl font-light leading-relaxed text-neutral-600 text-center md:text-left" style={{ fontFamily: "sans-serif" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              When we started this company, the goal wasn't just to build cutting-edge systems. It was to build a team that believes in doing meaningful work. We are solving hard problems that matter.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Every feature we ship and every product we launch is a step toward making the world safer and smarter. If you're someone who thrives on autonomy, loves solving challenges, and cares about creating real impact,
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-bold text-black text-2xl md:text-4xl mt-12 italic"
            >
              This is the place for you.
            </motion.p>
          </div>
        </ContentWrapper>
      </div>
    </div>
  )
}

export default FounderNotePage

