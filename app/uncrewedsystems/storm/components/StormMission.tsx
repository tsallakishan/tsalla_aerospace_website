"use client"

import * as React from "react"
import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap,
} from "@/components/ui/scroll-x-carousel"
import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from "@/components/ui/reveal-on-hover"
import { Badge } from "@/components/ui/badge"

const PROFILES = [
  {
    id: "border-surveillance",
    title: "Border Surveillance",
    description: "Provides continuous situational awareness for persistent monitoring and threat detection.",
    type: "Surveillance",
    services: ["Monitoring", "Threat Detection"],
    imageUrl:
      "https://cdn.sanity.io/images/z5s3oquj/production/641de74487cf8d3c116abd5924ab673367516bb2-2000x2500.jpg?auto=format&fit=max&w=1920&q=90",
  },
  {
    id: "disaster-response",
    title: "Disaster Response",
    description: "Rapidly deliver support for real-time situational awareness and coordination in disaster relief operations.",
    type: "Response",
    services: ["Awareness", "Coordination"],
    imageUrl:
      "https://cdn.sanity.io/images/z5s3oquj/production/9ac1a07d3b84827ba687a8a9281ed48b31458e49-1920x1080.png?auto=format&fit=max&w=1920&q=90",
  },
  {
    id: "isr-missions",
    title: "ISR Missions",
    description: "Delivers high-resolution intelligence and real-time situational awareness for critical ISR missions.",
    type: "ISR",
    services: ["Intelligence", "Awareness"],
    imageUrl:
      "https://cdn.sanity.io/images/z5s3oquj/production/8801921308d204efa9bf03a05503df326916b847-3642x2049.png?auto=format&fit=max&w=1920&q=90",
  },
  {
    id: "logistics-supply",
    title: "Logistics & Supply",
    description: "Efficiently transport heavy payloads to remote or rugged locations with precision delivery.",
    type: "Logistics",
    services: ["Payload Transport", "Precision Delivery"],
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "medical-emergency",
    title: "Medical Emergency",
    description: "Rapid delivery of life-saving medical supplies and equipment to hard-to-reach areas.",
    type: "Medical",
    services: ["Supply Delivery", "Rapid Response"],
    imageUrl:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "infrastructure-monitoring",
    title: "Infrastructure Support",
    description: "Autonomous inspection and monitoring of critical infrastructure in challenging environments.",
    type: "Inspection",
    services: ["Autonomous Inspection", "Infrastructure"],
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2487&auto=format&fit=crop",
  },
]

export default function StormMission() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>
      <section className="font-clash-grotesk bg-white text-black w-full">
        <div className="pt-12 px-4 md:px-20 max-w-7xl">
          <div className="text-left mb-4">
            <h1 className="text-7xl font-medium tracking-tight" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>Mission Profiles</h1>
            <p className="text-xl text-neutral-600 mt-4">Engineered for reliability in critical scenarios.</p>
          </div>
        </div>

        <ScrollXCarousel className="h-[200vh]">
          <ScrollXCarouselContainer className="h-dvh place-content-center flex flex-col gap-4 py-8">
            <ScrollXCarouselWrap className="flex-4/5 flex space-x-8 [&>*:first-child]:ml-8" xRagnge={['-0%', '-75%']}>
              {PROFILES.map((profile) => (
                <CardHoverReveal
                  key={profile.id}
                  className="min-w-[70vw] md:min-w-[45vw] shadow-2xl border border-black/5 xl:min-w-[40vw] rounded-xl overflow-hidden"
                >
                  <CardHoverRevealMain>
                    <img
                      alt={profile.title}
                      src={profile.imageUrl}
                      className="size-full aspect-[16/10] object-cover"
                    />
                  </CardHoverRevealMain>
                  <CardHoverRevealContent className="space-y-4 rounded-2xl bg-white/80 backdrop-blur-3xl p-6 border border-black/5">
                    <div className="space-y-2">
                      <h3 className="text-sm text-black/60">Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.services.map((service) => (
                          <Badge
                            key={service}
                            className="capitalize rounded-full border-black/10 text-black"
                            variant={"outline"}
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mt-2">
                      <h3 className="text-black text-2xl capitalize font-medium">
                        {profile.title}
                      </h3>
                      <p className="text-black/70 text-base leading-relaxed">{profile.description}</p>
                    </div>
                  </CardHoverRevealContent>
                </CardHoverReveal>
              ))}
            </ScrollXCarouselWrap>

            <div className="px-8 md:px-20">
              <ScrollXCarouselProgress
                className="bg-black/5 h-1.5 rounded-full overflow-hidden"
                progressStyle="size-full bg-cyan-500 rounded-full"
              />
            </div>
          </ScrollXCarouselContainer>
        </ScrollXCarousel>
      </section>
    </>
  )
}
