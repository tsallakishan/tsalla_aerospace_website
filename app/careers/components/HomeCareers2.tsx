"use client"
import { ContentWrapper } from "@/components/ContentWrapper"

const InsideTsallaAerospace = () => {
  return (
    <section className="font-clash w-full min-h-screen bg-white py-16">
      <ContentWrapper>
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 items-start justify-between">
          {/* LEFT TEXT SECTION */}
          <div className="max-w-xl">
            <h1 className="text-[3rem] md:text-[4rem] font-bold leading-[1.1] text-black mb-4">
              INSIDE
              <br />
              TSALLA
              <br />
              AEROSPACE
            </h1>
            <p className="text-md font-medium text-black mb-12 tracking-wide uppercase">
              REAL PEOPLE. REAL PASSION. REAL RESULTS.
            </p>
            <p className="text-gray-800 text-[1rem] leading-relaxed tracking-tight max-w-md">
              Get A Glimpse Into Our Daily Work Culture, Brainstorming Sessions, Project Launches, And Office Life. We
              Believe That Great Teams Make Great Products—And We're Proud To Show You The Faces Behind Our Mission.
            </p>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="w-full md:w-[48%] h-[18.75rem] md:h-[28.125rem]">
            <img
              src="/images/design-mode/08b50f4f-79c5-4ae5-b5bf-fa2fcfb0b544.jpg"
              alt="Tsalla Office"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}

export default InsideTsallaAerospace
