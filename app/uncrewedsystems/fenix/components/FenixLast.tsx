"use client"

import type React from "react"
import { motion } from "framer-motion"

export default function FenixLast(): React.JSX.Element {
  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif !important;
        }
      `}</style>

      <section className="font-clash-grotesk relative min-h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center">
        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-black tracking-tight leading-[1.05] max-w-5xl">
              Ready to <span className="text-[#5ce1e6]">Deploy</span> Where <br className="hidden md:block" /> Others Cannot.
            </h1>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mt-12 px-10 py-4 bg-transparent border border-black/20 text-black text-lg font-light tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-500"
            >
              Request a Demo
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#5ce1e6] to-transparent opacity-30" />
      </section>
    </>
  )
}
