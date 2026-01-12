"use client"

import React from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function TechTools() {
  return (
    <section className="h-screen w-full bg-[#050505] relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <div className="max-w-4xl mx-auto p-4 relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 px-4 py-1.5 border border-white/20 bg-white/5 rounded-full overflow-hidden"
        >
          <span className="text-white text-xs font-bold uppercase tracking-[0.3em] font-orbit">
            Our Technology
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-orbit leading-[1.1] mb-8"
        >
          Empowering innovation with <span className="text-[#5ce1e6]">cutting-edge</span> tools.
        </motion.h2>

        {/* Content Paragraphs */}
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base md:text-lg leading-relaxed font-sans"
          >
            Our pursuit of innovation is fueled by a robust ecosystem of advanced tools, proprietary software, and
            state-of-the-art hardware. We select and develop technologies that push boundaries, ensuring agility and
            precision in every project.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/60 text-base md:text-lg leading-relaxed font-sans"
          >
            We believe in building from the ground up, leveraging modern frameworks and custom solutions to tackle
            complex challenges. Our integrated approach ensures that every tool in our arsenal contributes to creating a
            decisive advantage.
          </motion.p>
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <Link
            href="/hardware"
            className="group relative px-8 py-4 bg-white/5 border border-white/10 overflow-hidden flex items-center gap-3 transition-all duration-300 hover:border-[#5ce1e6]/50"
          >
            <div className="absolute inset-0 bg-[#5ce1e6] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 font-orbit text-sm tracking-widest group-hover:text-black transition-colors duration-300">
              EXPLORE OUR TECH STACK
            </span>
            <ArrowRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black" />
          </Link>
        </motion.div>
      </div>

      {/* Background Beams Component */}
      <BackgroundBeams />

      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5ce1e6]/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  )
}
