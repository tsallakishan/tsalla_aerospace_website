"use client"

import type React from "react"
import { useState } from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

// --- Accordion Item Component ---
// This component now just displays the feature information.
// The open/close state is controlled entirely by the parent.
interface AccordionItemProps {
  title: string
  whatItMeans: string
  keyBenefit: string
  isOpen: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, whatItMeans, keyBenefit, isOpen }) => {
  return (
    // The wrapper div has a bottom border
    <div className="border-b border-gray-300 py-4 cursor-pointer">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <img
          src={
            isOpen ? "https://www.svgrepo.com/show/522421/minus.svg" : "https://www.svgrepo.com/show/522437/plus.svg"
          }
          alt={isOpen ? "Collapse" : "Expand"}
          className="w-6 h-6"
        />
      </div>
      {/* The content area expands and collapses with a smooth transition based on the isOpen prop. The duration has been increased to 500ms. */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 mt-4" : "max-h-0"}`}
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
export default function BatpayLoad1(): React.JSX.Element {
  // All features are in a single array for the left column.
  const features = [
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
      whatItMeans: "Works with Sony’s wide range of interchangeable lenses (zoom, prime, wide-angle, telephoto).",
      keyBenefit: "One camera body, multiple use cases – just switch the lens.",
    },
  ]

  // State to manage which accordion item is currently being hovered over.
  // We store the title of the hovered item, or null if none are hovered.
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
          {/* Main Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-4xl font-medium tracking-tight text-black" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
              ILX-LR1 - Sony Pro <br />
              Mapping Payload
            </h1>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="w-full md:w-1/2">
              <div className="flex flex-col">
                {features.map((feature) => (
                  // This wrapper div detects the hover state for each item.
                  <div
                    key={feature.title}
                    onMouseEnter={() => setHoveredTitle(feature.title)}
                    onMouseLeave={() => setHoveredTitle(null)}
                  >
                    <AccordionItem
                      {...feature}
                      // The item is open only if its title matches the hovered title.
                      isOpen={hoveredTitle === feature.title}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
             <div className="w-full md:w-1/2">
  <div className="flex flex-col">
    {/* Product Image */}
    <div className="md:-mt-32 -mt-8" >
      <img
        src="/images/design-mode/3efb323c85cf4b1583dc48c6cb043329901ebf22-688x546.png"
        alt="Sony ILX-LR1 Camera"
        className="w-full h-auto object-contain"
      />
    </div>
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
