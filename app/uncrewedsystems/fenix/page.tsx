import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import FenixHero from "./components/FenixHero"
import FenixCapabilities from "./components/FenixCapabilities"
import FenixSpecifications from "./components/FenixSpecifications"
import FenixFeatures from "./components/FenixFeatures"
import FenixMission from "./components/FenixMission"
import FenixLast from "./components/FenixLast"
import FenixResponder1 from "./components/FenixResponder1"
import FenixResponder2 from "./components/FenixResponder2"




export const metadata: Metadata = {
  title: "FENIX - Fast Entry Navigational Intrusion eXplorer - Tsalla Aerospace",
  description: "FENIX is a high-speed reconnaissance and infiltration system for rapid deployment scenarios.",
}

export default function FenixPage() {
  return (
    <PageWrapper>
      <FenixHero />
      <FenixCapabilities />
      <FenixResponder1/>
      <FenixResponder2/>
      <FenixSpecifications />
      <FenixMission />
        <FenixFeatures />
        <FenixLast/>
    </PageWrapper>
  )
}
