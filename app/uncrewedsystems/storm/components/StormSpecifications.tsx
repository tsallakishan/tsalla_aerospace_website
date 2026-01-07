"use client"

import { ContentWrapper } from "@/components/ContentWrapper"
import type React from "react"

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

export default function StormSpecifications(): React.JSX.Element {
  // The features array has been updated with the content from your image.
  const features: FeatureProps[] = [
    {
      title: "Precision Deck Landings",
      description:
        "Purpose-built for maritime operations, it lands on decks in motion — bringing secure delivery and recovery to offshore missions, no matter the conditions.",
    },
    {
      title: "Compact Size",
      description:
        "Compact and reliable in any scenario, it's designed to be deployed with ease and confidence. Wherever the mission demands, it responds instantly, keeping you ahead when it matters most.",
    },
    {
      title: "Built for inclement weather",
      description:
        "Tested for extremes, it stays airborne through wind, rain, and dust — so missions succeed, even when the skies don't cooperate.",
    },
    {
      title: "Endurance without Compromise",
      description:
        "Built for extended operations, it stays airborne longer, covering vast areas with fewer returns — giving every mission more reach and resilience.",
    },
    {
      title: "Multi Payload Drop",
      description:
        "Engineered for dynamic tasks, it delivers multiple payloads with speed and precision. From supplies to sensors, every drop reaches exactly where and when it's needed.",
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
