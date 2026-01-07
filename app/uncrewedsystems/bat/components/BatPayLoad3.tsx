"use client"

import type React from "react"
import { useState } from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

// --- Accordion Item Component ---
interface AccordionItemProps {
  title: string
  whatItMeans: string
  keyBenefit: string
  isOpen: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, whatItMeans, keyBenefit, isOpen }) => {
  return (
    <div className="border-b border-gray-300 py-4 cursor-pointer">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <img
          src={
            isOpen
              ? "https://www.svgrepo.com/show/522421/minus.svg"
              : "https://www.svgrepo.com/show/522437/plus.svg"
          }
          alt="Toggle Details"
          className="w-6 h-6 transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <div className="text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">What it means:</span> {whatItMeans}
          </p>
          <p>
            <span className="font-semibold">Key benefit:</span> {keyBenefit}
          </p>
        </div>
      </div>
    </div>
  )
}

// --- Main Page Component ---
export default function MicaSensePayload(): React.JSX.Element {
  const features = [
    {
      title: "High-Res Multispectral Imaging",
      whatItMeans:
        "Captures five narrow spectral bands (Blue, Green, Red, Red Edge, Near-IR) plus high-resolution panchromatic imagery.",
      keyBenefit:
        "Produce detailed, reliable maps and analytics for precision agriculture and environmental management.",
    },
    {
      title: "Panchromatic Sensor for Pan-Sharpening",
      whatItMeans:
        "Includes a 5.1 MP panchromatic band that combines with the multispectral bands to produce higher-resolution outputs.",
      keyBenefit: "Sharper data means more precise decisions in the field.",
    },
    {
      title: "Large Capture Area & Fast Coverage",
      whatItMeans: "Captures a larger area per flight due to high resolution – less overlap needed.",
      keyBenefit: "Lower operational costs per acre surveyed.",
    },
    {
      title: "Integration Friendly & Rugged",
      whatItMeans:
        "Compact, lightweight, and designed for easy drone integration – weatherproof for reliable use in challenging conditions.",
      keyBenefit: "Consistent results without complicated hardware swaps.",
    },
  ]

  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>

      <section className="font-clash-grotesk bg-white w-full min-h-screen py-20">
        <ContentWrapper>
          {/* Heading spans both columns */}
          <h1 className="text-4xl md:text-4xl font-medium tracking-tight text-black leading-tight mb-16 text-center md:text-left">
            MicaSense RedEdge-P <br /> Payload
          </h1>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column (Accordion) */}
            <div>
              <div className="flex flex-col">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    onMouseEnter={() => setHoveredTitle(feature.title)}
                    onMouseLeave={() => setHoveredTitle(null)}
                  >
                    <AccordionItem {...feature} isOpen={hoveredTitle === feature.title} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="flex flex-col w-full">
              <div className="sticky top-24 md:-mt-32 -mt-8">
                <img
                  src="/images/design-mode/Micasense-Rededge-P.jpg"
                  alt="MicaSense RedEdge-P Payload"
                   className="w-full h-auto object-contain"
                  
                />
              </div>
            </div>
          </div>
        </ContentWrapper>
      </section>
       <div className="w-full h-px bg-black" />
    </>
  )
}
