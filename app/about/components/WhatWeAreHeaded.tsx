"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import ContentWrapper from "@/components/ContentWrapper"

export default function WhatWeAreHeaded() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center py-16 md:py-24">
      <ContentWrapper>
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-16 md:gap-24">
          {/* Left Content */}
          <div className="md:w-1/2">
            <h2 className="text-white font-clash text-[2.625rem] md:text-[3.5rem] leading-[1.15] font-semibold mb-6">
              Where We're Headed
            </h2>

            <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 font-clash mb-8 tracking-wide">
              Shaping Tomorrow Through Innovation And Intent.
            </p>

            <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 max-w-md mb-8">
              We envision a world where intelligent aerial systems transcend today's limitations — autonomously
              navigating complex environments, connecting communities, supporting critical missions, and pushing the
              boundaries of what flight can achieve. Our journey is toward a sky that thinks, adapts, and empowers
              humanity in ways once thought impossible.
            </p>

            <a
              href="/solutions"
              className="inline-flex items-center text-white font-clash font-medium text-sm md:text-base underline underline-offset-4 hover:no-underline group"
            >
              Discover Our Range Of Cutting-Edge Solutions
              <span className="ml-2 inline-flex items-center justify-center bg-gray-600 group-hover:bg-white text-white group-hover:text-black rounded-full w-7 h-7 transition">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2">
            <Image
              src="/images/design-mode/depositphotos_220949866-stock-photo-dji-mavic-pro-flying-dark.jpg"
              alt="Drone future"
              width={524}
              height={512}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}
