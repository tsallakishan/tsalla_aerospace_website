"use client"

import type React from "react"
import Link from "next/link"
import ContentWrapper from "@/components/ContentWrapper"

export default function UncrewedBat(): React.JSX.Element {
  return (
    <>
      {/* Import Clash Grotesk font */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>

      <section className="bg-black text-white font-clash w-full min-h-screen flex items-center justify-center py-20">
        <ContentWrapper>
          <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center gap-16">
            {/* Text Column (below image on mobile) */}
            <div className="w-full md:w-1/2 text-left">
              <h1 className="text-5xl sm:text-6xl font-medium">T- Bat</h1>
              <p className="text-lg mt-2 text-neutral-300">Battlefield Airborne Tactical UAS</p>

              <div className="mt-6 space-y-3 text-neutral-400 text-md sm:text-lg leading-relaxed">
                <p>Over 30 minutes aloft.</p>
                <p>15 m/s cruise speed.</p>
                <p>Precision at 500 ft AGL.</p>
              </div>

              <Link href="/uncrewedsystems/bat">
                <button className="mt-8 border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition duration-300">
                  Explore
                </button>
              </Link>
            </div>

            {/* Image Column (above text on mobile) */}
            <div className="w-full md:w-1/2">
              <img
                src="/images/design-mode/cb086dde298ee0705a8a4afad32741324e8997cf-1075x1433.jpg"
                alt="Bat drone"
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
