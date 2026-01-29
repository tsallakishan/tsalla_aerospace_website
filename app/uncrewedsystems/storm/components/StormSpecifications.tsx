"use client"

import React from "react"
import BentoFeatures from "@/components/ui/bento-grid-01"

export default function StormSpecifications(): React.JSX.Element {
  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk-variable');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk Variable', sans-serif;
        }
      `}</style>

      <section className="font-clash-grotesk">
        <BentoFeatures />
      </section>
    </>
  )
}
