"use client"
import { ContentWrapper } from "@/components/ContentWrapper"

import CircularGallery from "./CircularGallery"

const InsideTsallaAerospace = () => {
  return (
    <section className="font-clash w-full bg-white">
      {/* VIEWPOINT 1: TITLE & SUB-CONTENT */}
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-12">
        <h1
          className="text-[2.5rem] md:text-[4rem] font-bold leading-tight text-black mb-6 uppercase tracking-wider"
          style={{ wordSpacing: '0.4em' }}
        >
          INSIDE TSALLA AEROSPACE
        </h1>
        <p className="text-sm md:text-base font-semibold text-black/60 tracking-[0.3em] uppercase max-w-2xl">
          REAL PEOPLE. REAL PASSION. REAL RESULTS.
        </p>
      </div>

      {/* VIEWPOINT 2: CIRCULAR GALLERY */}
      <div className="w-full min-h-[90vh] bg-white flex flex-col justify-center overflow-hidden">
        <ContentWrapper>
          <div className="w-full h-[600px] md:h-[750px]">
            <CircularGallery bend={0} scrollSpeed={1.2} scrollEase={0.03} />
          </div>
        </ContentWrapper>
      </div>
    </section>
  )
}

export default InsideTsallaAerospace
