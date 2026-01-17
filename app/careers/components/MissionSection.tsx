"use client"
import type React from "react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { useRef, useMemo } from "react"

interface CardData {
  title: string
  description: string
}

const perksData: CardData[] = [
  {
    title: "1. Comprehensive Health Coverage",
    description: "From Preventive Care To Emergencies, We've Got Your Back With Top-Tier Medical Insurance For Peace Of Mind.",
  },
  {
    title: "2. Wear What Works",
    description: "We Keep Things Relaxed And Idea-Focused. Just Come Dressed In A Way That's Comfortable And Office-Appropriate.",
  },
  {
    title: "3. Pet-Friendly Environment",
    description: "Your Four-Legged Companions Are Welcome—Because Innovation Happens Best In Spaces That Feel Like Home.",
  },
  {
    title: "4. Above-Market Compensation",
    description: "We Pay For Performance, Competitive Salaries Designed To Reflect Your Impact, Not Just Your Title.",
  },
]

const CardItem: React.FC<{
  card: CardData
  index: number
}> = ({ card, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-200px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 80, x: index % 2 === 0 ? -30 : 30 }}
      transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-xl mx-auto mb-40 md:mb-56 px-4 md:px-0"
    >
      <div className="group relative">
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5ce1e6] to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />

        <div className="relative bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-white/20">
          <h3 className="text-2xl md:text-3xl font-bold mb-5 text-white tracking-tight" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
            {card.title}
          </h3>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
            {card.description}
          </p>
        </div>
      </div>

      {/* Decorative dot on the timeline */}
      <div
        className="absolute top-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: index % 2 === 0 ? "calc(100% + 80px)" : "-100px",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          className="relative flex items-center justify-center"
        >
          <div className="w-5 h-5 bg-[#5ce1e6] rounded-full shadow-[0_0_20px_#5ce1e6] z-10" />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-10 h-10 border border-[#5ce1e6] rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const pathLength = useTransform(smoothProgress, [0.1, 0.9], [0, 1])

  const cardCount = perksData.length
  const yStep = 600 // Increased vertical spacing for premium feel
  const svgHeight = cardCount * yStep

  const pathD = useMemo(() => {
    let path = "M 200 0"
    for (let i = 0; i < cardCount; i++) {
      const y1 = i * yStep + (yStep * 0.4)
      const y2 = i * yStep + (yStep * 0.8)
      const controlX = i % 2 === 0 ? 50 : 350
      path += ` Q ${controlX} ${y1} 200 ${y2}`
    }
    const finalY = cardCount * yStep
    path += ` L 200 ${finalY}`
    return path
  }, [cardCount, yStep])

  return (
    <section
      ref={containerRef}
      className="relative bg-black py-32 md:py-60 overflow-hidden min-h-screen"
    >
      {/* Background radial gradients for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#5ce1e6]/30 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-32 md:mb-48 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[#5ce1e6] font-bold tracking-[0.3em] uppercase mb-4 block"
        >
          Benefits
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8"
          style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
        >
          PERKS & BENEFITS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          We’re building the future of aerospace, and we want our team to have everything they need to flourish along the way.
        </motion.p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline SVG */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none hidden md:block">
          <svg
            width="400"
            height={svgHeight}
            viewBox={`0 0 400 ${svgHeight}`}
            fill="none"
            className="w-full h-full"
            preserveAspectRatio="xMidYMin meet"
          >
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5ce1e6" stopOpacity="0" />
                <stop offset="5%" stopColor="#5ce1e6" stopOpacity="1" />
                <stop offset="95%" stopColor="#5ce1e6" stopOpacity="1" />
                <stop offset="100%" stopColor="#5ce1e6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={pathD}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <motion.path
              d={pathD}
              stroke="url(#line-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Cards */}
        <div className="flex flex-col items-center">
          {perksData.map((card, index) => (
            <CardItem key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
