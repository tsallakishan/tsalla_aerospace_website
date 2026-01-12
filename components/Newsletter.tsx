"use client"

import type React from "react"
import NewsroomCard from "./ui/NewsroomCard"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ThreeDMarqueeDemo from "./3d-marquee-demo"

const Newsletter: React.FC = () => {
  return (
    <section className="bg-[#eaeaea] py-12 lg:py-24 font-['Pontano_Sans']">
      <div className="container mx-auto px-4 lg:px-24 max-w-[90rem]">
        {/* Section Title */}
        <div className="text-left mb-8 lg:mb-12">
          <h2
            className="text-left text-black/100 mb-1 transition-all duration-700 transform font-orbit opacity-100 translate-y-0 uppercase tracking-tight text-[28px] md:text-[48px]"
            style={{
              transitionDelay: "150ms",
              lineHeight: "1.1",
              fontWeight: 700,
            }}
          >
            Latest <span style={{ color: '#5ce1e6' }}>News</span> &amp; Updates
          </h2>
        </div>

        {/* News Marquee Section */}
        <div className="relative mt-4 lg:mt-8">
          <ThreeDMarqueeDemo />
        </div>

        {/* More in Newsroom Link aligned right */}
        <div className="mt-6 lg:mt-8 flex justify-end">
          <Link
            href="/newsroom"
            className="inline-flex items-center text-black group text-base font-medium transition-all duration-200"
          >
            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[0.125rem] after:bg-black after:transition-all after:duration-300 group-hover:after:w-full font-orbit">
              More in Newsroom
            </span>
            <ArrowRight size={18} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
