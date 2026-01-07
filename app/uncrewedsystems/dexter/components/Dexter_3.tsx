"use client"

import type React from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

// --- Feature component with GIF removed ---
interface FeatureProps {
  title: string
  description: string
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="py-8 border-b border-gray-300 relative group cursor-pointer overflow-visible">
      {/* Container for text */}
      <div className="relative z-20">
        <h3 className="text-2xl sm:text-3xl font-medium text-black mb-2 transition-transform duration-300 ease-out md:group-hover:-translate-x-2">
          {title}
        </h3>
        <p className="text-lg sm:text-xl text-black font-light leading-relaxed tracking-wide transition-transform duration-300 ease-out md:group-hover:-translate-x-2">
          {description}
        </p>
      </div>
    </div>
  )
}

// --- Main Section Component ---
export default function KeyFeaturesSection(): React.JSX.Element {
  const features: FeatureProps[] = [
    {
      title: "Vertical Take-Off & Landing",
      description: "True VTOL freedom: launch from confined spaces and rough terrain with zero setup.",
    },
    {
      title: "Intelligent Autonomy",
      description: "AI-driven navigation and decision-making for missions that adapt in real time.",
    },
    {
      title: "Compact Heavy-Lift",
      description: "Minimal form, maximum payload — engineered to move more with less.",
    },
    {
      title: "Rapid Mission Ready",
      description: "Always ready: deploy in minutes, operate with ease, and recover with zero hassle.",
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

      <section className="font-clash-grotesk bg-white w-full py-20">
        <ContentWrapper>
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-black leading-none">
              Key Features
            </h1>
            <p className="text-lg sm:text-xl text-black font-light leading-relaxed tracking-wide mt-5 max-w-3xl">
              Each feature unlocks new possibilities — precision, power, and performance built into every flight.
            </p>
          </div>

          {/* Features List */}
          <div className="flex flex-col">
            {features.map((feature) => (
              <Feature
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </ContentWrapper>
      </section>

      {/* Black horizontal line separator */}
      <div className="w-full h-px bg-black" />
    </>
  )
}
