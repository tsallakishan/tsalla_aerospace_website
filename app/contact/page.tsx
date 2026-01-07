import type React from "react"

import PageWrapper from "@/components/PageWrapper"
import ContactSection from "@/components/ContactSection"

export default function ContactPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen">
        <ContactSection />
      </div>
    </PageWrapper>
  )
}
