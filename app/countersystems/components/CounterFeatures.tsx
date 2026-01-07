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

export default function CounterFeatures(): React.JSX.Element {
  const features: FeatureProps[] = [
    {
      title: "Kinetic Intercept",
      description:
        "This system physically engages and disables rogue drones mid-air through high-velocity impact, ensuring immediate threat neutralization.",
    },
    {
      title: "Integrated Mini Camera",
      description:
        "A compact onboard camera streams live footage of the engagement, allowing real-time confirmation of successful hits.",
    },
    {
      title: "Autonomous Flight",
      description:
        "Guided by advanced AI, the interceptor navigates independently and adapts mid-flight to lock onto fast-moving targets.",
    },
    {
      title: "Modular Deployment",
      description:
        "Designed for flexibility, the system can be integrated with a wide range of ground and aerial launch platforms.",
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
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-black leading-tight">
              Key Features
            </h1>
            <p className="text-lg sm:text-xl text-black font-normal leading-7 tracking-wide mt-4">
              These capabilities redefine aerial defense by combining precision targeting with autonomous power and
              tactical flexibility.
            </p>
          </div>

          {/* Features List */}
          <div className="flex flex-col">
            {features.map((feature) => (
              <Feature key={feature.title} title={feature.title} description={feature.description} />
            ))}
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
