"use client"

import type React from "react"
import { ContentWrapper } from "@/components/ContentWrapper"

// Define the props interface for the reusable ProfileCard component for type safety.
interface ProfileCardProps {
  title: string
  description: string
  imageUrl: string
}

// A reusable card component to display each mission profile.
// The layout is updated to show the image above the text content.
const ProfileCard: React.FC<ProfileCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="flex flex-col">
      {/* The aspect ratio is changed from [40/39] to [100/117] to increase height by another 20% */}
      <div className="aspect-[100/117] w-full overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
          // Provides a fallback image if the primary URL fails to load.
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null // prevent infinite loop
            target.src = `https://placehold.co/600x450/1a1a1a/ffffff?text=Image+Unavailable`
          }}
        />
      </div>
      <div className="pt-5">
        <h3 className="text-xl font-medium tracking-tight text-white">{title}</h3>
        <p className="text-base text-gray-400 mt-2 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// The main component for the "Mission Profiles" section.
export default function Dexter1(): React.JSX.Element {
  // Data for the mission profile cards, updated with the new images and descriptions.
  const profiles: ProfileCardProps[] = [
    {
      title: "Border Surveillance",
      description: "Provides continuous situational awareness for persistent monitoring and threat detection.",
      imageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/641de74487cf8d3c116abd5924ab673367516bb2-2000x2500.jpg?auto=format&fit=max&w=1920&q=90",
    },
    {
      title: "Disaster Response",
      description:
        "Rapidly deliver support for real-time situational awareness and coordination in disaster relief operations.",
      imageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/9ac1a07d3b84827ba687a8a9281ed48b31458e49-1920x1080.png?auto=format&fit=max&w=1920&q=90",
    },
    {
      title: "ISR Missions",
      description:
        "Delivers high-resolution intelligence and real-time situational awareness for critical ISR missions.",
      imageUrl:
        "https://cdn.sanity.io/images/z5s3oquj/production/8801921308d204efa9bf03a05503df326916b847-3642x2049.png?auto=format&fit=max&w=1920&q=90",
    },
  ]

  return (
    <>
      {/*
        The link to the "Clash Grotesk" font is included here.
        This ensures the font is available for the component to use.
      */}
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>
      <section className="font-clash-grotesk bg-black text-white w-full min-h-screen flex items-center justify-center py-20">
        <ContentWrapper>
          {/* Header Section */}
          <div className="text-left mb-16">
            <h1 className="text-7xl font-medium tracking-tight">Mission Profiles</h1>
            <p className="text-xl text-gray-400 mt-4">Engineered for reliability in critical scenarios.</p>
          </div>

          {/* Profiles Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.title}
                title={profile.title}
                description={profile.description}
                imageUrl={profile.imageUrl}
              />
            ))}
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
