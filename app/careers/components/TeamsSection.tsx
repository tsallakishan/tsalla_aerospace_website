"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Briefcase } from "lucide-react"
import { ContentWrapper } from "@/components/ContentWrapper"
import { internships, fullTimeRoles } from "../data/jobs"

export default function JobOpeningsPage() {
  const [activeTab, setActiveTab] = useState("internships")

  const jobs = activeTab === "internships" ? internships : fullTimeRoles



  return (
    <section className="w-full min-h-screen bg-black text-white py-20 font-clash" id="open-positions">
      <ContentWrapper>
        {/* Title */}
        <h2
          className="text-white mb-6 uppercase tracking-tight text-5xl md:text-6xl font-bold"
          style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
        >
          Job Openings
        </h2>

        {/* Description */}
        <p
          className="text-neutral-500 text-sm md:text-base font-light leading-relaxed mb-10 max-w-2xl"
          style={{ fontFamily: "sans-serif" }}
        >
          At Tsalla Aerospace, innovation drives everything we do. Join us and bring your expertise to a team dedicated
          to building exceptional UAV solutions. Browse through our current openings and find the role where your
          strengths can truly shine.
        </p>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-16 px-4">
          <button
            onClick={() => {
              setActiveTab("internships")
            }}
            className={`group relative px-8 py-3 bg-black/40 border transition-colors duration-300 overflow-hidden ${activeTab === "internships" ? "border-[#5ce1e6]" : "border-white/10"
              }`}
          >
            <div className="absolute inset-0 bg-[#5ce1e6] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span
              className={`relative z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${activeTab === "internships"
                ? "text-[#5ce1e6] group-hover:text-black"
                : "text-white group-hover:text-black"
                }`}
              style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
            >
              Internships
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("fulltime")
            }}
            className={`group relative px-8 py-3 bg-black/40 border transition-colors duration-300 overflow-hidden ${activeTab === "fulltime" ? "border-[#5ce1e6]" : "border-white/10"
              }`}
          >
            <div className="absolute inset-0 bg-[#5ce1e6] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span
              className={`relative z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${activeTab === "fulltime"
                ? "text-[#5ce1e6] group-hover:text-black"
                : "text-white group-hover:text-black"
                }`}
              style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
            >
              Full Time Roles
            </span>
          </button>
        </div>

        {/* Job Listings Header */}
        <p
          className="text-neutral-600 mb-8 font-light text-xs md:text-sm tracking-wide"
          style={{ fontFamily: "sans-serif" }}
        >
          Showing 1–{jobs.length} Results Out Of Total {jobs.length} Open Jobs...
        </p>

        {/* Job Listings */}
        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <Link
              href={`/careers/${job.slug}`}
              key={index}
              className="block h-full"
            >
              <div className="relative p-8 bg-neutral-900/50 border border-white/5 flex flex-col justify-between h-full group transition-all duration-300 hover:bg-neutral-900">
                {/* Top Left Corner */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#5ce1e6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Bottom Right Corner */}
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#5ce1e6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <h3
                    className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight min-h-[3.75rem]"
                    style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                  >
                    {job.title}
                  </h3>

                  {/* Metadata Icons */}
                  <div className="flex flex-row flex-wrap items-center gap-6 mb-2 text-neutral-400 text-xs font-sans tracking-wide">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#5ce1e6]" />
                      <span>
                        {job.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#5ce1e6]" />
                      <span>
                        {activeTab === "internships" ? "Internship Program" : "Full-Time Role"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ContentWrapper>
    </section>
  )
}
