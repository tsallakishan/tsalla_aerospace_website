"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import ContentWrapper from "@/components/ContentWrapper"
import { BackgroundBeams } from "@/components/ui/background-beams"

export default function WhatWeAreHeaded() {
  return (
    <section className="relative bg-black text-white min-h-[90vh] flex items-center py-20 md:py-32 overflow-hidden">
      {/* Animated Background */}
      <BackgroundBeams className="opacity-20" />

      <ContentWrapper className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16 lg:gap-24">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2"
          >

            <h2 className="text-white font-clash text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-bold mb-8">
              Where We&apos;re <span className="text-[#5ce1e6]">Headed</span>
            </h2>

            <p className="text-xl md:text-2xl font-clash text-gray-300 mb-8 border-l-2 border-[#5ce1e6] pl-6 py-2">
              Shaping Tomorrow Through Innovation And Intent.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl">
              We envision a world where intelligent aerial systems transcend today&apos;s limitations — autonomously
              navigating complex environments, connecting communities, and pushing the
              boundaries of what flight can achieve.
            </p>

            <motion.a
              href="/solutions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center group bg-white text-black px-8 py-4 rounded-full font-clash font-semibold text-lg hover:bg-[#5ce1e6] transition-colors"
            >
              Discover Our Solutions
              <span className="ml-3 p-1 rounded-full bg-black/10 group-hover:bg-black/20 transition-colors">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.a>
          </motion.div>

          {/* Right Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-1/2 relative group"
          >
            {/* Animated Floating Frame */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <Image
                src="/images/design-mode/depositphotos_220949866-stock-photo-dji-mavic-pro-flying-dark.jpg"
                alt="Drone future"
                width={700}
                height={600}
                className="w-full h-auto object-contain rounded-2xl relative z-10"
              />
            </motion.div>

            {/* Technical Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#5ce1e6]/30 rounded-tr-3xl -mr-4 -mt-4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#5ce1e6]/30 rounded-bl-3xl -ml-4 -mb-4" />
          </motion.div>

        </div>
      </ContentWrapper>
    </section>
  )
}
