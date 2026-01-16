"use client"

import type React from "react"

interface SpecItemProps {
  label: string
  value: string
}

const SpecItem: React.FC<SpecItemProps> = ({ label, value }) => (
  <div className="border-b border-neutral-300 last:border-b-0">
    <div className="flex justify-between py-3 text-xl leading-tight tracking-tight text-neutral-800">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  </div>
)

// Inline content wrapper so it can be styled here
const ContentWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`w-full px-6 md:px-12 xl:px-24 max-w-[90rem] mx-auto ${className}`}
    style={{ marginLeft: "2.75rem" }} // moved 2 more spaces (0.5rem) to the left
  >
    {children}
  </div>
)

export default function StormFeatures(): React.JSX.Element {
  const specifications: SpecItemProps[] = [
    { label: "Endurance", value: "30+ mins" },
    { label: "Cruise Speed", value: "15 m/s Optimal" },
    { label: "Altitude", value: "500 m AGL" },
    { label: "Lift Capacity", value: "20 - 25 kg" },
    { label: "Communication", value: "Over 15km LOS" },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        body, .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif !important;
        }
      `}</style>

      <div className="font-clash-grotesk bg-white min-h-screen w-full flex flex-col md:flex-row">
        {/* LEFT COLUMN */}
        <div className="md:w-1/2 w-full">
          <ContentWrapper className="py-16 md:py-24">
            <div className="max-w-md w-full">
              <h2 className="text-3xl leading-snug text-black mb-12 tracking-tight" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                Where control meets motion, STORM touches down with confidence. Designed for shifting decks and offshore
                demands, it ensures safe, precise landings when stability is hard to find.
              </h2>
              <div className="w-full">
                {specifications.map((spec, index) => (
                  <SpecItem key={`${spec.label}-${index}`} label={spec.label} value={spec.value} />
                ))}
              </div>
            </div>
          </ContentWrapper>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:w-1/2 w-full h-72 md:h-screen">
          <img
            src="/images/design-mode/0649dbe96de92e27212722dbfc01e42c576247ad-1080x1235.png"
            alt="STORM Drone in flight"
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
