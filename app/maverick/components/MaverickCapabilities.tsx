"use client"

import type React from "react"
import ContentWrapper from "../../../components/ContentWrapper"

// Define the interface for the feature items for type safety
interface FeatureItemProps {
  title: string
  description: string
}

// An array holding the content for the features on the right side
const features: FeatureItemProps[] = [
  {
    title: "Autonomous Core Intelligence",
    description: "Thinks ahead, understands its surroundings, and adapts like an experienced pilot in real-time.",
  },
  {
    title: "Fully Edge-Driven Autonomy",
    description: "Processes every critical decision onboard to stay responsive in any condition, connected or not.",
  },
  {
    title: "Seamless Cloud & Fleet Connectivity",
    description: "Shares data, updates missions, and keeps multiple units working together when and where it matters.",
  },
]

// A reusable component for displaying each feature with its title, description, and a bottom border
const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => (
  <div className="border-b border-neutral-700 pb-10 last:border-b-0 last:pb-0">
    <h3 className="text-2xl font-medium tracking-tight text-white" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>{title}</h3>
    <p className="mt-4 text-lg md:text-xl font-light leading-relaxed text-neutral-600">{description}</p>
  </div>
)

export default function MaverickCapabilities(): React.JSX.Element {
  return (
    <>
      {/* Global Clash Grotesk font inclusion */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        body, .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif !important;
        }
      `}</style>

      <div className="font-clash-grotesk bg-black text-white min-h-screen w-full flex items-center py-16">
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center">
            {/* LEFT COLUMN: Main Heading */}
            <div className="md:w-2/5 w-full mb-16 md:mb-0">
              <h1 className="text-6xl lg:text-7xl font-medium leading-none tracking-tighter" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                Autonomy that Knows Where It Stands
              </h1>
            </div>

            {/* Spacer Column for visual separation on larger screens */}
            <div className="md:w-1/12 w-full" />

            {/* RIGHT COLUMN: List of Features */}
            <div className="md:w-1/2 w-full">
              <div className="flex flex-col gap-10">
                {features.map((feature, index) => (
                  <FeatureItem key={index} title={feature.title} description={feature.description} />
                ))}
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  )
}
