"use client"

import type React from "react"
import { useRef } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"
import FenixFUI2 from "./FenixFUI2"
import GoogleGeminiEffect from "@/components/ui/google-gemini-effect"

interface SpecItemProps {
  label: string
  value: React.ReactNode
}

export default function FenixSpecifications(): React.JSX.Element {
  const specs = {
    endurance: "20",
    speed: "5",
    altitude: "0.5-50",
    payload: "500",
    takeoff: "Vertical"
  }

  const gemRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: gemRef, offset: ["start start", "end start"] })

  const pathLengthFirst = useTransform(scrollYProgress as MotionValue, [0, 0.8], [0.2, 1.2])
  const pathLengthSecond = useTransform(scrollYProgress as MotionValue, [0, 0.8], [0.15, 1.2])
  const pathLengthThird = useTransform(scrollYProgress as MotionValue, [0, 0.8], [0.1, 1.2])
  const pathLengthFourth = useTransform(scrollYProgress as MotionValue, [0, 0.8], [0.05, 1.2])
  const pathLengthFifth = useTransform(scrollYProgress as MotionValue, [0, 0.8], [0, 1.2])

  // small horizontal offsets so lines slide left->center->right as user scrolls
  const offsetFirst = useTransform(scrollYProgress as MotionValue, [0, 1], [-140, 140])
  const offsetSecond = useTransform(scrollYProgress as MotionValue, [0, 1], [-100, 100])
  const offsetThird = useTransform(scrollYProgress as MotionValue, [0, 1], [-60, 60])
  const offsetFourth = useTransform(scrollYProgress as MotionValue, [0, 1], [-40, 40])
  const offsetFifth = useTransform(scrollYProgress as MotionValue, [0, 1], [-20, 20])

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif !important;
        }
        .text-glow {
          text-shadow: 0 0 15px rgba(92, 225, 230, 0.3);
        }
      `}</style>

      <div className="font-clash-grotesk bg-black text-white w-full overflow-hidden">
        {/* FUI SECTION (KEEPING AS IS PER USER PREVIOUS STEP) */}
        <FenixFUI2 />

        <div className="relative min-h-screen pt-0 pb-20 px-4 md:px-8 flex flex-col items-center justify-start">

          {/* BACKGROUND DECORATION */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] mt-32 mb-12 uppercase opacity-80 text-center" style={{ fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 700 }}>
            Specifications
          </h2>

          <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">

            {/* Gemini lines behind the drone - uses scroll to animate pathLengths */}
              <div ref={gemRef} className="absolute inset-0 z-0 pointer-events-none">
              <GoogleGeminiEffect
                pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]}
                pathOffsets={[offsetFirst, offsetSecond, offsetThird, offsetFourth, offsetFifth]}
                className="w-full h-full"
              />
            </div>

            {/* CENTRAL IMAGE AND SIDE CARDS CONTAINER */}
            <div className="relative w-full flex items-center justify-center min-h-[500px]">

              {/* LEFT SIDE CARDS */}
              <div className="hidden lg:flex flex-col gap-6 absolute left-0 z-20">
                <SpecCard
                  label="Lift Capacity"
                  value={specs.payload}
                  unit="g"
                  delay={0.1}
                  borderless
                  labelPosition={{ transform: 'translateX(-80px) translateY(-60px)' }}
                  valuePosition={{ transform: 'translateX(-72px) translateY(-60px)' }}
                />
                <SpecCard
                  label="Altitude (AGL)"
                  value={specs.altitude}
                  unit="m"
                  delay={0.2}
                  borderless
                  labelPosition={{ transform: 'translateX(-80px) translateY(-35px)' }}
                  valuePosition={{ transform: 'translateX(-64px) translateY(-5px)' }}
                />
              </div>

              {/* CENTRAL DRONE IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full max-w-4xl relative z-10"
              >
                <img
                  src="/images/Fenix/gps.png"
                  alt="Fenix Drone Front"
                  className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,1)]"
                />
                {/* Ground Shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-white/5 blur-2xl rounded-full opacity-50" />
              </motion.div>

              {/* RIGHT SIDE CARDS */}
              <div className="hidden lg:flex flex-col gap-6 absolute right-0 z-20 text-right">
                <SpecCard
                  label="Endurance"
                  value={specs.endurance}
                  unit="mins"
                  align="right"
                  delay={0.1}
                  borderless
                  labelPosition={{ transform: 'translateX(80px) translateY(-57px)' }}
                  valuePosition={{ transform: 'translateX(101px) translateY(-47px)' }}
                />
                <SpecCard
                  label="Cruise Speed"
                  value={specs.speed}
                  unit="m/s"
                  align="right"
                  delay={0.2}
                  borderless
                  labelPosition={{ transform: 'translateX(80px) translateY(-27px)' }}
                  valuePosition={{ transform: 'translateX(90px) translateY(-15px)' }}
                />
              </div>

            </div>

            {/* MOBILE VIEW CARDS (GRID) */}
            <div className="lg:hidden grid grid-cols-2 gap-4 w-full mt-10">
              <SpecCard label="Lift Cap." value={specs.payload} unit="g" delay={0.1} />
              <SpecCard label="Altitude" value={specs.altitude} unit="m" delay={0.2} />
              <SpecCard label="Endurance" value={specs.endurance} unit="mins" delay={0.3} />
              <SpecCard label="Speed" value={specs.speed} unit="m/s" delay={0.4} />
            </div>

            {/* BOTTOM DIMENSION CARDS */}
            <div className="flex flex-wrap justify-center gap-6 -mt-16">
              <DimensionItem
                label="Length"
                value="308"
                unit="mm"
                icon={<VerticalIcon />}
                delay={0.2}
              />
              <DimensionItem
                label="Width"
                value="340"
                unit="mm"
                icon={<WidthIcon />}
                delay={0.3}
              />
              <DimensionItem
                label="Height"
                value="100"
                unit="mm"
                icon={<HeightIcon />}
                delay={0.4}
              />
            </div>



          </div>
        </div>
      </div>
    </>
  )
}

function SpecCard({ label, value, unit, align = "left", delay = 0.1, borderless = false, labelPosition = {}, valuePosition = {} }: { label: string, value: string, unit: string, align?: "left" | "right", delay?: number, borderless?: boolean, labelPosition?: any, valuePosition?: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={`${borderless ? "bg-transparent p-6" : "bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"} w-[260px] items-center flex flex-col text-center`}
    >
      <span className="text-xs font-semibold uppercase tracking-widest opacity-40 mb-2" style={labelPosition}>{label}</span>
      <div className="flex items-baseline gap-1 flex-row" style={valuePosition}>
        <span className={`${value.length > 5 ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} font-bold truncate`}>
          {value}
        </span>
        <span className="text-sm opacity-60 ml-1 font-medium">{unit}</span>
      </div>
    </motion.div>
  )
}

function DimensionItem({ label, value, unit, icon, delay = 0 }: { label: string, value: string, unit?: string, icon: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-4 min-w-[160px]"
    >
      <div className="text-[#5ce1e6] w-6 h-6 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-medium">{value}</span>
          {unit && <span className="text-[10px] opacity-40 font-semibold uppercase">{unit}</span>}
        </div>
        <span className="text-[10px] uppercase tracking-wider opacity-40 font-semibold">{label}</span>
      </div>
    </motion.div>
  )
}

function VerticalIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 4v16M17 15l-5 5-5-5M17 9l-5-5-5 5" />
    </svg>
  )
}

function WidthIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 12h16M7 7l-5 5 5 5M17 7l5 5-5 5" />
    </svg>
  )
}

function HeightIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(45)">
      <path d="M4 12h16M7 7l-5 5 5 5M17 7l5 5-5 5" />
    </svg>
  )
}


