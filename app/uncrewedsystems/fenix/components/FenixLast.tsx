"use client"

import type React from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

export default function FenixLast(): React.JSX.Element {
  return (
    <>
      {/* Global Clash Grotesk font inclusion */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif !important;
        }
      `}</style>

      <section className="font-clash-grotesk relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/design-mode/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg"
          alt="Abstract background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white">
          <ContentWrapper>
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-medium leading-tight max-w-4xl mx-auto">
                Ready to Deploy Where <br /> Others Cannot.
              </h1>
              {/* The button is now square and the text is not bold */}
              <button className="mt-8 bg-white/10 border border-white/20 backdrop-blur-sm text-white py-3 px-8 hover:bg-white/20 transition-colors duration-300">
                Request a Demo
              </button>
            </div>
          </ContentWrapper>
        </div>
      </section>
    </>
  )
}
