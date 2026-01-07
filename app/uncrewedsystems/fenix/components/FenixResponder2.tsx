"use client"

import type React from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

// Define the props for the reusable item component
interface ActionItemProps {
  title: string
  description: string
}

// Reusable component for each of the four items to keep the code clean
const ActionItem: React.FC<ActionItemProps> = ({ title, description }) => (
  <div>
    <h3 className="text-3xl font-medium text-white">{title}</h3>
    <div className="mt-3 pt-3 border-t border-neutral-600">
      <p className="text-xl text-neutral-300 font-light max-w-sm">{description}</p>
    </div>
  </div>
)

export default function FenixResponder2(): React.JSX.Element {
  // Array of the features to be displayed
  const actions: ActionItemProps[] = [
    {
      title: "Advance Intel",
      description: "Provides live situational awareness ahead of teams",
    },
    {
      title: "Search & Detect",
      description: "Finds survivors or threats before humans enter",
    },
    {
      title: "Rapid Delivery",
      description: "Delivers critical supplies in places responders can't reach yet",
    },
    {
      title: "Clearance",
      description: "Guides safe paths in unstable or cluttered terrain",
    },
  ]

  return (
    <>
      {/* Global font import for Clash Grotesk */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>

      <div className="font-clash-grotesk bg-black min-h-screen w-full flex items-center justify-center py-20">
        <ContentWrapper>
          <div className="w-full">
            {/* Main Header */}
            <div className="mb-20 text-left">
              <h1 className="text-6xl sm:text-7xl font-medium text-white leading-tight">
                How it acts as the First Responder
              </h1>
            </div>

            {/* Grid container for the four feature blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
              {actions.map((action) => (
                <ActionItem key={action.title} title={action.title} description={action.description} />
              ))}
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  )
}
