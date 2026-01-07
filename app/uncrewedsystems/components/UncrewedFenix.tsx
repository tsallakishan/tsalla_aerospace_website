"use client"

import type React from "react"
import Link from "next/link"
import ContentWrapper from "@/components/ContentWrapper"

export default function UncrewedFenix(): React.JSX.Element {
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
          <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <img
                src="/images/design-mode/5775ccaf2c5cd09152a9dd145194077947d82a6a-1558x1781.jpg"
                alt="Fenix drone in sky"
                className="w-full object-cover"
                style={{ maxHeight: "620px", height: "auto" }}
              />
            </div>

            <div className="w-full md:w-1/2 text-left">
              <h1 className="text-5xl sm:text-6xl font-medium">FENIX</h1>
              <p className="text-lg mt-2 text-neutral-300">Fast Entry Navigational Intrusion eXplorer</p>

              <div className="mt-6 space-y-3 text-neutral-400 text-md sm:text-lg leading-relaxed">
                <p>Uncompromised endurance.</p>
                <p>Effortless vertical launch.</p>
                <p>Elevated possibilities.</p>
              </div>

              <Link href="/uncrewedsystems/fenix">
                <button className="mt-8 border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition duration-300">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
