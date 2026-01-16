"use client"

import React from "react"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function CommitmentSection() {
  return (
    <section className="bg-black py-0 overflow-hidden">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center">
              <h2 className="text-[#5ce1e6] text-xl md:text-2xl font-orbit tracking-[0.4em] uppercase mb-4">
                WHERE WE’RE HEADED
              </h2>
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-6xl mx-auto px-4" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                Creating intelligent systems to elevate autonomy and empower unmatched performance on every front.
              </h1>
            </div>
          }
        >
          <img
            src="/images/design-mode/home1.jpg"
            alt="Tsalla Future Technology"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  )
}
