"use client"

import type React from "react"
import { motion } from "framer-motion"
import FenixFUI2 from "./FenixFUI2"

export default function FenixSpecifications(): React.JSX.Element {
  const topSpecs = [
    { label: "Lift Capacity", value: "500", unit: "g" },
    { label: "Endurance", value: "20", unit: "mins" },
    { label: "Altitude (AGL)", value: "0.5-50", unit: "m" },
    { label: "Cruise Speed", value: "5", unit: "m/s" }
  ]

  const bottomSpecs = [
    { label: "Length", value: "308", unit: "mm" },
    { label: "Width", value: "340", unit: "mm" },
    { label: "Height", value: "100", unit: "mm" }
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif !important;
        }
      `}</style>

      <div className="font-clash-grotesk bg-neutral-950 text-white w-full overflow-hidden">
        <FenixFUI2 />

        <div className="relative w-full bg-neutral-950">
          <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-10 pb-20">

            {/* TITLE */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-widest"
            >
              FENIx
            </motion.h2>

            {/* TOP SPECS ROW - Horizontal layout matching reference image */}
            <div className="w-full max-w-7xl mb-8 border border-neutral-700 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-0 md:gap-px md:divide-x divide-neutral-700">
                {topSpecs.map((spec, idx) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-1 px-6 py-6 bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors duration-300 border-b border-neutral-700 md:border-b-0"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl md:text-5xl font-medium text-cyan-400">
                          {spec.value}
                        </span>
                        <span className="text-sm text-cyan-400/80 font-medium">{spec.unit}</span>
                      </div>
                      <span className="text-sm md:text-base text-white/70">
                        {spec.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CENTRAL DRONE IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full max-w-5xl -mt-40 mb-2"
            >
              <img
                src="/images/Fenix/gps.png"
                alt="Fenix Drone"
                className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(0,217,255,0.08)]"
              />
            </motion.div>

            {/* BOTTOM SPECS ROW - Horizontal layout */}
            <div className="w-full max-w-7xl -mt-28 flex gap-4 justify-center flex-wrap md:flex-nowrap">
              {bottomSpecs.map((spec, idx) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full md:w-64 px-4 py-3 bg-neutral-900/70 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/70 transition-all duration-300 flex items-center gap-4"
                >
                  {/* Icon placeholder */}
                  <div className="text-cyan-400 text-3xl flex-shrink-0 bg-neutral-800 p-3 rounded-lg flex items-center justify-center w-12 h-12">
                    {idx === 0 && <span>—</span>}
                    {idx === 1 && <span>↔</span>}
                    {idx === 2 && <span>↕</span>}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-medium text-cyan-400">
                      {spec.value}
                    </span>
                    <span className="text-xs text-white/60 font-medium">{spec.unit}</span>
                    <span className="text-sm text-white/60 ml-2">
                      {spec.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}


