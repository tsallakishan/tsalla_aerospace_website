"use client"

import type React from "react"
import NewsroomCard from "./ui/NewsroomCard"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const Newsletter: React.FC = () => {
  return (
    <section className="bg-[#eaeaea] py-16 lg:py-24 font-['Pontano_Sans']">
      <div className="container mx-auto px-6 lg:px-24 max-w-[90rem]">
        {/* Section Title */}
        <div className="text-center mb-12">
    <h2
  className="text-left text-black/100 mb-1 transition-all duration-700 transform font-mono opacity-100 translate-y-0"
  style={{
    transitionDelay: "150ms",
    fontFamily: "Inter, sans-serif",
    fontSize: "35px",
    lineHeight: "1.5",
    fontWeight: 500,
  }}
>
  Latest News &amp; Updates
</h2>

        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <NewsroomCard
            imageUrl="https://cdn.sanity.io/images/z5s3oquj/production/40c0d9411b398e8b3e1114c6269c39c9a86195f8-3840x2160.jpg?auto=format&fit=max&w=1920&q=90"
            publicationDate="6/18/2025"
            title="Tsalla Aerospace and Rheinmetall Partner to Design and Manufacture Advanced Propulsion Systems for Next-Gen Aircraft"
            readMoreLink="/news/propulsion-partnership"
          />
          <NewsroomCard
            imageUrl="https://cdn.sanity.io/images/z5s3oquj/production/987e977c745ccff57f4f705ca6335eb3ddf0dc5f-11648x8736.jpg?auto=format&fit=max&w=1200&q=90"
            publicationDate="6/17/2025"
            title="Riverside Research and Tsalla Aerospace Collaborate to Cyber Harden Critical Defense Capabilities"
            readMoreLink="/news/cyber-defense-collaboration"
          />
          <NewsroomCard
            imageUrl="https://cdn.sanity.io/images/z5s3oquj/production/8ba9aa42b68cb9b70f07dfe1583f4d0ed4477dd1-11648x8736.jpg?auto=format&fit=max&w=1200&q=90"
            publicationDate="5/29/2025"
            title="Tsalla Aerospace Unveils Revolutionary AI Pilot System for Autonomous Flight Operations"
            readMoreLink="/news/ai-pilot-system"
          />
        </div>

        {/* More in Newsroom Link aligned right */}
        <div className="mt-16 flex justify-end">
          <Link
            href="/newsroom"
            className="inline-flex items-center text-black group text-base font-medium transition-all duration-200"
          >
            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[0.125rem] after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
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
