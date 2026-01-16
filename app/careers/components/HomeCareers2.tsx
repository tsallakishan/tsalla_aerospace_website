"use client"
import { ContentWrapper } from "@/components/ContentWrapper"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const ITEMS = [
  { id: "01", title: "Resilience Is Our Signature", description: "We don’t complain, we solve. We don’t escape pressure, we rise through it. Mistakes happen — but we take radical responsibility, learn fast, and move forward stronger." },
  { id: "02", title: "We Build Builders", description: "This is a place to become your strongest self — professionally, personally, and patriotically. Here, you grow in knowledge, skill, discipline, and vision. Because Tsalla Aerospace is not just building aircraft — We’re building citizens. We’re building leaders." },
  { id: "03", title: "We Don’t Clock In, We Show Up", description: "This is not a shift job. This is our runway. We show up with our brains sharp, our hearts aligned, and our sleeves rolled up. Because someday, we’ll look back and say: 'We built something that mattered.'" },
  { id: "04", title: "Integrity Is Non-Negotiable", description: "We will never cheat — not people, not processes, not ourselves. No shortcuts, no dishonesty — even if it costs us. Because at Tsalla, how we win is as important as winning itself." },
  { id: "05", title: "Everyone Is a Leader Here", description: "No one hides behind titles. If you see a problem, you own it. If you have an idea, you voice it. Whether you joined yesterday or were here from Day 1 — you matter." },
  { id: "06", title: "United by Purpose, Not Uniformity", description: "We all have different backgrounds, motivations, and dreams — and that’s okay. But when we’re here — we’re united. By discipline. By ownership. By belief in a cause bigger than us." }
];

const InsideTsallaAerospace = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Create a smoothed progress value for "super smooth" feeling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  })

  // Dynamic range based on viewport width
  // We want to translate such that the 6th card is fully visible and then "rests"
  const [xRange, setXRange] = useState("-250vw")

  useEffect(() => {
    const updateRange = () => {
      const width = window.innerWidth
      if (width < 768) {
        setXRange("-550vw")
      } else if (width < 1200) {
        setXRange("-350vw")
      } else {
        // For desktop, translate enough to see all cards and title
        // Title (100vw) + ~150vw of cards
        setXRange("-210vw")
      }
    }
    updateRange()
    window.addEventListener('resize', updateRange)
    return () => window.removeEventListener('resize', updateRange)
  }, [])

  // Map progress [0, 0.85] to move, and [0.85, 1.0] to stay still (the "wait")
  const stripX = useTransform(smoothProgress, [0, 0.85], ["0vw", xRange])

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* THE HORIZONTAL STRIP */}
        <motion.div
          style={{ x: stripX }}
          className="flex flex-row items-center h-full"
        >
          {/* 1. TITLE SECTION */}
          <div className="w-screen h-full flex flex-col items-center justify-center flex-shrink-0 px-12">
            <h1
              className="text-[2.5rem] md:text-[4rem] font-bold leading-tight text-black mb-6 uppercase tracking-wider text-center"
              style={{ wordSpacing: '0.4em' }}
            >
              INSIDE TSALLA <br className="md:hidden" /> AEROSPACE
            </h1>
            <p className="text-sm md:text-base font-semibold text-black/60 tracking-[0.3em] uppercase max-w-2xl text-center">
              REAL PEOPLE. REAL PASSION. REAL RESULTS.
            </p>
          </div>

          {/* 2-7. CARD SECTIONS - TIGHT GAP */}
          <div className="flex-shrink-0 flex flex-row items-center h-full gap-10 md:gap-20 pr-[5vw]">
            {ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 flex flex-col items-center"
              >
                <div className="relative">
                  {/* CARD UI */}
                  <div className="w-[280px] h-[380px] md:w-[400px] md:h-[550px] bg-[#1a1a1a] rounded-[24px] p-8 md:p-10 border border-white/20 shadow-2xl flex flex-col justify-start">
                    <h2 className="text-white text-[1.5rem] md:text-[2.2rem] font-bold leading-tight mb-6">
                      {item.title}
                    </h2>
                    <p className="text-white/80 text-xs md:text-base font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {/* CARD NUMBER BELOW */}
                  <span className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-[#5ce1e6] font-bold text-xl tracking-widest">
                    {item.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InsideTsallaAerospace
