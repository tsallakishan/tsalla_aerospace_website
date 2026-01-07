import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"

export const metadata: Metadata = {
  title: "Documents - Tsalla Aerospace",
  description: "Technical documentation, specifications, and resources.",
}

export default function DocumentsPage() {
  return (
    <PageWrapper>
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Documents</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Technical documentation, specifications, and resources for our systems and technologies.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
