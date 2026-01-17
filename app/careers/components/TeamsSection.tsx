"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { ContentWrapper } from "@/components/ContentWrapper"

export default function JobOpeningsPage() {
  const [activeTab, setActiveTab] = useState("internships")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const internships = [
    {
      title: "Aerospace Engineering Intern, EMEA",
      description:
        "Support UAV hardware development, flight testing, and component integration in agile engineering teams.",
    },
    {
      title: "Communications Intern, EMEA",
      description:
        "Assist in internal/external communications, social media strategy, and brand alignment for Tsalla Aerospace.",
    },
    {
      title: "Legal Intern, EMEA",
      description: "Contribute to legal research, compliance documentation, and policy analysis under mentorship.",
    },
    {
      title: "Strategic Finance & Analytics Intern, EMEA",
      description: "Help analyze budgets, forecast scenarios, and track KPIs across various business divisions.",
    },
    {
      title: "Data Visualization Intern, EMEA",
      description: "Work with real-time drone telemetry to build visualizations for tactical awareness dashboards.",
    },
  ]

  const fullTimeRoles = [
    {
      title: "Autonomy Software Engineer",
      description: "Design and implement advanced AI algorithms for real-time UAV navigation and object detection.",
    },
    {
      title: "Flight Test Engineer",
      description: "Lead system validation missions and post-flight data analysis to iterate on drone platforms.",
    },
    {
      title: "Embedded Systems Developer",
      description: "Develop high-performance embedded code for control systems and edge computing applications.",
    },
  ]

  const jobs = activeTab === "internships" ? internships : fullTimeRoles

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full min-h-screen bg-black text-white py-20 font-clash">
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
              setOpenIndex(null)
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
              setOpenIndex(null)
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
        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div key={index} className="border-b border-white/20 pb-4">
              <p
                className="text-xs text-neutral-600 font-light mb-2"
                style={{ fontFamily: "sans-serif" }}
              >
                {activeTab === "internships"
                  ? "Early Career Program Intern • Live and Work Anywhere"
                  : "Full-Time • Onsite or Hybrid"}
              </p>
              <div className="flex justify-between items-center text-left">
                <h3
                  className="text-lg md:text-xl font-bold text-white"
                  style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                >
                  {job.title}
                </h3>
                <button
                  onClick={() => handleToggle(index)}
                  className="flex items-center space-x-2 text-white/50 hover:text-white transition text-[10px] uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4" />
                  <span>{openIndex === index ? "Hide Info" : "More Info"}</span>
                </button>
              </div>

              {/* Expandable Description */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out mt-4 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <p
                  className="text-sm font-light leading-relaxed text-neutral-500 pb-4"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </section>
  )
}
