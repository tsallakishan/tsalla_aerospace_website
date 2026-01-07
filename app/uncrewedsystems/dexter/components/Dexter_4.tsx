"use client"

import type React from "react"
import { useState } from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

// --- Accordion Item Component ---
// This component handles the display and interaction for each feature.
interface AccordionItemProps {
  title: string
  whatItMeans: string
  keyBenefit: string
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  whatItMeans,
  keyBenefit,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div className="border-b border-gray-300 py-4" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="flex justify-between items-center cursor-pointer">
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <img
          src={
            isOpen ? "https://www.svgrepo.com/show/522421/minus.svg" : "https://www.svgrepo.com/show/522437/plus.svg"
          }
          alt={isOpen ? "Collapse" : "Expand"}
          className="w-6 h-6"
        />
      </div>
      {/* The content area expands and collapses with a smooth transition */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 mt-4" : "max-h-0"}`}
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
export default function Dexter_5(): React.JSX.Element {
  // Data for the feature sections
  const leftColumnFeatures = [
    {
      title: "61MP Full-Frame Sensor",
      whatItMeans: "Ultra-high resolution – captures extremely detailed still images.",
      keyBenefit: "You can fly higher or cover more area without losing image quality.",
    },
    {
      title: "Remote Operation (USB-C / LAN)",
      whatItMeans: "You can control the camera from a distance – trigger, change settings, transfer data.",
      keyBenefit: "Full automation or remote piloting – efficient workflows.",
    },
    {
      title: "Compact & Lightweight Body",
      whatItMeans: "Small size and light weight make it easy to integrate.",
      keyBenefit: "More flight time, more mounting options, less power draw.",
    },
    {
      title: "E-Mount Lens Compatibility",
      whatItMeans: "Works with Sony's wide range of interchangeable lenses (zoom, prime, wide-angle, telephoto).",
      keyBenefit: "One camera body, multiple use cases – just switch the lens.",
    },
  ]

  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const handleMouseEnter = (title: string) => {
    setOpenAccordion(title)
  }

  const handleMouseLeave = () => {
    setOpenAccordion(null)
  }

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
          {/* Main Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-4xl font-medium tracking-tight text-black">
              ILX-LR1 - Sony Pro <br />
              Mapping Payload
            </h1>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-4">
                {leftColumnFeatures.map((feature) => (
                  <AccordionItem
                    key={feature.title}
                    {...feature}
                    isOpen={openAccordion === feature.title}
                    onMouseEnter={() => handleMouseEnter(feature.title)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-8">
                {/* Product Image */}
                <div className=" p-4 rounded-lg">
                  <img
                    src="/images/design-mode/3efb323c85cf4b1583dc48c6cb043329901ebf22-688x546.png"
                    alt="Sony ILX-LR1 Camera"
                    className="w-full h-auto object-contain"
                  />
                </div>
                {/* The accordion item previously here has been removed. */}
              </div>
            </div>
          </div>
        </ContentWrapper>
      </section>
      {/* Black horizontal line separator */}
      <div className="w-full h-px bg-black" />
    </>
  )
}
