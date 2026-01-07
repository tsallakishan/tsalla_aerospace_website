"use client"

import type React from "react"
import Link from "next/link"
import ContentWrapper from "@/components/ContentWrapper"

export default function UncrewedDexter(): React.JSX.Element {
  return (
    <>
      {/* Import Clash Grotesk font */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>

      <section className="bg-black text-white font-clash w-full min-h-screen flex items-center justify-center py-16">
        <ContentWrapper>
          <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center gap-16">
            {/* Right Column - Text (now below image on mobile) */}
            <div className="w-full md:w-1/2 text-left">
              <h1 className="text-5xl sm:text-6xl font-medium">DEXTER</h1>
              <p className="text-lg mt-2 text-neutral-300">Multirole Single Solution</p>

              <div className="mt-6 space-y-3 text-neutral-400 text-md sm:text-lg leading-relaxed">
                <p>Uncompromised endurance.</p>
                <p>Effortless vertical launch.</p>
                <p>Elevated possibilities.</p>
              </div>

              <Link href="/uncrewedsystems/dexter">
                <button className="mt-8 border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition duration-300">
                  Explore
                </button>
              </Link>
            </div>

            {/* Left Column - Image (now on top for mobile) */}
            <div className="w-full md:w-1/2">
              <img
                src="/images/design-mode/d5dfc9aed08fa1fb86bf74438b26d2821d9b5e3d-1080x1235.png"
                alt="Dexter drone in sky"
                className="w-full object-cover"
                style={{ maxHeight: "620px", height: "auto" }}
              />
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
