"use client"

import type React from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

// Define the props interface for the reusable Feature component
interface FeatureProps {
  title: string
  description: string
}

// Reusable feature component with left alignment
const Feature: React.FC<FeatureProps> = ({ title, description }) => (
  <div className="py-4 border-b border-gray-300">
    <h3 className="text-2xl sm:text-3xl font-medium text-black mb-1">{title}</h3>
    <p className="text-lg sm:text-xl text-black font-normal leading-7 tracking-wide">{description}</p>
  </div>
)

export default function FenixFeatures(): React.JSX.Element {
  // The features array has been updated with the content from your image.
  const features: FeatureProps[] = [
    {
      title: "GPS Denied Navigation",
      description:
        "Operates confidently where GPS signals are lost or blocked, relying on intelligent sensors and systems to stay on course and complete tasks without interruption.",
    },
    {
      title: "Semi Autonomous Mode",
      description:
        "Operates with partial autonomy, executing complex actions on its own while staying responsive to live adjustments and mission updates.",
    },
    {
      title: "P2P Autonomy",
      description:
        "Moves intelligently from one point to another on its own, completing pre-set or dynamic routes with accuracy and minimal oversight.",
    },
    {
      title: "Turtle Mode",
      description:
        "Reorients itself autonomously when overturned, flipping back into launch position to keep operations moving smoothly without delays or manual resets.",
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk-variable');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk Variable', sans-serif;
        }
      `}</style>

      <section className="font-clash-grotesk bg-white w-full min-h-screen flex items-center py-20">
        <ContentWrapper>
          <div className="w-full">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-black leading-tight">
                Key Features
              </h1>
              <p className="text-lg sm:text-xl text-black font-normal leading-7 tracking-wide mt-4">
                Each feature unlocks new possibilities — precision, power, and performance built into every flight.
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-col">
              {features.map((feature) => (
                <Feature key={feature.title} title={feature.title} description={feature.description} />
              ))}
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
