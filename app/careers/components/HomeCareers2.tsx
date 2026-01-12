"use client"
import { ContentWrapper } from "@/components/ContentWrapper"

import CircularGallery from "./CircularGallery"

const InsideTsallaAerospace = () => {
  return (
    <section className="font-clash w-full min-h-screen bg-white py-16">
      <ContentWrapper>
        <div className="flex flex-col items-center justify-center text-center">
          {/* TEXT SECTION */}
          <div className="max-w-3xl mb-16">
            <h1 className="text-[2.5rem] md:text-[4rem] font-bold leading-[1.1] text-black mb-4 uppercase">
              INSIDE TSALLA AEROSPACE
            </h1>
            <p className="text-md font-medium text-black mb-12 tracking-wide uppercase">
              REAL PEOPLE. REAL PASSION. REAL RESULTS.
            </p>
            <p className="text-gray-800 text-[1.1rem] leading-relaxed tracking-tight max-w-2xl mx-auto">
              Get A Glimpse Into Our Daily Work Culture, Brainstorming Sessions, Project Launches, And Office Life. We
              Believe That Great Teams Make Great Products—And We're Proud To Show You The Faces Behind Our Mission.
            </p>
          </div>

          <div className="w-full h-[600px] mt-10">
            <CircularGallery bend={1.5} />
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}

export default InsideTsallaAerospace
