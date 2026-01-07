import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"

export const metadata: Metadata = {
  title: "Mission Systems - Tsalla Aerospace",
  description: "Comprehensive mission planning and execution systems for autonomous operations.",
}

export default function MissionPage() {
  return (
    <PageWrapper>
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Mission Systems</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive mission planning, execution, and analysis systems for complex autonomous operations.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
