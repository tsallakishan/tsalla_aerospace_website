import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import AboutUsVideoPage from "./components/AboutUsVideoPage"
import WhatWeDo from "./components/WhatWeDo"
import OurStory from "./components/OurStory"
import OurMission from "./components/OurMission"
import Founders from "./components/Founders"
import WhatWeAreHeaded from "./components/WhatWeAreHeaded"
import OurValues from "./components/OurValues"
import TeamMembers from "./components/TeamMembers"
import AwardsAndCertification from "./components/AwardsAndCertification"
import CompanyTimeline from "./components/CompanyTimeline"


export const metadata: Metadata = {
  title: "About - Tsalla Aerospace",
  description:
    "Learn about Tsalla Aerospace's mission to build the future of autonomous systems, our team, values, and achievements.",
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <AboutUsVideoPage />
      <WhatWeDo />
      <OurStory />
      <OurMission />
      <WhatWeAreHeaded />
      <Founders />
      <CompanyTimeline />
      {/* <Timeline /> */}
      <OurValues />
      {/* <TeamMembers /> */}
      <AwardsAndCertification />
    </PageWrapper>
  )
}
