"use client"

import type React from "react"

// Props interface
interface SpecItemProps {
  label: string
  value: string
}

// Single spec item component
const SpecItem: React.FC<SpecItemProps> = ({ label, value }) => (
  <div className="border-b border-neutral-300 last:border-b-0">
    <div className="flex justify-between py-3 text-xl leading-tight tracking-tight text-neutral-800">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  </div>
)

// Content wrapper that offsets only on desktop
const ContentWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`w-full px-6 md:px-12 xl:px-24 max-w-[90rem] mx-auto ${className}`}
    style={{
      marginLeft: "0", // no offset for mobile/tablet
    }}
  >
    <div className="md:ml-[2.75rem]">{children}</div> {/* offset only for md+ */}
  </div>
)

export default function Counterspec(): React.JSX.Element {
  const specifications: SpecItemProps[] = [
    { label: "Cruise Speed", value: "400 kmph" },
    { label: "Endurance", value: "Up To 25 mins" },
    { label: "Weight", value: "> 2 kg" },
    { label: "Range", value: "5 - 15 km" },
    { label: "Navigation", value: "GPS + AI Visual" },
  ]

  return (
    <>
      {/* Global font */}
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
              <p className="text-3xl leading-snug text-black mb-12 tracking-tight">
                From border zones to combat airspace, the{" "}
                <span className="font-bold">Counter System</span> adapts and deploys in real time. It offers fast response,
                trusted visuals, and unmatched situational awareness.
              </p>
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
            alt="Counter System in flight"
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.src = `https://placehold.co/800x600/1a1a1a/ffffff?text=Image+Unavailable`
            }}
          />
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-black" />
    </>
  )
}
