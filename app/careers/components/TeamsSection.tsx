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
        <h2 className="text-white/60 mb-4 uppercase tracking-widest text-4xl font-light">Job Openings</h2>

        {/* Description */}
        <p className="text-white text-lg mb-6">
          At Tsalla Aerospace, innovation drives everything we do. Join us and bring your expertise to a team dedicated
          to building exceptional UAV solutions. Browse through our current openings and find the role where your
          strengths can truly shine.
        </p>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => {
              setActiveTab("internships")
              setOpenIndex(null)
            }}
            className={`px-6 py-2 border text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === "internships" ? "bg-white text-black" : "bg-neutral-800 text-white/70 hover:bg-neutral-700"
            }`}
          >
            Internships
          </button>
          <button
            onClick={() => {
              setActiveTab("fulltime")
              setOpenIndex(null)
            }}
            className={`px-6 py-2 border text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === "fulltime" ? "bg-white text-black" : "bg-neutral-800 text-white/70 hover:bg-neutral-700"
            }`}
          >
            Full Time Roles
          </button>
        </div>

        {/* Job Listings Header */}
        <p className="text-white/80 mb-6 font-normal text-2xl">
          Showing 1–{jobs.length} Results Out Of Total {jobs.length} Open Jobs...
        </p>

        {/* Job Listings */}
        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div key={index} className="border-b border-white/30 pb-4">
              <p className="text-xs text-white/60 mb-1">
                {activeTab === "internships"
                  ? "Early Career Program Intern • Live and Work Anywhere"
                  : "Full-Time • Onsite or Hybrid"}
              </p>
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-light">{job.title}</h3>
                <button
                  onClick={() => handleToggle(index)}
                  className="flex items-center space-x-2 text-white/60 hover:text-white transition text-sm"
                >
                  <Plus className="w-5 h-5" />
                  <span>{openIndex === index ? "Hide Info" : "More Info"}</span>
                </button>
              </div>

              {/* Expandable Description */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out mt-4 text-gray-400 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </section>
  )
}
