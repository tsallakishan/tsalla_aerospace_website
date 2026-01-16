"use client"

import type React from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

// Define the props interface for a single specification item
interface SpecItemProps {
  label: string
  value: string
}

// A reusable component for displaying each specification item with a bottom border.
const SpecItem: React.FC<SpecItemProps> = ({ label, value }) => (
  <div className="border-b border-neutral-300 last:border-b-0">
    {/* Font size increased from text-lg to text-xl */}
    <div className="flex justify-between py-3 text-xl leading-tight tracking-tight text-neutral-800">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  </div>
)

export default function BatFeatures(): React.JSX.Element {
  // The specifications array has been updated with the content from your image.
  const specifications: SpecItemProps[] = [
    { label: "Endurance", value: "90+ mins" },
    { label: "Cruise Speed", value: "20 m/s Optimal" },
    { label: "Altitude", value: "1 km AGL" },
    { label: "Lift Capacity", value: "Up To 1kg" },
    { label: "Communication", value: "Over 50 km LOS" },
  ]

  return (
    <>
      {/* Global Clash Grotesk font inclusion */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        body, .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif !important;
        }
      `}</style>

      <div className="font-clash-grotesk bg-white min-h-screen w-full flex flex-col md:flex-row">
        {/* LEFT COLUMN: Text Content and Specifications */}
        <div className="md:w-1/2 w-full flex justify-center items-center py-16 md:py-0">
          <ContentWrapper>
            <div className="max-w-md w-full">
              <h2 className="text-3xl leading-snug text-black mb-12 tracking-tight" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                Wherever the mission demands silent precision and clear intelligence, T-BAT deploys instantly. It
                navigates, detects, strikes, and surveys with speed and confidence in any terrain.
              </h2>
              <div className="w-full">
                {specifications.map((spec, index) => (
                  <SpecItem key={`${spec.label}-${index}`} label={spec.label} value={spec.value} />
                ))}
              </div>
            </div>
          </ContentWrapper>
        </div>

        {/* RIGHT COLUMN: Image */}
        <div className="md:w-1/2 w-full h-72 md:h-screen">
          <img
            // IMPORTANT: Replace this src with the actual path to your new image.
            src="/images/design-mode/0649dbe96de92e27212722dbfc01e42c576247ad-1080x1235.png"
            alt="T-BAT Drone in flight"
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.src = `https://placehold.co/800x600/1a1a1a/ffffff?text=Image+Unavailable`
            }}
          />
        </div>
      </div>
    </>
  )
}
